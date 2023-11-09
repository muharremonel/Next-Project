import React, {useEffect} from 'react';
import {useRouter} from "next/router";

const Index = () => {
    const router = useRouter();

    useEffect(() => { router.push('/anasayfa') }, [router])
    return (
        <div className={'w-full h-full'}>
           
        </div>
    );
};

export default Index;