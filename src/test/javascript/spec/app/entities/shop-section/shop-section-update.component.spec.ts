/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DoraTestModule } from '../../../test.module';
import { ShopSectionUpdateComponent } from 'app/entities/shop-section/shop-section-update.component';
import { ShopSectionService } from 'app/entities/shop-section/shop-section.service';
import { ShopSection } from 'app/shared/model/shop-section.model';

describe('Component Tests', () => {
    describe('ShopSection Management Update Component', () => {
        let comp: ShopSectionUpdateComponent;
        let fixture: ComponentFixture<ShopSectionUpdateComponent>;
        let service: ShopSectionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DoraTestModule],
                declarations: [ShopSectionUpdateComponent]
            })
                .overrideTemplate(ShopSectionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ShopSectionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ShopSectionService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new ShopSection(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.shopSection = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new ShopSection();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.shopSection = entity;
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
