import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SearchCardPage from './SearchCardPage';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { useApi } from '../../../../../pages/_app';

const Index = () => {
  const api = useApi();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordCount, setRecordCount] = useState(0);
  const [educations, setEducations] = useState<any[]>([]);

  const handleRecordCountChange = (count: number) => {
    setRecordCount(count);
  };

  const recordsPerPage = 4;
  const pageCount = Math.ceil(recordCount / recordsPerPage);

  const router = useRouter();

  useEffect(() => {
    const queryValue = router.query.query;

    if (queryValue) {
      setSearchTerm(Array.isArray(queryValue) ? queryValue[0] : queryValue);
    } else if (searchTerm) {
      setSearchTerm("");
    }

    (async () => {
      const response = await api.getEducations()
      setEducations(response.data);
    })();
}, [router.query, searchTerm]);

  return (
    <div className={"w-full h-max"}>
      <div className={"bg-primary text-center text-white p-8 mb-8"}>
        <h2 className={"text-5xl mb-4"}>Lütfen Eğitimi aratın</h2>
        <span className='text-white'>Ara. Keşfet. Öğren</span>
        <div className={"mt-8"}>
          <span>{searchTerm ? `"${searchTerm}" İçin sonuç?` : "Sonuçları aratın"}</span>
        </div>
      </div>

      <div className={"container p-4 m-auto h-full rounded-lg mb-4 md:mb-0"}>
        <SearchCardPage 
          educationList={educations}
          searchTerm={searchTerm} 
          onRecordCountChange={handleRecordCountChange} 
          currentPage={currentPage}
        />
        <Stack spacing={2} className='flex items-center mt-5'>
          <Pagination 
            size='large' 
            count={pageCount} 
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
            sx={{
              '.MuiPaginationItem-page.Mui-selected': {
                backgroundColor: '#222D68',
                color: '#fff',
              },
              '.MuiPaginationItem-page.Mui-selected:hover': {
                backgroundColor: '#222D68',
              },
              '.MuiPaginationItem-page': {
                color: '#222D68',
              },
            }}
          />
        </Stack>
      </div>
    </div>
  );
};

export default Index;
