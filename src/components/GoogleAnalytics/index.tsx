import Script from "next/script";
import { FC } from "react";
import { IGoogleAnalyticsProps } from "./types";

const GoogleAnalytics: FC<IGoogleAnalyticsProps> = ({
    gaId
}) => {
    if (process.env.NODE_ENV === "development")
        return null;
    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script id="google-analytics" dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
          `
            }} >
            </Script>
        </>
    )
}

export default GoogleAnalytics;