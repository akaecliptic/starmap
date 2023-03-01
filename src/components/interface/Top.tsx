import { Component, createEffect, createSignal } from "solid-js";
import { FiCalendar } from "solid-icons/fi";
import dayjs from "dayjs";
import styles from "styles/components/Top.module.scss";
import { playback } from "hooks/usePlayback";
import Playback from "./Playback";

const Top: Component = () => {
    const [date, setDate] = createSignal<string>(dayjs().toISOString().split('T')[0]);
    const [rate, setRate] = createSignal<string>('');

    createEffect( () => {
        setDate( 
            dayjs()
                .add(playback.value, 'day')
                .toISOString()
                .split('T')[0] 
        );
    });

    createEffect( () => {
        if ( playback.interval === 0 ) {
            setRate('paused');
            return;
        }

        setRate( 
            `${playback.interval} day${playback.interval === 1 ? '' : 's'}` + 
            ' | ' + 
            `${playback.rate / 1000} second` 
        );
    });

    return (
        <div class={styles.container}>
            <span>
                <FiCalendar />
                <time>
                    { date() }
                </time>
            </span>
            <Playback />
            <span>
                { rate() }
            </span>
        </div>
    );
};

export default Top;
