import Coffee from "components/Coffee";
import { FC } from "react";
import { ICoffeesProps } from "./types";

const Coffees: FC<ICoffeesProps> = ({ name, coffees }) => {
    return <>
        {
            coffees.map((coffee, index) => {
                return (
                    <div className="inline-block" key={index}>
                        <Coffee name={name} size={coffee.size} coffee={coffee.coffee} count={coffee.count} />
                    </div>
                )
            })
        }
    </>
}

export default Coffees