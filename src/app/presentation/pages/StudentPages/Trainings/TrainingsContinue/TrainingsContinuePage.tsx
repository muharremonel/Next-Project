import React from 'react';
import { Start } from "@/svgImports";
import ProgressBar from "@ramonak/react-progress-bar";

type TrainingsPageProps = {
    title: string
    percentage: number
    image: string
    PropositionCards?: React.ReactNode[]
}

const TrainingsContinuePage = ({title, percentage, image}: TrainingsPageProps) => {
    return (
        <div className={"w-full flex shadow-xl md:flex-row flex-col bg-white mb-8 p-5 rounded-xl gap-8"}>
            <div className={"rounded-lg md:mb-0 md:w-3/6 w-full"}>
                <img src={image} className='w-full h-full' alt=""/>
            </div>
            <div className={"flex flex-col justify-between w-full"}>
                <div className={"w-full mb-5 md:text-3xl text-2xl text-grey"}>
                    {title}
                </div>
                <div className={"mt-5 w-full flex justify-between m-0 gap-7 items-end"}>
                    <div className='w-full'>
                        <div className='flex justify-between mb-2'>
                            <span>Tamamlanma Durumu</span>
                            <span className='text-grey'>{percentage}%</span>
                        </div>
                        <ProgressBar completed={percentage} isLabelVisible={false} bgColor={'#418C1D'} baseBgColor={"#ECF4E8"}/>
                    </div>
                    <div className='h-full'>
                            <button className='bg-primary items-center flex justify-center rounded-full px-4 w-24 h-14'>
                                <Start/>
                            </button>
                    </div> 
                </div>
            </div>
         </div>
    );
};
export default TrainingsContinuePage;