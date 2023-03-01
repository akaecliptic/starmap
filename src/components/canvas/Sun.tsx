import { Component, onCleanup, onMount } from "solid-js";
import useThree from "libs/threejs";
import { Color, Mesh, MeshStandardMaterial, Object3D } from "three";

export type PropSun = {
    model: Object3D;
};

const Sun: Component<PropSun> = (props) => {
    const { context: { scene } } = useThree();

    onMount( () => {
        const material: MeshStandardMaterial = (props.model as Mesh).material as MeshStandardMaterial;
        material.emissive = new Color(0xFCB251);

        scene.add(props.model);
    });

    onCleanup( () => scene.remove(props.model) );

    return <></>;
};

export default Sun;
