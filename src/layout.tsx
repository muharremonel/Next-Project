import React, { useEffect, useState } from 'react';
import { LessonNotification, Navbar } from "@/app/presentation/components";
import { MAX_LAYOUT_WIDTH } from "@/constants";
import { getAuth, getUserToken } from "@/api";
import { useRouter } from "next/router";
import UnLoginTopBar from "@/app/presentation/components/UnLoginTopBar";
import { useApi } from "../pages/_app";
import TopBar from '@/app/presentation/components/TopBar';
import LiveLessonNotification from './app/presentation/components/LiveLessonNotification';
import * as mqtt from "mqtt";
import { topics } from '@/constants';
type LayoutProps = {
    children: React.ReactNode;
    streamingEducations: string[];
    isMyLessonStart: any;
}
const Layout = ({ children, streamingEducations, isMyLessonStart }: LayoutProps) => {
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [user, setUser] = useState<any>({})

    const router = useRouter();
    const api = useApi()
    const [streamings, setStreamings] = useState([])
    const [isHeaderVisible, setIsHeaderVisible] = useState(false)
    const [startedEduId, setStartedEduId] = useState<string>()
    const { roomId } = router.query
    let client:any
    const [lessonId, setLessonId] = useState<any>(isMyLessonStart)
    useEffect(() => {
        (async () => {
            const login = (await getAuth() as any)?.status === 'success'
            // const token = await getUserToken();
            // console.log(token)
            // let test = await getAuth()

            if (login) {
                setIsLogin(true);
            } else {
                setIsLogin(false)
            }
        })()


    }, [router]);

    useEffect(() => {
        if (router.route === "/ders-odasi/[roomId]" || router.route === "/kayitli-ders-odasi/[lessonId]" || router.route === "/bekleme-odasi/[roomId]") {
            setIsHeaderVisible(false)
            // console.log("burada değilim")
        }
    })

    useEffect(() => {
        (async () => {
            const userData = (await api.getUser() as any)?.data
            if (userData) {
                const response = await api.studentService.getStreamingsForStudent!()
                setStreamings(response.data)
                setUser(userData);

                // console.log("user: ", user)
            }
        })()
    }, [api, streamingEducations])

    useEffect(() => {
    if (router.isReady) {
        console.log("user: ", user)
        
        if (router.route === "/ders-odasi/[roomId]" || router.route === "/kayitli-ders-odasi/[lessonId]" || router.route === "/bekleme-odasi/[roomId]") {
            setIsHeaderVisible(false)
            console.log("burada değilim")
        }else{
            console.log("header kontrol")
            headerControl()
        }
    }
    }, [])

    const headerControl = () => {
        client = mqtt.connect("wss://ee1d921d.ala.us-east-1.emqxsl.com:8084/mqtt", {
            clean: true,
            connectTimeout: 4000,
            // Authentication
            // clientId: 'mqttx_49da1c97',
            username: "digithaneMqttUser",
            password: "]Q}DrCkbr^mSSfu8Oo!rGob;,-JJ;S6v5h9a65XI3q%s]ze=(u",
            reconnectPeriod: 5000,
        });

        client.on("connect", () => {
            console.log("Connected to start lesson on MQTT Broker");
            topics.forEach((topic) => {
                // console.log("connectedTopics -> ", topic);
                client.subscribe(topic, { qos: 1 });
            });
        });

        client.on("error", function (error:any) {
            console.log(error);
        });

        client.on("message", async (topic:any, message:any) => {
            // setStartedEduId(`${message.toString()}`)
            
            console.log(
                `Received message: ${message.toString()} from topic: ${topic} layout`
            );

        


            if (topic === "startLesson") {
                // console.log("user:", user)
                const userData = (await api.getUser() as any)?.data
                // console.log("userData",userData)
                // console.log(message.toString(), "AAAAAA")
                // console.log("11111 -> ",userData.student.educations.some((edu:any) => edu.educationId === message.toString()))
                if(userData && userData.student && userData.student.educations.some((edu:any) => edu.educationId === message.toString())){
                    let eduId:any = userData.student.educations.find((edu:any) => edu.educationId === message.toString())
                    // console.log(eduId)
                    setStartedEduId(eduId.educationId)
                    setIsHeaderVisible(true)
                }

                // console.log(message.toString())
                // console.log(JSON.parse(message.toString()))
                //   isLessonStarted(message.toString())
                //TODO otomatik yönlendirme yapılacaksa bunu aktif et
                //   if(message.toString() === roomId){
                //     router.push("ders-odasi/"+message.toString())
                //   }


                // router.push("ders-odasi/"+message.toString())
            }
            if (topic === "endLesson") {
                const userData = (await api.getUser() as any)?.data
                // console.log("userData",userData)
                // console.log(message.toString(), "AAAAAA")
                // console.log("11111 -> ",userData.student.educations.some((edu:any) => edu.educationId === message.toString()))
                if(userData && userData.student && userData.student.educations.some((edu:any) => edu.educationId === message.toString())){
                    setIsHeaderVisible(false)
                }
                console.log("lesson is ended");
                // isLessonEnd(JSON.parse(message.toString()))
            }


        });
    }

    useEffect(() => {
        // const client = mqtt.connect("wss://ee1d921d.ala.us-east-1.emqxsl.com:8084/mqtt", {
        //     clean: true,
        //     connectTimeout: 4000,
        //     // Authentication
        //     // clientId: 'mqttx_49da1c97',
        //     username: "digithaneMqttUser",
        //     password: "]Q}DrCkbr^mSSfu8Oo!rGob;,-JJ;S6v5h9a65XI3q%s]ze=(u",
        //     reconnectPeriod: 5000,
        // });

        // client.on("connect", () => {
        //     console.log("Connected to start lesson on MQTT Broker");
        //     topics.forEach((topic) => {
        //         // console.log("connectedTopics -> ", topic);
        //         client.subscribe(topic, { qos: 1 });
        //     });
        // });

        // client.on("error", function (error) {
        //     console.log(error);
        // });

        // client.on("message", (topic, message) => {
        //     // setStartedEduId(`${message.toString()}`)
        //     setIsHeaderVisible(true)
        //     console.log(
        //         `Received message: ${message.toString()} from topic: ${topic} layout`
        //     );

        //     //    else {

        //     //             console.log("SOMEEEEEE ------> ", user.student.educations.some((edu: any) => edu.educationId === `${message.toString()}`))
        //     //             if (user && !user.mentor && user.student &&  user.student.educations.some((edu: any) => edu.educationId === `${message.toString()}`)) {
        //     //                     setIsHeaderVisible(true)
        //     //                 } else {
        //     //                     console.log("user else: ",user)
        //     //                     setIsHeaderVisible(false)
        //     //                 }

        //     //             console.log("buradayım")

        //     //         }
        //     //     }

        //     //   console.log("mqtt message -> ",message.toString())


        //     if (topic === "startLesson") {

        //         // console.log(message.toString())
        //         // console.log(JSON.parse(message.toString()))
        //         //   isLessonStarted(message.toString())
        //         //TODO otomatik yönlendirme yapılacaksa bunu aktif et
        //         //   if(message.toString() === roomId){
        //         //     router.push("ders-odasi/"+message.toString())
        //         //   }


        //         // router.push("ders-odasi/"+message.toString())
        //     }
        //     if (topic === "endLesson") {
        //         console.log("lesson is ended");
        //         // isLessonEnd(JSON.parse(message.toString()))
        //     }


        // });
    }, [api, user])


    return (
        <div className={'relative min-h-screen w-screen'}>
            <div className={'h-[104px] w-auto z-50 sticky top-0'}>
                {isLogin ?
                    <div className={"flex flex-col"}>
                        <TopBar userData={{
                            gender: undefined,
                            picture: undefined
                        }} />
                        {/* {isMyLessonStart ? <LessonNotification stream={true} eduId={JSON.parse(isMyLessonStart)} /> : null} */}
                        {isHeaderVisible && <LiveLessonNotification stream={true} eduId={{ lessonId: startedEduId }} />}
                        {isHeaderVisible && <LessonNotification stream={false} eduId={{ lessonId: startedEduId }} />}
                        { }
                    </div>
                    :
                    <UnLoginTopBar />}
            </div>
            <div
                className='animate-fade flex min-h-screen w-full justify-center'>
                <div style={{ maxWidth: `${MAX_LAYOUT_WIDTH}px` }} className={'relative w-full  mx-auto'}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;