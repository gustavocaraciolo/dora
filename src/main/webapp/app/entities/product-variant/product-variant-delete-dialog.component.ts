import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductVariant } from 'app/shared/model/product-variant.model';
import { ProductVariantService } from './product-variant.service';

@Component({
    selector: 'jhi-product-variant-delete-dialog',
    templateUrl: './product-variant-delete-dialog.component.html'
})
export class ProductVariantDeleteDialogComponent {
    productVariant: IProductVariant;

    constructor(
        protected productVariantService: ProductVariantService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productVariantService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'productVariantListModification',
                content: 'Deleted an productVariant'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-product-variant-delete-popup',
    template: ''
})
export class ProductVariantDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productVariant }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProductVariantDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.productVariant = productVariant;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/product-variant', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/product-variant', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
