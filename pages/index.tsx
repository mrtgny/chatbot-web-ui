import { SocketProvider } from "@reactivers/use-socket";
import ChatBot from "components/ChatBot";
import Show from 'components/Show';
import Welcome from "components/Welcome";
import { NextPage } from 'next/types';
import { useEffect, useState } from 'react';

const WS_URL = 'coffeebot.mrtgny.com/ws';

const Home: NextPage = () => {
    const [init, setInit] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setInit(true);
        }, 3000);
    }, [])

    return (
        <div className="min-w-[100vw]">
            <Show showIf={init}>
                <SocketProvider url={WS_URL} wss>
                    <ChatBot />
                </SocketProvider>
            </Show>
            <Show showIf={!init}>
                <Welcome />
            </Show>
        </div>
    )
}


export default Home;