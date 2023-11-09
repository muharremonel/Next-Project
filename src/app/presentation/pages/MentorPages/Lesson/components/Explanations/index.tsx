import React, {useState} from 'react';
import {Button, Input} from "@/app/presentation/components";
import {Education} from "@/interfaces";


type ExplanationsProps = {
    educations: Education | null
    onChange: any
    onNext: (index: number) => void
    onPrev: (index: number) => void
}
const Explanations = ({educations, onChange, onNext, onPrev}: ExplanationsProps) => {
    const [trainingPurpose, setTrainingPurpose] = useState("");
    const [trainingSummary, setTrainingSummary] = useState("");
    const [targetAudience, setTargetAudience] = useState("");
    const [learningOutcomes, setLearningOutcomes] = useState("");
    const [requirements, setRequirements] = useState("");


    return (
        <div className={"w-full h-full flex justify-center items-center"}>
            <div className={"shadow-2xl rounded-lg w-3/4 h-full p-20 flex-col flex"}>
                <div className={"text-2xl font-bold"}>
                    Açıklamalar
                </div>
                <div className={"p-4 flex flex-col gap-8"}>
                    <Input
                        rounded={"lg"}
                        type={"textarea"}
                        value={educations?.description?.purpose || ''}
                        onTextAreaChange={event => onChange({
                            description: {
                                ...educations?.description,
                                purpose: event.target.value
                            }
                        })}
                        title={"Eğitimin Amacı"}
                    />
                    <Input
                        rounded={"lg"}
                        type={"textarea"}
                        value={educations?.description?.summary || ''}
                        onTextAreaChange={event => onChange({
                            description: {
                                ...educations?.description,
                                summary: event.target.value
                            }
                        })}
                        title={"Eğitimin Özeti"}
                    />
                    <Input
                        rounded={"lg"}
                        type={"textarea"}
                        value={educations?.description?.targetAudience || ''}
                        onTextAreaChange={event => onChange({
                            description: {
                                ...educations?.description,
                                targetAudience: event.target.value
                            }
                        })}
                        title={"Hedef Kitle"}
                    />
                    <Input
                        rounded={"lg"}
                        type={"textarea"}
                        value={educations?.description?.gains || ''}
                        onTextAreaChange={event => onChange({
                            description: {
                                ...educations?.description,
                                gains: event.target.value
                            }
                        })}
                        title={"Kazanımlar"}
                    />
                    <Input
                        rounded={"lg"}
                        type={"textarea"}
                        value={educations?.description?.requirements || ''}
                        onTextAreaChange={event => onChange({
                            description: {
                                ...educations?.description,
                                requirements: event.target.value
                            }
                        })}
                        title={"Gereksinimler"}
                    />
                </div>
                <div className={"flex justify-center p-4 md:justify-between"}>
                    <div className={"w-3/4 md:w-1/4 text-xs md:text-base"}>
                        <Button onClick={(() => onPrev(0))} type={"secondary"} text={"Geri Git"}/>
                    </div>
                    <div className={"w-3/4 md:w-1/4 text-xs md:text-base"}>
                        <Button onClick={() => onNext(2)} type={"primary"} text={"Devam Et"}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Explanations;
