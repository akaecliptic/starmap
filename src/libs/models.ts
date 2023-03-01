import { createResource } from "solid-js";
import { Object3D } from "three";
import { GLTF, GLTFLoader } from "three-stdlib";

const loader: GLTFLoader = new GLTFLoader();

const loadModels = async (): Promise<Map<string, Object3D>> => {
    const gltf: GLTF = await loader.loadAsync('/models/planets.glb');
    const map: Map<string, Object3D> = new Map();
    gltf.scene.children.forEach( child => map.set( child.name, child ) );
    return map;
};

const [ models ] = createResource<Map<string, Object3D>>(loadModels, { initialValue: new Map() });

export default models;
