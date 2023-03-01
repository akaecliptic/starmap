import { createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { clock } from "libs/threejs";
import { PlaybackRate, PlaybackController } from "definitions/alias";

const [ playback, setPlayback ] = createStore<PlaybackRate>({ rate: 1000, value: 0, interval: 1 });
const [ tick, setTick ] = createSignal<number>(0);
const intervals: number[] = [0, 1, 7, 30, 90, 120, 180, 365];
const rates: number[] = [100, 250, 500, 1000];

const getInterval = (val: number): number => {
    const direction: number = ( val < 0 ) ? -1 : 1;
    return intervals[Math.abs(val)] * direction;
};

export const controller: PlaybackController = {
    intervalIndex: 1,
    rateIndex: 3,
    updateInterval(increment: boolean = true) {
        if ( this.intervalIndex >= 7 && increment ) return;
        if ( this.intervalIndex <= -7 && !increment ) return;
        
        this.intervalIndex = (increment) ? ++this.intervalIndex : --this.intervalIndex;
        setPlayback('interval', getInterval(this.intervalIndex));
    },
    updateRate(increment: boolean = true) {
        if ( this.rateIndex >= 3 && increment ) return;
        if ( this.rateIndex <= 0 && !increment ) return;

        this.rateIndex = (increment) ? ++this.rateIndex : --this.rateIndex;
        setPlayback('rate', rates[this.rateIndex]);
    },
    stort() {
        if ( playback.interval === 0 && this.intervalIndex === 0 )
            this.intervalIndex = 1;

        setPlayback('interval', old => {
            if ( old === 0 ) {
                return getInterval(this.intervalIndex);
            } else {
                return 0;
            }
        });
    },
}

const usePlayback = (): PlaybackRate => {
    createEffect( () => {
        if ( playback.interval === 0 || clock.time - tick() < playback.rate ) return;
        
        setTick(clock.time);
        setPlayback('value', old => old + playback.interval);
    });

    return playback;
};

export { playback };
export default usePlayback;
