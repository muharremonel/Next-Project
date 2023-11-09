import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import React from "react";
import { Curriculum, Mentor, Student, WatchedLesson } from "./interfaces";
import { toast } from 'react-hot-toast';

export const convertToEnglishUrl = (label: string): string => {
  return label
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/ /g, "");
};

export function transformDataStudent(student: Student): any {
  const fullName = `${student?.user?.firstname} ${student?.user?.lastname}`;
  const success = Math.floor(Math.random() * 100);

  const educations = student?.educations || [];
  const completionRates = educations?.map((edu) => edu.completionRate || 0);
  const averageCompletionRate =
    completionRates?.length > 0 ? completionRates?.reduce((sum, rate) => sum + rate, 0) / completionRates?.length : 0;

  return {
    ...student,
    id: student?._id,
    picture: "resim",
    name: fullName,
    success: success,
    participation: averageCompletionRate,
  };
}

export function transformDataMentor(mentor: Mentor): any {
  const fullName = `${mentor?.user?.firstname} ${mentor?.user?.lastname}`;

  return {
    ...mentor,
    id: mentor?._id,
    picture: "resim",
    name: fullName,
    active: mentor?.active
  };
}

export function formatDate(inputDate: string): string {
  const date = new Date(inputDate);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

  return formattedDate;
}

export const fadeIn = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: .4 } },
};

export const withFadeInAnimation = (Component: React.FC<any>) => {
  const WrappedComponent = (props: any) => {
    const [ref, inView] = useInView({
      threshold: .3,
      triggerOnce: true,
    });

    const [renderKey, setRenderKey] = React.useState(0);

    React.useEffect(() => {
      setRenderKey(prevKey => prevKey + 1);
    }, [inView]);

    return (
      <motion.div
        ref={ref}
        key={renderKey}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={fadeIn}
        className='w-full h-full'
      >
        {<Component {...props} />}
      </motion.div>
    );
  }

  WrappedComponent.displayName = `WithFadeInAnimation(${getDisplayName(Component)})`;
  return WrappedComponent;
}

function getDisplayName(Component: React.ComponentType<any>) {
  return Component.displayName || Component.name || 'Component';
}

export function convertCurriculumToArray(curriculum: Curriculum, studentEducation: any): { title: string; content: { name: string; progress: number; watchType: 'stream' | 'record', watchDate: string, publishDate: string, type: 'stream' | 'record' }[] }[] {
  const result: { title: string; content: { name: string; progress: number, watchType: "record" | "stream", watchDate: string, publishDate: string, type: 'stream' | 'record' }[] }[] = [];

  const watchDataMap: { [lessonId: string]: { percentage: number, watchType: 'stream' | 'record', watchDate: string } } = {};

  studentEducation?.watchedLessons?.forEach((watchedLesson: any) => {
    watchDataMap[watchedLesson?.lessonId] = {
      percentage: watchedLesson?.watchPercentage,
      watchType: watchedLesson?.watchType,
      watchDate: formatDate(watchedLesson?.watchDate),
    };
  });

  curriculum?.sections?.forEach((section) => {
    const sectionLessons: { name: string; progress: number, watchType: "record" | "stream", watchDate: string, publishDate: string, type: 'stream' | 'record' }[] = [];
    section?.lessons?.forEach((lesson) => {
      const lessonData = watchDataMap[lesson._id] || { percentage: 0, watchType: '', watchDate: '', publishDate: '', type: '' };
      sectionLessons.push({
        name: lesson?.name || '',
        progress: lessonData.percentage,
        watchType: lessonData.watchType,
        watchDate: lessonData.watchDate,
        publishDate: lesson?.date || '',
        type: lesson?.type || '',
      });
    });

    result.push({
      title: section?.name || '',
      content: sectionLessons
    });
  });

  return result;
}

type Lesson = {
  name: string;
  progress: number;
  watchType: 'stream' | 'record';
  watchDate: string;
  publishDate: string;
  type: 'stream' | 'record';
  index: string;
}

export function flattenCurriculum(curriculum: Curriculum, studentEducation: any): Lesson[] {
  const flattenedLessons: Lesson[] = [];

  const watchDataMap: { [lessonId: string]: { percentage: number, watchType: 'stream' | 'record', watchDate: string } } = {};

  (studentEducation?.watchedLessons || []).forEach((watchedLesson: any) => {
    watchDataMap[watchedLesson?.lessonId] = {
      percentage: watchedLesson?.watchPercentage,
      watchType: watchedLesson?.watchType,
      watchDate: formatDate(watchedLesson?.watchDate),
    };
  });
  (curriculum?.sections || []).forEach((section, sectionIdx) => {
    (section?.lessons || []).forEach((lesson, lessonIdx) => {
      const lessonData = lesson._id ? (watchDataMap[lesson._id] || { percentage: 0, watchType: '', watchDate: '' }) : { percentage: 0, watchType: '', watchDate: '' };

      flattenedLessons.push({
        name: lesson?.name || '',
        progress: lessonData.percentage,
        watchType: lessonData.watchType as any,
        watchDate: lessonData.watchDate,
        publishDate: lesson?.date as any,
        type: lesson?.type || '',
        index: `${sectionIdx + 1}.${lessonIdx + 1}`,
      });
    });
  });

  return flattenedLessons;
}

export const toastFunction = (response: { status: 'error' | 'success', message: string, data: any }) => {
  if (response.status === 'success') {
    toast.success(response.message)
  } else {
    toast.error(response.message)
  }
}

