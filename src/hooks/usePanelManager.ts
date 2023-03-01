import { Accessor, createSignal, Setter } from "solid-js";

type Panel = 'menu' | 'search' | 'focus' | null;

const [ panel, setPanel ] = createSignal<Panel>(null);

const closePanel = () => {
    setPanel( null );
};

const usePanelManager = (): { panel: Accessor<Panel>, openPanel: Setter<Panel>, closePanel: () => void } => {
    return { 
        panel, 
        openPanel: setPanel, 
        closePanel 
    };
};

export default usePanelManager;
