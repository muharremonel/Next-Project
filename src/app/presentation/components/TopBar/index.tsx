import React, {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import belediye from 'src/app/presentation/assets/belediye.png';
import Image from 'next/image';
import Link from 'next/link';
import {ArrowDown, Digithane, NavbarInfo, Notification, Produce, Search, MenuIcon} from '@/svgImports';
import {MAX_LAYOUT_WIDTH} from '@/constants';
import {SearchBar} from '..';
import {useRouter} from 'next/router';
import {useApi} from '../../../../../pages/_app';
import {BASE_URL} from '@/config';
import IconDropDown from "@/app/presentation/components/TopBar/components/DropDowns/IconDropDown";
import Notifications from "@/app/presentation/components/TopBar/components/DropDowns/Notifications";
import MyProfile from "@/app/presentation/components/TopBar/components/DropDowns/MyProfile";
import MobileMenu from "@/app/presentation/components/TopBar/components/LoginMobileMenu.tsx";
import { Women, Man } from '@/svgImports';


const iconContainerStyle: React.CSSProperties = {
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    backgroundColor: 'white',
    overflow: 'hidden'
};

const iconStyle: React.CSSProperties = {
    width: '48px',
    height: '48px'
};

type UserProps = {
    gender?: 'male' | 'female',
    picture?: string | null
};

type TopBarProps = {
    userData: UserProps
};

const TopBar: React.FC<TopBarProps> = ({ userData }) => {
    
    const [menuVisible, setMenuVisible] = useState(false);
    const [categories, setCategories] = useState<any>();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
    const [selectedIcon, setSelectedIcon] = useState<number | null>(null);

    const [user, setUser] = useState<UserProps | null>(userData);
    const [profileIcon, setProfileIcon] = useState<JSX.Element | null>(null);
  
    const [currentPicture, setCurrentPicture] = useState<string | null>(null);
    const arr = [
        {
            icon: <div className="rotate-90 rounded-full bg-white h-12 w-12 flex items-center justify-center transition-all hover:scale-105"><NavbarInfo/></div>
        },
        {
            icon: <div className='h-12 w-12 grid place-items-center'><Notification/></div>
        },
        {
            icon: <div className="transition-all hover:scale-105 flex items-center gap-1 h-12 w-12">
                        {currentPicture 
                            ? <img src={currentPicture} alt="User Profile" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
                            : profileIcon
                        }
                  </div>
        }
               
    ];

    useEffect(() => {
        if (user?.picture) {
            const picUrl = `${BASE_URL}/${user.picture}`;
            setCurrentPicture(picUrl);
        } else if (user?.gender === 'male') {
            setProfileIcon(<div style={iconContainerStyle}>
                <Man style={iconStyle} />
            </div>);
            setCurrentPicture(null);
        } else if (user?.gender === 'female') {
            setProfileIcon(<div style={iconContainerStyle}>
                <Women style={iconStyle} />
            </div>);
            setCurrentPicture(null);
        } else {
            setCurrentPicture('https://cdn-icons-png.flaticon.com/512/1077/1077114.png');
        }
    }, [user]);

    useEffect(() => {
        (async () => {
            const fetchedUserData = (await api.getUser() as any)?.data;
            if (fetchedUserData) {
                setUser(fetchedUserData);
            }
        })();
    }, []);
  

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleIconClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
        setSelectedIcon(index);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedIcon(null);
    };

    const [menuOpen, setMenuOpen] = useState(false); 

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMenuOpen(true);
        setAnchorEl2(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuOpen(false);
        setAnchorEl2(null);
    };

    const router = useRouter()
    const api = useApi();

    useEffect(() => {
        (async () => {
            const response = await api.categories();
            setCategories(response.data);
        })();
    }, [api]);

    const handleSignOut = async () => {
        try {
            window.localStorage.removeItem('digitUser')
            router.push('/giris');
        } catch (error) {
            console.log('Çıkış yaparken bir hata oluştu:', error);
        }
    }

    return (
        
        <AppBar position="sticky" color="default">
            
            <Toolbar
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    maxWidth: `${parseInt(MAX_LAYOUT_WIDTH) + 300}px`,
                    width: '100%',
                    margin: 'auto',
                }}
            >
                <div className="flex md:space-x-2 space-x-0">
                    
                    <div className="hidden md:flex items-center gap-2 md:gap-8 min-w-[350px] max-md:w-full">
                        <Image width={45} height={45} src={belediye} alt="kagithane"/>
                        <Link href={"/anasayfa"}>
                            <Digithane/>
                        </Link>
                    </div>

                    {/* Mobile logos */}
                    <div className="md:hidden flex items-center gap-4">
                        <Image width={45} height={45} src={belediye} alt="kagithane"/>
                        <Link href={"/anasayfa"}>
                            <Digithane/>
                        </Link>
                    </div>

                    {/* Desktop Kategoriler button */}
                    <div className="hidden md:flex items-center gap-2 cursor-pointer" onClick={handleMenuOpen}>
                        <button style={{cursor: 'pointer', height: "100%"}}>
                            Kategoriler
                        </button>
                        <ArrowDown/>
                    </div>
                    <Menu
                        anchorEl={anchorEl2}
                        open={menuOpen}
                        onClose={handleMenuClose}
                        className='mt-2'
                    >
                        <div className="flex flex-col justify-center w-[260px] gap-1 px-4 pb-4 pt-4">
                        {categories?.map((item: any, index: number) => {
                                const {icon} = item
                                return (
                                    <Link href={item.href} key={item?.title}>
                                        <div
                                            style={{
                                                borderRadius: "7px",
                                            }}
                                            className='flex gap-5 items-center p-2 hover:bg-primaryLight transition hover:shadow-lg cursor-pointer'>
                                            <Image width={20} height={20} alt='icon' src={`${BASE_URL}${icon}`}/>
                                            {item.title}
                                        </div>
                                    </Link>
                                )
                            })}

                            <div className='w-full h-[1px] bg-[#D1D1D1] my-2'/>
                            <Link href={"/proje-uretim-merkezi"}>
                                <div style={{
                                    backgroundColor: "rgba(242, 158, 81, 0.15)",
                                    borderRadius: "5px",
                                    color: "#F29E51"
                                }} className='flex gap-5 items-center p-2 transition hover:shadow-lg cursor-pointer'>
                                    <Produce/>
                                    Proje Üretim Merkezi
                                </div>
                            </Link>
                        </div>
                    </Menu>

                </div>

                {/*<div className={"md:block hidden"}>*/}
                {/*    <SearchBar*/}
                {/*        placeholder="Ara…"*/}
                {/*        svgIcon={Search}*/}
                {/*        value={''}*/}
                {/*        setSearchTerm={() => {*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</div>*/}

                <div className="flex items-center">
                    {/* Desktop icons */}
                <div className="hidden md:flex" style={{width: '100%', justifyContent: 'flex-end'}}>
                    <IconButton size="large" onClick={(event) => handleIconClick(event, 0)}>
                        <div className="rotate-90 rounded-full bg-white h-12 w-12 flex items-center justify-center transition-all hover:scale-105">
                            <NavbarInfo />
                        </div>
                    </IconButton>

                    <IconButton size="large" onClick={(event) => handleIconClick(event, 1)}>
                        <div className='h-12 w-12 grid place-items-center'>
                            <Notification />
                        </div>
                    </IconButton>
                    <IconButton size="large" onClick={(event) => handleIconClick(event, 2)}>
                        <div className="transition-all hover:scale-105 flex items-center gap-1 h-12 w-12">
                            {currentPicture 
                                ? <img src={currentPicture} alt="User Profile" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
                                : profileIcon
                            }
                        </div>
                    </IconButton>
                </div>
                    {/* Mobile icons */}
                    <div className="md:hidden flex">
                        <IconButton size="large" onClick={(event) => handleIconClick(event, 1)}>
                            <Notification/>
                        </IconButton>
                        <IconButton size="large" onClick={toggleMenu}>
                            <MenuIcon/>
                        </IconButton>
                    </div>
                    {menuVisible && <MobileMenu user={user} logoutOnClick={handleSignOut} categories={categories}
                                                isLogin={!!localStorage.getItem('digitUser')} toggleMenu={toggleMenu}
                                                setSearchTerm={console.log}/>}
                </div>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {selectedIcon === 0 && <div className={"w-[200px] h-[200px] relative "}><IconDropDown/></div>}
                    {selectedIcon === 1 && <div className={"w-[350px] h-[500px] relative "}><Notifications/></div>}
                    {selectedIcon === 2 &&
                        <div className={"w-[265px] h-[285px] relative flex justify-center "}><MyProfile user={user}
                                                                                                        logoutOnClick={handleSignOut}/>
                        </div>}
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;