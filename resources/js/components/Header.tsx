import React, {createContext, memo, useContext, useEffect, useState} from 'react';
import useRoute from '@/hooks/useRoute';
import CLink from './CLink';

// Assets
import logo from '@assets/logo.png';
import {RouteContext} from "../hooks/useRoute";
import route from "ziggy-js";
import AccountButton from "./AccountButton";


const HeaderLink: React.FC<{ name: string, children: string }> =
    ({ name, children }) => {
        const route = useRoute();
        const isActive = route().current() === name;

        console.log('HeaderLink')

        return (
            <CLink href={route(name)} className="relative mx-2 overflow-hidden rounded-lg flex justify-center">
                <span className={`absolute bottom-0 bg-red-600 h-0.5 transition-all ${isActive ? 'w-full' : 'w-0 '}`}/>
                <span
                    className={`
                    font-play text-lg text-gray-400 hover:text-gray-200 px-4 pb-1
                    ${isActive ? 'text-gray-200' : ''}
                `}
                >{children}</span>
            </CLink>
        );
    }

const MobileHeaderLink: React.FC<{ name: string, children: string }> =
    ({ name, children }) => {
        const route = useRoute();
        const isActive = route().current() === name;

        return (
            <li className='mb-3 flex justify-center'>
                <CLink href={route(name)} className="relative pb-1">
                    <span className={`absolute bottom-0 left-0 bg-red-600 h-0.5 transition-all ${isActive ? 'w-full' : 'w-0 '}`}></span>
                    <span
                        className={`
                    font-play text-2xl text-gray-400 hover:text-gray-200 px-4 pb-1
                    ${isActive ? 'text-gray-200' : ''}
                `}
                    >{children}</span>
                </CLink>
            </li>
        );
    }

const Header: React.FC = memo(() => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const route = useRoute();
    const location = route().current();

    const linksList = [
        { name: 'home', text: 'Главная' },
        { name: 'farms', text: 'Ферма' },
        { name: 'shops', text: 'Магазины' },
        { name: 'home', text: 'Кошелёк' },
    ];

    console.log('header')

    function toggleMenu() { setShowMobileMenu(prev => !prev) }

    useEffect(() => {
        setShowMobileMenu(false);
    }, [location]);

    return (
        <header className="flex sticky top-0 w-full h-16 justify-center shadow-xl z-10 app-bg-dark text-app-light">
            <div className="container flex items-center justify-between px-5 z-30">
                <CLink href="/">
                    <img src={logo} alt="ColorBit" className="md:h-11 h-8" />
                </CLink>

                {/* Computer menu */}
                <nav className="hidden md:block">
                    <ul className="flex">
                        {linksList.map((link, i) => (
                            <HeaderLink name={link.name} key={i}>{link.text}</HeaderLink>
                        ))}
                    </ul>
                </nav>

                <AccountButton />

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
                        h-screen w-full sm:w-1/2 app-bg-dark pt-20 shadow-2xl z-20
                    `}
            >
                <ul className="flex flex-col pl-5 ">
                    {linksList.map((link, i) => (
                        <MobileHeaderLink name={link.name} key={i}>{link.text}</MobileHeaderLink>
                    ))}
                </ul>

                <span className="text-center w-full absolute bottom-5 text-app-dark">
                    @copyright ColorBit-mining <br /> by ColorKat. <br /> All rights reserved.
                </span>
            </nav>

            <div
                onClick={() => setShowMobileMenu(false)}
                className={`w-screen h-screen absolute ${showMobileMenu ? "pointer-events-auto" : "pointer-events-none"} z-10`}
            />
        </header>
    );
});

export default Header;
