import { CertificateWait, Search } from '@/svgImports'
import React from 'react'
import { motion } from "framer-motion"
import { Education } from '@/interfaces';

const containerVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: .13 } },
};

const childVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
};

const CertificateLine = ({ title }: { title: string }) => (
  <motion.div className='flex justify-between' variants={childVariants}>
    <div className='flex items-center gap-8'>
      <div className='w-20 h-20 rounded-lg bg-black' />
      <p>{title}</p>
    </div>
    <div className='flex items-center justify-center w-12 h-12 bg-background rounded-full cursor-pointer hover:scale-105 transition'>
      <CertificateWait />
    </div>
  </motion.div>
)

const Certificates = ({ certificates }: { certificates: Education[] }) => {
  return (
    <motion.div className='cardcontainer' variants={containerVariants} initial="hidden" animate="visible">
      <p className='font-semibold'>Sertifikaları</p>
      {certificates?.length ?
        <p className='text-lightText text-sm'>{certificates?.length} sertifika kazandı</p> :
        <p className='text-lightText text-sm'>Kazandığı sertifika bulunmamaktadır.</p>
      }
      <motion.div className='flex flex-col py-12 gap-8' variants={containerVariants}>
        {
          certificates?.map((k, i) => (
            <CertificateLine key={k.title} title={k.title} />
          ))
        }
      </motion.div>
    </motion.div>
  )
}

export default Certificates