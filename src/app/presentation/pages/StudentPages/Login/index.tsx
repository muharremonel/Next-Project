import React, { useEffect, useState } from 'react';
import { Button, Input, SuccessfullySign } from "@/app/presentation/components";
import { useApi } from "../../../../../../pages/_app";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Popup from '@/app/presentation/components/PopUp';
import Link from "next/link";
import ReactPhoneInput from 'react-phone-input-material-ui';
import { TextField } from "@mui/material";
import ResetPassword from "@/app/presentation/pages/StudentPages/Login/components/ResetPassword";


const Index = () => {

    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [successfulPopUp, setSuccessfulPopUp] = useState(false)
    const api = useApi()
    const router = useRouter()
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const onLoginAttempt = async (e: any) => {
        e.preventDefault();

        const formattedPhone = phone.startsWith('90') ? phone.substring(2) : phone;
        const response = await api.login({ loginField: formattedPhone, password });

        if (response.token) {
            localStorage.setItem('digitUser', response.token);
            localStorage.setItem('userPhone',formattedPhone)
        }

        if (response.status === "success") {
            toast.success(response.message);
            setSuccessfulPopUp(true)
            setTimeout(() => router.push('/anasayfa'), 3000);
        } else {
            toast.error(response.message);
            console.log(response)
            if(response && response.code && response.code === 21){
                console.log("telefon numarası doğrulanmamış")
            }
            console.log("giriş kontrol")
        }
    }

    return (
        <div className={"w-full h-full flex justify-center items-center"}>
            <div
                className="bg-white w-full sm:w-2/3 md:w-1/3 h-max shadow-2xl rounded-2xl p-4 sm:p-8 md:p-14 flex flex-col gap-8">
                <div className={"text-2xl text-primary font-bold"}>
                    Giriş Yap
                </div>
                <form className='flex flex-col gap-6' onSubmit={onLoginAttempt}>
                    <div>
                        <ReactPhoneInput label={"Telefon"} inputStyle={{ borderRadius: "20px" }} country={"tr"}
                            component={TextField}
                            value={phone} onChange={setPhone} />
                    </div>
                    <div>
                        <TextField label={"Şifre"} fullWidth variant={"outlined"} value={password} type={"password"}
                            name={"password"} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div onClick={() => setIsPopupOpen(true)}
                        className={"w-full flex justify-end text-primary cursor-pointer underline transition-all hover:scale-105"}>
                        Şifremi Unuttum
                    </div>
                    <div>
                        <Button type={"primary"} text={"Giriş Yap"} onClick={onLoginAttempt} />
                    </div>
                </form>
                <div className={"flex justify-center gap-2 text-primary "}>
                    <div>
                        Hesabınız yok mu?
                    </div>
                    <Link href={"/kayitol"}>
                        <div className={"cursor-pointer font-semibold transition-all hover:scale-125"}>
                            Kayıt olun
                        </div>
                    </Link>
                </div>
                <Popup isOpen={successfulPopUp} onClose={() => setSuccessfulPopUp(false)}>
                    <SuccessfullySign />
                </Popup>
                <ResetPassword onClose={() => setIsPopupOpen(false)} isOpen={isPopupOpen} />
            </div>
        </div>
    );
};

export default Index;