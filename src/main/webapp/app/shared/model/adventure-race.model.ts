import { IAdventureRaceOptions } from 'app/shared/model/adventure-race-options.model';
import { IAdventureFraction } from 'app/shared/model/adventure-fraction.model';

export interface IAdventureRace {
  id?: string;
  name?: string;
  desc?: string;
  imageContentType?: string;
  image?: any;
  adventureRaceOptions?: IAdventureRaceOptions[];
  adventureFractions?: IAdventureFraction[];
  adventureAccountCharacterId?: string;
}

export class AdventureRace implements IAdventureRace {
  constructor(
    public id?: string,
    public name?: string,
    public desc?: string,
    public imageContentType?: string,
    public image?: any,
    public adventureRaceOptions?: IAdventureRaceOptions[],
    public adventureFractions?: IAdventureFraction[],
    public adventureAccountCharacterId?: string
  ) {}
}
