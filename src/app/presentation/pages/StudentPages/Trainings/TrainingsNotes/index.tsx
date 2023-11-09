import React from 'react';
import SearchSave from "../components/SearchSave";
import TrainingsNotesPage from './TrainingsNotesPage';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import LeftNav from '../components/LeftNav';
import LinkMenu from '../components/LinkMenu';
import TrainingsList from '../components/TrainingsList';

const FakePropositions = [
    <TrainingsNotesPage key={"1"} time={"00:10"} mode1={"1. Giriş"} mode2={"1.3. Bazı Problemlere Çözüm Önerileri"}
        title={"Unity Oyun Geliştirmeyi Oyun Geliştirerek Öğren"} subject={"Lorem ipsum dolor sit amet consectetur. Sem cursus at nulla molestie ac turpis sagittis curabitur eu. Posuere in netus aliquam interdum lorem lectus pulvinar. Lorem ipsum dolor sit amet consectetur. Sem cursus at nulla molestie ac turpis sagittis curabitur eu. Posuere in netus aliquam interdum lorem lectus pulvinar."}/>,
    <TrainingsNotesPage key={"2"} time={"03:10"} mode1={"1. Giriş"} mode2={"1.4. Bazı Kısayol Tuşları"}
    title={"Etik Hackerlik ve Siber Güvenlik"} subject={"Lorem ipsum dolor sit amet consectetur. Sem cursus at nulla molestie ac turpis sagittis curabitur eu. Posuere in netus aliquam interdum lorem lectus pulvinar. Lorem ipsum dolor sit amet consectetur. Sem cursus at nulla molestie ac turpis sagittis curabitur eu. Posuere in netus aliquam interdum lorem lectus pulvinar."}/>,
    <TrainingsNotesPage key={"3"} time={"10:00"} mode1={"2. Temel Ağ (Network) Bilgisi"} mode2={"1.3. Başlıca Ağ Donanımları"}
    title={"Girişimcilik - İş Geliştirme ve Dijital Pazarlama Eğitimi"} subject={"Lorem ipsum dolor sit amet consectetur. Sem cursus at nulla molestie ac turpis sagittis curabitur eu. Posuere in netus aliquam interdum lorem lectus pulvinar. Lorem ipsum dolor sit amet consectetur. Sem cursus at nulla molestie ac turpis sagittis curabitur eu. Posuere in netus aliquam interdum lorem lectus pulvinar."}/>,
    <TrainingsNotesPage key={"4"} time={"05:30"} mode1={"2. Temel Ağ (Network) Bilgisi"} mode2={"1.3. Başlıca Ağ Donanımları"}
    title={"Mobil Oyun Yapımı Eğitimi - Android"} subject={"Lorem ipsum dolor sit amet consectetur. Sem cursus at nulla molestie ac turpis sagittis curabitur eu. Posuere in netus aliquam interdum lorem lectus pulvinar. Lorem ipsum dolor sit amet consectetur. Sem cursus at nulla molestie ac turpis sagittis curabitur eu. Posuere in netus aliquam interdum lorem lectus pulvinar."}/>,
    <TrainingsNotesPage key={"5"} time={"01:40"} mode1={"3. Temel İşletim (OS) Sistemi Bilgisi - GNU/linux"} mode2={"İşletim Sistemi (OS) Sınıfları"}
    title={"KOSGEB İçin İş Planı Hazırlama"} subject={"Lorem ipsum dolor sit amet consectetur. Sem cursus at nulla molestie ac turpis sagittis curabitur eu. Posuere in netus aliquam interdum lorem lectus pulvinar. Lorem ipsum dolor sit amet consectetur. Sem cursus at nulla molestie ac turpis sagittis curabitur eu. Posuere in netus aliquam interdum lorem lectus pulvinar."}/>,
    
   
]

const Index = () => {

    const [searchTerm, setSearchTerm] = React.useState("");
    const [currentPage, setCurrentPage] = React.useState(1);
    const recordsPerPage = 4;

    const filteredPropositions = FakePropositions.filter((proposition) => 
        proposition.props.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredPropositions.slice(indexOfFirstRecord, indexOfLastRecord);

    return (
    <div className={"w-full h-max"}>
        <LinkMenu/>
        <div className={"flex flex-col md:flex-row gap-8 p-4 md:p-10"}>
            <div className={"w-full md:w-1/4 h-full rounded-lg"}>
                <LeftNav/>
            </div>
            <div className={"w-full md:w-3/4 h-full rounded-lg mb-4 md:mb-0"}>
                <SearchSave recordCount={filteredPropositions.length} setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
                <TrainingsList TrainingsPage={currentRecords} moreButtonOnClick={console.log} />
                <Stack spacing={2} className='flex items-center mt-5'>
                    <Pagination 
                        size='large' 
                        count={Math.ceil(filteredPropositions.length / recordsPerPage)} 
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