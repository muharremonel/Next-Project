import React from 'react';

type TrainingsPageProps = {
    title: string
    image: string
    PropositionCards?: React.ReactNode[]
}

const TrainingsCompletedPage = ({title, image}: TrainingsPageProps) => {
    return (
        <div className={"w-full flex shadow-xl md:flex-row flex-col bg-white mb-8 p-5 rounded-xl gap-8"}>
            <div className={"rounded-lg md:mb-0 md:w-3/6 w-full"}>
                <img src={image} className='w-full h-full' alt=""/>
            </div>
            <div className={"flex flex-col justify-between w-full"}>
                <div className={"w-full mb-5 md:text-3xl text-2xl text-grey"}>
                    {title}
                </div>
                <div className={"mt-5 flex justify-end items-center"}>
                        <button className='bg-green text-white items-center flex justify-center rounded-full w-40 h-12'>
                            Tamamlandı
                        </button>
                </div> 
            </div>
        </div>
    );
};
export default TrainingsCompletedPage