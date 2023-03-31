import { ImageLoader } from "next/image";
import { MouseEventHandler } from "react";
import { APP_CDN_API } from "./constants";

const isBrowser = () => typeof window !== "undefined";

const dateToTime = (date: Date | string) => {
  if (!date) return "";
  if (typeof date === "string") {
    date = new Date(date);
  }
  const hh = date.getHours();
  const mm = date.getMinutes();

  return [hh, (mm > 9 ? "" : "0") + mm].join(":");
};

const dateToPastTime = (_date: Date) => {
  if (typeof _date === "string") {
    _date = new Date(_date);
  }
  const date = new Date(new Date().getTime() - _date.getTime());
  return date;
};

const preventZoom = () => {
  let lastTouchEnd = 0;
  const onTouchMove: EventListener = (event: Event) => {
    if (event.scale !== undefined && event.scale !== 1) {
      event.preventDefault();
    }
  };
  const onTouchEnd = (event: TouchEvent) => {
    const now = new Date().getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  };
  document.addEventListener("touchmove", onTouchMove, { passive: false });
  document.addEventListener("touchend", onTouchEnd, false);
  return () => {
    document.removeEventListener("touchmove", onTouchMove);
    document.removeEventListener("touchend", onTouchEnd);
  };
};

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const capitalize = (word: string) => {
  if (word) return word;
  const _word = word.split("");
  _word[0] = _word[0].toUpperCase();
  return _word;
};

function dateToStr(date: string) {
  if (!date) return "";
  return new Date(date).toLocaleString();
}

const stopPropagation: MouseEventHandler = (e) => {
  e.stopPropagation();
};

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
    return (
      navigator.userAgent.match(/IEMobile/i) ||
      navigator.userAgent.match(/WPDesktop/i)
    );
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

export const cdnLoader: ImageLoader = ({ src, width, quality = 100 }) => {
  return `${APP_CDN_API}/rt:fit/rs:auto:${width}/q:${quality}/plain/s3://website-images/${src}`;
};

export {
  isMobile,
  dateToPastTime,
  dateToTime,
  preventZoom,
  dateToStr,
  capitalize,
  isBrowser,
  getRandomColor,
  stopPropagation,
};
