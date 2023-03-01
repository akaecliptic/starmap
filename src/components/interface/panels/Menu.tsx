import { AttributeRef } from "definitions/alias";
import usePanelManager from "hooks/usePanelManager";
import { FiInfo, FiSliders, FiX } from "solid-icons/fi";
import { Component, createSignal, Match, onCleanup, onMount, Switch } from "solid-js";
import Settings from "components/interface/menu/Settings";
import Information from "components/interface/menu/Information";

const Menu: Component = () => {
    const { closePanel } = usePanelManager();
    const [ active, setActive ] = createSignal<HTMLDivElement>();

    let refSettings: AttributeRef<HTMLDivElement>;
    let refInformation: AttributeRef<HTMLDivElement>;

    const toggleActive = (event: MouseEvent) => {
        const target: HTMLDivElement = event.currentTarget as HTMLDivElement;

        if ( target.classList.contains('active') ) return;

        if ( target !== refSettings ) refSettings!.classList.remove('active');
        if ( target !== refInformation ) refInformation!.classList.remove('active');

        target.classList.add('active');
        setActive(target);
    };

    onMount( () => {
        refSettings!.addEventListener('click', toggleActive);
        refInformation!.addEventListener('click', toggleActive);

        setActive(refSettings);
    });

    onCleanup( () => {
        refSettings!.addEventListener('click', toggleActive);
        refInformation!.addEventListener('click', toggleActive);
    });

    return (
        <aside class='panel'>
            <div class='head'>
                <button class='close' title='close panel' type='button' onclick={ () => closePanel() }>
                    <FiX />
                </button>
                <div ref={refSettings} class='tab active'>
                    <FiSliders />
                    <span>Settings</span>
                </div>
                <div ref={refInformation} class='tab'>
                    <FiInfo />
                    <span>Information</span>
                </div>
            </div>
            <div class='content'>
                <Switch>
                    <Match when={active() === refSettings}>
                        <Settings />
                    </Match>
                    <Match when={active() === refInformation}>
                        <Information />
                    </Match>
                </Switch>
            </div>
        </aside>
    );
};

export default Menu;
