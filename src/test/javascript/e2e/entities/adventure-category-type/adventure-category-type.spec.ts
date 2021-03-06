import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  AdventureCategoryTypeComponentsPage,
  AdventureCategoryTypeDeleteDialog,
  AdventureCategoryTypeUpdatePage
} from './adventure-category-type.page-object';

const expect = chai.expect;

describe('AdventureCategoryType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let adventureCategoryTypeComponentsPage: AdventureCategoryTypeComponentsPage;
  let adventureCategoryTypeUpdatePage: AdventureCategoryTypeUpdatePage;
  let adventureCategoryTypeDeleteDialog: AdventureCategoryTypeDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load AdventureCategoryTypes', async () => {
    await navBarPage.goToEntity('adventure-category-type');
    adventureCategoryTypeComponentsPage = new AdventureCategoryTypeComponentsPage();
    await browser.wait(ec.visibilityOf(adventureCategoryTypeComponentsPage.title), 5000);
    expect(await adventureCategoryTypeComponentsPage.getTitle()).to.eq('adventureGatewayApp.adventureCategoryType.home.title');
  });

  it('should load create AdventureCategoryType page', async () => {
    await adventureCategoryTypeComponentsPage.clickOnCreateButton();
    adventureCategoryTypeUpdatePage = new AdventureCategoryTypeUpdatePage();
    expect(await adventureCategoryTypeUpdatePage.getPageTitle()).to.eq('adventureGatewayApp.adventureCategoryType.home.createOrEditLabel');
    await adventureCategoryTypeUpdatePage.cancel();
  });

  it('should create and save AdventureCategoryTypes', async () => {
    const nbButtonsBeforeCreate = await adventureCategoryTypeComponentsPage.countDeleteButtons();

    await adventureCategoryTypeComponentsPage.clickOnCreateButton();
    await promise.all([
      adventureCategoryTypeUpdatePage.setNameInput('name'),
      adventureCategoryTypeUpdatePage.setDescInput('desc'),
      adventureCategoryTypeUpdatePage.adventureModelSelectLastOption()
    ]);
    expect(await adventureCategoryTypeUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await adventureCategoryTypeUpdatePage.getDescInput()).to.eq('desc', 'Expected Desc value to be equals to desc');
    await adventureCategoryTypeUpdatePage.save();
    expect(await adventureCategoryTypeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await adventureCategoryTypeComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last AdventureCategoryType', async () => {
    const nbButtonsBeforeDelete = await adventureCategoryTypeComponentsPage.countDeleteButtons();
    await adventureCategoryTypeComponentsPage.clickOnLastDeleteButton();

    adventureCategoryTypeDeleteDialog = new AdventureCategoryTypeDeleteDialog();
    expect(await adventureCategoryTypeDeleteDialog.getDialogTitle()).to.eq('adventureGatewayApp.adventureCategoryType.delete.question');
    await adventureCategoryTypeDeleteDialog.clickOnConfirmButton();

    expect(await adventureCategoryTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
