/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DoraTestModule } from '../../../test.module';
import { ShopSectionDetailComponent } from 'app/entities/shop-section/shop-section-detail.component';
import { ShopSection } from 'app/shared/model/shop-section.model';

describe('Component Tests', () => {
    describe('ShopSection Management Detail Component', () => {
        let comp: ShopSectionDetailComponent;
        let fixture: ComponentFixture<ShopSectionDetailComponent>;
        const route = ({ data: of({ shopSection: new ShopSection(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DoraTestModule],
                declarations: [ShopSectionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ShopSectionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ShopSectionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.shopSection).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
