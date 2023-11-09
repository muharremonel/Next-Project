import { educationService, getUserToken, mentorService } from '@/api';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useApi } from '../../_app';
import * as mqtt from "mqtt";
import {topics} from '@/constants';
const Index = () => {
    const [educationInfo, setEducationInfo] = useState<any>()
    const [mentorInfo, setMentorInfo] = useState<any>()
    const router = useRouter()
    const api = useApi()
    
    const { roomId } = router.query
    
    useEffect(() => {
      if(router.isReady){
        const joinAndFetchData = async () => {
          const token = await getUserToken();
          
          await api.studentService.joinStream!(roomId, token);
          const education = await api.educationService.getEducation!(roomId);
          const mentor = await api.mentorService.getMentor!(education?.data?.mentors?.length ? education?.data?.mentors[0] : null);
          setEducationInfo(education.data);
          
          setMentorInfo(mentor);
          console.log(educationInfo)
           
            
        };
    
        const leaveStream = async () => {
            const token = await getUserToken();
            await api.studentService.leaveStream!(roomId, token);
        };
    
        const handleRouteChange = async () => {
            // if (!window.confirm("Emin misiniz? Bu sayfadan ayrılırsanız, canlı dersten çıkış yapmış olacaksınız.")) {
            //     router.events.emit('routeChangeError');
            //     throw 'Route change aborted.';
            // } else {
            //     await leaveStream();
            // }
        };
    
        const intervalId = setInterval(async () => {
            const token = await getUserToken();
            await api.studentService.heartBeat!(roomId, token);
        }, 5000);
    
        joinAndFetchData();
        
        // router.events.on('routeChangeStart', handleRouteChange);
    
        // return () => {
        //     clearInterval(intervalId);
        //     router.events.off('routeChangeStart', handleRouteChange);
        // };

        const client = mqtt.connect("wss://ee1d921d.ala.us-east-1.emqxsl.com:8084/mqtt", {
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
    
        client.on("error", function (error) {
          console.log(error);
        });

        client.on("message", (topic, message) => {
          console.log(
            `Received message: ${message.toString()} from topic: ${topic}`
          );
    
        //   console.log("mqtt message -> ",message.toString())
    
         
          if (topic === "startLesson") {
            
            // console.log(message.toString())
            // console.log(JSON.parse(message.toString()))
          //   isLessonStarted(message.toString())
          console.log("educationInfo",educationInfo)
          console.log("roomId",roomId)
          console.log("mesaj", message.toString())
            if(message.toString() === roomId){
              router.push("/ders-odasi/"+message.toString())
            }

           
            // router.push("ders-odasi/"+message.toString())
          }
          if (topic === "endLesson") {
            console.log("lesson is ended");
            // isLessonEnd(JSON.parse(message.toString()))
          }
         
    
        });
        }
    
    }, [api, roomId, router, setEducationInfo, setMentorInfo]);
    console.log(educationInfo)
    
    useEffect(() => {
       
    },[])

    return (
        <>
            <div className='flex h-screen flex-col justify-center content-center align-middle items-center flex-wrap'>
                <div className='text-[#5B5B5B]'>
                    {router && router.isReady && router.query.roomId&& educationInfo ? <p>{educationInfo.title}</p> : <></>}
                </div>
                <br />
                <div className='text-[#222222] font-bold'>
                    <p>Lütfen bekleyin, canlı ders başladığında derse bağlanacaksınız.</p>
                </div>
                <br />
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="57" height="24" viewBox="0 0 57 24" fill="none">
                        <path d="M36.629 20.9162C38.7603 22.835 41.5944 24 44.6882 24C51.3341 24 56.7273 18.6244 56.7273 12C56.7273 5.37564 51.3418 0 44.6882 0C41.5715 0 38.7298 1.1802 36.5908 3.12183C36.545 3.1599 36.4992 3.20559 36.4533 3.25127C34.3144 5.18528 31.4727 6.36548 28.3636 6.36548C25.2546 6.36548 22.4052 5.18528 20.2739 3.25127C20.2281 3.20559 20.1823 3.1599 20.1364 3.12183C17.9975 1.1802 15.1558 0 12.0391 0C5.39314 0 0 5.37564 0 12C0 18.6244 5.39314 24 12.0391 24C15.1405 24 17.9669 22.835 20.0982 20.9162C20.167 20.8553 20.2357 20.7944 20.3045 20.7259C22.4358 18.8071 25.2622 17.6421 28.3636 17.6421C31.4651 17.6421 34.2839 18.8071 36.4228 20.7259C36.4915 20.7944 36.5603 20.8553 36.629 20.9162Z" fill="#222D68" />
                    </svg>
                </div>
            </div>
            <br />
            <div className='flex flex-col justify-center  content-center items-center flex-wrap text-[#222D68] '>
                <p className='underline cursor-pointer'>Dersten Çık</p>
            </div>
        </>
    );
};

export default Index;