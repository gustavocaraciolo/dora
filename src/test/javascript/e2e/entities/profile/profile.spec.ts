/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProfileComponentsPage, ProfileDeleteDialog, ProfileUpdatePage } from './profile.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Profile e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let profileUpdatePage: ProfileUpdatePage;
    let profileComponentsPage: ProfileComponentsPage;
    let profileDeleteDialog: ProfileDeleteDialog;
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

    it('should load Profiles', async () => {
        await navBarPage.goToEntity('profile');
        profileComponentsPage = new ProfileComponentsPage();
        await browser.wait(ec.visibilityOf(profileComponentsPage.title), 5000);
        expect(await profileComponentsPage.getTitle()).to.eq('doraApp.profile.home.title');
    });

    it('should load create Profile page', async () => {
        await profileComponentsPage.clickOnCreateButton();
        profileUpdatePage = new ProfileUpdatePage();
        expect(await profileUpdatePage.getPageTitle()).to.eq('doraApp.profile.home.createOrEditLabel');
        await profileUpdatePage.cancel();
    });

    it('should create and save Profiles', async () => {
        const nbButtonsBeforeCreate = await profileComponentsPage.countDeleteButtons();

        await profileComponentsPage.clickOnCreateButton();
        await promise.all([
            profileUpdatePage.setFirstNameInput('firstName'),
            profileUpdatePage.setLastNameInput('lastName'),
            profileUpdatePage.setEmailInput('email'),
            profileUpdatePage.userTypeSelectLastOption(),
            profileUpdatePage.setDateOfBirthInput('2000-12-31'),
            profileUpdatePage.genderSelectLastOption(),
            profileUpdatePage.setRegisterationDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            profileUpdatePage.setLastAccessInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            profileUpdatePage.profileStatusSelectLastOption(),
            profileUpdatePage.setTelephoneInput('telephone'),
            profileUpdatePage.setMobileInput('mobile'),
            profileUpdatePage.setHourlyPayRateInput('5'),
            profileUpdatePage.setThumbnailPhotoInput(absolutePath),
            profileUpdatePage.setThumbnailPhotoUrlInput('thumbnailPhotoUrl'),
            profileUpdatePage.setFullPhotoInput(absolutePath),
            profileUpdatePage.setFullPhotoUrlInput('fullPhotoUrl'),
            profileUpdatePage.setShopChangeIdInput('5'),
            profileUpdatePage.userSelectLastOption(),
            profileUpdatePage.shopSelectLastOption()
        ]);
        expect(await profileUpdatePage.getFirstNameInput()).to.eq('firstName');
        expect(await profileUpdatePage.getLastNameInput()).to.eq('lastName');
        expect(await profileUpdatePage.getEmailInput()).to.eq('email');
        expect(await profileUpdatePage.getDateOfBirthInput()).to.eq('2000-12-31');
        expect(await profileUpdatePage.getRegisterationDateInput()).to.contain('2001-01-01T02:30');
        expect(await profileUpdatePage.getLastAccessInput()).to.contain('2001-01-01T02:30');
        expect(await profileUpdatePage.getTelephoneInput()).to.eq('telephone');
        expect(await profileUpdatePage.getMobileInput()).to.eq('mobile');
        expect(await profileUpdatePage.getHourlyPayRateInput()).to.eq('5');
        expect(await profileUpdatePage.getThumbnailPhotoInput()).to.endsWith(fileNameToUpload);
        expect(await profileUpdatePage.getThumbnailPhotoUrlInput()).to.eq('thumbnailPhotoUrl');
        expect(await profileUpdatePage.getFullPhotoInput()).to.endsWith(fileNameToUpload);
        expect(await profileUpdatePage.getFullPhotoUrlInput()).to.eq('fullPhotoUrl');
        const selectedActive = profileUpdatePage.getActiveInput();
        if (await selectedActive.isSelected()) {
            await profileUpdatePage.getActiveInput().click();
            expect(await profileUpdatePage.getActiveInput().isSelected()).to.be.false;
        } else {
            await profileUpdatePage.getActiveInput().click();
            expect(await profileUpdatePage.getActiveInput().isSelected()).to.be.true;
        }
        expect(await profileUpdatePage.getShopChangeIdInput()).to.eq('5');
        await profileUpdatePage.save();
        expect(await profileUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await profileComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Profile', async () => {
        const nbButtonsBeforeDelete = await profileComponentsPage.countDeleteButtons();
        await profileComponentsPage.clickOnLastDeleteButton();

        profileDeleteDialog = new ProfileDeleteDialog();
        expect(await profileDeleteDialog.getDialogTitle()).to.eq('doraApp.profile.delete.question');
        await profileDeleteDialog.clickOnConfirmButton();

        expect(await profileComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
