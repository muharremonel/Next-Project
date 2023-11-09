import React, {useEffect, useState} from 'react';
import Categories from "@/app/presentation/pages/StudentPages/Home/components/Categories";
import Propositions from "@/app/presentation/pages/StudentPages/Home/components/Propositons";
import {useApi} from "../../../../../../pages/_app";
import {Footer, PresidentBanner} from "@/app/presentation/components";
import MobileFooter from "@/app/presentation/components/Footer/MobileFooter";
import SwiperComponent from "@/app/presentation/pages/StudentPages/Home/components/Slider";
import Popup from '@/app/presentation/components/PopUp';
import Loading from '@/app/presentation/components/Loading';
import { getAuth } from '@/api';
import router from 'next/router';
import UnloginSwiper from './components/UnloginSwiper';
interface EducationCardData {
    _id: string;
    title: string;
    viewCount: string;
    image: string;
    category: string;
    averageRating: number;
    isFollowing: boolean;
}

const Home = () => {
    const api = useApi();
    const [slider, setSlider] = useState(null);
    const [categories, setCategories] = useState(null);
    const [isMobile, setIsMobile] = useState(false);  // Step 1
    const [educations, setEducations] = useState<EducationCardData[]>([]);
    const [isLogin, setIsLogin] = useState<boolean>(false);
    useEffect(() => {
        (async () => {
            const response = await api.slider();
            const categoriesResponse = await api.categories();
            setSlider(response);
            setCategories(categoriesResponse.data);
        })();
    }, []);

    // Step 2
    useEffect(() => {
        // Client-side only code
        const handleResize = () => {
            if (window.innerWidth <= 768) {  // 768 is typically the breakpoint for mobile devices
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        // Initial check
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        (async () => {
            const response = await api.getEducations()
            
            setEducations(response.data)
        })()
    }, [])
    // console.log(educations)

    useEffect(() => {
        (async () => {
            const login = (await getAuth() as any)?.status === 'success'

            if (login) {
                setIsLogin(true);
            } else {
                setIsLogin(false)
            }
        })()

        
    }, [router]);

    return (
        <div className='w-full h-full py-4'>
            <div className={"h-max w-full flex flex-col gap-16 overflow-auto md:px-0"}>
                {isLogin ? <SwiperComponent images={slider}/> : <UnloginSwiper images={slider}/>}
                <Categories cards={categories}/>
                {/*<Propositions PropositionCards={FakePropositions} title={"En Çok İzlenen Eğitimler"}*/}
                {/*              moreButtonOnClick={console.log}/>*/}
                <Propositions EducationCardsData={educations} title={"En Yeni Eğitimler"}
                              moreButtonOnClick={console.log}/>
                <div className={"flex flex-col w-full gap-1 md:mt-4 mt-4"}>
                    <PresidentBanner mobile={isMobile}/>
                    {/* Step 3 */}
                    {isMobile ? <MobileFooter/> : <Footer/>}
                </div>
            </div>
            {<Popup noBackground isOpen={!(slider && categories)} onClose={() => {
            }}><Loading/></Popup>}
        </div>
    );
};
export default Home