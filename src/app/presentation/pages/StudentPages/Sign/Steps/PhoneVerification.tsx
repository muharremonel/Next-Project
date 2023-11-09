import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import { Button, SuccessfullySign } from "@/app/presentation/components";
import Popup from "@/app/presentation/components/PopUp";
import OtpInput from 'react-otp-input';
type PhoneVerificationProps = {
    onVerification: any
    phone: string
    sendSmsOnClick: any
    successFullyPopUpController: any
    setSuccessFullyPopupController: any
}

const PhoneVerification = ({
    setSuccessFullyPopupController,
    successFullyPopUpController,
    onVerification,
    phone,
    sendSmsOnClick
}: PhoneVerificationProps) => {

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [verificationCode, setVerificationCode] = useState<string>();
    const [remainingTime, setRemainingTime] = useState<number>(0);
    const [otp, setOtp] = useState<string>('');

    // const handleChange = (index: number, value: string) => {
    //     // ... (existing code here)
    //     let code = Object.assign([], verificationCode, { [index]: value });
    //     console.log("verificationCode -> ", verificationCode)

    //     setVerificationCode(code)
    // };

    useEffect(() => {
        // ... (existing code here)
    }, []);

    useEffect(() => {
        if (remainingTime <= 0) return;

        const timerId = setTimeout(() => {
            setRemainingTime((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearTimeout(timerId);
    }, [remainingTime]);

    const handleSendSMS = () => {
        sendSmsOnClick(phone);
        setRemainingTime(120);
    };

    return (
        <div className={"w-full h-full flex justify-center items-center"}>
            <div className="h-max flex flex-col w-full max-w-md">
                <div className="bg-white p-4 sm:p-8 rounded-xl shadow-2xl">
                    <h1 className="text-xl sm:text-2xl font-bold text-primary pb-4 sm:pb-4 text-center">SMS Doğrulama</h1>
                    <p className="text-center mb-4">{phone} nolu telefon numarasına gelen doğrulama kodunu giriniz.</p>
                    <div className="flex items-center justify-center mb-4">
                        <OtpInput
                            value={verificationCode}
                            onChange={setVerificationCode}
                            numInputs={4}
                            renderSeparator={<span className='p-2'> - </span>}
                            inputStyle={{width:"5rem",height:"5rem",border:"1px solid", fontSize:"3rem",borderRadius:"10px", padding:"10px"}}
                            renderInput={(props) => <input {...props} />}
                        />

                    </div>
                    <div>
                        <Button
                            type={"primary"}
                            text={"Devam Et"}
                            onClick={() => {
                                onVerification(verificationCode);
                            }}
                        />
                    </div>
                    <p
                        className={`text-blue-500 underline text-center cursor-pointer pt-4 sm:pt-6 ${remainingTime > 0 ? 'opacity-50' : ''}`}
                        onClick={remainingTime > 0 ? undefined : handleSendSMS}
                    >
                        {remainingTime > 0 ? `Kodu ${remainingTime} saniye sonra tekrar gönder` : "Kodu Tekrar Gönder"}
                    </p>
                </div>
                <Popup isOpen={successFullyPopUpController} onClose={() => setSuccessFullyPopupController(false)}>
                    <SuccessfullySign sign />
                </Popup>
            </div>
        </div>
    );
};

export default PhoneVerification;
