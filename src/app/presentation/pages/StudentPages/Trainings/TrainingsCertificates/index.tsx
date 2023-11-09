import React, { useState} from 'react';
import SearchSave from "./CertificatesSearch";
import TrainingsCertificatesPage from './TrainingsCertificatesPage';
import LeftNav from '../components/LeftNav';
import LinkMenu from '../components/LinkMenu';

const Index = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [recordCount, setRecordCount] = useState(0);
    const recordsPerPage = 4;
  
    const handleRecordCountChange = (count: number) => {
      setRecordCount(count);
    };
  
    return (
      <div className={"w-full h-max"}>
        <LinkMenu />
        <div className={"flex flex-col md:flex-row gap-8 p-4 md:p-10"}>
          <div className={"w-full md:w-1/4 h-full rounded-lg"}>
            <LeftNav />
          </div>
          <div className={"w-full md:w-3/4 h-full rounded-lg mb-4 md:mb-0"}>
            <SearchSave recordCount={recordCount} setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
            <TrainingsCertificatesPage searchTerm={searchTerm} onRecordCountChange={handleRecordCountChange} />
           
          </div>
        </div>
      </div>
    );
};

export default Index;
