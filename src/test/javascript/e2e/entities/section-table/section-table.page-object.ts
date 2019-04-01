import { element, by, ElementFinder } from 'protractor';

export class SectionTableComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-section-table div table .btn-danger'));
    title = element.all(by.css('jhi-section-table div h2#page-heading span')).first();

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

export class SectionTableUpdatePage {
    pageTitle = element(by.id('jhi-section-table-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    tableNumberInput = element(by.id('field_tableNumber'));
    descriptionInput = element(by.id('field_description'));
    shopSectionsSelect = element(by.id('field_shopSections'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setTableNumberInput(tableNumber) {
        await this.tableNumberInput.sendKeys(tableNumber);
    }

    async getTableNumberInput() {
        return this.tableNumberInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async shopSectionsSelectLastOption() {
        await this.shopSectionsSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async shopSectionsSelectOption(option) {
        await this.shopSectionsSelect.sendKeys(option);
    }

    getShopSectionsSelect(): ElementFinder {
        return this.shopSectionsSelect;
    }

    async getShopSectionsSelectedOption() {
        return this.shopSectionsSelect.element(by.css('option:checked')).getText();
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

export class SectionTableDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-sectionTable-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-sectionTable'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
