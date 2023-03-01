import useThree from "libs/threejs";
import { Component, onCleanup, onMount } from "solid-js";
import { AmbientLight, PointLight } from "three";

const Lights: Component = () => {
    const { context: { scene } } = useThree();
    const pointLight = new PointLight( 0xFCDCB1, 1 );
    const ambientLight = new AmbientLight( 0x777777, .5 );
    
    onMount( () => scene.add( pointLight, ambientLight ) );

    onCleanup( () => scene.remove( pointLight, ambientLight ) );

    return <></>;
};

export default Lights;
