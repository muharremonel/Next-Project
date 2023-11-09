// App.tsx
import React from 'react';
import {CurriculumComponent} from "@/app/presentation/pages/StudentPages/Lesson/components/Curriculum/Curriculum";

type CurriculumProps = {
    curriculum: any
    educationId:any
    isFollowing:any
}

const App = ({curriculum,educationId,isFollowing}:CurriculumProps) => {
    // console.log("burasi mi",curriculum)
    return (
        <div className={"flex flex-col gap-4"}>
            <div className={"text-2xl font-bold"}>Müfredat</div>

            <CurriculumComponent curriculum={curriculum?.curriculum} educationId={educationId} isFollowing={isFollowing}/>
        </div>
    );
}

export default App;
