import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { getUser } from '@/api';
import AnimatedNumber from '../AnimateNumber';
import CustomFileUploader from '../studentComponents/ProfileUpload';
import { BASE_URL } from '@/config';
import { Women, Man } from '@/svgImports';
import toast from 'react-hot-toast';

const containerVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: .3 } },
};

const childVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
};

const Card = ({ label, content }: { label: string, content: any }) => (
  <motion.div className='flex flex-col w-full justify-around aspect-[16/7] md:aspect-[16/7] rounded-lg bg-cardItemBg text-primaryText p-4' variants={childVariants}>
    <p className='font-medium'>{label}</p>
    <div className='text-2xl font-semibold'>{content}</div>
  </motion.div>
);

type ProfileCardProps = {
  firstname: string,
  lastname: string,
  type: string,
  participation: string,
  enrolledEduAmount: number,
  completedEduAmount: number,
  profilePicture?: string | null,
  picture: string;
  studentId: string;
  handleChangeData: any
  gender?: 'male' | 'female';
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  firstname,
  lastname,
  type,
  participation,
  enrolledEduAmount,
  completedEduAmount,
  picture,
}) => {
  const [userId, setUserId] = useState("");

  const [gender, setGenderMod] = useState();

  useEffect(() => {
      (async () => {
          const user = (await getUser());
          setUserId(user.data._id);
          setGenderMod(user.data.gender)
        })();
  }, []);
  
  const [currentPicture, setCurrentPicture] = useState(picture);

  

  const handleProfilePictureChange = async (file: File) => {
    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      const response = await fetch(`${BASE_URL}/profile_images`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Profil fotoğrafı yüklenemedi.');
      }

      const responseData = await response.json();
      const fileName = responseData.data.split('/profileImages/').pop();
      const finalFileName = `profileImages/${fileName}`;
     
      const updateResponse = await fetch(`${BASE_URL}/profile_picture?userId=${userId}&url=${finalFileName}`, {
        method: 'GET'

      });
      if (!updateResponse.ok) {
        toast.error('Profil fotoğrafı yüklenirken bir sorun oluştu.');
      }

      const updateData = await updateResponse.json();

      if (updateData.status === 'success') {
        setCurrentPicture(finalFileName); 
        toast.success('Profil fotoğrafı başarılı bir şekilde yüklendi.');
        setTimeout(() => {
          window.location.reload();
      }, 1000);
    } else {
        toast.error('Profil fotoğrafı yüklenirken bir sorun oluştu.');
    }

    } catch (error: any) {
      toast.error('Profil fotoğrafı yüklenirken veya alınırken bir sorun oluştu.');
    }

  };

  return (
    <motion.div className='w-full' variants={containerVariants} initial="hidden" animate="visible">
      <motion.div className='w-full grid grid-cols-1 md:grid-cols-7 cardcontainer'>
        <motion.div className='col-span-3 flex flex-col gap-10 items-center justify-center h-full' variants={childVariants}>
          <motion.div className='rounded-3xl text-center w-80 h-80'>
              {
                  currentPicture 
                  ? <img src={`${BASE_URL}/${currentPicture}`} className='w-full h-full' alt="Profile" />
                  : gender === 'male' 
                    ? <Man />
                    : <Women />
              }
            <CustomFileUploader onFileSelected={handleProfilePictureChange} />
          </motion.div>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <div className='gap-12 mb-4 font-bold text-2xl text-primary'>
                <span>{firstname} {lastname}</span>
            </div>
         
          </motion.div>
        </motion.div>
        <div className="w-full col-span-4 h-full">
        <div className="flex flex-col rounded-lg justify-between h-full">
          <div className='h-1/2'>
            <h2 className="text-xl">Hakkında</h2>
            <p className="mt-2"></p>
          </div>
        </div>
      </div>
        
      </motion.div>
    </motion.div>
  );
};

export default ProfileCard;
