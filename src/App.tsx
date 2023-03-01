import { Component, createEffect, For, onMount, Show } from "solid-js";
import traits from "data/traits";
import orbitals from "data/orbitals";
import { PlanetOrbits, PlanetTraits } from "definitions/shapes";
import Canvas from "components/Canvas";
import Interface from "components/Interface";
import Axis from "components/canvas/Axis";
import Lights from "components/canvas/Lights";
import Planet from "components/canvas/Planet";
import Satellite from "components/canvas/Satellite";
import mpcs from "libs/mpc";
import models from "libs/models";
import Sun from "components/canvas/Sun";
import useSettingsManager from "hooks/useSettingsManager";
import { addSearchableMPCs, addSearchablePlanets } from "hooks/useSearchManager";
import { PropItem } from "components/interface/search/Item";

const App: Component = () => {
	const orbitalData: [string, PlanetOrbits][] = Object.entries(orbitals);
	const traitsData: PlanetTraits[] = Object.values(traits);
	const [settings] = useSettingsManager();

	onMount( () => {
		const items: PropItem[] = Object.entries(orbitals).map( ([key, value]) => 
			({
				name: key,
				category: 'planet',
				a: value.a,
				e: value.e,
				i: value.i
			})
		);
		addSearchablePlanets(items);
	});

	createEffect( () => addSearchableMPCs(mpcs()) );

	return (
		<>
			<Interface />
			<Canvas>
				<Lights />
				<Show when={mpcs() && settings.mpcs}>
					<For each={mpcs()}>
						{ item => <Satellite body={item} name={item.readable_des.split(' ')[1].toLowerCase()} /> }
					</For>
				</Show>
				<Show when={models().size}>
					<For each={orbitalData} fallback={<div>BLANK</div>}>
						{ (item, index) => <Planet trait={traitsData[index()]} body={item[1]} model={models().get(item[0])!} />}
					</For>
					<Sun model={models().get('sun')!}/>
				</Show>
				<Axis />
			</Canvas>
		</>
	);
};

export default App;
