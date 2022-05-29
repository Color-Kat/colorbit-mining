import React from 'react';

// TODO
// @ts-ignore
import logo from '@assets/logo.png';
import CLink from './CLink';
import useRoute from '@/hooks/useRoute';

const FooterLink: React.FC<{ name: string, children: string }> = ({ name, children }) => {
    const route = useRoute();

    return (
        <li>
            <CLink href={route(name)} className="relative mx-2 overflow-hidden rounded-lg flex justify-center">
                <span
                    className='font-play text-lg text-gray-500 hover:text-gray-400 pb-1'
                >{children}</span>
            </CLink>
        </li>
    );
}

const Footer: React.FC = () => {
    const linksList = [
        { name: 'home', text: 'Главная' },
        { name: 'home', text: 'Информация' },
        { name: 'home', text: 'Группа ВК' },
    ];

    return (
        <footer className="flex justify-center app-bg-dark text-app-light shadow-xl py-4 font-play text-gray-500">
            <div className="container px-5 flex-col md:flex-row flex justify-between">
                <div className="footer__left-side flex flex-col items-center shrink-0">
                    <CLink href="/">
                        <img src={logo} alt="ColorBit" className="h-11" />
                    </CLink>
                </div>

                <div className="footer__middle-side my-4 md:my-0 mx-10 text-center md:text-left border-l-2 border-r-2 px-5 border-gray-700">
                    <h3 className="text-lg font-bold text-gray-400">Навигация:</h3>
                    <nav className="">
                        <ul className="whitespace-nowrap list-red">
                            {linksList.map((link, i) => (
                                <FooterLink name={link.name} key={i}>{link.text}</FooterLink>
                            ))}
                        </ul>
                    </nav>

                </div>

                <div className="footer__middle-side md:text-center text-gray-500">
                    <h3 className="text-xl font-bold text-center text-gray-400 font-play mb-1">ColorBit minig</h3>
                    <span>
                        Почувствуйте себя настоящим майнером в самой реалистичной игре про строительство ферм! <br />
                        Покупать комплектующие в надёжном магазине или дешево с авито решать только тебе. <br />
                        Но будь осторожен, не спали хату!
                    </span>
                </div>

            </div>
        </footer >
    );
}

export default Footer;
