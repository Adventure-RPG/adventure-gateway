import { element, by, ElementFinder } from 'protractor';

export class AdventureCategoryTypeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-adventure-category-type div table .btn-danger'));
  title = element.all(by.css('jhi-adventure-category-type div h2#page-heading span')).first();

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

export class AdventureCategoryTypeUpdatePage {
  pageTitle = element(by.id('jhi-adventure-category-type-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  descInput = element(by.id('field_desc'));
  adventureModelSelect = element(by.id('field_adventureModel'));

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

export class AdventureCategoryTypeDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-adventureCategoryType-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-adventureCategoryType'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
