import { motion } from 'framer-motion';
import React from 'react';
import AnimatedNumber from '../AnimateNumber';

const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: .3 } },
};

const childVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
};

const Card = ({ label, content }: { label: string, content: any }) => (
    <motion.div className='flex flex-col w-full justify-around aspect-[16/7] rounded-lg bg-cardItemBg text-primaryText p-4' variants={childVariants}>
        <p className='font-medium'>{label}</p>
        <div className='text-2xl font-semibold'>{content}</div>
    </motion.div>
)

const EducationCard = ({ name, registrationDate, completionRate, category, certificate, totalTime }: { name: string, registrationDate: string, completionRate: number, category: string, certificate: string, totalTime: number }) => {
    return (
        <motion.div className='w-full' variants={containerVariants} initial="hidden" animate="visible">
            <motion.div className='w-full grid grid-cols-7 cardcontainer'>
                <motion.div className='flex flex-col col-span-3 gap-10 items-center justify-center h-full' variants={childVariants}>
                    <motion.div className='rounded-lg w-[90%] h-32 bg-black' />
                    <motion.div className='flex flex-col gap-4 justify-center items-center h-24'>
                        <p className='font-medium'>{name}</p>
                        <p className='font-light text-sm text-lightText'>{category}</p>
                    </motion.div>
                </motion.div>
                <motion.div className='col-span-4' variants={childVariants}>
                    <motion.div className='grid grid-cols-2 gap-4 w-full '>
                        <Card label='Kayıt Olduğu Tarih' content={registrationDate} />
                        <Card label='Dersi İzleme Oranı' content={<p><span className='text-sm'>% </span>{<AnimatedNumber value={completionRate} />} </p>} />
                        <Card label='Sertifika Durumu' content={certificate} />
                        <Card label='Dersin Toplam Süresi' content={<AnimatedNumber value={totalTime} />} />
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default EducationCard;
