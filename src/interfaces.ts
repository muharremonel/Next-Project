// interface Option {
// 	isCorrect: boolean;
// 	value: string;
// }
//
// interface Question {
// 	title: string;
// 	options: Option[];
// }
//
export interface Quiz {
    _id: string;
    title: string;
    question: Question[];
}

//
// export interface Lesson {
// 	name: string;
// 	type: string;
// 	date: string;
// 	startTime: string;
// 	endTime: string;
// 	quiz?: Quiz; // Bu alan optional çünkü her derste sınav olmayabilir.
// 	_id: string;
// }

// interface Section {
// 	name: string;
// 	lessons: Lesson[];
// }
//
interface Description {
    gains: string;
    requirements: string;
    targetAudience: string;
    purpose: string;
    summary: string
}

interface Resource {
    name: string;
    link: string;
}

// interface Answer {
// 	text: string;
// 	date: string;
// }
//
// interface QA {
// 	question: {
// 		questionText: string;
// 		date: string;
// 		_id: string;
// 	};
// 	answers: Answer[];
// }
//
// export interface Education {
// 	_id: string;
// 	image: string;
// 	mentors: string[];
// 	title: string;
// 	category: string;
// 	rating: string;
// 	viewCount: string;
// 	enrollmentLimit: string;
// 	description: Description;
// 	curriculum: {
// 		sections: Section[];
// 	};
// 	resources: Resource[];
// 	questionsAnswers: QA[];
// 	level: string;
// }
//
// export interface User {
// 	_id?: string;
// 	picture?: string;
// 	firstname: string;
// 	lastname: string;
// 	email: string;
// 	phone: string;
// 	password: string;
// 	registrationDate: Date;
// 	type: "mentor" | "student";
// }
// export interface Student {
// 	_id?: string;
// 	userId?: string;
// 	user: User;
// 	birthday?: string;
// 	school?: string;
// 	department?: string;
// 	address: string;
// 	tck: string;
// 	verified: boolean;
// 	participation?: number;
// 	educations: EnrolledEducations[];
// }
//
// export interface Mentor {
// 	_id?: string;
// 	userId?: string;
// 	user: User;
// 	categories: string[];
// 	active: boolean;
// 	educations: Education[];
// }
//
// export interface WatchedLesson {
// 	lessonId: string;
// 	watchPercentage: number;
// 	watchDuration: number;
// 	watchDate: Date;
// 	watchType: "stream" | "record";
// }
//
// export interface EnrolledEducations {
// 	educationId: string;
// 	completionRate: number;
// 	enrollmentDate: string;
// 	certificate: boolean;
// 	watchedLessons?: WatchedLesson[];
// }
//
// export interface CategoryItem {
// 	_id?: string;
// 	image: string;
// 	icon: string;
// 	title: string;
// 	href: string;
// }
//
// export interface SliderItem {
// 	webImage: string;
// 	mobileImage: string;
// 	title: string;
// 	description: string;
// 	href: string;
// }

export interface User {
    _id?: string;
    picture?: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    password: string;
    registrationDate: Date;
    type: "mentor" | "student";
}

export interface Student {
    _id?: string;
    userId?: string;
    user: User;
    birthday?: string;
    school?: string;
    department?: string;
    address: string;
    tck: string;
    verified: boolean;
    participation?: number;
    educations: EnrolledEducations[];
}

export interface Mentor {
    _id?: string;
    userId?: string;
    user: User;
    categories: string[];
    active: boolean;
    educations: Education[];
}

export interface WatchedLesson {
    lessonId: string;
    watchPercentage: number;
    watchDuration: number;
    watchDate: Date;
    watchType: "stream" | "record";
}

export interface EnrolledEducations {
    educationId: string;
    completionRate: number;
    enrollmentDate: string;
    certificate: boolean;
    watchedLessons?: WatchedLesson[];
}

export interface Education {
    _id?: string;
    image: string;
    mentors: string[];
    title: string;
    category: string;
    rating: number;
    viewCount: number;
    enrollmentLimit: number;
    description: Description;
    curriculum: Curriculum;
    resources: Resource[];
    questionsAnswers: QuestionAnswer[];
    level: number;
}

export interface QuestionAnswer {
    question: Question;
    answers: Answer[];
}

export interface Answer {
    text: string;
    date: Date;
}

export interface Question {
    _id?: string;
    questionText: string;
    date: Date;
}

export interface Curriculum {
    sections: Section[];
}

export interface Section {
    name: string;
    lessons: Lesson[];
}

export interface ForgotPassword {
    phone: string;
    code: string;
    newPassword: string;
}

export interface FollowCourse {
    token: string
    educationId: string
}

export interface Lesson {
    _id: string;
    name: string;
    link?: string;
    type: "stream" | "record";
    date?: string;
    startTime?: string;
    endTime?: string;
}

// export interface Resource {
// 	title: string;
// 	href: string;
// }
//
// export interface Description {
// 	purpose: string;
// 	summary: string;
// 	targetAudience: string;
// 	requirements: string;
// 	gains: string;
// }

export interface CategoryItem {
    _id?: string;
    image: string;
    icon: string;
    title: string;
    href: string;
}

export interface SliderItem {
    webImage: string;
    mobileImage: string;
    title: string;
    description: string;
    href: string;
}

export interface GeneralNVIInfosParams {
    tck: string;
    birthday: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    members: string[];
}