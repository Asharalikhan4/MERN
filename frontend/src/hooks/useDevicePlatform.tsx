import { useEffect, useState } from "react";

export default function useDevicePlatform(): string {
    const [platform, setPlatform] = useState<string>("");

    const userAgent = navigator.userAgent;

    useEffect(() => {
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
    }, [userAgent]);

    return platform;
};