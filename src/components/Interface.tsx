import { Component, Match, Show, Switch } from "solid-js";
import Top from "components/interface/Top";
import Bottom from "components/interface/Bottom";
import usePanelManager from "hooks/usePanelManager";
import Menu from "components/interface/panels/Menu";
import Search from "components/interface/panels/Search";

const Interface: Component = () => {
    const { panel } = usePanelManager();

    return (
        <>
            <Switch>
                <Match when={panel() === 'menu'}>
                    <Menu />
                </Match>
                <Match when={panel() === 'search'}>
                    <Search />
                </Match>
            </Switch>
            <Show when={!panel() || panel() === 'focus'}>
                <Top />
                <Bottom />
            </Show>
        </>
    );
};

export default Interface;
