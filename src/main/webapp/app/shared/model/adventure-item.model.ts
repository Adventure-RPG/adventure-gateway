import { AdventureEquipmentSlot } from 'app/shared/model/enumerations/adventure-equipment-slot.model';

export interface IAdventureItem {
  id?: string;
  isEquipment?: boolean;
  equipmentSlot?: AdventureEquipmentSlot;
  price?: number;
  weight?: number;
  adventureAttributesId?: string;
  adventureInventoryCharId?: string;
}

export class AdventureItem implements IAdventureItem {
  constructor(
    public id?: string,
    public isEquipment?: boolean,
    public equipmentSlot?: AdventureEquipmentSlot,
    public price?: number,
    public weight?: number,
    public adventureAttributesId?: string,
    public adventureInventoryCharId?: string
  ) {
    this.isEquipment = this.isEquipment || false;
  }
}
