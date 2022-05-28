import React from 'react';

const Footer: React.FC = () => {

    return (
        <footer className="flex justify-center bg-slate-800 text-slate-400 shadow-xl py-4">
            <div className="container px-5 flex-col md:flex-row flex justify-between">
                <div className="footer__left-side flex flex-col items-center">
                    <div className="w-max flex opacity-70 hover:opacity-100 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl p-3 mb-2 text-slate-800">
                        LOGO
                    </div>
                </div>

                <div className="footer__middle-side my-4 md:my-0 mx-10 text-center md:text-left border-l-2 border-r-2 px-5 border-slate-700">
                    <h3 className="text-lg font-bold">Навигация:</h3>
                    <nav className="">
                        <ul className="whitespace-nowrap">
                            <a href="/">Главная</a>
                            <a href="/auctions">Аукционы</a>
                        </ul>
                    </nav>

                </div>

                <div className="footer__middle-side md:text-center">
                    <h3 className="text-lg font-bold text-center">ДИСКЛЕЙМЕР</h3>
                    <span>

                    </span>
                </div>

            </div>
        </footer >
    );
}

export default Footer;
