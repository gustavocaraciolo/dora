/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SectionTableComponentsPage, SectionTableDeleteDialog, SectionTableUpdatePage } from './section-table.page-object';

const expect = chai.expect;

describe('SectionTable e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let sectionTableUpdatePage: SectionTableUpdatePage;
    let sectionTableComponentsPage: SectionTableComponentsPage;
    let sectionTableDeleteDialog: SectionTableDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load SectionTables', async () => {
        await navBarPage.goToEntity('section-table');
        sectionTableComponentsPage = new SectionTableComponentsPage();
        await browser.wait(ec.visibilityOf(sectionTableComponentsPage.title), 5000);
        expect(await sectionTableComponentsPage.getTitle()).to.eq('doraApp.sectionTable.home.title');
    });

    it('should load create SectionTable page', async () => {
        await sectionTableComponentsPage.clickOnCreateButton();
        sectionTableUpdatePage = new SectionTableUpdatePage();
        expect(await sectionTableUpdatePage.getPageTitle()).to.eq('doraApp.sectionTable.home.createOrEditLabel');
        await sectionTableUpdatePage.cancel();
    });

    it('should create and save SectionTables', async () => {
        const nbButtonsBeforeCreate = await sectionTableComponentsPage.countDeleteButtons();

        await sectionTableComponentsPage.clickOnCreateButton();
        await promise.all([
            sectionTableUpdatePage.setTableNumberInput('5'),
            sectionTableUpdatePage.setDescriptionInput('description'),
            sectionTableUpdatePage.shopSectionsSelectLastOption()
        ]);
        expect(await sectionTableUpdatePage.getTableNumberInput()).to.eq('5');
        expect(await sectionTableUpdatePage.getDescriptionInput()).to.eq('description');
        await sectionTableUpdatePage.save();
        expect(await sectionTableUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await sectionTableComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last SectionTable', async () => {
        const nbButtonsBeforeDelete = await sectionTableComponentsPage.countDeleteButtons();
        await sectionTableComponentsPage.clickOnLastDeleteButton();

        sectionTableDeleteDialog = new SectionTableDeleteDialog();
        expect(await sectionTableDeleteDialog.getDialogTitle()).to.eq('doraApp.sectionTable.delete.question');
        await sectionTableDeleteDialog.clickOnConfirmButton();

        expect(await sectionTableComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
