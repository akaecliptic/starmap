import { onCleanup, onMount, ParentComponent } from "solid-js";
import createThree from "libs/threejs";

const Canvas: ParentComponent = (props) => {
    const { init, cleanup, context: { camera } } = createThree();
    
    onMount( () => {
        const canvas: HTMLCanvasElement = document.getElementById('render-target') as HTMLCanvasElement;
        init(canvas);

        camera.position.z = 50;
    });

    onCleanup( () => {
        cleanup();
    });

    return (
        <>
            { props.children }
            <canvas id='render-target' />
        </>
    );
};

export default Canvas;
