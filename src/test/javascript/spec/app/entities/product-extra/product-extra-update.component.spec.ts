/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DoraTestModule } from '../../../test.module';
import { ProductExtraUpdateComponent } from 'app/entities/product-extra/product-extra-update.component';
import { ProductExtraService } from 'app/entities/product-extra/product-extra.service';
import { ProductExtra } from 'app/shared/model/product-extra.model';

describe('Component Tests', () => {
    describe('ProductExtra Management Update Component', () => {
        let comp: ProductExtraUpdateComponent;
        let fixture: ComponentFixture<ProductExtraUpdateComponent>;
        let service: ProductExtraService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DoraTestModule],
                declarations: [ProductExtraUpdateComponent]
            })
                .overrideTemplate(ProductExtraUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProductExtraUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductExtraService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new ProductExtra(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.productExtra = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new ProductExtra();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.productExtra = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
