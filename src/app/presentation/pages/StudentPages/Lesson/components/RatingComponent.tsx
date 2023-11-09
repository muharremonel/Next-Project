// RatingComponent.tsx
import React, {useEffect, useState} from 'react';
import {Typography, Rating} from "@mui/material";
import {useApi} from "../../../../../../../pages/_app";
import {toast} from "react-hot-toast";
import { getAuth } from '@/api';
import router from 'next/router';

interface RatingComponentProps {
    onRatingChange?: (value: number | null) => void;
    id: string
    rate: number
}

const RatingComponent: React.FC<RatingComponentProps> = ({onRatingChange, id, rate}) => {
    const [userRating, setUserRating] = useState<number | null>(rate);
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const api = useApi()
    useEffect(() => {
        (async () => {
            const login = (await getAuth() as any)?.status === 'success'

            if (login) {
                setIsLogin(true);
            } else {
                setIsLogin(false)
            }
        })()
    }, [router]);
    
    const handleRatingChange = async (event: React.ChangeEvent<{}>, newValue: number | null) => {
       if(isLogin){
        setUserRating(newValue);
        await rateEducation(newValue);
        if (onRatingChange) {
            onRatingChange(newValue);
        }
       }else{
        toast.error("Lütfen puan vermek için giriş yapınız")
       }
    };

    const rateEducation = async (rating: number | null) => {
        const response = await api.educationService?.rateEducation!(id, rating)
        if (response.status === "success") {
            toast.success(response.message)
        } else
            toast.error(response.message)
    }
    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Dersi Puanla:
            </Typography>
            <Rating
                name="user-rating"
                value={userRating}
                onChange={handleRatingChange}
                size="large"
            />
        </div>
    );
}

export default RatingComponent;
