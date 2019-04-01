/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { OrdersComponentsPage, OrdersDeleteDialog, OrdersUpdatePage } from './orders.page-object';

const expect = chai.expect;

describe('Orders e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let ordersUpdatePage: OrdersUpdatePage;
    let ordersComponentsPage: OrdersComponentsPage;
    let ordersDeleteDialog: OrdersDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Orders', async () => {
        await navBarPage.goToEntity('orders');
        ordersComponentsPage = new OrdersComponentsPage();
        await browser.wait(ec.visibilityOf(ordersComponentsPage.title), 5000);
        expect(await ordersComponentsPage.getTitle()).to.eq('doraApp.orders.home.title');
    });

    it('should load create Orders page', async () => {
        await ordersComponentsPage.clickOnCreateButton();
        ordersUpdatePage = new OrdersUpdatePage();
        expect(await ordersUpdatePage.getPageTitle()).to.eq('doraApp.orders.home.createOrEditLabel');
        await ordersUpdatePage.cancel();
    });

    it('should create and save Orders', async () => {
        const nbButtonsBeforeCreate = await ordersComponentsPage.countDeleteButtons();

        await ordersComponentsPage.clickOnCreateButton();
        await promise.all([
            ordersUpdatePage.setDescriptionInput('description'),
            ordersUpdatePage.setCustomerNameInput('customerName'),
            ordersUpdatePage.setTotalPriceInput('5'),
            ordersUpdatePage.setQuantityInput('5'),
            ordersUpdatePage.setDiscountPercentageInput('5'),
            ordersUpdatePage.setDiscountAmountInput('5'),
            ordersUpdatePage.setTaxPercentageInput('5'),
            ordersUpdatePage.setTaxAmountInput('5'),
            ordersUpdatePage.orderStatusSelectLastOption(),
            ordersUpdatePage.setNoteInput('note'),
            ordersUpdatePage.setOrderDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            ordersUpdatePage.paymentMethodSelectLastOption(),
            ordersUpdatePage.soldBySelectLastOption(),
            ordersUpdatePage.preparedBySelectLastOption(),
            ordersUpdatePage.shopDeviceSelectLastOption(),
            ordersUpdatePage.sectionTableSelectLastOption(),
            ordersUpdatePage.shopSelectLastOption()
        ]);
        expect(await ordersUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await ordersUpdatePage.getCustomerNameInput()).to.eq('customerName');
        expect(await ordersUpdatePage.getTotalPriceInput()).to.eq('5');
        expect(await ordersUpdatePage.getQuantityInput()).to.eq('5');
        expect(await ordersUpdatePage.getDiscountPercentageInput()).to.eq('5');
        expect(await ordersUpdatePage.getDiscountAmountInput()).to.eq('5');
        expect(await ordersUpdatePage.getTaxPercentageInput()).to.eq('5');
        expect(await ordersUpdatePage.getTaxAmountInput()).to.eq('5');
        expect(await ordersUpdatePage.getNoteInput()).to.eq('note');
        expect(await ordersUpdatePage.getOrderDateInput()).to.contain('2001-01-01T02:30');
        const selectedIsVariantOrder = ordersUpdatePage.getIsVariantOrderInput();
        if (await selectedIsVariantOrder.isSelected()) {
            await ordersUpdatePage.getIsVariantOrderInput().click();
            expect(await ordersUpdatePage.getIsVariantOrderInput().isSelected()).to.be.false;
        } else {
            await ordersUpdatePage.getIsVariantOrderInput().click();
            expect(await ordersUpdatePage.getIsVariantOrderInput().isSelected()).to.be.true;
        }
        await ordersUpdatePage.save();
        expect(await ordersUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await ordersComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Orders', async () => {
        const nbButtonsBeforeDelete = await ordersComponentsPage.countDeleteButtons();
        await ordersComponentsPage.clickOnLastDeleteButton();

        ordersDeleteDialog = new OrdersDeleteDialog();
        expect(await ordersDeleteDialog.getDialogTitle()).to.eq('doraApp.orders.delete.question');
        await ordersDeleteDialog.clickOnConfirmButton();

        expect(await ordersComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
