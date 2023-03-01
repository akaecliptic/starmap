import { Dependant } from "definitions/alias";
import createFocusedData from "hooks/useFocusedData";
import useFocusManager from "hooks/useFocusManager";
import usePanelManager from "hooks/usePanelManager";
import { outline } from "libs/threejs";
import { FiChevronsDown, FiChevronsUp, FiSearch, FiTool, FiXSquare } from "solid-icons/fi";
import { Component, createEffect, For, Show } from "solid-js";
import styles from "styles/components/Bottom.module.scss";

const Bottom: Component = () => {
    const { panel, openPanel, closePanel } = usePanelManager();
    const [ focus, setFocus ] = useFocusManager();
    const data = createFocusedData();
    const isOpen: Dependant<boolean> = () => panel() === 'focus';

    createEffect( () => {
        if ( !focus() && outline ) outline.selectedObjects = [];
    });

    return (
        <div class={styles.container}>
            <FiTool class={styles.hoverable} onclick={ () => openPanel('menu') } />
            <Show when={focus()} >
                <div class={ isOpen() ? styles.focused : ''} >
                    { !isOpen() && <FiXSquare class={styles.unfocus + ' ' + styles.hoverable} onclick={ () => setFocus('') }/> }
                    <div class={styles.head + ' ' + styles.hoverable} onclick={ () => isOpen() ? closePanel() : openPanel('focus') } >
                        { isOpen() ? <FiChevronsDown /> : <FiChevronsUp /> }
                        <span> [ { focus() } ] </span>
                        { isOpen() ? <FiChevronsDown /> : <FiChevronsUp /> }
                    </div>
                    <div class={styles.body}>
                        <For each={data()}>
                            { item => <span>{item}</span> }
                        </For>
                    </div>
                </div>
            </Show>
            <FiSearch class={styles.hoverable} onclick={ () => openPanel('search') } />
        </div>
    );
};

export default Bottom;
