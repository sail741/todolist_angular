import {Item} from './Item';
import {Flag} from './Flag';

export interface List {
  id: number;
  title: string;
  isFav: boolean;
  flags: Flag[];
  items: Item[];
}
