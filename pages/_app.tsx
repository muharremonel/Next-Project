import React, {createContext, useContext, useEffect, useState} from 'react';
import '../src/app/globals.css'
import Layout from "@/layout";
import {Toaster} from "react-hot-toast";
import {
    getInfos,
    registerStudent,
    forgotPassword,
    smsVerification,
    getAuth,
    sendSms,
    login,
    slider,
    // unloginSlider,
    categories,
    getUser,
    joinCourse,
    createEducation,
    getEducations,
    getEducation,
    toggleFavorites,
    getEducationWithStudent,
    educationQuestion,
    educationAnswer,
    getVideo
} from "@/api";
import {useRouter} from "next/router";
import {
    studentService,
    educationService,
    mentorService,
    StudentService,
    EducationService,
    MentorService,
    UtilsService,
    utilsService
} from "@/api"
import RouteGuard from "@/RoutingGuard";
// import useMqttListener from '@/mqttListener';
import {topics} from '@/constants';
import useMqttListener from '@/mqttListener';

interface ApiContextProps {
    getInfos: Function
    registerStudent: Function
    smsVerification: Function
    login: Function
    slider: Function
    // unloginSlider:Function
    categories: Function
    getAuth: Function
    getUser: Function
    sendSms: Function
    studentService: Partial<StudentService>
    educationService: Partial<EducationService>
    mentorService: Partial<MentorService>
    utilsService: Partial<UtilsService>
    forgotPassword: Function
    joinCourse: Function
    createEducation: Function
    getEducations: Function
    toggleFavorites: Function
    getEducation: Function
    getEducationWithStudent: Function
    educationQuestion: Function
    educationAnswer: Function
    getVideo:Function


}

const ApiContext = createContext<ApiContextProps | undefined>(undefined);


export const useApi = (): ApiContextProps => {
    const value = useContext(ApiContext);
    if (!value) {
        throw new Error("useApi must be used within an ApiContextProvider");
    }
    return value;
};


const App = ({Component}: any) => {
    const router = useRouter();
    const {isReady} = router
    const [streamingEducations, setStreamingEducations] = useState<string[]>([])
    const [isMyLessonStart, setIsMyLessonStart] = useState<any>(false)
    const [isMyLessonEnd, setIsMyLessonEnd] = useState<any>(false)
    const [amIGetOut, setAmIGetOt] = useState<any>(false)

    const [redirected, setRedirected] = useState(false);

    useEffect(() => {
        (async () => {
            const login = (await getAuth() as any)?.status === 'success'

            if (login && router.pathname === '/giris') {
                router.push('/anasayfa')
            }


            if (login && router.pathname === '/kayitol') {
                // setRedirected(true);
                router.push('/anasayfa');
            } else if (!login && router.pathname !== '/kayitol' && !redirected) {
                setRedirected(true);
                // router.push('/kayitol#verification');
            }
        })()
    }, [router, redirected]);

    // useMqttListener(topics,
    //     // (data) => { setStreamingEducations(data) },
    //     // (data) => { setIsMyLessonStart(data) },
    //     // (data) => { setIsMyLessonEnd(data) },
    //     // (data) => { setAmIGetOt(data) }
    //     );
    return (
        <ApiContext.Provider
            value={{
                forgotPassword,
                sendSms,
                getUser,
                getInfos,
                registerStudent,
                smsVerification,
                login,
                slider,
                // unloginSlider,
                categories,
                getAuth,
                utilsService,
                mentorService,
                studentService,
                educationService,
                joinCourse,
                createEducation,
                getEducations,
                getEducation,
                toggleFavorites,
                getEducationWithStudent,
                educationQuestion,
                educationAnswer,
                getVideo
            }}>
            <RouteGuard>
                <Toaster
                    toastOptions={{
                        className: "",
                        duration: 3000,
                        style: {
                            color: "#000",
                            minWidth: "300px",
                            minHeight: "80px",
                        },
                        position: "bottom-right",
                        success: {
                            style: {
                                borderLeft: "5px solid lightgreen",
                            },
                        },
                        error: {
                            style: {
                                borderLeft: "5px solid red",
                            },
                        },
                    }}
                />
                <Layout streamingEducations={streamingEducations} isMyLessonStart={isMyLessonStart}>
                    <Component />
                </Layout>
            </RouteGuard>
        </ApiContext.Provider>
    );
};

export default App;