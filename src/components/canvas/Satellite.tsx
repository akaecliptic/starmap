import { Component, createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { SCALE } from "data/constants";
import { calculateX, calculateZ, calculateY } from "functions/calculateCoords";
import { calculateDayFromDate } from "functions/calculateDay";
import createSphere from "functions/createSphere";
import parseEpoch from "functions/parseEpoch";
import { playback } from "hooks/usePlayback";
import useThree, { outline } from "libs/threejs";
import { Mesh } from "three";
import { MPC } from "definitions/shapes";
import useFocusManager from "hooks/useFocusManager";

export type PropSatellite = {
    name: string;
    body: MPC;
};

const Satellite: Component<PropSatellite> = (props) => {
    const [self, setSelf] = createSignal<Mesh>(new Mesh());
    const { context: { scene } } = useThree();
    const [ focus ] = useFocusManager();
    
    const body: any = props.body;
    const { date: epoch } = parseEpoch(body.epoch);
    const rad: number = Math.PI / 180;
    const deg: number = 180 / Math.PI;

    let M: number = 0;

    onMount( () => {
        body.M = body.M * rad;
        body.w = body.w * rad;
        body.i = body.i * rad;
        body.d = body.d * rad;
        body.n = body.om * rad;

        setSelf( createSphere(.1, 0x777777) );
        M = body.M + body.d * -calculateDayFromDate(epoch.day, epoch.month, epoch.year);

        scene.add(self());
    });

    onCleanup( () => {
        body.M = body.M * deg;
        body.w = body.w * deg;
        body.i = body.i * deg;
        body.d = body.d * deg;
        delete body.n;

        scene.remove(self());
    });

    createEffect( () => {
        M = body.M + body.d * -playback.value;
		const E = M - body.e * Math.sin(M);
        
        const y1 = body.a * SCALE * (Math.sqrt(1 - (body.e * body.e)) * Math.sin(E));
        const x1 = body.a * SCALE * (Math.cos(E) - body.e);
        
        self().position.set(
            calculateX(body, x1, y1), 
            calculateZ(body, x1, y1), 
            calculateY(body, x1, y1)
        );
    });

    createEffect( () => {
        if ( focus() === props.name )
            outline.selectedObjects = [self()];
    });

    return <></>;
};

export default Satellite;
