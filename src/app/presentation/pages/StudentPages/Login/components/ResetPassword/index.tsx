import React, {useEffect, useState} from 'react';
import {Button, TextField} from "@mui/material";
import {toast} from "react-hot-toast";
import {useApi} from "../../../../../../../../pages/_app";
import ReactPhoneInput from "react-phone-input-material-ui";
import {ForgotPassword} from "@/interfaces";
import {Close} from "@/svgImports";

type PopupProps = {
    isOpen: boolean;
    onClose: () => void;
};

const ResetPassword: React.FC<PopupProps> = ({isOpen, onClose}) => {
    const [inputValue, setInputValue] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [counter, setCounter] = useState<number | null>(null);
    const api = useApi();
    const [isLoading, setIsLoading] = useState(false);



    useEffect(() => {
        if (counter !== null && counter > 0) {
            const timerId = setTimeout(() => {
                setCounter(prevCounter => (prevCounter !== null ? prevCounter - 1 : null));
            }, 1000);
            return () => clearTimeout(timerId); // Component unmount olduğunda timer'ı temizle
        } else if (counter === 0) {
            setIsLoading(false);
            setCounter(null);
        }
    }, [counter]);



    async function sendSmsCode(phoneNumber: string) {
        const formattedPhone = inputValue.startsWith('90') ? inputValue.substring(2) : inputValue;
        const response = await api.sendSms(formattedPhone);

        if (response?.status === "success") {
            toast.success(response?.message);
            setIsCodeSent(true);
        } else {
            toast.error(response?.message);
        }
    }


    // async function forgotPassword(data: ForgotPassword) {
    //     const response = await api.forgotPassword(data
    //         // phone: formattedPhone,
    //         // code: verificationCode,
    //         // newPassword: newPassword
    //     )
    //     if (response?.status === "success") {
    //         toast.success(response?.message);
    //     } else {
    //         toast.error(response?.message);
    //     }
    // }


    async function forgotPassword(data: ForgotPassword) {
        setIsLoading(true);

        const response = await api.forgotPassword(data);

        if (response?.status === "success") {
            toast.success(response?.message);
            setCounter(120);
            onClose()
        } else {
            toast.error(response?.message);
            setIsLoading(false);
        }
    }


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50 backdrop-blur" onClick={onClose}></div>
            <div
                className="relative bg-white p-6 rounded-lg w-full max-w-md md:w-96 shadow-lg transform transition-transform duration-300 focus:scale-105">
                <button onClick={onClose} className="absolute top-2 right-2"><Close/></button>
                <h2 className="mb-4 text-lg font-semibold">Şifre Sıfırlama</h2>

                {!isCodeSent ? (
                    <>
                        <p className="mb-4">Şifre sıfırlama kodu almak için telefon numaranızı giriniz.</p>
                        <ReactPhoneInput country={"tr"} component={TextField} label={"Telefon Numarası"}
                                         onChange={e => setInputValue(e)}
                                         value={inputValue}
                        />
                        <div className="w-full pt-2">
                            <Button onClick={() => sendSmsCode(inputValue)} variant={"contained"}
                                    sx={{textTransform: "none"}}
                                    style={{width: "100%", backgroundColor: "#222D68", borderRadius: "20px"}}>
                                Kodu Gönder
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="mb-4">Lütfen gönderilen doğrulama kodunu ve yeni şifrenizi giriniz.</p>
                        <div className={"w-full flex flex-col gap-2"}>
                            <TextField
                                type="text"
                                label="Doğrulama Kodu"
                                value={verificationCode}
                                onChange={e => setVerificationCode(e.target.value)}
                                fullWidth
                            />
                            <TextField
                                type="password"
                                label="Yeni Şifre"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                fullWidth
                            />
                        </div>
                        <div className="w-full pt-2">
                            <Button
                                onClick={() => forgotPassword({
                                    phone: inputValue.startsWith('90') ? inputValue.substring(2) : inputValue,
                                    code: verificationCode,
                                    newPassword: newPassword
                                })}
                                variant={"contained"}
                                sx={{textTransform: "none"}}
                                style={{width: "100%", backgroundColor: "#222D68", borderRadius: "20px",color:"#fff"}}
                                disabled={isLoading}
                            >
                                {isLoading ? `Lütfen Bekleyin... (${counter} s)` : 'Şifreyi Sıfırla'}
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;
