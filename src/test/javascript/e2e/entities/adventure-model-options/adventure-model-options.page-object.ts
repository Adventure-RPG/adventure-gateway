import { element, by, ElementFinder } from 'protractor';

export class AdventureModelOptionsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-adventure-model-options div table .btn-danger'));
  title = element.all(by.css('jhi-adventure-model-options div h2#page-heading span')).first();

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

export class AdventureModelOptionsUpdatePage {
  pageTitle = element(by.id('jhi-adventure-model-options-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  colorInput = element(by.id('field_color'));
  adventureRaceOptionsSelect = element(by.id('field_adventureRaceOptions'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setColorInput(color: string): Promise<void> {
    await this.colorInput.sendKeys(color);
  }

  async getColorInput(): Promise<string> {
    return await this.colorInput.getAttribute('value');
  }

  async adventureRaceOptionsSelectLastOption(): Promise<void> {
    await this.adventureRaceOptionsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async adventureRaceOptionsSelectOption(option: string): Promise<void> {
    await this.adventureRaceOptionsSelect.sendKeys(option);
  }

  getAdventureRaceOptionsSelect(): ElementFinder {
    return this.adventureRaceOptionsSelect;
  }

  async getAdventureRaceOptionsSelectedOption(): Promise<string> {
    return await this.adventureRaceOptionsSelect.element(by.css('option:checked')).getText();
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

export class AdventureModelOptionsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-adventureModelOptions-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-adventureModelOptions'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
