import { Date } from "definitions/shapes";

const shift = (char: string): number => {
    return (char.charCodeAt(0) < 65) ? Number(char) : char.charCodeAt(0) - 55;
};

const parseEpoch = (packed: string): { iso: string, date: Date } => {
    let iso: string = '';

    for (let i = 0; i < packed.length; i++) {
        iso += shift(packed.charAt(i));
        if (i > 1 && i !== packed.length - 1) iso += '-';
    }

    const date: Date = {
        year: Number(iso.split('-')[0]),
        month: Number(iso.split('-')[1]),
        day: Number(iso.split('-')[2])
    };

    return { iso, date };
};

export default parseEpoch;
