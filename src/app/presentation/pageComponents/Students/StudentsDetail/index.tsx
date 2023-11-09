import ProfileCard from '@/app/presentation/components/studentComponents/ProfileCard'
import { Education, EnrolledEducations, Student } from '@/interfaces'
import React, { useState, useEffect } from 'react'
import { getUser } from '@/api';
import PersonalInformationCard from '@/app/presentation/components/studentComponents/PersonalInformationCard';
import CircleProgressBar from '@/app/presentation/components/CircleProgressBar';
import ChartGraphic from '@/app/presentation/components/ChartGraphic';
import ContinuingEducations from '@/app/presentation/components/studentComponents/ContinuingEducations';
import CompletedEducations from '@/app/presentation/components/studentComponents/CompletedEducations';
import Certificates from '@/app/presentation/components/studentComponents/Certificates';
import Tests from '@/app/presentation/components/studentComponents/Tests';
import LoadingAnimation from '@/app/presentation/components/Loading';
import { withFadeInAnimation } from '@/utils';
import Popup from '@/app/presentation/components/PopUp';

const AnimatedProfileCard = withFadeInAnimation(ProfileCard);
const AnimatedPersonalInformationCard = withFadeInAnimation(PersonalInformationCard);
const AnimatedCircleProgressBar = withFadeInAnimation(CircleProgressBar);
const AnimatedChart = withFadeInAnimation(ChartGraphic);
const AnimatedContinuingEducations = withFadeInAnimation(ContinuingEducations);
const AnimatedCompletedEducations = withFadeInAnimation(CompletedEducations);
const AnimatedCertificates = withFadeInAnimation(Certificates);
const AnimatedTests = withFadeInAnimation(Tests);

const Index = ({ data, educationsData, handleChangeData }: { data: any, educationsData: Education[], handleChangeData: any }) => {
  const { firstname, lastname, type, email, phone, student, picture } = data || {};
  const { educations, participation, department, school, address, birthday, _id } = student || {};

  const completedEducations = educations?.filter((edu: EnrolledEducations) => edu.completionRate === 100)
  const uncompletedEducations = educations?.filter((edu: EnrolledEducations) => edu.completionRate !== 100)

  const completedDetailedEducations = educationsData?.filter((edu: Education) => {
    const enrolledEducation = completedEducations?.find((completedEdu: EnrolledEducations) => completedEdu.educationId === edu._id);
    return enrolledEducation;
  }).map((edu: Education) => {
    const enrolledEducation = completedEducations?.find((completedEdu: EnrolledEducations) => completedEdu.educationId === edu._id);
    return { ...edu, progress: enrolledEducation ? enrolledEducation.completionRate : 0 };
  });

  const uncompletedDetailedEducations = educationsData?.filter((edu: Education) => {
    const enrolledEducation = uncompletedEducations?.find((uncompletedEdu: EnrolledEducations) => uncompletedEdu.educationId === edu._id);
    return enrolledEducation;
  }).map((edu: Education) => {
    const enrolledEducation = uncompletedEducations?.find((uncompletedEdu: EnrolledEducations) => uncompletedEdu.educationId === edu._id);
    return { ...edu, progress: enrolledEducation ? enrolledEducation.completionRate : 0 };
  });

  const successRate = (completedEducations?.length / educationsData?.length) * 100 || 0;

  const typeMap: any = {
    student: 'Öğrenci',
    mentor: 'Eğitmen',
  }

  return data ? (
    <div className='flex flex-col gap-12 py-4'>
      <h1 className='font-bold text-xl text-center'>Öğrenci Profil sayfası</h1>
      <AnimatedProfileCard handleChangeData={handleChangeData} studentId={_id} firstname={firstname} lastname={lastname} type={typeMap[type]} participation={participation} enrolledEduAmount={educationsData?.length} completedEduAmount={completedEducations?.length} picture={picture} />
      <AnimatedPersonalInformationCard email={email} phone={phone} department={department!} school={school!} address={address} birthday={birthday!} />
      <div className='flex flex-col md:flex-row gap-12 w-full h-full'>
        <div className='flex flex-col h-full cardcontainer gap-12 w-full md:w-5/12 items-center justify-center'>
          <p className='font-semibold self-start'>Başarı Durumu</p>
          <AnimatedCircleProgressBar progress={successRate} size={300} strokeWidth={50} circleColor="#EEE" progressColor="#222d68" duration={'1'} />
        </div>
        <div className='flex flex-col cardcontainer gap-12 w-full md:w-7/12 items-center'>
          <p className='font-semibold self-start'>Platformda Geçirdiği Süre</p>
          <AnimatedChart
            data={[13, 20, 30, 20, 20, 60, 7]}
            labels={['P', 'S', 'Ç', 'P', 'C', 'C', 'P']}
          />
        </div>
      </div>
      <AnimatedContinuingEducations educations={uncompletedDetailedEducations} />
      <AnimatedCompletedEducations educations={completedDetailedEducations} />
      <AnimatedCertificates educations={completedDetailedEducations} />
      <AnimatedTests educations={completedDetailedEducations} />
    </div>
  ) :
    <Popup noBackground isOpen={true} onClose={() => { }}>
      <LoadingAnimation />
    </Popup>
}

export default Index