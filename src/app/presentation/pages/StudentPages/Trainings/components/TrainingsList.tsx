import React from "react";

type TrainingsPageProps = {
    title?: string
    moreButtonOnClick?: () => void
    TrainingsPage?: React.ReactNode[]
}
const TrainingsList = ({moreButtonOnClick, TrainingsPage}: TrainingsPageProps) => {
    return (
        <div className={"items-center gap-8 h-full overflow-x-auto overflow-y-hidden noscrollbar"}>
            {TrainingsPage?.map((item, index) => (
                    <div key={index}>
                        {item}
                    </div>
            ))}
        </div>
        );
}
export default TrainingsList