import { MouseEventHandler } from "react";
import { ILecture } from "redux/features/schedule/types";
import { INITIAL_LECTURE, INITIAL_VALUES } from "./constants";

const isBrowser = () => typeof window !== "undefined";


const dateToTime = (date, ff = 'DD MMMM YYYY') => {
    if (!date)
        return '';
    if (typeof date === "string") {
        date = new Date(date);
    }
    const hh = date.getHours();
    const mm = date.getMinutes();

    return [hh, (mm > 9 ? '' : '0') + mm].join(':');
}

const dateToPastTime = (_date: Date) => {
    if (typeof _date === "string") {
        _date = new Date(_date);
    }
    const date = new Date(new Date().getTime() - _date.getTime());
    return date
}

const preventZoom = () => {
    document.addEventListener(
        'touchmove',
        function (event) {
            if (event['scale'] !== undefined && event['scale'] !== 1) {
                event.preventDefault();
            }
        },
        { passive: false }
    );
    var lastTouchEnd = 0;
    document.addEventListener(
        'touchend',
        function (event) {
            var now = new Date().getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        },
        false
    );
}

const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const capitalize = (word: string) => {
    if (word) return word;
    let _word = word.split("");
    _word[0] = _word[0].toUpperCase();
    return _word
}

function dateToStr(date: string) {
    if (!date) return '';
    return new Date(date).toLocaleString()
}

function abbreviateNumber(value) {
    var newValue = value;
    if (value >= 1000) {
        var suffixes = ["", "k", "m", "b", "t"];
        var suffixNum = Math.floor(("" + value).length / 3);
        var shortValue: string | number = '';
        for (var precision = 2; precision >= 1; precision--) {
            shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(precision));
            var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
            if (dotLessShortValue.length <= 2) { break; }
        }
        if ((shortValue as number) % 1 != 0) shortValue = (shortValue as number).toFixed(1);
        newValue = shortValue + suffixes[suffixNum];
    }
    return newValue as string;
}

const getLocalStorageLectures = () => window.localStorage.getItem("lectures")
const getLocalStorageValues = () => window.localStorage.getItem("values")


const getInitialLectures: () => ILecture[] = () => {
    if (!isBrowser()) return [];
    const localStorageLectures = getLocalStorageLectures();
    if (localStorageLectures === null) {
        return INITIAL_LECTURE
    }
    const lectures = JSON.parse(localStorageLectures || `[]`);
    return lectures
}

const getSchedule: () => string[][] = () => {
    if (!isBrowser()) return [];
    const schedule = Array(10).fill(Array(6).fill(1));
    return schedule
}


const makeMinuteString = (minute: number) => {
    const isStartTimeMinutesZero = minute < 10
    if (isStartTimeMinutesZero)`0${minute}`
    return minute
}

const getLectureEndTime = (startTime: Date, lectureTime: Date) => {
    return new Date(
        new Date().setHours(
            new Date(startTime).getHours() +
            new Date(lectureTime).getHours(),
            new Date(startTime).getMinutes() +
            new Date(lectureTime).getMinutes()
        )
    );
}

const getNextLectureStartTime = (startTime: Date, lectureTime: Date, breakTime: Date) => {
    return new Date(new Date().setHours(
        new Date(startTime).getHours() +
        new Date(lectureTime).getHours() +
        new Date(breakTime).getHours(),
        new Date(startTime).getMinutes() +
        new Date(lectureTime).getMinutes() +
        new Date(breakTime).getMinutes()
    ));
}

const getTimes: () => string[] = () => {
    if (!isBrowser()) return [];
    let startTime = new Date(new Date().setHours(8, 30, 0, 0));
    const breakTime = new Date(new Date().setHours(0, 10, 0, 0));
    const lectureTime = new Date(new Date().setHours(0, 50, 0, 0));
    const times = [];

    for (let i = 0; i <= 9; i++) {
        const tempStartTime = new Date(startTime);
        const endTime = getLectureEndTime(startTime, lectureTime)
        startTime = getNextLectureStartTime(startTime, lectureTime, breakTime)

        const startTimeHour = tempStartTime.getHours();
        const startTimeMinute = tempStartTime.getMinutes()
        const startTimeString = `${startTimeHour}.${makeMinuteString(startTimeMinute)}`

        const endTimeHour = endTime.getHours();
        const endTimeMinute = endTime.getMinutes()
        const endTimeString = `${endTimeHour}.${makeMinuteString(endTimeMinute)}`
        const timeString = `${startTimeString} - ${endTimeString}`;
        times.push(timeString);
    }

    return times
}

const stopPropagation: MouseEventHandler<any> = (e) => {
    e.stopPropagation();
}

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows()
        );
    },
};

const getInitialValues = () => {
    if (!isBrowser()) return [];
    const localStorageValues = getLocalStorageValues();
    if (localStorageValues === null) {
        return INITIAL_VALUES
    }
    const values: string[][] = JSON.parse(localStorageValues || "[]");
    return values
}

export { isMobile, dateToPastTime, dateToTime, preventZoom, dateToStr, capitalize, isBrowser, getRandomColor, abbreviateNumber, getInitialLectures, getSchedule, getTimes, getInitialValues, stopPropagation };
