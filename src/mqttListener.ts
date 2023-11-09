import { useEffect } from "react";
import * as mqtt from "mqtt";
import { useRouter } from "next/router";

function useMqttListener(
  topics: string[],
  onStreamingEducationsUpdate: (data: any[]) => void,
  // isLessonStarted: (data: any) => void,
  isStudentGetOut: (data: any) => void,
  isLessonEnd: (data: any) => void,
//   isStudentListChangedInLesson: (data: any[]) => void
) {
  const router = useRouter();
  useEffect(() => {
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
      console.log("Connected to MQTT Broker");
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

      if (topic === "streamingEducationsUpdate") {
        onStreamingEducationsUpdate(JSON.parse(message.toString()));
      }
      if (topic === "startLesson") {
        console.log("lesson started");
        // console.log(message.toString())
        // console.log(JSON.parse(message.toString()))
        // isLessonStarted(message.toString())
       
        // router.push("ders-odasi/"+message.toString())
      }
      if (topic === "endLesson") {
        console.log("lesson is ended");
        // isLessonEnd(JSON.parse(message.toString()))
      }
      if (topic === "getOut") {
        console.log("'123123123' -> student is forced to leave lesson");
        // isStudentGetOut(JSON.parse(message.toString()))
      }

    });

    return () => {
      topics.forEach((topic) => {
        client.unsubscribe(topic);
      });
      client.end();
    };
  }, [topics, onStreamingEducationsUpdate]);
}

export default useMqttListener;
