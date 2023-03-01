import { PlanetOrbits } from "definitions/shapes";

export const calculateX = (body: PlanetOrbits, x1: number, y1: number, round: boolean = false): number => {
    const x =
    (( Math.cos(body.w) * Math.cos(body.n) - Math.sin(body.w) * Math.sin(body.n) * Math.cos(body.i) ) * x1) + 
    ((-Math.sin(body.w) * Math.cos(body.n) - Math.cos(body.w) * Math.sin(body.n) * Math.cos(body.i) ) * y1);

    return round ? Math.round(x * 100) / 100 : x;
};

export const calculateY = (body: PlanetOrbits, x1: number, y1: number, round: boolean = false): number => {
    const y = 
    (( Math.cos(body.w) * Math.sin(body.n) + Math.sin(body.w) * Math.cos(body.n) * Math.cos(body.i) ) * x1) + 
    ((-Math.sin(body.w) * Math.sin(body.n) + Math.cos(body.w) * Math.cos(body.n) * Math.cos(body.i) ) * y1);

    return round ? Math.round(y * 100) / 100 : y;
};

export const calculateZ = (body: PlanetOrbits, x1: number, y1: number, round: boolean = false): number => {
    const z = ((Math.sin(body.w) * Math.sin(body.i)) * x1) + ((Math.cos(body.w) * Math.sin(body.i)) * y1);
    return round ? Math.round(z * 100) / 100 : z;
};
