import {Item} from './Item';

export interface List {
  id: number;
  title: string;
  isFav: boolean;
  items: Item[];
}
