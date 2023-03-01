import { Mesh, Color, MeshStandardMaterial, SphereGeometry } from "three";

const createSphere = (radius: number, color: Color | number = 0x777777 ): Mesh => {
    const geometry: SphereGeometry = new SphereGeometry( radius, 12, 6 );
    const material: MeshStandardMaterial = new MeshStandardMaterial( { color: color } );
    return new Mesh( geometry, material );
};

export default createSphere;
