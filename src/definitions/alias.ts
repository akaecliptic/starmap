import { Accessor } from "solid-js";
import { PerspectiveCamera, Scene } from "three";

export type ThreeLifeCycle = () => { 
    init: (canvas: HTMLCanvasElement) => void;
    cleanup: () => void;
    context: ThreeContext;
};

export type ThreeContext = {
    scene: Scene;
    camera: PerspectiveCamera;
};

export type ThreeClock = {
    deltaTime: number;
    time: number;
};

export type PlaybackRate = {
    rate: number;
    value: number;
    interval: number;
};

export type PlaybackController = {
    intervalIndex: number;
    rateIndex: number;
    updateInterval: (increment?: boolean) => void;
    updateRate: (increment?: boolean) => void;
    stort: () => void;
};

export type Settings = {
    axis: boolean;
    mpcs: boolean;
};

export type SearchableItems<T> = {
    items: [ planets: Accessor<T>, mpcs: Accessor<T> ];
    display: DependantFiltered<T, string>;
};

export type AttributeRef<T> = T | undefined;
export type Dependant<T> = () => T;
export type DependantFiltered<T, F> = (filter?: F) => T;
