import { element, by, ElementFinder } from 'protractor';

export class AdventureAccountCharacterComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-adventure-account-character div table .btn-danger'));
  title = element.all(by.css('jhi-adventure-account-character div h2#page-heading span')).first();

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

export class AdventureAccountCharacterUpdatePage {
  pageTitle = element(by.id('jhi-adventure-account-character-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nicknameInput = element(by.id('field_nickname'));
  genderInput = element(by.id('field_gender'));
  adventureInventoryCharSelect = element(by.id('field_adventureInventoryChar'));
  adventureCharacteristicSelect = element(by.id('field_adventureCharacteristic'));
  adventureSkillSelect = element(by.id('field_adventureSkill'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNicknameInput(nickname: string): Promise<void> {
    await this.nicknameInput.sendKeys(nickname);
  }

  async getNicknameInput(): Promise<string> {
    return await this.nicknameInput.getAttribute('value');
  }

  getGenderInput(): ElementFinder {
    return this.genderInput;
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

  async adventureCharacteristicSelectLastOption(): Promise<void> {
    await this.adventureCharacteristicSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async adventureCharacteristicSelectOption(option: string): Promise<void> {
    await this.adventureCharacteristicSelect.sendKeys(option);
  }

  getAdventureCharacteristicSelect(): ElementFinder {
    return this.adventureCharacteristicSelect;
  }

  async getAdventureCharacteristicSelectedOption(): Promise<string> {
    return await this.adventureCharacteristicSelect.element(by.css('option:checked')).getText();
  }

  async adventureSkillSelectLastOption(): Promise<void> {
    await this.adventureSkillSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async adventureSkillSelectOption(option: string): Promise<void> {
    await this.adventureSkillSelect.sendKeys(option);
  }

  getAdventureSkillSelect(): ElementFinder {
    return this.adventureSkillSelect;
  }

  async getAdventureSkillSelectedOption(): Promise<string> {
    return await this.adventureSkillSelect.element(by.css('option:checked')).getText();
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

export class AdventureAccountCharacterDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-adventureAccountCharacter-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-adventureAccountCharacter'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
