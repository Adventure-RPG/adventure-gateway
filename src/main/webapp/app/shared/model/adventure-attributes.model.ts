import { AdventureDefenceArmorType } from 'app/shared/model/enumerations/adventure-defence-armor-type.model';
import { AdventureActiveWeaponAttackDamage } from 'app/shared/model/enumerations/adventure-active-weapon-attack-damage.model';

export interface IAdventureAttributes {
  id?: string;
  defence?: number;
  defenceArmorType?: AdventureDefenceArmorType;
  fireResistance?: number;
  earthResistance?: number;
  waterResistance?: number;
  windResistance?: number;
  activeWeaponAttackDamage?: AdventureActiveWeaponAttackDamage;
  activeWeaponAttackHit?: number;
  activeWeaponAttackType?: number;
  size?: number;
}

export class AdventureAttributes implements IAdventureAttributes {
  constructor(
    public id?: string,
    public defence?: number,
    public defenceArmorType?: AdventureDefenceArmorType,
    public fireResistance?: number,
    public earthResistance?: number,
    public waterResistance?: number,
    public windResistance?: number,
    public activeWeaponAttackDamage?: AdventureActiveWeaponAttackDamage,
    public activeWeaponAttackHit?: number,
    public activeWeaponAttackType?: number,
    public size?: number
  ) {}
}
