import React, {useState, ChangeEvent, useEffect} from 'react';
import {useApi} from '../../../../../../pages/_app';
import Stepper from "@/app/presentation/pages/StudentPages/Sign/components/Stepper";
import SignUp from "@/app/presentation/pages/StudentPages/Sign/Steps/SignUp";
import Layout from "@/app/presentation/pages/StudentPages/Sign/layout";
import PhoneVerification from "@/app/presentation/pages/StudentPages/Sign/Steps/PhoneVerification";
import {useRouter} from "next/router";
import {toast} from "react-hot-toast";

type FormData = {
    [key: string]: string;
};

const Sign = () => {
        const api = useApi();
        const [step, setStep] = useState(0);
        const [phone, setPhone] = useState('')
        const [successfulPopUp, setSuccessfulPopUp] = useState(false)
        const [isLoading, setIsLoading] = useState(false)
        const [city,setCity] = useState()
        const [town,setTown] = useState()
        const [district,setDistrict] = useState()


        const router = useRouter();
        useEffect(() => {
            if (router.asPath.includes("#verification")) setStep(1);
        }, [])


        const onSave = async (formData: any) => {
            setIsLoading(true);
            try {
                const response = await api.registerStudent(formData,city,town,district);
        
                if (response.status === "success") {
                    toast.success(response.message);
                    setStep(prevStep => prevStep + 1); // Step değerini 1 arttır
                } else if (response.status === "error") {
                    setIsLoading(false)
                    if (Array.isArray(response.message)) {
                        response.message.forEach((err: any) => {
                            toast.error(err.msg);
                        });
                    } else {
                        toast.error(response.message);
                    }
                }
            } catch (error) {
                toast.error("Bir hata meydana geldi!"); // veya daha detaylı bir mesaj
            } finally {
                setIsLoading(false);
            }
        }
        
        
        

        const [userAddress, setUserAddress] = useState('')

        async function getUserInfos(tck: string, birthday: string) {
            const response = await api.getInfos(tck, birthday);
            const userData = response.baseAdresDtoList?.length ? response.baseAdresDtoList[0] : []
            if (userData.length === 0) {
                toast.error('Kullanıcı kağıthane sınırları içerisinde yaşamıyor!')
            }
            setCity(userData.ilAdi)
            setTown(userData.ilceAdi)
            setDistrict(userData.mahalleAdi)
            const apartmentOrSite = userData.length != 0 ?
                userData.binaAdi ? `${userData.mahalleAdi} mahallesi ${userData.sokakAdi} sokak ${userData.binaAdi ? userData.binaAdi + " bina" : ''}  daire ${userData.daire} kapı no ${userData.kapi}`.toLowerCase()
                    : `${userData.mahalleAdi} mahallesi ${userData.sokakAdi} sokak ${userData.blok ? userData.blok + " blok" : ''} daire ${userData.daire} kapı no ${userData.kapi}`.toLowerCase() : ''

            // apartmentOrSite'nin her kelimesinin ilk harfini büyük yapma
            const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
            const formattedAddress = apartmentOrSite.split(' ').map(capitalize).join(' ');

            setUserAddress(formattedAddress);
        }


        async function smsVerification(code: string) {
            const response = await api.smsVerification(code, phone);


            if (response.status == "success") {
                setSuccessfulPopUp(true)
                setTimeout(() => router.push('/anasayfa'), 3000);
            }

            if (response.token) {
                localStorage.setItem('digitUser', response.token);
                toast.success(response.message); // Başarılı olduğunda gösterilecek mesaj

                // Redirect to the homepage
                router.push("/anasayfa"); // Replace "/" with the actual URL of your homepage
            } else {
                toast.error(response.message || 'Verification failed!'); // Başarısız olduğunda veya hata alındığında gösterilecek mesaj
            }
        }

        async function sendSmsCodeRetry(phoneNumber: string) {
            const response = await api.sendSms(phoneNumber)

            if (response.status === "success") {
                toast.success(response.message)
            } else
                toast.success(response.message)

        }


        const steps = [
            <Layout key={"123"}>
                <SignUp
                    onChange={(key: string, value: string, formData) => () => {
                    }}
                    onInputsFilledCorrectly={async ({tck, birthday}) => await getUserInfos(tck, birthday)}
                    onSave={onSave}
                    phoneFiller={(phone: string) => setPhone(phone)}
                    address={userAddress}
                    isLoading={isLoading}
                    // onProceed={() => setStep(1)}

                />
            </Layout>
            ,
            <Layout key={"321"}>
                <PhoneVerification successFullyPopUpController={successfulPopUp}
                                   setSuccessFullyPopupController={setSuccessfulPopUp} phone={phone}
                                   onVerification={smsVerification} sendSmsOnClick={sendSmsCodeRetry}/>
            </Layout>
        ]


        return (
            <div className={"w-full h-full"}>
                <Stepper steps={steps} onNextStep={(nextIndex) => setStep(nextIndex)} stepIndex={step}></Stepper>
            </div>
        );
    }
;

export default Sign;
