import { Scene, CubeTextureLoader } from "three";

const createCubemap = ( scene: Scene ): void => {
    new CubeTextureLoader()
        .setPath('/cubemap/')
        .load([
            'right.png',
            'left.png',
            'top.png',
            'bottom.png',
            'front.png',
            'back.png'
        ], cubemap => scene.background = cubemap);
};

export default createCubemap;
