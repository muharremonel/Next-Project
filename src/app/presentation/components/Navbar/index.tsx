import React, {useEffect, useRef, useState} from 'react';
import {SearchBar} from "@/app/presentation/components";
import {
    CircleDigithaneLogo,
    Digithane,
    Search,
    Notification,
    MenuIcon,
    Close,
    Produce, Profile, Play, Calendar, ChartPie, Certificate, Logout
} from "@/svgImports";
import Link from "next/link";
import {useApi} from "../../../../../pages/_app";
import {useRouter} from "next/router";
import {Checkbox, Button} from '@mui/material';
import {BASE_URL} from "@/config";
import Login from "@/app/presentation/components/Navbar/components/DesktopNavbar/Login";
import UnLogin from "@/app/presentation/components/Navbar/components/DesktopNavbar/UnLogin";
import MobileLogin from "@/app/presentation/components/Navbar/components/MobileNavbar/Login";
import MobileUnLogin from "@/app/presentation/components/Navbar/components/MobileNavbar/MobileUnLogin";
import {MAX_LAYOUT_WIDTH} from '@/constants';
import Image from 'next/image';
import belediye from '/src/app/presentation/assets/belediye.png'

type CombinedNavbarProps = {
    isLogin?: boolean
}


const CombinedNavbar = ({isLogin}: CombinedNavbarProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [notificationDropdown, setNotificationDropdown] = useState(false);
    const [notificationPopup, setNotificationPopup] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const router = useRouter()
    const api = useApi();
    const notificationDropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (notificationDropdownRef.current && !(notificationDropdownRef.current as any).contains(event.target)) {
                setNotificationDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    useEffect(() => {
        (async () => {
            const response = await api.categories();
            setCategories(response.data);
        })();
    }, [api]);

    const handleCategoryChange = (event: any) => {
        setSelectedCategory(event.target.value);
    };

    const categoryTitles = categories?.map((category: any) => category.title);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleSignOut = async () => {
        try {
            window.localStorage.removeItem('digitUser')
            window.localStorage.removeItem('userPhone')
            router.push('/giris');
        } catch (error) {
            console.log('Çıkış yaparken bir hata oluştu:', error);
        }
    }

    return (
        <div className="flex justify-between items-center w-full bg-white shadow-2xl p-4">
            <div style={{maxWidth: `${parseInt(MAX_LAYOUT_WIDTH) + 300}px`}} className='w-full flex mx-auto'>
                {/* Common Elements */}

                <div className="flex items-center gap-2 md:gap-8 lg:pl-20 sm:min-w-[350px] max-md:w-full">
                    <Image width={60} height={60} src={belediye} alt='kagithane' />
                    <Link href={"/anasayfa"}>
                        <Digithane/>
                    </Link>
                </div>

                {isLogin ? (
                    <Login setShowCategoryDropdown={() => setShowCategoryDropdown(!showCategoryDropdown)}
                           notificationDropdown={notificationDropdown} ref={notificationDropdownRef}
                           setNotificationPopup={() => setNotificationPopup(true)} open={notificationPopup}
                           onClose={() => {
                               setNotificationPopup(false)
                           }} setDropdownVisible={() => setDropdownVisible(!dropdownVisible)}
                           dropdownVisible={dropdownVisible}
                           askThePresident={() => console.log('Proje başvurusu yapıldı')}
                           applyForAProjectClick={() => console.log('Başkana soruldu')}
                           setNotificationDropDown={() => setNotificationDropdown(prev => !prev)}
                           setShowDropDown={() => setShowDropdown(!showDropdown)}
                           showDropdown={showDropdown}
                           signOut={handleSignOut}/>

                ) : (
                    <UnLogin onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}/>
                )}

                {/* Mobile Navbar */}
                <div className="md:hidden flex items-center gap-4 transition-all hover:scale-105">
                    <Notification/>
                    <MenuIcon onClick={toggleMenu}/>
                </div>
                {menuOpen && (
                    <div
                        className="md:hidden absolute top-full z-50 left-0 w-full bg-white shadow-2xl flex flex-col p-4">
                        <div className="fixed top-0 left-0 w-full h-full bg-white z-50 p-4">
                            <div className="flex justify-between items-center mb-6">
                                {isLogin && (
                                    <div className="flex items-center gap-4 w-full">
                                        <div className={"transition-all hover:scale-105"}>
                                            <img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" alt=""
                                                 className="h-12 w-12 rounded-full"/>
                                        </div>
                                        <span className="text-lg font-medium whitespace-nowrap">User Name</span>
                                    </div>
                                )}
                                <div className={"flex w-full justify-end"}>
                                    <Close onClick={toggleMenu}/>
                                </div>
                            </div>
                            <div className={"flex w-full justify-center mb-2"}>
                                <SearchBar rounded={"full"} value={""} placeholder={"Ara"} svgIcon={Search}
                                           setSearchTerm={console.log}/>
                            </div>
                            <div className="mb-6">
                                <h2 className="text-xl font-light mb-4">Kategoriler</h2>
                                <ul>
                                    {categories.map((category: any, index) => (
                                        <div key={index} className={"flex"}>
                                            <img src={`${BASE_URL}${category.icon}`} alt=""/>
                                            <li className="mb-2 text-sm font-light pl-4 cursor-pointer">{category.title}
                                            </li>
                                        </div>
                                    ))}
                                    <div className={"flex"}>
                                        <Produce/>
                                        <li className="mb-2 text-sm font-light pl-4 cursor-pointer">Proje Üretim Merkezi
                                        </li>
                                    </div>
                                </ul>
                            </div>

                            {isLogin ? (
                                <MobileLogin onClick={handleSignOut}/>
                            ) : (
                                <MobileUnLogin onClick={toggleMenu} onClick1={() => {
                                    toggleMenu();
                                }}/>
                            )}

                            <div className="flex flex-col gap-4 mb-6">
                                <Button sx={{textTransform: "none"}} className={"w-full"} variant={"contained"}
                                        style={{backgroundColor: "#F29E51", borderRadius: "20px"}} onClick={toggleMenu}>Proje
                                    Başvurusu Yap</Button>
                                {isLogin &&
                                    <Button sx={{textTransform: "none"}} className={"w-full"} variant={"outlined"} style={{borderRadius: "20px"}}
                                            onClick={() => {
                                                handleSignOut();
                                                toggleMenu();
                                            }}>Çıkış yap</Button>
                                }
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CombinedNavbar;
