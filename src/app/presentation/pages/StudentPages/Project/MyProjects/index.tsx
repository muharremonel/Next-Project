import React, { useState, useEffect } from 'react';
import LeftMenu from "../components/LeftNav";
import ProjectCardPage from "./ProjectCardPage";
import SearchSave from "../components/SearchSave";
import Breadcrumb from "../components/Breadcrumb";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { getUser } from '@/api';
import { BASE_URL } from '@/config';

interface Project {
    projectName: string;
    logo: string;
    url?: string;
    subject: string;
    userId: string;
    status: string;
}

const Index = () => {
    const [projects, setProjects] = useState<Project[]>([]);
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
                        const filteredProjects = result.data.filter((project: Project) =>
                            project.userId === userId && project.status === "approved" 
                         );
                        setProjects(filteredProjects);
                    });
            }
        })();
    }, []);

    

    const filteredProjects = projects.filter(project => 
        project?.projectName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    

    const currentProjects = filteredProjects.slice(
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
                    <SearchSave recordCount={filteredProjects.length} setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
                    <ProjectCardPage projects={currentProjects} />
                    <Stack spacing={2} className='flex items-center mt-5'>
                        <Pagination 
                            size='large' 
                            count={Math.ceil(filteredProjects.length / recordsPerPage)} 
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
