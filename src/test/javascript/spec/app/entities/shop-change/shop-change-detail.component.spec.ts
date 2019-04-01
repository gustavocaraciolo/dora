/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DoraTestModule } from '../../../test.module';
import { ShopChangeDetailComponent } from 'app/entities/shop-change/shop-change-detail.component';
import { ShopChange } from 'app/shared/model/shop-change.model';

describe('Component Tests', () => {
    describe('ShopChange Management Detail Component', () => {
        let comp: ShopChangeDetailComponent;
        let fixture: ComponentFixture<ShopChangeDetailComponent>;
        const route = ({ data: of({ shopChange: new ShopChange(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DoraTestModule],
                declarations: [ShopChangeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ShopChangeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ShopChangeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.shopChange).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
