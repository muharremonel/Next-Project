
// import { Student } from '@/interfaces';
// import { Search } from '@/svgImports';
// import { transformDataStudent } from '@/utils';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Framer Motion eklenmiş
import { Button, SearchBar } from '../../components';
import Table from '../../components/Table';

const columns = [
  { header: 'Profil Resmi', accessor: 'picture' },
  { header: 'Öğrenci Adı', accessor: 'name' },
  { header: 'Genel Katılımı', accessor: 'participation' },
  { header: 'Başarı Oranı', accessor: 'success' },
];

const fadeIn = {
  hidden: { opacity: 0, scale: .8, y: 50 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: .3 } },
};

// const Index = ({ data }: { data: Student[] }) => {
  const Index = ({  }: { }) => {
  const [filter, setFilter] = useState('');
  const router = useRouter();

  // const transformedData = data?.map(transformDataStudent);

  // const filteredData = transformedData?.filter(row => {
  //   return columns.some(col => {
  //     return String((row as any)[col.accessor])
  //       .toLowerCase()
  //       .includes(filter.toLowerCase());
  //   });
  // });

  const handleRowButtonClick = (row: any) => {
    router.push(`profilim/${row.id}`);
  };

  return (
    <motion.div
      className='flex flex-col w-full bg-white p-4 gap-4'
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className='flex w-full justify-between'>
        <div className='flex flex-col gap-4'>
          <h2 className='font-semibold text-lg'>
            mentor Listesi
          </h2>
          <p>
            {/* Toplam {data?.length || 0} öğrenci listelendi. */}
          </p>
        </div>
        <div>
          <Button text='+ Excelden Yükle' type={'primary'} onClick={undefined} />
        </div>
      </div>
      <div className='flex justify-center w-full'>
        {/* <SearchBar
          value={filter}
          setSearchTerm={setFilter}
          placeholder="Ara..."
          svgIcon={Search}
        /> */}
      </div>
      {/* <Table onClick={handleRowButtonClick} columns={columns} dataLength={data?.length} filteredData={filteredData} /> */}
    </motion.div>
  );
};

export default Index;
