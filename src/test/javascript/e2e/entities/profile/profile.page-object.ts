import { element, by, ElementFinder } from 'protractor';

export class ProfileComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-profile div table .btn-danger'));
    title = element.all(by.css('jhi-profile div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProfileUpdatePage {
    pageTitle = element(by.id('jhi-profile-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    firstNameInput = element(by.id('field_firstName'));
    lastNameInput = element(by.id('field_lastName'));
    emailInput = element(by.id('field_email'));
    userTypeSelect = element(by.id('field_userType'));
    dateOfBirthInput = element(by.id('field_dateOfBirth'));
    genderSelect = element(by.id('field_gender'));
    registerationDateInput = element(by.id('field_registerationDate'));
    lastAccessInput = element(by.id('field_lastAccess'));
    profileStatusSelect = element(by.id('field_profileStatus'));
    telephoneInput = element(by.id('field_telephone'));
    mobileInput = element(by.id('field_mobile'));
    hourlyPayRateInput = element(by.id('field_hourlyPayRate'));
    thumbnailPhotoInput = element(by.id('file_thumbnailPhoto'));
    thumbnailPhotoUrlInput = element(by.id('field_thumbnailPhotoUrl'));
    fullPhotoInput = element(by.id('file_fullPhoto'));
    fullPhotoUrlInput = element(by.id('field_fullPhotoUrl'));
    activeInput = element(by.id('field_active'));
    shopChangeIdInput = element(by.id('field_shopChangeId'));
    userSelect = element(by.id('field_user'));
    shopSelect = element(by.id('field_shop'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setFirstNameInput(firstName) {
        await this.firstNameInput.sendKeys(firstName);
    }

    async getFirstNameInput() {
        return this.firstNameInput.getAttribute('value');
    }

    async setLastNameInput(lastName) {
        await this.lastNameInput.sendKeys(lastName);
    }

    async getLastNameInput() {
        return this.lastNameInput.getAttribute('value');
    }

    async setEmailInput(email) {
        await this.emailInput.sendKeys(email);
    }

    async getEmailInput() {
        return this.emailInput.getAttribute('value');
    }

    async setUserTypeSelect(userType) {
        await this.userTypeSelect.sendKeys(userType);
    }

    async getUserTypeSelect() {
        return this.userTypeSelect.element(by.css('option:checked')).getText();
    }

    async userTypeSelectLastOption() {
        await this.userTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setDateOfBirthInput(dateOfBirth) {
        await this.dateOfBirthInput.sendKeys(dateOfBirth);
    }

    async getDateOfBirthInput() {
        return this.dateOfBirthInput.getAttribute('value');
    }

    async setGenderSelect(gender) {
        await this.genderSelect.sendKeys(gender);
    }

    async getGenderSelect() {
        return this.genderSelect.element(by.css('option:checked')).getText();
    }

    async genderSelectLastOption() {
        await this.genderSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setRegisterationDateInput(registerationDate) {
        await this.registerationDateInput.sendKeys(registerationDate);
    }

    async getRegisterationDateInput() {
        return this.registerationDateInput.getAttribute('value');
    }

    async setLastAccessInput(lastAccess) {
        await this.lastAccessInput.sendKeys(lastAccess);
    }

    async getLastAccessInput() {
        return this.lastAccessInput.getAttribute('value');
    }

    async setProfileStatusSelect(profileStatus) {
        await this.profileStatusSelect.sendKeys(profileStatus);
    }

    async getProfileStatusSelect() {
        return this.profileStatusSelect.element(by.css('option:checked')).getText();
    }

    async profileStatusSelectLastOption() {
        await this.profileStatusSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setTelephoneInput(telephone) {
        await this.telephoneInput.sendKeys(telephone);
    }

    async getTelephoneInput() {
        return this.telephoneInput.getAttribute('value');
    }

    async setMobileInput(mobile) {
        await this.mobileInput.sendKeys(mobile);
    }

    async getMobileInput() {
        return this.mobileInput.getAttribute('value');
    }

    async setHourlyPayRateInput(hourlyPayRate) {
        await this.hourlyPayRateInput.sendKeys(hourlyPayRate);
    }

    async getHourlyPayRateInput() {
        return this.hourlyPayRateInput.getAttribute('value');
    }

    async setThumbnailPhotoInput(thumbnailPhoto) {
        await this.thumbnailPhotoInput.sendKeys(thumbnailPhoto);
    }

    async getThumbnailPhotoInput() {
        return this.thumbnailPhotoInput.getAttribute('value');
    }

    async setThumbnailPhotoUrlInput(thumbnailPhotoUrl) {
        await this.thumbnailPhotoUrlInput.sendKeys(thumbnailPhotoUrl);
    }

    async getThumbnailPhotoUrlInput() {
        return this.thumbnailPhotoUrlInput.getAttribute('value');
    }

    async setFullPhotoInput(fullPhoto) {
        await this.fullPhotoInput.sendKeys(fullPhoto);
    }

    async getFullPhotoInput() {
        return this.fullPhotoInput.getAttribute('value');
    }

    async setFullPhotoUrlInput(fullPhotoUrl) {
        await this.fullPhotoUrlInput.sendKeys(fullPhotoUrl);
    }

    async getFullPhotoUrlInput() {
        return this.fullPhotoUrlInput.getAttribute('value');
    }

    getActiveInput() {
        return this.activeInput;
    }
    async setShopChangeIdInput(shopChangeId) {
        await this.shopChangeIdInput.sendKeys(shopChangeId);
    }

    async getShopChangeIdInput() {
        return this.shopChangeIdInput.getAttribute('value');
    }

    async userSelectLastOption() {
        await this.userSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async userSelectOption(option) {
        await this.userSelect.sendKeys(option);
    }

    getUserSelect(): ElementFinder {
        return this.userSelect;
    }

    async getUserSelectedOption() {
        return this.userSelect.element(by.css('option:checked')).getText();
    }

    async shopSelectLastOption() {
        await this.shopSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async shopSelectOption(option) {
        await this.shopSelect.sendKeys(option);
    }

    getShopSelect(): ElementFinder {
        return this.shopSelect;
    }

    async getShopSelectedOption() {
        return this.shopSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class ProfileDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-profile-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-profile'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
