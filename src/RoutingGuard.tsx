import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import publicPaths from "@/publicPaths";
import { getAuth, getUser } from "@/api";

function RouteGuard({ children }: any) {

    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<any>(async () => (await getAuth())?.status === 'success');

    const isLogin = async () => {
        const response = await getAuth();
        setIsAuthenticated(response?.status === "success");
    };

    const isPublicPath = (path: string): boolean => {
        // Sabit public yolları kontrol et
        if (publicPaths.includes(path)) return true;

        // /ders/{some-id} yapısındaki yolları kontrol et
        const coursePathRegex = /^\/ders\/[\da-fA-F]+$/; // bu regex hexadecimal stringleri kabul eder
        if (coursePathRegex.test(path)) return true;

        return false;
    };

    useEffect(() => {
        (async () => {
            await isLogin();
        })()
    }, [router]);

    useEffect(() => {
        const currentPath = router.asPath.split('?')[0];
        if (!isPublicPath(currentPath) && !isAuthenticated) {
            router.push('/giris');
        }
    }, [isAuthenticated, router]);

    const currentPath = router.asPath.split('?')[0];
    return isAuthenticated || isPublicPath(currentPath) ? children : null;
}

export default RouteGuard;

