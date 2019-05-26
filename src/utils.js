export function dateToStr(date, ff = 'DD MMMM YYYY') {
    if (!date)
        return '';
    if (typeof date === "string") {
        date = new Date(date);
    }
    const hh = date.getHours();
    const mm = date.getMinutes();

    return [hh, (mm > 9 ? '' : '0') + mm].join(':');
}

export function dateToPastTime(_date) {
    if (typeof _date === "string") {
        _date = new Date(_date);
    }
    const date = new Date() - _date;
    return date
}
