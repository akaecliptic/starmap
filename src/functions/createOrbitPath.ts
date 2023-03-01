import { PlanetOrbits } from "definitions/shapes";
import { BufferGeometry, Line, LineBasicMaterial, Vector3 } from "three";
import { calculateX, calculateY, calculateZ } from "functions/calculateCoords";
import { calculateDayFromDate } from "functions/calculateDay";
import { SCALE } from "data/constants";

const calculateIterations = (period: number): [number, number] => {
    if ( period > 10_000 ) {
        return [ (period / 100) + 1, 100 ];
    } else if ( period > 1_000 ) {
        return [ (period / 10) + 1, 10 ];
    } else if ( period > 100 ) {
        return [ (period / 5) + 1, 5 ];
    } else {
        return [period + 1, 1];
    }
};

const createOrbitPath = (body: PlanetOrbits): Line => {
    const rad: number = Math.PI / 180;
    const points = [];
    const [iterations, multiplier] = calculateIterations(body.s);

	for( let i = 0; i <= iterations; i++ ) {
        const day = i * multiplier; 
		const M = ((body.m(-calculateDayFromDate(day)) % 360) - 180) * rad;
		const E = M - body.e * Math.sin(M);

        const y1 = body.a * SCALE * (Math.sqrt(1 - (body.e * body.e)) * Math.sin(E));
        const x1 = body.a * SCALE * (Math.cos(E) - body.e);

		points.push(
            new Vector3(
                calculateX(body, x1, y1), 
                calculateZ(body, x1, y1), 
                calculateY(body, x1, y1)
            )
        );
	}

    const geometry  = new BufferGeometry().setFromPoints(points);
	const material = new LineBasicMaterial({ color: 0xAAAAAA });

	return new Line( geometry, material );
};

export default createOrbitPath;
