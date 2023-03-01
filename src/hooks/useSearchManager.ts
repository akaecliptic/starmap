import { PropItem } from "components/interface/search/Item";
import { Dependant, DependantFiltered, SearchableItems } from "definitions/alias";
import { MPC } from "definitions/shapes";
import { createSignal } from "solid-js";

const [ mpcs, setMPCs ] = createSignal<PropItem[]>([]);
const [ planets, setPlanets ] = createSignal<PropItem[]>([]);

// This looks very ugly
const items: Dependant<PropItem[]> = () => [...planets(), ...mpcs()];
const display: DependantFiltered<PropItem[], string> = (filter?: string) => {
    if (!filter) return items();
    return items().filter( item => item.name.toLowerCase().includes(filter.toLowerCase()) )
};

export const addSearchableMPCs = (mpcs: MPC[]) => {
    const formatted: PropItem[] = mpcs.map( mpc => 
        ({ 
            name: mpc.readable_des.split(' ')[1].toLowerCase(),
            category: 'mpc',
            a: mpc.a,
            e: mpc.e,
            i: mpc.i
        })
    );

    setMPCs( formatted );
};

export const addSearchablePlanets = (planets: PropItem[]) => {
    setPlanets( planets );
};

const useSearchManager = (): SearchableItems<PropItem[]> => {
    return { items: [ planets, mpcs ], display };
};

export default useSearchManager;