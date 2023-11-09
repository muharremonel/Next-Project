import React, {useState} from 'react';
import {AnimatePresence, motion} from "framer-motion";
import {Button} from "@mui/material";
import {BigNotification, SmallNotification} from "@/app/presentation/components/Navbar/components/Notification";
import Popup from "@/app/presentation/components/PopUp";

const Notifications = () => {
    const [popup,setPopup] = useState(false)
    return (
        <div>
            <div className="relative">
                <AnimatePresence>

                        <motion.div
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -10}}
                            transition={{duration: 0.3}}
                            className="absolute divide-y w-[350px] max-h-[500px] bg-white rounded-lg z-50 shadow-xl"
                        >
                            <div className="">
                                <div className="flex justify-between items-center p-6">
                                    <p className="text-lg">Bildirimler</p>
                                    <div>
                                        {/*<Button text={'Tümünü Göster'} type={'secondary'}*/}
                                        {/*        onClick={() => setNotificationPopup(true)}/>*/}
                                        <Button type={"button"}
                                                onClick={()=>setPopup(true)}>Tümünü Göster</Button>
                                    </div>
                                </div>
                            </div>
                            <SmallNotification shown/>
                            <SmallNotification/>
                            <SmallNotification/>
                            <SmallNotification shown/>
                        </motion.div>

                </AnimatePresence>
                <Popup isOpen={popup} onClose={()=>setPopup(false)}>
                    <div className="w-full h-full flex flex-col divide-y overflow-auto">
                        <div className="h-44 w-full flex flex-col items-center justify-center">
                            <div className="w-full flex justify-between items-center p-6">
                                <p className="text-lg">Bildirimler</p>
                                <div>
                                    {/*<Button text={'Tümünü Okundu İşaretle'} type={'secondary'}*/}
                                    {/*        onClick={() => setNotificationPopup(true)}/>*/}
                                    <Button variant={"contained"}
                                            sx={{textTransform:"none"}}
                                            style={{backgroundColor:"#222D68"}}
                                            onClick={console.log}>Tümünü Okundu
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
        </div>
    );
};

export default Notifications;