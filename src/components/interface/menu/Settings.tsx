import { Component } from "solid-js";
import Checkbox from "components/interface/input/Checkbox";
import useSettingsManager from "hooks/useSettingsManager";

const Settings: Component = () => {
    const [settings, setSettings] = useSettingsManager();

    return (
        <>
            <Checkbox value={settings.axis} text={'axis'} onChecked={ val => setSettings('axis', val) } />
            <Checkbox value={settings.mpcs} text={'mpcs'} onChecked={ val => setSettings('mpcs', val) } />
        </>
    );
};

export default Settings;
