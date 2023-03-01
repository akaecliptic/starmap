import axios from "axios";
import { MPC } from "definitions/shapes";
import { createResource } from "solid-js";

const getData = async (): Promise<MPC[]> => {
    try {
        const response = await axios.get('https://www.asterank.com/api/mpc');
        return response.data;
    } catch ( error: any ) {
        if ( error.response ) {
            console.log('Response error from mpcs');
            console.log('Data:', error.response.data);
            console.log('Status Code:', error.response.status);
        } else if ( error.request ) {
            console.log('Error requesting mpcs:', error.request);
        } else {
            console.log('Error requesting mpcs:', error.message);
        }
        return [];
    }
};

const [mpcs, { refetch }] = createResource(getData, { initialValue: [] });

export { refetch as rempcs };
export default mpcs;
