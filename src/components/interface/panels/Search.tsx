import usePanelManager from "hooks/usePanelManager";
import { FiSearch, FiX } from "solid-icons/fi";
import { Component, createSignal, For, Show } from "solid-js";
import styles from "styles/components/Search.module.scss";
import Item from "components/interface/search/Item";
import useSearchManager from "hooks/useSearchManager";
import useFocusManager from "hooks/useFocusManager";

const Search: Component = () => {
    const [ filter, setFilter ] = createSignal<string>('');
    const [ _, setFocus] = useFocusManager();
    const { closePanel } = usePanelManager();
    const { display } = useSearchManager();

    return (
        <aside class='panel'>
            <div class='head'>
                <button class='close' title='close panel' type='button' onclick={ () => closePanel() }>
                    <FiX />
                </button>
                <div class={'tab active ' + styles.searchbox }>
                    <FiSearch />
                    <input type='text' oninput={ event => setFilter(event.currentTarget.value) }/>
                </div>
            </div>
            <div class={'content search'}>
                <For each={display( filter() )}>
                    { item => <Item {...item} onclick={ () => { setFocus(item.name); closePanel() } }/>}
                </For>
                <Show when={!display( filter() ).length}>
                    <span class={styles['missing']}>No Matching Celestial Body Found</span>
                </Show>
            </div>
        </aside>
    );
};

export default Search;
