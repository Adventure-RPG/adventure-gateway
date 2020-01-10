import { element, by, ElementFinder } from 'protractor';

export class AdventureScriptComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-adventure-script div table .btn-danger'));
  title = element.all(by.css('jhi-adventure-script div h2#page-heading span')).first();

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

export class AdventureScriptUpdatePage {
  pageTitle = element(by.id('jhi-adventure-script-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  fileInput = element(by.id('file_file'));
  argumentsScriptInput = element(by.id('field_argumentsScript'));
  adventureSkillSelect = element(by.id('field_adventureSkill'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setFileInput(file: string): Promise<void> {
    await this.fileInput.sendKeys(file);
  }

  async getFileInput(): Promise<string> {
    return await this.fileInput.getAttribute('value');
  }

  async setArgumentsScriptInput(argumentsScript: string): Promise<void> {
    await this.argumentsScriptInput.sendKeys(argumentsScript);
  }

  async getArgumentsScriptInput(): Promise<string> {
    return await this.argumentsScriptInput.getAttribute('value');
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

export class AdventureScriptDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-adventureScript-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-adventureScript'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
