import { Settings } from "definitions/alias";
import { createStore, SetStoreFunction } from "solid-js/store";

const [ settings, setSettings ] = createStore<Settings>({ axis: true, mpcs: true });

const useSettingsManager = (): [Settings, SetStoreFunction<Settings>] => {
    return [settings, setSettings];
};

export default useSettingsManager;
