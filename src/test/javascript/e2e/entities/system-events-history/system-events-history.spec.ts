/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    SystemEventsHistoryComponentsPage,
    SystemEventsHistoryDeleteDialog,
    SystemEventsHistoryUpdatePage
} from './system-events-history.page-object';

const expect = chai.expect;

describe('SystemEventsHistory e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let systemEventsHistoryUpdatePage: SystemEventsHistoryUpdatePage;
    let systemEventsHistoryComponentsPage: SystemEventsHistoryComponentsPage;
    let systemEventsHistoryDeleteDialog: SystemEventsHistoryDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load SystemEventsHistories', async () => {
        await navBarPage.goToEntity('system-events-history');
        systemEventsHistoryComponentsPage = new SystemEventsHistoryComponentsPage();
        await browser.wait(ec.visibilityOf(systemEventsHistoryComponentsPage.title), 5000);
        expect(await systemEventsHistoryComponentsPage.getTitle()).to.eq('doraApp.systemEventsHistory.home.title');
    });

    it('should load create SystemEventsHistory page', async () => {
        await systemEventsHistoryComponentsPage.clickOnCreateButton();
        systemEventsHistoryUpdatePage = new SystemEventsHistoryUpdatePage();
        expect(await systemEventsHistoryUpdatePage.getPageTitle()).to.eq('doraApp.systemEventsHistory.home.createOrEditLabel');
        await systemEventsHistoryUpdatePage.cancel();
    });

    it('should create and save SystemEventsHistories', async () => {
        const nbButtonsBeforeCreate = await systemEventsHistoryComponentsPage.countDeleteButtons();

        await systemEventsHistoryComponentsPage.clickOnCreateButton();
        await promise.all([
            systemEventsHistoryUpdatePage.setEventNameInput('eventName'),
            systemEventsHistoryUpdatePage.setEventDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            systemEventsHistoryUpdatePage.setEventApiInput('eventApi'),
            systemEventsHistoryUpdatePage.setEventNoteInput('eventNote'),
            systemEventsHistoryUpdatePage.setEventEntityNameInput('eventEntityName'),
            systemEventsHistoryUpdatePage.setEventEntityIdInput('5'),
            systemEventsHistoryUpdatePage.triggedBySelectLastOption()
        ]);
        expect(await systemEventsHistoryUpdatePage.getEventNameInput()).to.eq('eventName');
        expect(await systemEventsHistoryUpdatePage.getEventDateInput()).to.contain('2001-01-01T02:30');
        expect(await systemEventsHistoryUpdatePage.getEventApiInput()).to.eq('eventApi');
        expect(await systemEventsHistoryUpdatePage.getEventNoteInput()).to.eq('eventNote');
        expect(await systemEventsHistoryUpdatePage.getEventEntityNameInput()).to.eq('eventEntityName');
        expect(await systemEventsHistoryUpdatePage.getEventEntityIdInput()).to.eq('5');
        await systemEventsHistoryUpdatePage.save();
        expect(await systemEventsHistoryUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await systemEventsHistoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last SystemEventsHistory', async () => {
        const nbButtonsBeforeDelete = await systemEventsHistoryComponentsPage.countDeleteButtons();
        await systemEventsHistoryComponentsPage.clickOnLastDeleteButton();

        systemEventsHistoryDeleteDialog = new SystemEventsHistoryDeleteDialog();
        expect(await systemEventsHistoryDeleteDialog.getDialogTitle()).to.eq('doraApp.systemEventsHistory.delete.question');
        await systemEventsHistoryDeleteDialog.clickOnConfirmButton();

        expect(await systemEventsHistoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
