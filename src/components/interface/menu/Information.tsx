import { Component } from "solid-js";

const Information: Component = () => {
    return (
        <>
            <span>Hello,</span>
            <p>
                Welcome to starmap, a simple mini project built primarily using 
                <a href='https://www.solidjs.com/'>[solidjs]</a> <a href='https://threejs.org/'>[three.js]</a> and resources 
                like <a href='https://www.asterank.com/mpc'>[asterank]</a> <a href='https://ssd.jpl.nasa.gov/planets/approx_pos.html'>[nasa]</a> and
                this neat <a href='https://stjarnhimlen.se/comp/ppcomp.html'>[paper]</a>.
            </p>
            <p>
                I wanted this to be a quicker project, so this is in no way accurate. 
                But it may be revisited; I have some plans.
            </p>
            <p>
                Some great alternatives for your consideration 
                <a href='https://www.asterank.com/3d/'>[asterank]</a> <a href='https://typpo.github.io/spacekit/'>[spacekit]</a> <a href='https://solarsystem.nasa.gov/solar-system/our-solar-system/overview/'>[nasa]</a> 
            </p>

            <p>
                The source code, but beware <a href='https://github.com/akaecliptic/starmap'>[ 'Here be bugs' ]</a>
            </p>
        </>
    );
};

export default Information;
