import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { getUser } from '@/api';
import router from 'next/router';

const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: .13 } },
};

const childVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
};

const Card = ({ label, content }: { label: string, content: string }) => (
    <motion.div className='flex flex-col w-full justify-around aspect-[4/1] rounded-lg bg-cardItemBg text-primaryText p-4' variants={childVariants}>
        <p className='text-lg font-medium'>{label}</p>
        <p className='font-semibold'>{content}</p>
    </motion.div>
)

const PersonalInformationCard = ({ department, school, address, birthday }: { department: string, school: string, address: string, birthday: string }) => {
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [studentId, setStudentId] = useState<string>('');

    useEffect(() => {
        (async () => {
            const user = (await getUser());
            if (user && user.data) {
                setStudentId(user.data._id);
                setEmail(user.data.email); 
                setPhone(user.data.phone);  
            }
        })();
    }, [router]);
    return (
        <motion.div className='flex flex-col cardcontainer gap-4' variants={containerVariants} initial="hidden" animate="visible">
            <p className='font-medium'>Kişisel Bilgiler</p>
            <motion.div className='grid grid-cols-1 md:grid-cols-2 gap-4' variants={containerVariants}>
                <Card label='Mail Adresi' content={email} />
                <Card label='Telefon Numarası' content={phone} />
                <Card label='Bölümü' content={department} />
                <Card label='Okulu' content={school} />
                <Card label='Adres' content={address} />
                <Card label='Doğum Tarihi' content={birthday} />
            </motion.div>
        </motion.div>
    )
}

export default PersonalInformationCard
