import { Component } from "solid-js";
import styles from "styles/components/Checkbox.module.scss";

export type PropCheckbox = {
    text: string;
    value: boolean;
    onChecked: (val: boolean) => void;
};

const Checkbox: Component<PropCheckbox> = (props) => {
    return (
        <div class={styles.container}>
            <input type='checkbox' name={props.text} checked={props.value} onchange={ val => props.onChecked(val.currentTarget.checked) }/>
            <label for={props.text}>{props.text}</label>
        </div>
    );
};

export default Checkbox;
