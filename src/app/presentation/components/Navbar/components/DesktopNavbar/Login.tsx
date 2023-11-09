import React from "react";
import Category from "@/app/presentation/components/Navbar/components/Category";
import {AnimatePresence, motion} from "framer-motion";
import {Button, Checkbox} from "@mui/material";
import Popup from "@/app/presentation/components/PopUp";
import {
    ArrowDown,
    Calendar,
    Certificate,
    ChartPie, Logout,
    NavbarInfo,
    Notification,
    Play,
    Profile,
    Search
} from "@/svgImports";
import {SearchBar} from "@/app/presentation/components";
import Link from "next/link";
import {BigNotification, SmallNotification} from "../Notification";

function Login(props: {
    setShowCategoryDropdown: () => void,
    notificationDropdown: boolean,
    ref: React.MutableRefObject<null>,
    setNotificationPopup: () => void,
    open: boolean,
    onClose: () => void,
    setDropdownVisible: () => void,
    dropdownVisible: boolean,
    askThePresident: () => void,
    applyForAProjectClick: () => void,
    setNotificationDropDown: () => void,
    setShowDropDown: () => void,
    showDropdown: boolean,
    signOut: () => Promise<void>
}) {
    return <div className="hidden md:flex w-full items-center pr-5">
        <div className="relative ">
            <div className="p-2 cursor-pointer flex items-center gap-2"
                 onClick={props.setShowCategoryDropdown}>
                <Category/>
            </div>
        </div>

        <div className="w-full flex items-center">
            {/*<div className={"w-full flex justify-center items-center"}>*/}
            {/*    <SearchBar rounded={"full"} value={""} placeholder={"Ara"} svgIcon={Search}*/}
            {/*               setSearchTerm={console.log}/>*/}
            {/*</div>*/}
            <div className={"w-full flex justify-end items-center"}>
                <div className="relative">
                    <AnimatePresence>
                        {props.notificationDropdown && (
                            <motion.div
                                initial={{opacity: 0, y: -10}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -10}}
                                transition={{duration: 0.3}}
                                className="absolute top-16 -left-32 divide-y w-[350px] max-h-[500px] bg-white rounded-lg z-50 overflow-y-auto shadow-xl"
                            >
                                <div className="">
                                    <div className="flex justify-between items-center p-6">
                                        <p className="text-lg">Bildirimler</p>
                                        <div>
                                            {/*<Button text={'Tümünü Göster'} type={'secondary'}*/}
                                            {/*        onClick={() => setNotificationPopup(true)}/>*/}
                                            <Button type={"button"}
                                                    onClick={props.setNotificationPopup}/>
                                        </div>
                                    </div>
                                </div>
                                <SmallNotification shown/>
                                <SmallNotification/>
                                <SmallNotification/>
                                <SmallNotification shown/>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <Popup isOpen={props.open} onClose={props.onClose}>
                        <div className="w-full h-full flex flex-col divide-y">
                            <div className="h-44 w-full flex flex-col items-center justify-center">
                                <div className="w-full flex justify-between items-center p-6">
                                    <p className="text-lg">Bildirimler</p>
                                    <div>
                                        {/*<Button text={'Tümünü Okundu İşaretle'} type={'secondary'}*/}
                                        {/*        onClick={() => setNotificationPopup(true)}/>*/}
                                        <Button sx={{textTransform: "none"}} variant={"contained"}
                                                onClick={props.setNotificationPopup}>Tümünü Okundu
                                            İşaretle</Button>
                                    </div>
                                </div>
                            </div>
                            <BigNotification/>
                            <BigNotification shown/>
                            <BigNotification/>
                            <BigNotification shown/>
                            <BigNotification/>
                        </div>
                    </Popup>
                </div>

                <div className="w-full flex items-center">
                    {/*<div className={"w-full flex justify-center items-center"}>*/}
                    {/*    <SearchBar rounded={"full"} value={""} placeholder={"Ara"} svgIcon={Search}*/}
                    {/*               setSearchTerm={console.log}/>*/}
                    {/*</div>*/}
                    <div className={"w-full flex justify-end items-center"}>
                        <div className="relative">
                            <AnimatePresence>
                                {props.notificationDropdown && (
                                    <motion.div
                                        initial={{opacity: 0, y: -10}}
                                        animate={{opacity: 1, y: 0}}
                                        exit={{opacity: 0, y: -10}}
                                        transition={{duration: 0.3}}
                                        className="absolute top-16  divide-y w-[350px] max-h-[500px] bg-white rounded-lg z-50 overflow-y-auto shadow-xl"
                                    >
                                        <div className="">
                                            <div className="flex justify-between items-center p-6">
                                                <p className="text-lg">Bildirimler</p>
                                                <div>
                                                    {/*<Button text={'Tümünü Göster'} type={'secondary'}*/}
                                                    {/*        onClick={() => setNotificationPopup(true)}/>*/}
                                                    <Button type={"button"}
                                                            onClick={props.setNotificationPopup}/>
                                                </div>
                                            </div>
                                        </div>
                                        <SmallNotification shown/>
                                        <SmallNotification/>
                                        <SmallNotification/>
                                        <SmallNotification shown/>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <Popup isOpen={props.open} onClose={props.onClose}>
                                <div className="w-full h-full flex flex-col divide-y">
                                    <div className="h-44 w-full flex flex-col items-center justify-center">
                                        <div className="w-full flex justify-between items-center p-6">
                                            <p className="text-lg">Bildirimler</p>
                                            <div>
                                                {/*<Button text={'Tümünü Okundu İşaretle'} type={'secondary'}*/}
                                                {/*        onClick={() => setNotificationPopup(true)}/>*/}
                                                <Button variant={"contained"}
                                                        onClick={props.setNotificationPopup}>Tümünü Okundu
                                                    İşaretle</Button>
                                            </div>
                                        </div>
                                    </div>
                                    <BigNotification/>
                                    <BigNotification shown/>
                                    <BigNotification/>
                                    <BigNotification shown/>
                                    <BigNotification/>
                                </div>
                            </Popup>
                        </div>

                        <div className="ml-4 relative flex gap-2">
                            <div
                                className={"rotate-90 rounded-full bg-white w-[50px] h-[50px] flex items-center justify-center transition-all hover:scale-105"}
                                onClick={props.setDropdownVisible}
                            >
                                <NavbarInfo/>
                            </div>

                            {/* Dropdown içeriği */}
                            {props.dropdownVisible && (
                                <div
                                    className="absolute mt-20 z-50 p w-48 rounded-md shadow-lg"
                                    style={{left: "50%", transform: "translateX(-50%)"}}  // Burası değiştirildi
                                >
                                    <div className="rounded-md bg-white p-4 shadow-xs">
                                        <div className="py-1 flex flex-col gap-3">
                                            <div className={"w-full flex justify-center"}>
                                                <SearchBar rounded={"full"} value={""} placeholder={"Ara"}
                                                           svgIcon={Search}
                                                           setSearchTerm={console.log}/>
                                            </div>
                                            <Button
                                                variant={"contained"}
                                                style={{backgroundColor: "#F29E51", borderRadius: "20px"}}
                                                onClick={props.askThePresident}
                                            >
                                                Proje başvurusu yap
                                            </Button>
                                            <Link
                                                target={"_blank"}
                                                href={"https://www.kagithane.istanbul/baskan/baskana_mesaj/Baskana-Mesaj/24/0/0"}>
                                                <Button
                                                    fullWidth
                                                    variant={"contained"}
                                                    style={{backgroundColor: "#222D68", borderRadius: "20px"}}
                                                    onClick={props.applyForAProjectClick}
                                                >
                                                    Başkana Sor
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div
                            className={"transition-all hover:scale-105"}
                            onClick={props.setNotificationDropDown}>
                            <Notification className="ml-4 cursor-pointer"/>
                        </div>
                        <div className="relative flex items-center ml-4 gap-2 cursor-pointer"
                             onClick={props.setShowDropDown}>
                            <div className="flex items-center gap-4 w-full">
                                <div className={"transition-all hover:scale-105"} style={{minWidth: "48px"}}>
                                    <img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" alt=""
                                         className="h-12 w-12 rounded-full"/>
                                </div>
                            </div>
                            <div>
                                <ArrowDown/>
                            </div>
                            {props.showDropdown && (
                                <div
                                    className="absolute top-16 z-50 mt-4 bg-white border rounded-lg whitespace-nowrap shadow px-8 -translate-x-1/2">
                                    <ul className={""}>
                                        <div className={"flex items-center"}>
                                            <Profile/>
                                            <li className="p-2 cursor-pointer transition-all hover:scale-105">Profilim</li>
                                        </div>
                                        <div className={"flex items-center"}>
                                            <Play/>
                                            <li className="p-2 cursor-pointer transition-all hover:scale-105">Derslerim</li>
                                        </div>
                                        <div className={"flex items-center"}>
                                            <Calendar/>
                                            <li className="p-2 cursor-pointer transition-all hover:scale-105">Ders
                                                Takvimim
                                            </li>
                                        </div>
                                        {/*<div className={"flex items-center"}>*/}
                                        {/*    <ChartPie/>*/}
                                        {/*    <li className="p-2 cursor-pointer transition-all hover:scale-105">İstatistiklerim*/}
                                        {/*    </li>*/}
                                        {/*</div>*/}

                                        <div className={"flex items-center"}>
                                            <Certificate/>
                                            <li className="p-2 cursor-pointer transition-all hover:scale-105">Sertifikalarım</li>
                                        </div>
                                        <div className={"flex items-center"}>
                                            <Logout/>
                                            <li onClick={props.signOut}
                                                className="p-2 cursor-pointer transition-all hover:scale-105">Çıkış
                                                yap
                                            </li>
                                        </div>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
;
}

export default Login