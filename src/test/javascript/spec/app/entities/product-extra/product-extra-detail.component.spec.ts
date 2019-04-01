/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DoraTestModule } from '../../../test.module';
import { ProductExtraDetailComponent } from 'app/entities/product-extra/product-extra-detail.component';
import { ProductExtra } from 'app/shared/model/product-extra.model';

describe('Component Tests', () => {
    describe('ProductExtra Management Detail Component', () => {
        let comp: ProductExtraDetailComponent;
        let fixture: ComponentFixture<ProductExtraDetailComponent>;
        const route = ({ data: of({ productExtra: new ProductExtra(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DoraTestModule],
                declarations: [ProductExtraDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProductExtraDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProductExtraDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.productExtra).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
