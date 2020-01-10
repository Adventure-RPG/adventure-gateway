export interface IAdventureCategoryType {
  id?: string;
  name?: string;
  desc?: string;
  adventureModelId?: string;
}

export class AdventureCategoryType implements IAdventureCategoryType {
  constructor(public id?: string, public name?: string, public desc?: string, public adventureModelId?: string) {}
}
