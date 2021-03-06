import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AdventureSkillComponentsPage, AdventureSkillDeleteDialog, AdventureSkillUpdatePage } from './adventure-skill.page-object';

const expect = chai.expect;

describe('AdventureSkill e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let adventureSkillComponentsPage: AdventureSkillComponentsPage;
  let adventureSkillUpdatePage: AdventureSkillUpdatePage;
  let adventureSkillDeleteDialog: AdventureSkillDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load AdventureSkills', async () => {
    await navBarPage.goToEntity('adventure-skill');
    adventureSkillComponentsPage = new AdventureSkillComponentsPage();
    await browser.wait(ec.visibilityOf(adventureSkillComponentsPage.title), 5000);
    expect(await adventureSkillComponentsPage.getTitle()).to.eq('adventureGatewayApp.adventureSkill.home.title');
  });

  it('should load create AdventureSkill page', async () => {
    await adventureSkillComponentsPage.clickOnCreateButton();
    adventureSkillUpdatePage = new AdventureSkillUpdatePage();
    expect(await adventureSkillUpdatePage.getPageTitle()).to.eq('adventureGatewayApp.adventureSkill.home.createOrEditLabel');
    await adventureSkillUpdatePage.cancel();
  });

  it('should create and save AdventureSkills', async () => {
    const nbButtonsBeforeCreate = await adventureSkillComponentsPage.countDeleteButtons();

    await adventureSkillComponentsPage.clickOnCreateButton();
    await promise.all([adventureSkillUpdatePage.setNameInput('name')]);
    expect(await adventureSkillUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    const selectedPosition = adventureSkillUpdatePage.getPositionInput();
    if (await selectedPosition.isSelected()) {
      await adventureSkillUpdatePage.getPositionInput().click();
      expect(await adventureSkillUpdatePage.getPositionInput().isSelected(), 'Expected position not to be selected').to.be.false;
    } else {
      await adventureSkillUpdatePage.getPositionInput().click();
      expect(await adventureSkillUpdatePage.getPositionInput().isSelected(), 'Expected position to be selected').to.be.true;
    }
    await adventureSkillUpdatePage.save();
    expect(await adventureSkillUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await adventureSkillComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last AdventureSkill', async () => {
    const nbButtonsBeforeDelete = await adventureSkillComponentsPage.countDeleteButtons();
    await adventureSkillComponentsPage.clickOnLastDeleteButton();

    adventureSkillDeleteDialog = new AdventureSkillDeleteDialog();
    expect(await adventureSkillDeleteDialog.getDialogTitle()).to.eq('adventureGatewayApp.adventureSkill.delete.question');
    await adventureSkillDeleteDialog.clickOnConfirmButton();

    expect(await adventureSkillComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
