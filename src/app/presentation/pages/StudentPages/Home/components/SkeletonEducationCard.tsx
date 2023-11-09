import React from "react";
import { Skeleton } from "@mui/material";

const EducationCardSkeleton = () => {
    return (
        <div
            style={{
                boxShadow:
                    "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
            }}
            className="relative w-[250px] h-[300px] md:w-[300px] md:h-[360px] rounded-3xl overflow-hidden transition-all cursor-pointer"
        >
            {/* Image Section */}
            <div className="relative h-[170px] w-full overflow-hidden">
                <Skeleton variant="rectangular" width="100%" height="100%" />

                {/* Label Section */}
                <div className="absolute top-4 right-0 w-full flex justify-end">
                    <div className="w-2/4 h-[27px] rounded-l-full">
                        <Skeleton variant="text" width="100%" height="100%" />
                    </div>
                </div>
            </div>

            {/* Title Section */}
            <div className="flex flex-col w-full p-4 justify-between flex-grow">
                <Skeleton variant="text" height={20} width="70%" />
                <Skeleton variant="text" height={20} width="50%" />
                <Skeleton variant="text" height={20} width="60%" />
            </div>

            {/* Tags and Rating Section */}
            <div className="flex flex-col items-end h-full w-full">
                <div
                    style={{
                        borderRadius: "0px 0px 20px 20px",
                        border: "1px solid var(--primary-medium, #E9EAF0)",
                        background: "var(--primary-light, #F8F9FB)",
                    }}
                    className="h-[40px] w-full bg-gray-200 flex items-center p-4 justify-between absolute bottom-0"
                >
                    <div className="flex gap-2 items-center">
                        <Skeleton variant="circular" width={20} height={20} />
                        <Skeleton variant="text" width="50%" height="100%" />
                    </div>
                    <div className="flex gap-1">
                        <Skeleton variant="circular" width={20} height={20} />
                        <Skeleton variant="circular" width={20} height={20} />
                        <Skeleton variant="circular" width={20} height={20} />
                        <Skeleton variant="circular" width={20} height={20} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EducationCardSkeleton;
