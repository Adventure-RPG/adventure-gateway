import { IAdventureCategoryType } from 'app/shared/model/adventure-category-type.model';
import { IAdventureRaceOptions } from 'app/shared/model/adventure-race-options.model';

export interface IAdventureModel {
  id?: string;
  name?: string;
  fileContentType?: string;
  file?: any;
  adventureCategoryTypes?: IAdventureCategoryType[];
  adventureRaceOptions?: IAdventureRaceOptions[];
}

export class AdventureModel implements IAdventureModel {
  constructor(
    public id?: string,
    public name?: string,
    public fileContentType?: string,
    public file?: any,
    public adventureCategoryTypes?: IAdventureCategoryType[],
    public adventureRaceOptions?: IAdventureRaceOptions[]
  ) {}
}
