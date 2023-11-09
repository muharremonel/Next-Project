import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "@/config";
import { RegisterDataDBO, LoginDataDBO } from "@/models/DBO";
import { CategoryItem, Education, FollowCourse, ForgotPassword, Mentor, Student } from "./interfaces";

export const getInfos = (tck: number, bd: string): Promise<void> => {
    return axios.get(`${BASE_URL}/get_general_nvi?tc=${tck}&bd=${bd}`).then((response: AxiosResponse) => response.data);
};

export const registerStudent = (data: Partial<RegisterDataDBO>,city:any,town:any,distric:any): Promise<void> => {
    data.city = city
    data.town = town
    data.district = distric
    return axios.post(`${BASE_URL}/register_student`, data).then((response: AxiosResponse) => response.data);
};

export const createEducation = async (data: Education): Promise<void> => {
    const userToken = await getUserToken();
    console.log("userToken", userToken)
    return axios.post(`${BASE_URL}/educations?token=${userToken}`, data).then((response: AxiosResponse) => response.data);
};

export const getEducationWithStudent = async (educationId: string) => {
    const user = await getUser();
    // console.log("userim",user)
    return axios
        .get(`${BASE_URL}/education_with_student?educationId=${educationId}&studentId=${user?.data?.student?._id}`)
        .then((response: AxiosResponse) => response.data);
};

export const getEducations = async (): Promise<Education[]> => {
    return axios.get(`${BASE_URL}/educations`).then((response: AxiosResponse) => response.data);
};
export const getEducation = async (id: string): Promise<Education[]> => {
    return axios.get(`${BASE_URL}/educations/${id}`).then((response: AxiosResponse) => response.data);
};

// export const createImageForEducation = async (data: any) => {
//     return (
//         axios.post(`${BASE_URL}/education_images`, data)
//             .then((response: AxiosResponse) => response.data)
//     )
// }


export const smsVerification = (code: string, phone: string): Promise<void> => {
    return axios.get(`${BASE_URL}/sms_verification?phone=${phone}&code=${code}`).then((response: AxiosResponse) => response.data);
};

export const getUserToken = async () => {
    if (typeof window === "undefined") {
        return null;
    }
    return window.localStorage.getItem("digitUser");
};

export const getUser = async () => {
    const token = await getUserToken();
    if (!token) return;
    return await axios
        .get(`${BASE_URL}/get_user?token=${token}`)
        .then((response) => response.data)
        .catch((error) => {
            console.error("Error:", error);
        });
};

export const sendSms = async (phone: string) => {
    return axios
        .get(`${BASE_URL}/send_sms?phone=${phone}`)
        .then((response) => response.data)
        .catch((error) => {
            console.error("Error:", error);
        });
};

export const getAuth = async () => {
    const token = await getUserToken();
    if (!token) return;
    return await axios
        .get(`${BASE_URL}/get_auth?token=${token}`)
        .then((response) => response.data)
        .catch((error) => {
            console.error("Error:", error);
        });
};

export const login = async (data: LoginDataDBO): Promise<void> => {
    return axios.post(`${BASE_URL}/login`, data).then((response: AxiosResponse) => response.data);
};

export const slider = async (): Promise<void> => {
    return axios.get(`${BASE_URL}/slider`).then((response: AxiosResponse) => response.data);
};

// export const unloginSlider = async (): Promise<void> => {
//     return axios.get(`https://demo.anibalbilisim.com/digithane/test1.png`).then((response: AxiosResponse) => response.data);
// };

export const categories = async (): Promise<void> => {
    return axios.get(`${BASE_URL}/categories`).then((response: AxiosResponse) => response.data);
};

export const forgotPassword = async (data: ForgotPassword): Promise<void> => {
    return axios.post(`${BASE_URL}/forgot_password`, data).then((response: AxiosResponse) => response.data);
};

export const joinCourse = async (data: FollowCourse): Promise<void> => {
    console.log(data)
    return axios.post(`${BASE_URL}/follow_course_toggle`, data).then((response: AxiosResponse) => response.data);
};

export const toggleFavorites = async (data: FollowCourse): Promise<void> => {
    return axios.post(`${BASE_URL}/favorite_course_toggle`, data).then((response: AxiosResponse) => response.data);
};

export const educationQuestion = async (educationId: string, questionText: string) => {
    const userToken = await getUserToken();
    return axios
        .post(`${BASE_URL}/educations/${educationId}/questions`, { questionText, token: userToken })
        .then((response: AxiosResponse) => response.data);
};

export const educationAnswer = async (educationId: string, answerText: string, questionId: string) => {
    const userToken = await getUserToken();
    return axios
        .post(`${BASE_URL}/educations/${educationId}/questions/${questionId}/answers`, { answerText, token: userToken })
        .then((response: AxiosResponse) => response.data);
}

export const getVideo = async () => {
    console.log("get video çalıştı")
    // const userToken = await getUserToken();
    return axios.get(`${BASE_URL}/get_video`).then((response: AxiosResponse) => response.data);
}

export interface StudentService {
    getStudents: Function;
    getStudent: Function;
    getStudentEducations: Function;
    getStudentsInClassroom: Function;
    joinStream: Function;
    leaveStream: Function;
    heartBeat: Function;
    getStreamingsForStudent: Function;
    completeQuiz: Function;
    completeFinal:Function;
}

export interface EducationService {
    getEducation: Function;
    rateEducation: Function;
    startLesson: Function;
    endLesson: Function;
    getStudentsInStream: Function;
    getQuestions: Function;
    // getVideo:Function;
}

export interface MentorService {
    getMentors: Function;
    getMentor: Function;
    addMentor: Function;
    editMentor: Function;
    getEducations: Function;
}

export interface UtilsService {
    getCategories: Function;
    login: Function;
    getAuth: Function;
    getUser: Function;
}

export const studentService: Partial<StudentService> = {};
export const educationService: Partial<EducationService> = {};
export const mentorService: Partial<MentorService> = {};
export const utilsService: Partial<UtilsService> = {};

studentService.getStudents = (): Promise<Student> => {
    return axios.get(`${BASE_URL}/students`).then((response: AxiosResponse) => response.data);
};


studentService.getStudentsInClassroom = (educationId: any): Promise<Student> => {
    return axios.get(`${BASE_URL}/studentsInEducation/${educationId}`).then((response: AxiosResponse) => response.data);
};

studentService.getStudent = (id: string): Promise<Student> => {
    return axios.get(`${BASE_URL}/students/${id}`).then((response: AxiosResponse) => response.data);
};

studentService.getStudentEducations = (id: string): Promise<any> => {
    return axios.get(`${BASE_URL}/studentEducations/${id}`).then((response: AxiosResponse) => response.data);
};

studentService.joinStream = (educationId: string, token: string): Promise<any> => {
    return axios.post(`${BASE_URL}/join_stream?token=${token}`, { educationId }).then((response: AxiosResponse) => response.data);
};

studentService.leaveStream = (educationId: string, token: string): Promise<any> => {
    return axios.post(`${BASE_URL}/leave_stream?token=${token}`, { educationId }).then((response: AxiosResponse) => response.data);
};

studentService.heartBeat = (educationId: string, token: string): Promise<any> => {
    return axios.post(`${BASE_URL}/heartbeat?token=${token}`, { educationId }).then((response: AxiosResponse) => response.data);
};

studentService.getStreamingsForStudent = async (): Promise<any> => {
    const token = await getUserToken()
    return axios.get(`${BASE_URL}/get_streamings_for_student?token=${token}`).then((response: AxiosResponse) => response.data);

};

studentService.completeQuiz = async (quizInfo: any): Promise<any> => {
    return axios.post(`${BASE_URL}/grade_quiz`, quizInfo).then((response: AxiosResponse) => response.data);
};

studentService.completeFinal = async (finalInfo: any): Promise<any> => {
    return axios.post(`${BASE_URL}/grade_final_exam`, finalInfo).then((response: AxiosResponse) => response.data);
};

educationService.getEducation = (id: string): Promise<Education> => {
    return axios.get(`${BASE_URL}/educations/${id}`).then((response: AxiosResponse) => response.data);
};

educationService.getStudentsInStream = (id: string): Promise<Education> => {
    return axios.get(`${BASE_URL}/get_students_in_stream?educatoinId=${id}`).then((response: AxiosResponse) => response.data);
};


educationService.startLesson = async (id: string, phone: string): Promise<Education> => {
    const token = await getUserToken();
    const userPhone = await window.localStorage.getItem("userPhone")
    console.log("userPhone", userPhone)
    return axios.post(`${BASE_URL}/start_lesson?token=${token}`, { educationId: id, phone: userPhone }).then((response: AxiosResponse) => response.data);
};

educationService.endLesson = async (id: string): Promise<Education> => {
    const token = await getUserToken();

    return axios.post(`${BASE_URL}/end_lesson?token=${token}`, { educationId: id }).then((response: AxiosResponse) => response.data);
};

educationService.rateEducation = async (educationId: string, rate: number): Promise<Education> => {
    const userToken = await getUserToken();
    return axios
        .get(`${BASE_URL}/rate_education/?token=${userToken}&educationId=${educationId}&rate=${rate}`)
        .then((response: AxiosResponse) => response.data);
};

educationService.getQuestions = async (educationId: string): Promise<Education> => {
    return axios.get(`${BASE_URL}/educations/${educationId}/questions-answers`).then((response: AxiosResponse) => response.data);
};
// educationService.getVideo = async ():Promise<Education> => {
//     return axios.get(`${BASE_URL}/get_video`).then((response: AxiosResponse) => response.data);
// }

mentorService.getMentors = (): Promise<Student> => {
    return axios.get(`${BASE_URL}/mentors`).then((response: AxiosResponse) => response.data);
};

mentorService.getMentor = (id: string): Promise<Mentor> => {
    console.log(`${BASE_URL}/mentors/${id}`)
    return axios.get(`${BASE_URL}/mentors/${id}`).then((response: AxiosResponse) => response.data);
};

mentorService.getEducations = (id: string): Promise<Mentor> => {
    return axios.get(`${BASE_URL}/educationsOfMentor/${id}`).then((response: AxiosResponse) => response.data);
};

mentorService.addMentor = (data: Mentor): Promise<Mentor> => {
    return axios.post(`${BASE_URL}/register_mentor`, data).then((response: AxiosResponse) => response.data);
};

mentorService.editMentor = (id: string, data: Mentor): Promise<Mentor> => {
    return axios.put(`${BASE_URL}/mentors/${id}`, data).then((response: AxiosResponse) => response.data);
};

utilsService.getCategories = (): Promise<CategoryItem[]> => {
    return axios.get(`${BASE_URL}/categories`).then((response: AxiosResponse) => response.data);
};

utilsService.getAuth = (token: string): Promise<CategoryItem[]> => {
    return axios.get(`${BASE_URL}/get_auth_crm?token=${token}`).then((response: AxiosResponse) => response.data);
};

utilsService.getUser = (token: string): Promise<CategoryItem[]> => {
    return axios.get(`${BASE_URL}/get_user?token=${token}`).then((response: AxiosResponse) => response.data);
};

utilsService.login = (email: string, password: string): Promise<CategoryItem[]> => {
    return axios.get(`${BASE_URL}/login_admin?email=${email}&password=${password}`).then((response: AxiosResponse) => response.data);
};
