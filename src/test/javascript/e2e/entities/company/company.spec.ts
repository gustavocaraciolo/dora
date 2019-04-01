/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CompanyComponentsPage, CompanyDeleteDialog, CompanyUpdatePage } from './company.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Company e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let companyUpdatePage: CompanyUpdatePage;
    let companyComponentsPage: CompanyComponentsPage;
    let companyDeleteDialog: CompanyDeleteDialog;
    const fileNameToUpload = 'logo-jhipster.png';
    const fileToUpload = '../../../../../main/webapp/content/images/' + fileNameToUpload;
    const absolutePath = path.resolve(__dirname, fileToUpload);

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Companies', async () => {
        await navBarPage.goToEntity('company');
        companyComponentsPage = new CompanyComponentsPage();
        await browser.wait(ec.visibilityOf(companyComponentsPage.title), 5000);
        expect(await companyComponentsPage.getTitle()).to.eq('doraApp.company.home.title');
    });

    it('should load create Company page', async () => {
        await companyComponentsPage.clickOnCreateButton();
        companyUpdatePage = new CompanyUpdatePage();
        expect(await companyUpdatePage.getPageTitle()).to.eq('doraApp.company.home.createOrEditLabel');
        await companyUpdatePage.cancel();
    });

    it('should create and save Companies', async () => {
        const nbButtonsBeforeCreate = await companyComponentsPage.countDeleteButtons();

        await companyComponentsPage.clickOnCreateButton();
        await promise.all([
            companyUpdatePage.setCompanyNameInput('companyName'),
            companyUpdatePage.setDescriptionInput('description'),
            companyUpdatePage.setNoteInput('note'),
            companyUpdatePage.setCompanyLogoInput(absolutePath),
            companyUpdatePage.setCompanyLogoUrlInput('companyLogoUrl')
        ]);
        expect(await companyUpdatePage.getCompanyNameInput()).to.eq('companyName');
        expect(await companyUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await companyUpdatePage.getNoteInput()).to.eq('note');
        expect(await companyUpdatePage.getCompanyLogoInput()).to.endsWith(fileNameToUpload);
        expect(await companyUpdatePage.getCompanyLogoUrlInput()).to.eq('companyLogoUrl');
        const selectedActive = companyUpdatePage.getActiveInput();
        if (await selectedActive.isSelected()) {
            await companyUpdatePage.getActiveInput().click();
            expect(await companyUpdatePage.getActiveInput().isSelected()).to.be.false;
        } else {
            await companyUpdatePage.getActiveInput().click();
            expect(await companyUpdatePage.getActiveInput().isSelected()).to.be.true;
        }
        await companyUpdatePage.save();
        expect(await companyUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await companyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Company', async () => {
        const nbButtonsBeforeDelete = await companyComponentsPage.countDeleteButtons();
        await companyComponentsPage.clickOnLastDeleteButton();

        companyDeleteDialog = new CompanyDeleteDialog();
        expect(await companyDeleteDialog.getDialogTitle()).to.eq('doraApp.company.delete.question');
        await companyDeleteDialog.clickOnConfirmButton();

        expect(await companyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
