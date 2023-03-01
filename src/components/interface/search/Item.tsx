import truncateValue from "functions/truncateValue";
import { Component } from "solid-js";
import styles from "styles/components/Item.module.scss";

export type PropItem = {
    name: string;
    category: 'mpc' | 'planet';
    a: number;
    e: number;
    i: number;
    onclick?: () => void;
};

const Item: Component<PropItem> = (props) => {
    return (
        <div class={styles.container} onclick={ () => (props.onclick) ? props.onclick() : null }>
            <div class={styles.main}>
                <span>{props.name}</span>
                <span>{props.category}</span>
            </div>
            <hr />
            <div class={styles.flavour}>
                <span>[ a ] {truncateValue(props.a, 7)}</span>
                <span>[ e ] {truncateValue(props.e, 7)}</span>
                <span>[ i ] {truncateValue(props.i, 7)}</span>
            </div>
        </div>
    );
};

export default Item;
