import React from "react";

type ProjectPageProps = {
    title?: string
    moreButtonOnClick?: () => void
    ProjectsPage?: React.ReactNode[]
}
const ProjectList = ({moreButtonOnClick, ProjectsPage}: ProjectPageProps) => {
    return (
        <div className={"items-center gap-8 h-full overflow-x-auto overflow-y-hidden noscrollbar"}>
            {ProjectsPage?.map((item, index) => (
                    <div key={index}>
                        {item}
                    </div>
            ))}
        </div>
        );
}
export default ProjectList