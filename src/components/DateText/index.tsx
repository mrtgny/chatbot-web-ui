import { FC } from "react";
import { dateToTime } from "utils/functions";
import { IDateTextProps } from "./types";

const DateText: FC<IDateTextProps> = ({ date }) => {
  return <span className="date-text">{dateToTime(date)}</span>;
};

export default DateText;
