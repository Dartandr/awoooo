import { Models } from '@rematch/core';
import { player } from './player';
import { navigation } from './navigation';
import { list } from './list';
import { user } from './user';

export interface RootModel extends Models<RootModel> {
  player: typeof player;
	navigation: typeof navigation;
  list: typeof list;
  user: typeof user;
}

export const models: RootModel = { player, navigation, list, user };
