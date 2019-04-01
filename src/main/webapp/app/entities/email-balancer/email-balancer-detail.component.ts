import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmailBalancer } from 'app/shared/model/email-balancer.model';

@Component({
    selector: 'jhi-email-balancer-detail',
    templateUrl: './email-balancer-detail.component.html'
})
export class EmailBalancerDetailComponent implements OnInit {
    emailBalancer: IEmailBalancer;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ emailBalancer }) => {
            this.emailBalancer = emailBalancer;
        });
    }

    previousState() {
        window.history.back();
    }
}
