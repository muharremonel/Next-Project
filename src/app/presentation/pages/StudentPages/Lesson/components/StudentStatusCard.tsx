import React, { useEffect, useState } from 'react';
import { Divider } from "@mui/material";
import { Button } from "@/app/presentation/components";
import { useApi } from "../../../../../../../pages/_app";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { getUserToken } from "@/api";
import { BASE_URL } from "@/config";

interface StudentStatusProps {
    attendanceStatus?: string;
    successStatus?: string;
    successScore?: string;
    spentTime?: string;
    completionRate?: number;
    isFollowing: boolean
    favorite: boolean
}

const StudentStatusCard: React.FC<StudentStatusProps> = ({
    attendanceStatus,
    successStatus = "-",
    successScore = "-",
    spentTime = "-",
    completionRate = 0,
    isFollowing,
    favorite
}) => {

    const api = useApi();
    const { query } = useRouter();
    const id = query.id ? String(query.id) : '';
    const [isUserFollowing, setIsUserFollowing] = useState(isFollowing);
    const [isUserFavorite, setIsUserFavorite] = useState(favorite);
    const router = useRouter()
    const [isLogin, setIsLogin] = useState(false)
    const [user, setUser] = useState<any>()

    useEffect(() => {
        (async () => {
            const userData = (await api.getUser() as any)?.data
            if (userData) {
                setUser(userData);
            }
        })()
    }, [])


    async function joinCourse() {
        const userToken = await getUserToken();
        console.log(user)
        if (user) {
            const response = await api.joinCourse({ token: userToken, educationId: id });
            if (response.status === "success") {
                toast.success(response.message);
                setIsUserFollowing(!isUserFollowing);  // Durumu güncelliyoruz
            } else {
                toast.error(response.message);
            }
        }else{
            toast.error("Kullanıcı bilgileri alınırken bir hata oluştu")
        }
    }

    async function toggleFavorite() {
        const userToken = await getUserToken();
        const response = await api.toggleFavorites({ token: userToken, educationId: id });
        if (response.status === "success") {
            toast.success(response.message);
            setIsUserFavorite(!isUserFavorite);  // Durumu güncelliyoruz
        } else {
            toast.error(response.message);
        }
    }

    // async function getUser() {

    useEffect(() => {
        (async () => {
            const response = await api.getAuth();
            if (response?.status === "success") {
                setIsLogin(true)
                return response.data;
            } else {
                // toast.error(response?.message);
                return null;
            }
        })()
    }, [])
    // }

    return (
        <div className="w-full h-full p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between mb-4">
                <span className="font-medium">Katılım Durumu:</span>
                <span>{isUserFollowing ? "Kayıtlı" : "Kayıtsız"}</span>
            </div>
            <div className="flex justify-between mb-4">
                <span className="font-medium">Başarı Durumu:</span>
                <span>{successStatus}</span>
            </div>
            <div className="flex justify-between mb-4">
                <span className="font-medium">Başarı Puanı:</span>
                <span>{successScore}</span>
            </div>
            <div className="flex justify-between mb-4">
                <span className="font-medium">Harcanan Süre:</span>
                <span>{spentTime}</span>
            </div>
            <div className="flex justify-between mb-4">
                <span className="font-medium">Tamamlanma Oranı:</span>
                <span>{completionRate}%</span>
            </div>
            <div className="flex justify-between mb-4">
                <span className="font-medium">Programa Kayıt Tarihi:</span>
                <span>01.11.2023</span>
            </div>
            <Divider className="my-4" />
            {
                isUserFollowing ? (
                    <Button
                        type="secondary"
                        text="Programa Başla"
                        onClick={() => router.push(`/kayitli-ders-odasi/${id}?section=0&lesson=0`)}
                    />
                ) : (
                    <Button
                        type="primary"
                        text="Programa Kayıt Ol"
                        onClick={() => {
                            isLogin ? joinCourse() : router.push("/giris")
                        }}
                    />
                )
            }
            <div className='mb-2 mt-2'>
                <Button
                    type="orange"
                    text="Final Sınavı"
                    onClick={() => toast.error("Final Sınavı Henüz Açılmamıştır")}
                />
            </div>
            <div
                onClick={() => {
                    isLogin ? toggleFavorite() : router.push("/giris")
                }}
                className="mt-4 flex justify-start items-center cursor-pointer text-primary hover:bg-blue-100 p-2 rounded">
                {isUserFavorite ? "Favorilerden Çıkar" : "Favorilere Ekle"}
            </div>
        </div>
    );
};

export default StudentStatusCard;
