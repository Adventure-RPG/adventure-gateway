import { element, by, ElementFinder } from 'protractor';

export class AdventureRaceComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-adventure-race div table .btn-danger'));
  title = element.all(by.css('jhi-adventure-race div h2#page-heading span')).first();

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

export class AdventureRaceUpdatePage {
  pageTitle = element(by.id('jhi-adventure-race-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  descInput = element(by.id('field_desc'));
  imageInput = element(by.id('file_image'));
  adventureFractionSelect = element(by.id('field_adventureFraction'));
  adventureAccountCharacterSelect = element(by.id('field_adventureAccountCharacter'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setDescInput(desc: string): Promise<void> {
    await this.descInput.sendKeys(desc);
  }

  async getDescInput(): Promise<string> {
    return await this.descInput.getAttribute('value');
  }

  async setImageInput(image: string): Promise<void> {
    await this.imageInput.sendKeys(image);
  }

  async getImageInput(): Promise<string> {
    return await this.imageInput.getAttribute('value');
  }

  async adventureFractionSelectLastOption(): Promise<void> {
    await this.adventureFractionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async adventureFractionSelectOption(option: string): Promise<void> {
    await this.adventureFractionSelect.sendKeys(option);
  }

  getAdventureFractionSelect(): ElementFinder {
    return this.adventureFractionSelect;
  }

  async getAdventureFractionSelectedOption(): Promise<string> {
    return await this.adventureFractionSelect.element(by.css('option:checked')).getText();
  }

  async adventureAccountCharacterSelectLastOption(): Promise<void> {
    await this.adventureAccountCharacterSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async adventureAccountCharacterSelectOption(option: string): Promise<void> {
    await this.adventureAccountCharacterSelect.sendKeys(option);
  }

  getAdventureAccountCharacterSelect(): ElementFinder {
    return this.adventureAccountCharacterSelect;
  }

  async getAdventureAccountCharacterSelectedOption(): Promise<string> {
    return await this.adventureAccountCharacterSelect.element(by.css('option:checked')).getText();
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

export class AdventureRaceDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-adventureRace-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-adventureRace'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
