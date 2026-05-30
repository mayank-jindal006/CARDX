export function Footer() {
    return (
        <footer className="w-full bg-[#050505] text-white py-24 border-t border-white/5">
            <div className="container mx-auto px-6 max-w-7xl flex flex-col items-center gap-12 text-center">

                <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white/90">CARDX</h2>

                <button className="bg-white text-black px-8 py-4 rounded-full font-bold
          hover:bg-white/90 transition-all active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                    Request Demo
                </button>

                <div className="flex gap-8 text-sm font-medium text-white/40 pt-12">
                    <a href="#" className="hover:text-white transition-colors">Contact</a>
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors">Email</a>
                </div>

            </div>
        </footer>
    );
}
