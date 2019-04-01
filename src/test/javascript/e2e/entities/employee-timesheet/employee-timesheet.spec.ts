/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
    EmployeeTimesheetComponentsPage,
    EmployeeTimesheetDeleteDialog,
    EmployeeTimesheetUpdatePage
} from './employee-timesheet.page-object';

const expect = chai.expect;

describe('EmployeeTimesheet e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let employeeTimesheetUpdatePage: EmployeeTimesheetUpdatePage;
    let employeeTimesheetComponentsPage: EmployeeTimesheetComponentsPage;
    let employeeTimesheetDeleteDialog: EmployeeTimesheetDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load EmployeeTimesheets', async () => {
        await navBarPage.goToEntity('employee-timesheet');
        employeeTimesheetComponentsPage = new EmployeeTimesheetComponentsPage();
        await browser.wait(ec.visibilityOf(employeeTimesheetComponentsPage.title), 5000);
        expect(await employeeTimesheetComponentsPage.getTitle()).to.eq('doraApp.employeeTimesheet.home.title');
    });

    it('should load create EmployeeTimesheet page', async () => {
        await employeeTimesheetComponentsPage.clickOnCreateButton();
        employeeTimesheetUpdatePage = new EmployeeTimesheetUpdatePage();
        expect(await employeeTimesheetUpdatePage.getPageTitle()).to.eq('doraApp.employeeTimesheet.home.createOrEditLabel');
        await employeeTimesheetUpdatePage.cancel();
    });

    it('should create and save EmployeeTimesheets', async () => {
        const nbButtonsBeforeCreate = await employeeTimesheetComponentsPage.countDeleteButtons();

        await employeeTimesheetComponentsPage.clickOnCreateButton();
        await promise.all([
            employeeTimesheetUpdatePage.setCheckinTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            employeeTimesheetUpdatePage.setCheckOutTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            employeeTimesheetUpdatePage.setRegularHoursWorkedInput('5'),
            employeeTimesheetUpdatePage.setOverTimeHoursWorkedInput('5'),
            employeeTimesheetUpdatePage.setPayInput('5'),
            employeeTimesheetUpdatePage.profileSelectLastOption(),
            employeeTimesheetUpdatePage.shopSelectLastOption()
        ]);
        expect(await employeeTimesheetUpdatePage.getCheckinTimeInput()).to.contain('2001-01-01T02:30');
        expect(await employeeTimesheetUpdatePage.getCheckOutTimeInput()).to.contain('2001-01-01T02:30');
        expect(await employeeTimesheetUpdatePage.getRegularHoursWorkedInput()).to.eq('5');
        expect(await employeeTimesheetUpdatePage.getOverTimeHoursWorkedInput()).to.eq('5');
        expect(await employeeTimesheetUpdatePage.getPayInput()).to.eq('5');
        await employeeTimesheetUpdatePage.save();
        expect(await employeeTimesheetUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await employeeTimesheetComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last EmployeeTimesheet', async () => {
        const nbButtonsBeforeDelete = await employeeTimesheetComponentsPage.countDeleteButtons();
        await employeeTimesheetComponentsPage.clickOnLastDeleteButton();

        employeeTimesheetDeleteDialog = new EmployeeTimesheetDeleteDialog();
        expect(await employeeTimesheetDeleteDialog.getDialogTitle()).to.eq('doraApp.employeeTimesheet.delete.question');
        await employeeTimesheetDeleteDialog.clickOnConfirmButton();

        expect(await employeeTimesheetComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
