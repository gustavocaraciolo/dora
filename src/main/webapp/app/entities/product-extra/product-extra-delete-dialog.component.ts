import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductExtra } from 'app/shared/model/product-extra.model';
import { ProductExtraService } from './product-extra.service';

@Component({
    selector: 'jhi-product-extra-delete-dialog',
    templateUrl: './product-extra-delete-dialog.component.html'
})
export class ProductExtraDeleteDialogComponent {
    productExtra: IProductExtra;

    constructor(
        protected productExtraService: ProductExtraService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productExtraService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'productExtraListModification',
                content: 'Deleted an productExtra'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-product-extra-delete-popup',
    template: ''
})
export class ProductExtraDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productExtra }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProductExtraDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.productExtra = productExtra;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/product-extra', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/product-extra', { outlets: { popup: null } }]);
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
