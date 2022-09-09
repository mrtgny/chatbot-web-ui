import { isBrowser } from "utils/functions";

const Welcome = () => {
    const height = isBrowser() ? `calc(${window.innerHeight}px - 86px)` : `calc(100vh - 86px)`;
    return (
        <div className="page flex justify-center items-center">
            <div className="container">
                <div className="welcome-container h-full">
                    <div className="flex flex-col items-center justify-around" style={{ height }}>
                        <div className="welcome-title">
                            Welcome to CoffeeInLove
                        </div>
                        <div className="welcome-dsc">
                            Have you taste our delicious coffees?
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome;