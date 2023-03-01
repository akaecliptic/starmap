import orbitals from "data/orbitals";
import traits from "data/traits";
import { MPC, Orbits, PlanetOrbits, PlanetTraits, Traits } from "definitions/shapes";
import truncateValue from "functions/truncateValue";
import useFocusManager from "hooks/useFocusManager";
import mpcs from "libs/mpc";
import { Accessor, createEffect, createSignal } from "solid-js";

const [ focus ] = useFocusManager();
const [ data, setData ] = createSignal<string[]>([]);

const createDataMPC = (mpc: MPC) => {
    const data: string[] = [
        `[observations] ${mpc.num_obs}`,
        `[distance] ${mpc.a} AU`,
        `[eccentricity] ${mpc.e}`,
        `[inclination] ${truncateValue(mpc.i)} rads`
    ];
    setData(data);
};

const createDataPlanet = (planet: PlanetOrbits) => {
    const trait: PlanetTraits = traits[focus() as keyof Traits];
    const data: string[] = [
        `[radius] ${trait.radius} km`,
        `[mass] ${trait.mass}x10^24 kg`,
        `[density] ${trait.density} kg/m^3`,
        `[day] ${trait.day} hrs`,
        `[gravity] ${trait.gravity} m/s^2`,
        `[moons] ${trait.moons}`,
        
        `[distance] ${planet.a} AU`,
        `[eccentricity] ${planet.e}`,
        `[inclination] ${truncateValue(planet.i)} rads`,
        `[period] ${planet.s} days`
    ];
    setData(data);
};

const useFocusedData = (): Accessor<string[]> => {
    createEffect( () => {
        const planet: PlanetOrbits = orbitals[focus() as keyof Orbits]; 
        if ( planet ) {
            createDataPlanet(planet);
            return;
        } else {
            const mpc: MPC | undefined = mpcs().find( mpc => mpc.readable_des.toLowerCase().includes(focus()) );
            if ( !mpc ) return;
            createDataMPC(mpc);
        }
    });

    return data;
};

export default useFocusedData;
