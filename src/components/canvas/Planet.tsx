import { Component, createEffect, createSignal, onCleanup, onMount } from "solid-js";
import useThree, { outline } from "libs/threejs";
import { Line, Object3D } from "three";
import { PlanetOrbits, PlanetTraits } from "definitions/shapes";
import { calculateX, calculateY, calculateZ } from "functions/calculateCoords";
import createOrbitPath from "functions/createOrbitPath";
import { playback } from "hooks/usePlayback";
import { SCALE } from "data/constants";
import useFocusManager from "hooks/useFocusManager";

export type PropPlanet = {
    trait: PlanetTraits;
    body: PlanetOrbits;
    model: Object3D;
};
/*
    TODO: Add Perturbations of Outer planets
    
    Planets past mars require additional calculations to maintain a level of accuracy.
    These need to be added to the calculation of the mean anomaly.

    TODO: Use better Eccentric anomaly

    Tried to iterate over E to get a more accurate value.
    Couldn't figure it out, so will come back after some studying.
*/
const Planet: Component<PropPlanet> = (props) => {
    const [ orbit, setOrbit ] = createSignal<Line>(new Line());
    const { context: { scene } } = useThree();
    const [ focus ] = useFocusManager();
    
    const body: PlanetOrbits = props.body;
    const rad: number = Math.PI / 180;
    const deg: number = 180 / Math.PI;

    onMount( () => {
        body.w = (body.p - body.n) * rad;
        body.i = body.i * rad;
        body.n = body.n * rad;

        const scalar: number = props.trait.radius / 20_000;
        props.model.scale.set(scalar, scalar, scalar);
        setOrbit( createOrbitPath(body) );

        scene.add(props.model, orbit());
    });

    onCleanup( () => {
        body.w = (body.p - body.n) * deg;
        body.i = body.i * deg;
        body.n = body.n * deg;

        scene.remove(props.model, orbit());
    });

    createEffect( () => {
        let M = ((body.m(-playback.value) % 360) - 180) * rad;
		const E = M - body.e * Math.sin(M);

        const y1 = body.a * SCALE * (Math.sqrt(1 - (body.e * body.e)) * Math.sin(E));
        const x1 = body.a * SCALE * (Math.cos(E) - body.e);

        props.model.position.set(
            calculateX(body, x1, y1), 
            calculateZ(body, x1, y1), 
            calculateY(body, x1, y1)
        );

        //This is just for show. At the limited interval rates from playback, a more accurate rotation was less flashy.
        //* CONSIDER: Toggle in settings?
        const rotate: number = (15 * (props.trait.day / 24));
        props.model.rotateY(rotate * rad);
    });

    createEffect( () => {
        if ( focus() === props.model.name )
            outline.selectedObjects = [props.model];
    });

    return <></>;
};

export default Planet;
