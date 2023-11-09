import React, { useState, useEffect } from 'react';
import LeftMenu from "../components/LeftNav";
import ApplicationCardOnePage from "./ApplicationCardOnePage";
import ApplicationCardTwoPage from './ApplicationCardTwoPage';
import ApplicationCardTherePage from "./ApplicationCardTherePage";
import SearchSave from "../components/SearchSave";
import Breadcrumb from "../components/Breadcrumb";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { getUser } from '@/api';
import { BASE_URL } from '@/config';

interface Studio {
    projectName: string;
    name: string;
    surname: string;
    projectSubject: string;
    userId: string;
    status: string;
}

const Index = () => {

    const [data, setData] = useState<Studio[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [recordCount, setRecordCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 4;


    useEffect(() => {
      (async () => {
          const user = (await getUser());
          if (user && user.data) {
              const userId = user.data._id;
              fetch(`${BASE_URL}/studioRecording`)
                  .then(response => response.json())
                  .then(result => {
                    console.log("API Yanıtı:", result);
                    const filteredProjects = result.data.filter((studio: Studio) => 
                    studio.userId === userId && (studio.status === "pending" || studio.status === "rejected" || studio.status === "approved" )
                  );                  
                  console.log("Filtrelenmiş Projeler:", filteredProjects);
                      setData(filteredProjects);
                  });
          }
          console.log("kullanıcı", user)
      })();
  }, []);
  

    const filteredData = data.filter((item) => 
      item.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentData = filteredData.slice(
      (currentPage - 1) * recordsPerPage,
      currentPage * recordsPerPage
    );
  
    useEffect(() => {
      setRecordCount(filteredData.length);
    }, [filteredData.length]);
  

    const currentapproveds: Studio[] = currentData.filter(studio => studio.status === "approved");
    const currentDeclineds: Studio[] = currentData.filter(studio => studio.status === "rejected");
    const currentPendings: Studio[] = currentData.filter(studio => studio.status === "pending");
    



    return (
      <div className="w-full h-max">
        <Breadcrumb />
        <div className="flex flex-col md:flex-row gap-8 p-4 md:p-10">
          <div className="w-full md:w-1/4 h-full rounded-lg">
            <LeftMenu />
          </div>
          <div className="w-full md:w-3/4 h-full rounded-lg mb-4 md:mb-0">
            <SearchSave recordCount={recordCount} setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
            <ApplicationCardOnePage approveds={currentapproveds} />
            <ApplicationCardTwoPage declineds={currentDeclineds} />
            <ApplicationCardTherePage pendings={currentPendings} />
            <Stack spacing={2} className='flex items-center mt-5'>
              <Pagination 
                size='large'
                count={Math.ceil(recordCount / recordsPerPage)}
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
      </div>
    );
};

export default Index;
