import { FiRewind, FiPlay, FiPause, FiFastForward, FiChevronsLeft, FiChevronsRight } from "solid-icons/fi";
import { Component } from "solid-js";
import usePlayback, { controller } from "hooks/usePlayback";
import styles from "styles/components/Playback.module.scss";

const Playback: Component = () => {
    const playback = usePlayback();

    return (
        <div class={styles.container}>
            <FiChevronsLeft onClick={ () => controller.updateRate() } />
            <FiRewind onClick={ () => controller.updateInterval(false) } />
            { 
                playback.interval === 0 ? 
                <FiPlay onClick={ () => controller.stort() } /> :
                <FiPause onClick={ () => controller.stort() } /> 
            }
            <FiFastForward onClick={ () => controller.updateInterval() } />
            <FiChevronsRight onClick={ () => controller.updateRate(false) } />
        </div>
    );
};

export default Playback;
