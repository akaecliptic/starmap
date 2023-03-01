import { Accessor, createSignal, Setter } from "solid-js";

const [ focus, setFocus ] = createSignal<string>('');

const useFocusManager = (): [Accessor<string>, Setter<string>] => {
    return [focus, setFocus];
};

export default useFocusManager;
