import { useEffect, useState } from "react";
import { isBrowser } from "utils/functions";

const usePageHeight = () => {
    const [height, setHeight] = useState(isBrowser() ? `calc(${innerHeight}px)` : `calc(100vh - 86px)`);

    useEffect(() => {
        setHeight(`${innerHeight}px`);
        visualViewport.addEventListener('resize', e => {
            setHeight(`${(e.target as VisualViewport).height}px`)
            document.documentElement.scrollTop = 0;
        })
    }, [])

    return [height]
}

export default usePageHeight