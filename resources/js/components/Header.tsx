import React, { useEffect, useState } from 'react';
import useRoute from '@/hooks/useRoute';
import CLink from './CLink';

// Assets
// TODO
// @ts-ignore
import logo from '@assets/logo.png';

const HeaderLink: React.FC<{ name: string, children: string }> = ({ name, children }) => {
    const route = useRoute();
    const isActive = route().current() === name;

    return (
        <CLink href={route(name)} className="relative mx-2 overflow-hidden rounded-lg flex justify-center">
            <span className={`absolute bottom-0 bg-red-600 h-0.5 transition-all ${isActive ? 'w-full' : 'w-0 '}`}></span>
            <span
                className={`
                    font-play text-lg text-gray-400 hover:text-gray-200 px-4 pb-1
                    ${isActive ? 'text-gray-200' : ''}
                `}
            >{children}</span>
        </CLink>
    );
}

const Header: React.FC = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const linksList = [
        { name: 'home', text: 'Ферма' },
        { name: 'farms', text: 'Магазины' },
        { name: 'dashboard', text: 'Кошелёк' },
    ];

    function toggleMenu() { setShowMobileMenu(prev => !prev) }

    // useEffect(() => {
    //     setShowMobileMenu(false);
    // }, [location]);

    return (
        <header className="flex sticky top-0 w-full h-16 justify-center shadow-xl z-10 app-bg-dark text-app-light">
            <div className="container flex items-center justify-between px-5 z-30">
                <CLink href="/">
                    <img src={logo} alt="ColorBit" className="h-11" />
                </CLink>

                {/* Computer menu */}
                <nav className="hidden md:block">
                    <ul className="flex">
                        {linksList.map((link, i) => (
                            <HeaderLink name={link.name} key={i}>{link.text}</HeaderLink>
                        ))}
                    </ul>
                </nav>

                {/*<LoginButton />*/}
                {/* hover:text-slate-300 */}

                {/* Mobile menu */}
                <div
                    onClick={toggleMenu}
                    id="mobile-menu-toggle"
                    className="relative flex md:hidden py-1 w-8 h-8 rounded-md flex-col items-center justify-evenly">
                    <div className={`w-4/6 h-0.5 rounded app-bg-red transition-all ${showMobileMenu ? 'absolute rotate-45 top-1/2' : ''}`}></div>
                    <div className={`w-4/6 h-0.5 rounded app-bg-red transition-all ${showMobileMenu ? 'absolute hidden' : ''}`}></div>
                    <div className={`w-4/6 h-0.5 rounded app-bg-red transition-all ${showMobileMenu ? 'absolute -rotate-45 top-1/2' : ''}`}></div>
                </div>
            </div>

            {/* Mobile menu */}
            <nav
                className={`
                        block md:hidden fixed top-0 ${showMobileMenu ? 'right-0' : '-right-full'} transition-all
                        h-screen w-full sm:w-1/2 bg-slate-800 pt-20 shadow-2xl z-20
                    `}
            >
                <ul className="flex flex-col pl-5 ">
                    {linksList.map((link, i) => (
                        <HeaderLink name={link.name} key={i}>{link.text}</HeaderLink>
                    ))}
                </ul>

                <span className="text-center w-full absolute bottom-5">
                    @copyright NiggaNft. <br /> All rights reserved.
                </span>
            </nav>

            <div
                onClick={() => setShowMobileMenu(false)}
                className={`w-screen h-screen absolute ${showMobileMenu ? "pointer-events-auto" : "pointer-events-none"} z-10`}
            ></div>
        </header>
    );
}

export default Header;
