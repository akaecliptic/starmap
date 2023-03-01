import { Color, PerspectiveCamera, Scene, Vector2, WebGLRenderer } from "three";
import { EffectComposer, OrbitControls, OutlinePass, RenderPass } from "three-stdlib";
import { ThreeClock, ThreeLifeCycle } from "definitions/alias";
import { createStore } from "solid-js/store";
import createCubemap from "functions/createCubemap";

let renderer: WebGLRenderer;

let composer: EffectComposer;
let outline: OutlinePass;
let render: RenderPass;

let controls: OrbitControls;
let camera: PerspectiveCamera = new PerspectiveCamera(90, window.innerWidth / window.innerHeight, .1, 1_000);
let scene: Scene = new Scene();

const [ clock, setClock ] = createStore<ThreeClock>({ deltaTime: 0, time: 0 });

const createThree: ThreeLifeCycle = () => {
    const init = ( canvas: HTMLCanvasElement ) => {
        scene.background = new Color(0x777777);
        createCubemap(scene);
        
        renderer = new WebGLRenderer({ canvas: canvas });
        renderer.setSize( window.innerWidth, window.innerHeight );
        
        render = new RenderPass( scene, camera );
        outline = new OutlinePass( new Vector2( window.innerWidth, window.innerHeight ), scene, camera );
        outline.edgeGlow = .5;
        outline.edgeStrength = 5;

        composer = new EffectComposer( renderer );
        composer.addPass( render );
        composer.addPass( outline );

        controls = new OrbitControls( camera, renderer.domElement );

        controls.enablePan = false;
        controls.minDistance = 5;
        controls.maxDistance = 500;
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        
        window.addEventListener( 'resize', () => {
            renderer.setSize( window.innerWidth, window.innerHeight );
            composer.setSize( window.innerWidth, window.innerHeight );
            
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        });

        if ( !clock.time ) animate();
    };

    const cleanup = () => {
        renderer.dispose();
    };

    return { init, cleanup, context: { camera, scene } }
}

const animate = ( timestamp: number = 0 ) => {
    requestAnimationFrame( animate );

    if ( !clock.time ) {
        setClock('time', timestamp);
        return;
    }
    
    setClock('deltaTime', timestamp - clock.time);
    setClock('time', timestamp);
    
    controls.update();
    composer.render();
};

export { clock, outline };
export default createThree;
