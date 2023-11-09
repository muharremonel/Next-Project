import React, {useEffect, useState} from 'react';
import {Chip, Rating, Tab, Tabs, Typography} from "@mui/material";
import {Group} from "@/svgImports";
import {Box} from "@mui/system";
import Explanation from "@/app/presentation/pages/StudentPages/Lesson/components/Explanation";
import Curriculum from "@/app/presentation/pages/StudentPages/Lesson/components/Curriculum/index";
import Resources from "@/app/presentation/pages/StudentPages/Lesson/components/Resources";
import Questions from "@/app/presentation/pages/StudentPages/Lesson/components/Questions";
import StudentStatusCard from "@/app/presentation/pages/StudentPages/Lesson/components/StudentStatusCard";
import InstructorsCard from "@/app/presentation/pages/StudentPages/Lesson/components/InstructorsCard";
import {Education} from "@/interfaces";
import {BASE_URL} from "@/config";
import RatingComponent from "@/app/presentation/pages/StudentPages/Lesson/components/RatingComponent";
import {getUser, mentorService} from "@/api";
import {useApi} from "../../../../../../pages/_app";
import {useRouter} from 'next/router';
import {toast} from "react-hot-toast";


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
    const {children, value, index, ...other} = props;
    return (
        <div
            key={index}
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

type LessonProps = {
    lesson: any
    educationId: string
}

const Lesson = ({lesson, educationId}: LessonProps) => {
    const [value, setValue] = React.useState(0);
    const [userEducationRating, setUserEducationRating] = useState<number>(0)
    const [questions, setQuestions] = useState<any[]>()
    const [user, setUser] = useState("")
    const [userName, setUserName] = useState("")
    // console.log("lesson", lesson)
    const api = useApi()

    const router = useRouter()
    const {query} = router
    const id = query.id ? String(query.id) : ''
    const [mentorInfo, setMentorInfo] = useState<any>()
    const [userType, setUserType] = useState("")

    const [pageReRender, setPageReRender] = useState(0)

    console.log("ders sayfası lesson -> ", lesson)

    useEffect(() => {
        if (router.isReady) {
            (async () => {
                console.log("ders sayfası lesson data ->  ",lesson.data)
                const mentor = await mentorService.getMentor!(lesson?.data?.mentors?.length ? lesson.data?.mentors[0] : null)
                if(mentor.status === "success"){
                    setMentorInfo(mentor)
                }
            })()
        }
    }, [])

    const fakeResources: any[] = [
        {
            title: "Ders Notları 1",
            uploadDate: new Date(2023, 6, 10), // YYYY, MM (0-based, 0=January, 1=February, etc.), DD
            fileSize: "1.5MB",
            href: "#",
        },
        {
            title: "Ders Notları 2",
            uploadDate: new Date(2023, 6, 15),
            fileSize: "2MB",
            href: "#",
        },
        {
            title: "Örnek Proje",
            uploadDate: new Date(2023, 6, 20),
            fileSize: "5MB",
            href: "#",
        },
        {
            title: "Özet Notları",
            uploadDate: new Date(2023, 6, 25),
            fileSize: "1MB",
            href: "#",
        },
    ];


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const findUserEduRating = async () => {
        const user = await getUser()
        const studentEdu = lesson.data.rating.find((item: any) => user?.data?.student?._id === item.studentId)
        setUserEducationRating(studentEdu?.rate)
        // console.log(user)
    }
    useEffect(() => {
        (async () => {
            await findUserEduRating()
        })()
    }, [])

    const askQuestionOnClick = async (question: string) => {
        const response = await api.educationQuestion(id, question)
        if (response.status === "success") {
            setPageReRender((prev) => prev + 2)
            toast.success(response.message)
        } else
            toast.error(response.message)
    }
    const handleAnswerOnClick = async (answer: string, questionId: string) => {
        const response = await api.educationAnswer(id, answer, questionId)
        if (response.status === "success") {
            toast.success(response.message)
            setPageReRender((prev) => prev + 1)
        } else
            toast.error(response.message)
    }


    useEffect(() => {
        (async () => {
            const response = await api.educationService.getQuestions!(id)
            const user = await api.getUser()
            setQuestions(response.data)
            setUser(user)
            setUserName(`${user?.data?.firstname} ${user?.data?.lastname} `)
            setUserType(user?.data?.type)
        })()
    }, [pageReRender])



    return (
        <div className={"w-full h-max flex flex-col md:flex-row gap-8 p-4 md:p-10"}>
            <div className={"w-full md:w-3/4 h-full rounded-lg shadow-2xl mb-4 md:mb-0"}>

                <div className={"w-full md:h-2/6 flex flex-col md:flex-row p-4 md:p-10 gap-4 md:gap-10"}>
                    <div className={"w-full md:w-2/6 h-[200px] overflow-hidden rounded-lg mb-4 md:mb-0"}>
                        <img src={`${BASE_URL}${lesson.data?.image}`}
                             alt="lesson thumbnail"/>
                    </div>
                    <div className={"w-full md:w-4/6 h-full flex flex-col justify-between"}>
                        <div className={"text-xl w-full font-bold"}>{lesson.data?.title}
                        </div>

                        <div className={"flex justify-between items-center mb-2"}>
                            <div className={"flex gap-4 font-light"}>
                                <div className={"flex gap-2 items-center"}>
                                    <Group/>
                                    <div>1</div>
                                </div>
                                <div>13s 30dk</div>
                            </div>
                            <Rating name="read-only" value={lesson.data.averageRating} readOnly/>
                        </div>
                        {/*</div>*/}
                        <div className={"w-full h-full flex items-end"}>
                            <Chip label="Temel Seviye"/>
                        </div>
                    </div>
                </div>

                <div className={"w-full h-max"}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab label="Açıklama" {...a11yProps(0)} />
                        <Tab label="Müfredat" {...a11yProps(1)} />
                        <Tab label="Kaynaklar" {...a11yProps(2)} />
                        <Tab label="Soru&Cevap" {...a11yProps(3)} />
                        <Tab label="Puanla" {...a11yProps(4)} />
                    </Tabs>


                    <CustomTabPanel value={value} index={0}>
                        <Explanation explanations={lesson.data?.description}/>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Curriculum curriculum={lesson.data} educationId={educationId} isFollowing={lesson.status === "success"}/>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <Resources resources={fakeResources} lesson={lesson.data.resources}/>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={3}>
                        <Questions
                            isMentor={userType}
                            questions={questions}
                            studentAvatar="https://randomuser.me/api/portraits/men/75.jpg"
                            studentName={userName}
                            teacherAvatar="https://randomuser.me/api/portraits/women/65.jpg"
                            teacherName="Elif Doğan"
                            lesson={lesson.data}
                            onClickQuestion={askQuestionOnClick}
                            onClickAnswer={handleAnswerOnClick}
                        />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={4}>
                        <RatingComponent id={educationId} rate={userEducationRating}/>
                    </CustomTabPanel>
                </div>
            </div>
            <div className={"w-full md:w-1/4 h-full rounded-lg"}>
                <StudentStatusCard favorite={lesson.data?.favorite} isFollowing={lesson.status === "success"}/>
                <InstructorsCard mentors={mentorInfo?.data?.user}/>
            </div>
        </div>
    );
};

export default Lesson;