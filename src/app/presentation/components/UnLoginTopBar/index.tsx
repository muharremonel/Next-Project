import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import belediye from 'src/app/presentation/assets/belediye.png';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, Digithane, NavbarInfo, Notification, Produce, Search, MenuIcon } from '@/svgImports';
import { MAX_LAYOUT_WIDTH } from '@/constants';
import SearchSave from '../SearchBar/SearchBar';

import { useRouter } from 'next/router';
import { useApi } from '../../../../../pages/_app';
import { BASE_URL } from '@/config';
import IconDropDown from "@/app/presentation/components/TopBar/components/DropDowns/IconDropDown";
import Notifications from "@/app/presentation/components/TopBar/components/DropDowns/Notifications";
import MyProfile from "@/app/presentation/components/TopBar/components/DropDowns/MyProfile";
import { Button } from "@mui/material";
import MobileMenu from "@/app/presentation/components/UnLoginTopBar/components/MobileMenu";
import LessonNotification from '../LessonNotification';
import UnloginHeaderNotification from '../UnloginHeaderNotification';

const arr = [
    {
        Button: <Link href={"/giris"}>
            <div className={"w-auto"}>
                <Button sx={{ textTransform: "none" }} style={{ backgroundColor: "#222D68", borderRadius: "20px" }}
                    variant={"contained"} onClick={console.log}>Giriş yap</Button>
            </div>
        </Link>

    },
    {
        Button: <Link href={"/kayitol"}>
            <div className={"w-auto"}>
                <Button sx={{ textTransform: "none" }} style={{ borderRadius: "20px" }} variant={"outlined"}
                    onClick={console.log}>Kayıt ol</Button>
            </div>
        </Link>
    }
    ,
    {
        Button: <Link href="/giris">
            <div className={"w-auto"}>
                <Button sx={{ textTransform: "none" }} style={{ backgroundColor: "#F29E51", borderRadius: "20px" }}
                    variant={"contained"}>Proje Başvurusu Yap</Button>
            </div>
        </Link>
    }
]


const TopBar: React.FC = () => {

    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        router.push(`/ara?query=${term}`);
    };
    const [menuVisible, setMenuVisible] = useState(false);
    const [categories, setCategories] = useState<any>();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
    const [selectedIcon, setSelectedIcon] = useState<number | null>(null);

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

    const [menuOpen, setMenuOpen] = useState(false); // Menüyü açık veya kapalı tutmak için bir durum

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
                        <Image width={45} height={45} src={belediye} alt="kagithane" />
                        <Link href={"/anasayfa"}>
                            <Digithane />
                        </Link>
                    </div>

                    {/* Mobile logos */}
                    <div className="md:hidden flex items-center gap-4">
                        <Image width={45} height={45} src={belediye} alt="kagithane" />
                        <Link href={"/anasayfa"}>
                            <Digithane />
                        </Link>
                    </div>

                    {/* Desktop Kategoriler button */}
                    <div className="hidden md:flex items-center gap-2 cursor-pointer" onClick={handleMenuOpen}>
                        <button style={{ cursor: 'pointer', height: "100%" }}>
                            Kategoriler
                        </button>
                        <ArrowDown />
                    </div>
                    <Menu
                        anchorEl={anchorEl2}
                        open={menuOpen}
                        onClose={handleMenuClose}
                        className='mt-1'
                    >
                        <div className="flex flex-col justify-center w-[260px] gap-1 px-4 pb-4 pt-4">
                            {categories?.map((item: any, index: number) => {
                                const { icon } = item
                                return (
                                    <Link key={index} href={item.href}>
                                        <div
                                            style={{
                                                borderRadius: "5px",
                                            }}
                                            className='flex gap-8 items-center p-2 hover:bg-primaryLight transition hover:shadow-lg cursor-pointer'>
                                            <Image width={20} height={20} alt='icon' src={`${BASE_URL}${icon}`} />
                                            {item.title}
                                        </div>
                                    </Link>
                                )
                            })}
                            <div className='w-full h-[1px] bg-[#D1D1D1] my-2' />
                            <Link href={"/proje-uretim-merkezi"}>

                                <div style={{
                                    backgroundColor: "rgba(242, 158, 81, 0.15)",
                                    borderRadius: "5px",
                                    color: "#F29E51"
                                }} className='flex gap-8 items-center p-2 transition hover:shadow-lg cursor-pointer'>
                                    <Produce />
                                    Proje Üretim Merkezi
                                </div>
                            </Link>
                        </div>
                    </Menu>
                </div>

                <div className={"md:block hidden"}>
                    <SearchSave
                        searchTerm={searchTerm}
                        setSearchTerm={(term: string) => {
                            setSearchTerm(term);
                            handleSearch(term);
                        }}
                    />
                </div>

                <div className="flex items-center">
                    {/* Desktop icons */}
                    <div className="hidden md:flex gap-4" style={{ width: '100%', justifyContent: 'flex-end' }}>
                        {arr.map((item, index) => (
                            <div className={""} key={index}>
                                {item.Button}
                            </div>
                        ))}
                    </div>

                    {/* Mobile icons */}
                    <div className="md:hidden space-x-2">

                        <IconButton size="large" onClick={toggleMenu}>
                            <MenuIcon />
                        </IconButton>
                    </div>
                    {menuVisible && <MobileMenu categories={categories}
                        toggleMenu={toggleMenu}
                        setSearchTerm={console.log} />}
                </div>

            </Toolbar>
            { <UnloginHeaderNotification stream={false} eduId={{lessonId:"651716e6dbb222156012b500"}} />}
        </AppBar>
    )
        ;
};

export default TopBar;