'use client';
import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const SEPARATION = 150;
        const AMOUNTX = 40;
        const AMOUNTY = 60;
        const COUNT = AMOUNTX * AMOUNTY;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            1,
            10000,
        );
        camera.position.set(0, 355, 1220);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        containerRef.current.appendChild(renderer.domElement);

        // Build geometry
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(COUNT * 3);
        const colors = new Float32Array(COUNT * 3);
        const scales = new Float32Array(COUNT); // per-particle size multiplier

        let i = 0;
        for (let ix = 0; ix < AMOUNTX; ix++) {
            for (let iy = 0; iy < AMOUNTY; iy++) {
                positions[i * 3] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
                positions[i * 3 + 1] = 0;
                positions[i * 3 + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
                colors[i * 3] = 0.9;
                colors[i * 3 + 1] = 0.95;
                colors[i * 3 + 2] = 1.0;
                scales[i] = 1.0;
                i++;
            }
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 14,
            vertexColors: true,
            transparent: true,
            opacity: 1,
            sizeAttenuation: true,
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        // Mouse state in normalized device coords [-1, 1]
        const mouse = { x: 0, y: 0 };
        // Ripple pulses: each has { x, z } in world-space, age (0→1), strength }
        const ripples: { wx: number; wz: number; age: number; strength: number }[] = [];

        // Convert mouse NDC → approximate world X/Z on the particle plane (Y=0 plane)
        const projectMouseToWorld = (mx: number, my: number) => {
            // Cast ray from camera through NDC point and find intersection with y=0 plane
            const ndc = new THREE.Vector3(mx, my, 0.5);
            ndc.unproject(camera);
            const dir = ndc.sub(camera.position).normalize();
            // intersect with y = 0 plane: camera.y + t * dir.y = 0
            if (Math.abs(dir.y) < 0.0001) return null;
            const t = -camera.position.y / dir.y;
            if (t < 0) return null;
            return {
                x: camera.position.x + dir.x * t,
                z: camera.position.z + dir.z * t,
            };
        };

        // Continuous hover ripple state
        const hover = { wx: 0, wz: 0, active: false };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
            const world = projectMouseToWorld(mouse.x, mouse.y);
            if (world) {
                hover.wx = world.x;
                hover.wz = world.z;
                hover.active = true;
            }
        };

        const handleMouseLeave = () => { hover.active = false; };

        const handleClick = (e: MouseEvent) => {
            const cx = (e.clientX / window.innerWidth) * 2 - 1;
            const cy = -(e.clientY / window.innerHeight) * 2 + 1;
            const world = projectMouseToWorld(cx, cy);
            if (world) {
                ripples.push({ wx: world.x, wz: world.z, age: 0, strength: 1.8 });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('click', handleClick);

        let count = 0;
        let animId = 0;

        const animate = () => {
            animId = requestAnimationFrame(animate);

            const posArr = geometry.attributes.position.array as Float32Array;
            const colArr = geometry.attributes.color.array as Float32Array;

            // Age out ripples
            for (let r = ripples.length - 1; r >= 0; r--) {
                ripples[r].age += 0.012;
                if (ripples[r].age > 1) ripples.splice(r, 1);
            }

            let idx = 0;
            for (let ix = 0; ix < AMOUNTX; ix++) {
                for (let iy = 0; iy < AMOUNTY; iy++) {
                    const base = idx * 3;
                    const worldX = posArr[base];
                    const worldZ = posArr[base + 2];

                    // --- Ambient wave ---
                    let y = Math.sin((ix + count) * 0.3) * 120 +
                        Math.sin((iy + count) * 0.5) * 120;

                    // --- Hover ripple (continuous, soft) ---
                    if (hover.active) {
                        const dx = worldX - hover.wx;
                        const dz = worldZ - hover.wz;
                        const dist = Math.sqrt(dx * dx + dz * dz);
                        const hoverRadius = 700;
                        if (dist < hoverRadius) {
                            const influence = 1 - dist / hoverRadius;
                            // Outward ripple rings moving away from cursor
                            const wave = Math.sin(dist * 0.012 - count * 3.5) * influence;
                            y += wave * 160 * influence;
                        }
                    }

                    // --- Click ripples ---
                    for (const rp of ripples) {
                        const dx = worldX - rp.wx;
                        const dz = worldZ - rp.wz;
                        const dist = Math.sqrt(dx * dx + dz * dz);
                        // Expanding ring front
                        const ringRadius = rp.age * 3000;
                        const ringWidth = 600;
                        const diff = dist - ringRadius;
                        if (Math.abs(diff) < ringWidth) {
                            const envelope = (1 - Math.abs(diff) / ringWidth) * (1 - rp.age);
                            y += Math.sin(diff * 0.015) * 250 * envelope * rp.strength;
                        }
                    }

                    posArr[base + 1] = y;

                    // --- Color: brighten dots near cursor ---
                    let r = 0.9, g = 0.95, b = 1.0;
                    if (hover.active) {
                        const dx = worldX - hover.wx;
                        const dz = worldZ - hover.wz;
                        const dist = Math.sqrt(dx * dx + dz * dz);
                        const glowRadius = 500;
                        if (dist < glowRadius) {
                            const glow = 1 - dist / glowRadius;
                            // Shift from white-blue → electric blue glow
                            r = 0.9 - glow * 0.7;  // pull red down
                            g = 0.95 - glow * 0.3; // pull green slightly
                            b = 1.0;                // keep blue full
                        }
                    }
                    colArr[base] = r;
                    colArr[base + 1] = g;
                    colArr[base + 2] = b;

                    idx++;
                }
            }

            geometry.attributes.position.needsUpdate = true;
            geometry.attributes.color.needsUpdate = true;

            renderer.render(scene, camera);
            count += 0.05;
        };

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        animate();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('click', handleClick);
            window.removeEventListener('resize', handleResize);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            // Remove pointer-events-none so mouse events reach the canvas
            className={cn('fixed inset-0 -z-1 opacity-80', className)}
            {...props}
        />
    );
}
