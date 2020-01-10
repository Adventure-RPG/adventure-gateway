import { IAdventureScript } from 'app/shared/model/adventure-script.model';
import { IAdventureAccountCharacter } from 'app/shared/model/adventure-account-character.model';

export interface IAdventureSkill {
  id?: string;
  name?: string;
  position?: boolean;
  adventureScripts?: IAdventureScript[];
  adventureAccountCharacters?: IAdventureAccountCharacter[];
}

export class AdventureSkill implements IAdventureSkill {
  constructor(
    public id?: string,
    public name?: string,
    public position?: boolean,
    public adventureScripts?: IAdventureScript[],
    public adventureAccountCharacters?: IAdventureAccountCharacter[]
  ) {
    this.position = this.position || false;
  }
}
