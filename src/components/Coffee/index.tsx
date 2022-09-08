import CoffeeCup from "assets/images/coffee-cup.png";
import { FC } from "react";
import { ICoffeeProps } from "./types";

const Coffee: FC<ICoffeeProps> = ({ name, size, count, coffee }) => {
    const sizes = {
        tall: 100,
        grande: 150,
        venti: 200
    };
    const width = sizes[size];

    const nameStyle = {
        width: width - 30,
        fontSize: (width / Math.max(...name.split(" ").map(i => i.length))) + 10,
        marginTop: 16 - width / Math.max(...name.split(" ").map(i => i.length)),
    };

    return (
        <div className="coffee-cup-container">
            <div className="badge">
                <div className="flex justify-center items-center h-full">
                    x{count}
                </div>
            </div>
            <img src={CoffeeCup.src} alt="Coffee Cup" className="coffee-cup-image" style={{ width }} />
            <div className="coffee-cup-name" style={nameStyle}>
                {name}
            </div>
            <div className="coffee-cup-coffee">
                {coffee}
            </div>
        </div>
    )
};

export default Coffee;