import React, { useState } from 'react';
import { Button } from "@/app/presentation/components";
import { motion } from 'framer-motion';

type StepperProps = {
    steps: React.ReactNode[]
    stepIndex?: number
    onNextStep?: (nextIndex: number) => void
    onPreviousStep?: (prevIndex: number) => void
}

const Stepper = ({ steps, stepIndex, onNextStep, onPreviousStep }: StepperProps) => {
    //...
    const [stepperToIncrease, setStepperToIncrease] = useState(0);

    const nextStep = () => {
        setStepperToIncrease(p => p >= steps.length - 1 ? 0 : p + 1)
    }

    const renderProgressSteps = () => {
        const titles = ['Genel Bilgiler', 'Açıklamalar', 'Müfredat','Final Sınavı'];
    
        return (
            <div className="flex w-full mb-4">
                {titles.map((title, idx) => (
                    <div key={idx} className="flex flex-col items-center w-1/3 pt-5 pb-5">
                        <div className="mb-2 ">{title}</div>
                        <div className="relative h-2 w-full bg-gray-400  rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: '0%' }}
                                animate={{ width: (stepIndex !== undefined ? stepIndex : stepperToIncrease) >= idx ? '100%' : '0%' }}
                                transition={{ duration: 0.7 }}
                                className={`h-2 ${(stepIndex !== undefined ? stepIndex : stepperToIncrease) >= idx ? 'bg-primary' : 'bg-gray-400'}`}>
                            </motion.div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <>
            {renderProgressSteps()}
            {/*<Button type={"primary"} text={"Ileri"}*/}
            {/*    onClick={onNextStep ? () => onNextStep(stepIndex! + 1) : nextStep}></Button>*/}
            <div className={"w-full h-full"}>
                {/*<div className={"flex justify-end items-end"}>{stepperToIncrease}</div>*/}
                <div>{steps[stepIndex !== undefined ? stepIndex : stepperToIncrease]}</div>
            </div>
        </>
    );
};

export default Stepper;
