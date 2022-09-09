import usePageHeight from "hooks/usePageHeight";

const Welcome = () => {
    const [height] = usePageHeight();
    return (
        <div className="page flex justify-center items-center" >
            <div className="container flex flex-col translate-x-0" style={{ height }}>
                <div className="flex flex-col items-center justify-around welcome-container" style={{ height: 'inherit' }}>
                    <div className="welcome-title">
                        Welcome to CoffeeInLove
                    </div>
                    <div className="welcome-dsc">
                        Have you taste our delicious coffees?
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome;