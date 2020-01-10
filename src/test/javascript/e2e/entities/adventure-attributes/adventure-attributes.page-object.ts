import { element, by, ElementFinder } from 'protractor';

export class AdventureAttributesComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-adventure-attributes div table .btn-danger'));
  title = element.all(by.css('jhi-adventure-attributes div h2#page-heading span')).first();

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class AdventureAttributesUpdatePage {
  pageTitle = element(by.id('jhi-adventure-attributes-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  defenceInput = element(by.id('field_defence'));
  defenceArmorTypeSelect = element(by.id('field_defenceArmorType'));
  fireResistanceInput = element(by.id('field_fireResistance'));
  earthResistanceInput = element(by.id('field_earthResistance'));
  waterResistanceInput = element(by.id('field_waterResistance'));
  windResistanceInput = element(by.id('field_windResistance'));
  activeWeaponAttackDamageSelect = element(by.id('field_activeWeaponAttackDamage'));
  activeWeaponAttackHitInput = element(by.id('field_activeWeaponAttackHit'));
  activeWeaponAttackTypeInput = element(by.id('field_activeWeaponAttackType'));
  sizeInput = element(by.id('field_size'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDefenceInput(defence: string): Promise<void> {
    await this.defenceInput.sendKeys(defence);
  }

  async getDefenceInput(): Promise<string> {
    return await this.defenceInput.getAttribute('value');
  }

  async setDefenceArmorTypeSelect(defenceArmorType: string): Promise<void> {
    await this.defenceArmorTypeSelect.sendKeys(defenceArmorType);
  }

  async getDefenceArmorTypeSelect(): Promise<string> {
    return await this.defenceArmorTypeSelect.element(by.css('option:checked')).getText();
  }

  async defenceArmorTypeSelectLastOption(): Promise<void> {
    await this.defenceArmorTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setFireResistanceInput(fireResistance: string): Promise<void> {
    await this.fireResistanceInput.sendKeys(fireResistance);
  }

  async getFireResistanceInput(): Promise<string> {
    return await this.fireResistanceInput.getAttribute('value');
  }

  async setEarthResistanceInput(earthResistance: string): Promise<void> {
    await this.earthResistanceInput.sendKeys(earthResistance);
  }

  async getEarthResistanceInput(): Promise<string> {
    return await this.earthResistanceInput.getAttribute('value');
  }

  async setWaterResistanceInput(waterResistance: string): Promise<void> {
    await this.waterResistanceInput.sendKeys(waterResistance);
  }

  async getWaterResistanceInput(): Promise<string> {
    return await this.waterResistanceInput.getAttribute('value');
  }

  async setWindResistanceInput(windResistance: string): Promise<void> {
    await this.windResistanceInput.sendKeys(windResistance);
  }

  async getWindResistanceInput(): Promise<string> {
    return await this.windResistanceInput.getAttribute('value');
  }

  async setActiveWeaponAttackDamageSelect(activeWeaponAttackDamage: string): Promise<void> {
    await this.activeWeaponAttackDamageSelect.sendKeys(activeWeaponAttackDamage);
  }

  async getActiveWeaponAttackDamageSelect(): Promise<string> {
    return await this.activeWeaponAttackDamageSelect.element(by.css('option:checked')).getText();
  }

  async activeWeaponAttackDamageSelectLastOption(): Promise<void> {
    await this.activeWeaponAttackDamageSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setActiveWeaponAttackHitInput(activeWeaponAttackHit: string): Promise<void> {
    await this.activeWeaponAttackHitInput.sendKeys(activeWeaponAttackHit);
  }

  async getActiveWeaponAttackHitInput(): Promise<string> {
    return await this.activeWeaponAttackHitInput.getAttribute('value');
  }

  async setActiveWeaponAttackTypeInput(activeWeaponAttackType: string): Promise<void> {
    await this.activeWeaponAttackTypeInput.sendKeys(activeWeaponAttackType);
  }

  async getActiveWeaponAttackTypeInput(): Promise<string> {
    return await this.activeWeaponAttackTypeInput.getAttribute('value');
  }

  async setSizeInput(size: string): Promise<void> {
    await this.sizeInput.sendKeys(size);
  }

  async getSizeInput(): Promise<string> {
    return await this.sizeInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class AdventureAttributesDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-adventureAttributes-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-adventureAttributes'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
