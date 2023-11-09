import React, {useEffect, useState} from 'react';
import Lesson from "../../src/app/presentation/pages/StudentPages/Lesson";
import {useApi} from "../_app";
import {useRouter} from "next/router";
import {transformDataStudent} from "@/utils";
import {Education} from "@/interfaces";
import {getUserToken} from "@/api";

const Index = () => {
    const api = useApi()
    const router = useRouter()
    const [lesson, setLesson] = useState<Education>()

    const {query, isReady} = router;
    const id = query.id ? String(query.id) : '';


    useEffect(() => {
        if (isReady) {
            (async () => {
                const userToken = await getUserToken()
                const response = await api.getEducationWithStudent(id,userToken)
                setLesson(response)
                console.log(response)
                
            })()
        }
    }, [api, router])

    return (
        <>
            {lesson && <Lesson educationId={id} lesson={lesson}/>}
        </>
    );
};

export default Index;