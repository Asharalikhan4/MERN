import { useEffect, useState } from "react";

export default function useDevicePlatform(): string {
    const [platform, setPlatform] = useState<string>("");
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    const userAgent = navigator.userAgent;

    useEffect(() => {

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        if (userAgent.match(/Android/i)) {
            setPlatform("Android");
        } else if (userAgent.match(/iPhone|iPad|iPod/i)) {
            setPlatform("iOS");
        } else if (userAgent.match(/Windows/i)) {
            setPlatform("Windows");
        } else if (userAgent.match(/Mac/i)) {
            setPlatform("Mac");
        } else {
            setPlatform("Others");
        }

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [windowWidth, userAgent]);

    return platform;
}