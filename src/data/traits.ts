import { Traits } from "definitions/shapes";

/*
    radius [km]
    mass [x10^24 kg]
    density [kg/m^3]
    day [hr]
    gravity [m/s^2]
*/

const traits: Traits = {
    mercury: {
        radius: 2439.4,
        mass: 0.330,
        density: 5429,
        day: 4222.6,
        gravity: 3.70,
        moons: 0
    },
    venus: {
        radius: 6051.8,
        mass: 4.87,
        density: 5243,
        day: -2802.0,
        gravity: 8.87,
        moons: 0
    },
    earth: {
        radius: 6371,
        mass: 5.97,
        density: 5514,
        day: 24.0,
        gravity: 9.80,
        moons: 1
    },
    mars: {
        radius: 3389.5,
        mass: 0.642,
        density: 3934,
        day: 24.7,
        gravity: 3.71,
        moons: 2
    },
    jupiter: {
        radius: 69911,
        mass: 1898,
        density: 1326,
        day: 9.9,
        gravity: 24.79,
        moons: 92
    },
    saturn: {
        radius: 58232,
        mass: 568,
        density: 687,
        day: 10.7,
        gravity: 10.44,
        moons: 83
    },
    uranus: {
        radius: 25362,
        mass: 86.8,
        density: 1270,
        day: -17.2,
        gravity: 8.87,
        moons: 27
    },
    neptune: {
        radius: 24622,
        mass: 102,
        density: 1638,
        day: 16.1,
        gravity: 11.15,
        moons: 14
    }
};

export default traits;
