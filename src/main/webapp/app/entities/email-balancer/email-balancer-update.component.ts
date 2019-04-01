import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IEmailBalancer } from 'app/shared/model/email-balancer.model';
import { EmailBalancerService } from './email-balancer.service';

@Component({
    selector: 'jhi-email-balancer-update',
    templateUrl: './email-balancer-update.component.html'
})
export class EmailBalancerUpdateComponent implements OnInit {
    emailBalancer: IEmailBalancer;
    isSaving: boolean;

    constructor(protected emailBalancerService: EmailBalancerService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ emailBalancer }) => {
            this.emailBalancer = emailBalancer;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.emailBalancer.id !== undefined) {
            this.subscribeToSaveResponse(this.emailBalancerService.update(this.emailBalancer));
        } else {
            this.subscribeToSaveResponse(this.emailBalancerService.create(this.emailBalancer));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmailBalancer>>) {
        result.subscribe((res: HttpResponse<IEmailBalancer>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
