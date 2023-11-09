import React from 'react';

type TrainingsPageProps = {
    title: string
    image: string
    score: string
    PropositionCards?: React.ReactNode[]
}

const TrainingsTestsPages = ({title, image, score}: TrainingsPageProps) => {
    return (
    <div className={"w-full flex shadow-xl md:flex-row flex-col bg-white mb-8 p-5 rounded-xl gap-8"}>
        <div className={"rounded-lg md:mb-0 md:w-3/6 w-full"}>
            <img src={image} className='w-full h-full' alt=""/>
        </div>
        <div className={"flex flex-col justify-between w-full"}>
            <div className={"w-full mb-5 md:text-3xl text-2xl text-grey"}>
                {title}
            </div>
            <div className={"mt-5 flex items-center justify-between"}>
                    <span className='text-primary text-2xl'>{score}/100</span>
                    <button className='bg-white border border-primary text-primary hover:bg-primary hover:text-white rounded-full w-44 h-12'>
                        Quiz Tekrarla
                    </button>
            </div> 
         </div>
    </div>
    );
};
export default TrainingsTestsPages