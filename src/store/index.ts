import { Models } from '@rematch/core';
import { player } from './player';
import { navigation } from './navigation';

export interface RootModel extends Models<RootModel> {
  player: typeof player;
	navigation: typeof navigation;
}

export const models: RootModel = { player, navigation };
