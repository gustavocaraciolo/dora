/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DoraTestModule } from '../../../test.module';
import { ShopChangeUpdateComponent } from 'app/entities/shop-change/shop-change-update.component';
import { ShopChangeService } from 'app/entities/shop-change/shop-change.service';
import { ShopChange } from 'app/shared/model/shop-change.model';

describe('Component Tests', () => {
    describe('ShopChange Management Update Component', () => {
        let comp: ShopChangeUpdateComponent;
        let fixture: ComponentFixture<ShopChangeUpdateComponent>;
        let service: ShopChangeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DoraTestModule],
                declarations: [ShopChangeUpdateComponent]
            })
                .overrideTemplate(ShopChangeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ShopChangeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ShopChangeService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new ShopChange(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.shopChange = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new ShopChange();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.shopChange = entity;
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
