import { element, by, ElementFinder } from 'protractor';

export class AdventureCharacteristicComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-adventure-characteristic div table .btn-danger'));
  title = element.all(by.css('jhi-adventure-characteristic div h2#page-heading span')).first();

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

export class AdventureCharacteristicUpdatePage {
  pageTitle = element(by.id('jhi-adventure-characteristic-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  strengthInput = element(by.id('field_strength'));
  agilityInput = element(by.id('field_agility'));
  vitalityInput = element(by.id('field_vitality'));
  luckInput = element(by.id('field_luck'));
  intelligenceInput = element(by.id('field_intelligence'));
  wisdomInput = element(by.id('field_wisdom'));
  charismaInput = element(by.id('field_charisma'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setStrengthInput(strength: string): Promise<void> {
    await this.strengthInput.sendKeys(strength);
  }

  async getStrengthInput(): Promise<string> {
    return await this.strengthInput.getAttribute('value');
  }

  async setAgilityInput(agility: string): Promise<void> {
    await this.agilityInput.sendKeys(agility);
  }

  async getAgilityInput(): Promise<string> {
    return await this.agilityInput.getAttribute('value');
  }

  async setVitalityInput(vitality: string): Promise<void> {
    await this.vitalityInput.sendKeys(vitality);
  }

  async getVitalityInput(): Promise<string> {
    return await this.vitalityInput.getAttribute('value');
  }

  async setLuckInput(luck: string): Promise<void> {
    await this.luckInput.sendKeys(luck);
  }

  async getLuckInput(): Promise<string> {
    return await this.luckInput.getAttribute('value');
  }

  async setIntelligenceInput(intelligence: string): Promise<void> {
    await this.intelligenceInput.sendKeys(intelligence);
  }

  async getIntelligenceInput(): Promise<string> {
    return await this.intelligenceInput.getAttribute('value');
  }

  async setWisdomInput(wisdom: string): Promise<void> {
    await this.wisdomInput.sendKeys(wisdom);
  }

  async getWisdomInput(): Promise<string> {
    return await this.wisdomInput.getAttribute('value');
  }

  async setCharismaInput(charisma: string): Promise<void> {
    await this.charismaInput.sendKeys(charisma);
  }

  async getCharismaInput(): Promise<string> {
    return await this.charismaInput.getAttribute('value');
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

export class AdventureCharacteristicDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-adventureCharacteristic-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-adventureCharacteristic'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
