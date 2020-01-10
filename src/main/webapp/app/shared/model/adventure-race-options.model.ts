import { IAdventureModelOptions } from 'app/shared/model/adventure-model-options.model';
import { IAdventureModel } from 'app/shared/model/adventure-model.model';

export interface IAdventureRaceOptions {
  id?: string;
  height?: number;
  weight?: number;
  adventureModelOptions?: IAdventureModelOptions[];
  adventureModels?: IAdventureModel[];
  adventureRaceId?: string;
}

export class AdventureRaceOptions implements IAdventureRaceOptions {
  constructor(
    public id?: string,
    public height?: number,
    public weight?: number,
    public adventureModelOptions?: IAdventureModelOptions[],
    public adventureModels?: IAdventureModel[],
    public adventureRaceId?: string
  ) {}
}
