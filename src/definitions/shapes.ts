export interface Orbits {
    mercury: PlanetOrbits;
    venus: PlanetOrbits;
    earth: PlanetOrbits;  //* Earth-Moon barycentre
    mars: PlanetOrbits;

    jupiter: PlanetOrbits;
    saturn: PlanetOrbits;
    uranus: PlanetOrbits;
    neptune: PlanetOrbits;
};

//* w is calculated at runtime
export interface PlanetOrbits {
    a: number;  //* Semi-major axis ( mean distance from sun )
    e: number;  //* Eccentricity
    i: number;  //* Inclination of elliptic
    n: number;  //* Longitude of ascending node
    p: number;  //* Longitude of perihelion
    l: number;  //* Mean longitude
    s: number;  //* Sidereal period
    w: number;  //* Argument of perihelion ( angle of ascending node to perihelion )
    m: (d: number) => number; //* Calculate mean anomaly ( d is days from epoch, J2000 - 01/01/2000 )
};

export interface Traits {
    mercury: PlanetTraits;
    venus: PlanetTraits;
    earth: PlanetTraits;  //* Earth-Moon barycentre
    mars: PlanetTraits;

    jupiter: PlanetTraits;
    saturn: PlanetTraits;
    uranus: PlanetTraits;
    neptune: PlanetTraits;
};

export interface PlanetTraits {
    radius: number; //* Mean Radius
    mass: number;   //* Mass of planet
    density: number;   //* Bulk density
    day: number; //* Length of day in hours
    gravity: number; //* Equatorial gravity
    moons: number; //* Number of moons
};

// MPC data referenced from:
// https://www.asterank.com/mpc
// https://minorplanetcenter.net//iau/info/MPOrbitFormat.html
export interface MPC {
    G: number;
    H: number;
    M: number;
    U: string;
    a: number;
    comp: string;
    d: number;
    des: string;
    e: number;
    epoch: string;
    flags: string;
    i: number;
    last_obs: string;
    num_obs: number;
    num_opp: number;
    om: number;
    pert_c: string;
    pert_p: string;
    readable_des: string;
    ref: string;
    rms: number;
    w: number;
};

export interface Date { 
    year: number, 
    month: number, 
    day: number 
};
