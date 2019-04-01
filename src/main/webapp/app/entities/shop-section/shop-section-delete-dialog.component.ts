import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IShopSection } from 'app/shared/model/shop-section.model';
import { ShopSectionService } from './shop-section.service';

@Component({
    selector: 'jhi-shop-section-delete-dialog',
    templateUrl: './shop-section-delete-dialog.component.html'
})
export class ShopSectionDeleteDialogComponent {
    shopSection: IShopSection;

    constructor(
        protected shopSectionService: ShopSectionService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.shopSectionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'shopSectionListModification',
                content: 'Deleted an shopSection'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-shop-section-delete-popup',
    template: ''
})
export class ShopSectionDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ shopSection }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ShopSectionDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.shopSection = shopSection;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/shop-section', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/shop-section', { outlets: { popup: null } }]);
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
