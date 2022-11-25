import { useEffect, useState } from "react";
import { isBrowser } from "utils/functions";

const usePageHeight = () => {
  const [height, setHeight] = useState<string | number>(
    isBrowser() ? `calc(${innerHeight}px)` : `calc(100vh - 86px)`
  );

  useEffect(() => {
    setHeight(innerHeight);
    visualViewport.addEventListener("resize", (e) => {
      setHeight((e.target as VisualViewport).height);
      document.documentElement.scrollTop = 0;
    });
  }, []);

  return [height];
};

export default usePageHeight;
