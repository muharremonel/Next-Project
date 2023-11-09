import React, {useCallback, useState} from 'react';
import Layout from "@/app/presentation/pages/MentorPages/Lesson/CreateLesson/layout";
import Stepper from "@/app/presentation/pages/MentorPages/Lesson/components/Stepper";
import GeneralInformations from "@/app/presentation/pages/MentorPages/Lesson/components/GeneralInformations";
import Explanations from "@/app/presentation/pages/MentorPages/Lesson/components/Explanations";
import {Curriculum} from "@/app/presentation/pages/MentorPages/Lesson/components/Curriculum";
import FakeEducation from "@/app/presentation/pages/MentorPages/Lesson/FakeEducation";
import FinalExam from "@/app/presentation/pages/MentorPages/Lesson/components/FinalExam";
import {Education} from "@/interfaces";
import {useApi} from "../../../../../../../pages/_app";
import {toast} from "react-hot-toast";

const CreateLesson = () => {
    const [educations, setEducations] = useState<Education | null>(null)
    const [currentStep, setCurrentStep] = useState<number>(0);
    const api = useApi()


    const handleEducations = useCallback((info: {}) => {
        setEducations((prev: any) => ({...prev, ...info}) as null);
    }, [setEducations]);

    const [finalExam, setFinalExam] = useState<any>(null);
    const handleAddFinalExam = (final: any) => {
        console.log("final", final)
        setFinalExam(final);
    };


    const handleNextStep = (nextIndex: number) => {
        if (nextIndex < steps.length) {
            setCurrentStep(nextIndex);
        }
    };

    const handlePreviousStep = (prevIndex: number) => {
        if (prevIndex >= 0) {
            setCurrentStep(prevIndex);
        }
    };

    // const handleCurriculumChange = useCallback((curriculumData: any) => {
    //     handleEducations({ curriculum: curriculumData });
    // }, [handleEducations]);

console.log("educations -> ",educations)
    const saveEducation = async () => {
        const response = await api.createEducation(educations)

        if (response.status === "success") {
            toast.success(response.message)
        } else
            toast.error(response.message)
    }

    // console.log("buralaaa", educations)
    const steps = [
        <Layout key={"1234"}>
            <GeneralInformations
                educations={educations}
                onChange={handleEducations}
                onNext={handleNextStep}
                onPrev={handlePreviousStep}
            />
        </Layout>,
        <Layout key={"2341"}>
            <Explanations
                educations={educations}
                onChange={handleEducations}
                onNext={handleNextStep}
                onPrev={handlePreviousStep}
            />
        </Layout>,
        <Layout key={"3214"}>
            <Curriculum
                educations={educations}
                onChange={handleEducations}
                onNext={handleNextStep}
                onPrev={handlePreviousStep}
            />
        </Layout>,
        <Layout key={"4123"}>
            <FinalExam
                onSave={saveEducation}
                onAdd={handleAddFinalExam}
                educations={educations}
                onChange={handleEducations}
                onNext={handleNextStep}
                onPrev={handlePreviousStep}
            />
        </Layout>
    ];
    return (
        <div className={"w-full h-full"}>
            <div className={"w-full"}>
                <Stepper
                    steps={steps}
                    stepIndex={currentStep}
                    onNextStep={handleNextStep}
                    onPreviousStep={handlePreviousStep}
                />
            </div>
        </div>
    );
};

export default CreateLesson;