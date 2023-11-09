// CurriculumComponent.tsx
import React, { useEffect, useState } from "react";
import {SectionComponent} from "@/app/presentation/pages/StudentPages/Lesson/components/Curriculum/Section";
import { useApi } from "../../../../../../../../pages/_app";
interface CurriculumProps {
    curriculum: any;
    educationId:any;
    isFollowing:any;
}

export const CurriculumComponent: React.FC<CurriculumProps> = ({ curriculum,educationId,isFollowing }) => {
    const [activeSection, setActiveSection] = useState<string | null>(null); // activeSection state'ini ekledik
    console.log("curriculum",curriculum)
    
    return (
        <div className="space-y-4">
            {curriculum?.sections?.map((section:any, index:number) => (
                <SectionComponent
                    key={section.name}
                    educationId={educationId}
                    section={section}
                    order={index}
                    isFollowing={isFollowing}
                    isActive={section.name === activeSection}
                    onClick={() => {
                        setActiveSection(currentActiveSection =>
                            currentActiveSection === section.name ? null : section.name
                        )
                    }}
                />
            ))}
        </div>
    );
}

