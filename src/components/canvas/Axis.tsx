import useSettingsManager from "hooks/useSettingsManager";
import useThree from "libs/threejs";
import { Component, createEffect, onCleanup, onMount } from "solid-js";
import { BufferGeometry, Line, LineBasicMaterial, Vector3 } from "three";

const Axis: Component = () => {
    const { context: { scene } } = useThree();
	const [settings] = useSettingsManager();

	let lineY: Line;
	let lineX: Line;
	let lineZ: Line;

    function drawAxis() {
		const pointsY = [];
		const pointsX = [];
		const pointsZ = [];

		const materialY = new LineBasicMaterial( { color: 0x00FF00 });
		const materialX = new LineBasicMaterial( { color: 0xFF0000 });
		const materialZ = new LineBasicMaterial( { color: 0x0000FF });

		pointsY.push( new Vector3( 0, -100, 0 ) );
		pointsY.push( new Vector3( 0, 100, 0 ) );

		pointsX.push( new Vector3( -1000, 0, 0 ) );
		pointsX.push( new Vector3( 1000, 0, 0 ) );

		pointsZ.push( new Vector3( 0, 0, -1000 ) );
		pointsZ.push( new Vector3( 0, 0, 1000 ) );
	
		const geometryY  = new BufferGeometry().setFromPoints( pointsY );
		const geometryX  = new BufferGeometry().setFromPoints( pointsX );
		const geometryZ  = new BufferGeometry().setFromPoints( pointsZ );

		lineY = new Line( geometryY, materialY );
		lineX = new Line( geometryX, materialX );
		lineZ = new Line( geometryZ, materialZ );
	}

    onMount( () => {
		drawAxis();
		if ( !settings.axis ) return;
		scene.add( lineX, lineY, lineZ );
	});

	onCleanup( () => {
		if ( settings.axis ) scene.remove( lineY, lineX, lineZ );
	});

	createEffect( () => {
		if ( settings.axis ) {
			if ( scene.children.includes(lineX) ) return;
			scene.add( lineX, lineY, lineZ );
		} else {
			scene.remove( lineY, lineX, lineZ );
		}
	});

    return <></>;
};

export default Axis;
