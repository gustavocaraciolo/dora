/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SystemConfigComponentsPage, SystemConfigDeleteDialog, SystemConfigUpdatePage } from './system-config.page-object';

const expect = chai.expect;

describe('SystemConfig e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let systemConfigUpdatePage: SystemConfigUpdatePage;
    let systemConfigComponentsPage: SystemConfigComponentsPage;
    let systemConfigDeleteDialog: SystemConfigDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load SystemConfigs', async () => {
        await navBarPage.goToEntity('system-config');
        systemConfigComponentsPage = new SystemConfigComponentsPage();
        await browser.wait(ec.visibilityOf(systemConfigComponentsPage.title), 5000);
        expect(await systemConfigComponentsPage.getTitle()).to.eq('doraApp.systemConfig.home.title');
    });

    it('should load create SystemConfig page', async () => {
        await systemConfigComponentsPage.clickOnCreateButton();
        systemConfigUpdatePage = new SystemConfigUpdatePage();
        expect(await systemConfigUpdatePage.getPageTitle()).to.eq('doraApp.systemConfig.home.createOrEditLabel');
        await systemConfigUpdatePage.cancel();
    });

    it('should create and save SystemConfigs', async () => {
        const nbButtonsBeforeCreate = await systemConfigComponentsPage.countDeleteButtons();

        await systemConfigComponentsPage.clickOnCreateButton();
        await promise.all([
            systemConfigUpdatePage.setKeyInput('key'),
            systemConfigUpdatePage.setValueInput('value'),
            systemConfigUpdatePage.configurationTypeSelectLastOption(),
            systemConfigUpdatePage.setNoteInput('note'),
            systemConfigUpdatePage.shopSelectLastOption()
        ]);
        expect(await systemConfigUpdatePage.getKeyInput()).to.eq('key');
        expect(await systemConfigUpdatePage.getValueInput()).to.eq('value');
        expect(await systemConfigUpdatePage.getNoteInput()).to.eq('note');
        const selectedEnabled = systemConfigUpdatePage.getEnabledInput();
        if (await selectedEnabled.isSelected()) {
            await systemConfigUpdatePage.getEnabledInput().click();
            expect(await systemConfigUpdatePage.getEnabledInput().isSelected()).to.be.false;
        } else {
            await systemConfigUpdatePage.getEnabledInput().click();
            expect(await systemConfigUpdatePage.getEnabledInput().isSelected()).to.be.true;
        }
        await systemConfigUpdatePage.save();
        expect(await systemConfigUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await systemConfigComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last SystemConfig', async () => {
        const nbButtonsBeforeDelete = await systemConfigComponentsPage.countDeleteButtons();
        await systemConfigComponentsPage.clickOnLastDeleteButton();

        systemConfigDeleteDialog = new SystemConfigDeleteDialog();
        expect(await systemConfigDeleteDialog.getDialogTitle()).to.eq('doraApp.systemConfig.delete.question');
        await systemConfigDeleteDialog.clickOnConfirmButton();

        expect(await systemConfigComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
