import React from 'react';
import { Avatar } from "@mui/material";

interface Instructor {
    name: string;
    avatarUrl: string;
}

interface Mentor {
    firstname: string;
    lastname: string;
    picture: string;
}

interface InstructorsCardProps {
    // instructors: Instructor[];
    mentors: Mentor
}

const InstructorsCard: React.FC<InstructorsCardProps> = ({ mentors }) => {
    return (
        <div className="w-full mt-4 p-4 bg-white rounded-lg shadow-md">
            <div className="font-bold mb-4">Eğitmenler</div>

            {/* {mentors.map((instructor, idx) => (
                <div key={idx} className="flex items-center mb-3">
                    <Avatar src={"https://cdn-icons-png.flaticon.com/512/1077/1077114.png"} className="mr-3"/>
                    <span>{mentors.firstname} {mentors.lastname}</span>
                </div>
            ))} */}
            <div className="flex items-center mb-3">
                <Avatar src={"https://api.digithane.tech" + mentors?.picture} className="mr-3" />
                <span>{mentors?.firstname} {mentors?.lastname}</span>
            </div>
        </div>
    );
};

export default InstructorsCard;
