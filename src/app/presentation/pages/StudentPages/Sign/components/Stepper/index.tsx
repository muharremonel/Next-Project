import React, {useState} from 'react';
import {Button} from "@/app/presentation/components";

type StepperProps = {
    steps: React.ReactNode[]
    stepIndex?: number
    onNextStep?: (nextIndex: number) => void
}

const Stepper = ({steps, stepIndex, onNextStep}: StepperProps) => {
    const [stepperToIncrease, setStepperToIncrease] = useState(0)

    const nextStep = () => {
        setStepperToIncrease(p => p >= steps.length ? 0 : p + 1)
    }
    return (
        <>
            {/*<div>*/}
            {/*    <Button type={"primary"} text={"Kaydet"}*/}
            {/*            onClick={onNextStep ? () => onNextStep(stepIndex! + 1) : nextStep}></Button>*/}
            {/*</div>*/}
            <div className={"w-full h-full"}>
                <div className={'w-full h-full'}>{steps[stepIndex !== undefined ? stepIndex : stepperToIncrease]}</div>
                {/*<div>{steps[stepperToIncrease]}</div>*/}
            </div>
        </>
    );
};

export default Stepper;