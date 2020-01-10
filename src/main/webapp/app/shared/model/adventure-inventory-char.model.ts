import { IAdventureItem } from 'app/shared/model/adventure-item.model';

export interface IAdventureInventoryChar {
  id?: string;
  adventureItems?: IAdventureItem[];
}

export class AdventureInventoryChar implements IAdventureInventoryChar {
  constructor(public id?: string, public adventureItems?: IAdventureItem[]) {}
}
