import { element, by, ElementFinder } from 'protractor';

export class AdventureRaceOptionsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-adventure-race-options div table .btn-danger'));
  title = element.all(by.css('jhi-adventure-race-options div h2#page-heading span')).first();

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

export class AdventureRaceOptionsUpdatePage {
  pageTitle = element(by.id('jhi-adventure-race-options-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  heightInput = element(by.id('field_height'));
  weightInput = element(by.id('field_weight'));
  adventureModelSelect = element(by.id('field_adventureModel'));
  adventureRaceSelect = element(by.id('field_adventureRace'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setHeightInput(height: string): Promise<void> {
    await this.heightInput.sendKeys(height);
  }

  async getHeightInput(): Promise<string> {
    return await this.heightInput.getAttribute('value');
  }

  async setWeightInput(weight: string): Promise<void> {
    await this.weightInput.sendKeys(weight);
  }

  async getWeightInput(): Promise<string> {
    return await this.weightInput.getAttribute('value');
  }

  async adventureModelSelectLastOption(): Promise<void> {
    await this.adventureModelSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async adventureModelSelectOption(option: string): Promise<void> {
    await this.adventureModelSelect.sendKeys(option);
  }

  getAdventureModelSelect(): ElementFinder {
    return this.adventureModelSelect;
  }

  async getAdventureModelSelectedOption(): Promise<string> {
    return await this.adventureModelSelect.element(by.css('option:checked')).getText();
  }

  async adventureRaceSelectLastOption(): Promise<void> {
    await this.adventureRaceSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async adventureRaceSelectOption(option: string): Promise<void> {
    await this.adventureRaceSelect.sendKeys(option);
  }

  getAdventureRaceSelect(): ElementFinder {
    return this.adventureRaceSelect;
  }

  async getAdventureRaceSelectedOption(): Promise<string> {
    return await this.adventureRaceSelect.element(by.css('option:checked')).getText();
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

export class AdventureRaceOptionsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-adventureRaceOptions-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-adventureRaceOptions'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
