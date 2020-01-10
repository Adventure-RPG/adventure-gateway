import { element, by, ElementFinder } from 'protractor';

export class AdventureItemComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-adventure-item div table .btn-danger'));
  title = element.all(by.css('jhi-adventure-item div h2#page-heading span')).first();

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

export class AdventureItemUpdatePage {
  pageTitle = element(by.id('jhi-adventure-item-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  isEquipmentInput = element(by.id('field_isEquipment'));
  equipmentSlotSelect = element(by.id('field_equipmentSlot'));
  priceInput = element(by.id('field_price'));
  weightInput = element(by.id('field_weight'));
  adventureAttributesSelect = element(by.id('field_adventureAttributes'));
  adventureInventoryCharSelect = element(by.id('field_adventureInventoryChar'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  getIsEquipmentInput(): ElementFinder {
    return this.isEquipmentInput;
  }
  async setEquipmentSlotSelect(equipmentSlot: string): Promise<void> {
    await this.equipmentSlotSelect.sendKeys(equipmentSlot);
  }

  async getEquipmentSlotSelect(): Promise<string> {
    return await this.equipmentSlotSelect.element(by.css('option:checked')).getText();
  }

  async equipmentSlotSelectLastOption(): Promise<void> {
    await this.equipmentSlotSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setPriceInput(price: string): Promise<void> {
    await this.priceInput.sendKeys(price);
  }

  async getPriceInput(): Promise<string> {
    return await this.priceInput.getAttribute('value');
  }

  async setWeightInput(weight: string): Promise<void> {
    await this.weightInput.sendKeys(weight);
  }

  async getWeightInput(): Promise<string> {
    return await this.weightInput.getAttribute('value');
  }

  async adventureAttributesSelectLastOption(): Promise<void> {
    await this.adventureAttributesSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async adventureAttributesSelectOption(option: string): Promise<void> {
    await this.adventureAttributesSelect.sendKeys(option);
  }

  getAdventureAttributesSelect(): ElementFinder {
    return this.adventureAttributesSelect;
  }

  async getAdventureAttributesSelectedOption(): Promise<string> {
    return await this.adventureAttributesSelect.element(by.css('option:checked')).getText();
  }

  async adventureInventoryCharSelectLastOption(): Promise<void> {
    await this.adventureInventoryCharSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async adventureInventoryCharSelectOption(option: string): Promise<void> {
    await this.adventureInventoryCharSelect.sendKeys(option);
  }

  getAdventureInventoryCharSelect(): ElementFinder {
    return this.adventureInventoryCharSelect;
  }

  async getAdventureInventoryCharSelectedOption(): Promise<string> {
    return await this.adventureInventoryCharSelect.element(by.css('option:checked')).getText();
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

export class AdventureItemDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-adventureItem-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-adventureItem'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
