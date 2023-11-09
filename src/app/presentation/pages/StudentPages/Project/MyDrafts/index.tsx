import React, { useState, useEffect } from 'react';
import LeftMenu from "../components/LeftNav";
import DraftCardPage from "./DraftCardPage";
import SearchSave from "../components/SearchSave";
import Breadcrumb from "../components/Breadcrumb";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { getUser } from '@/api'; 
import { BASE_URL } from '@/config';

interface Draft {
    projectName: string;
    logo: string;
    url?: string;
    subject: string;
    userId: string;
    status: string;
    _id:string;
}

const Index = () => {
    const [drafts, setDrafts] = useState<Draft[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 4;

    useEffect(() => {
        (async () => {
            const user = (await getUser());
            if (user && user.data) {
                const userId = user.data._id;
                fetch(`${BASE_URL}/projectProductionCenter`) 
                    .then(response => response.json())
                    .then(result => {
                        const filteredDrafts = result.data.filter((draft: Draft) => 
                            draft.userId === userId && draft.status === "draft" 
                        );
                        console.log(drafts);
                        setDrafts(filteredDrafts);
                    });
            }
        })();
    }, []);
    

    const filteredDrafts = drafts.filter(draft => 
        draft.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentDrafts = filteredDrafts.slice(
        (currentPage - 1) * recordsPerPage,
        currentPage * recordsPerPage
    );

    return (
        <div className="w-full h-max">
            <Breadcrumb />
            <div className="flex flex-col md:flex-row gap-8 p-4 md:p-10">
                <div className="w-full md:w-1/4 h-full rounded-lg">
                    <LeftMenu />
                </div>
                <div className="w-full md:w-3/4 h-full rounded-lg mb-4 md:mb-0">
                    <SearchSave recordCount={filteredDrafts.length} setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
                    <DraftCardPage drafts={currentDrafts} />
                    <Stack spacing={2} className='flex items-center mt-5'>
                        <Pagination 
                            size='large' 
                            count={Math.ceil(filteredDrafts.length / recordsPerPage)} 
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