/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DoraTestModule } from '../../../test.module';
import { SectionTableUpdateComponent } from 'app/entities/section-table/section-table-update.component';
import { SectionTableService } from 'app/entities/section-table/section-table.service';
import { SectionTable } from 'app/shared/model/section-table.model';

describe('Component Tests', () => {
    describe('SectionTable Management Update Component', () => {
        let comp: SectionTableUpdateComponent;
        let fixture: ComponentFixture<SectionTableUpdateComponent>;
        let service: SectionTableService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DoraTestModule],
                declarations: [SectionTableUpdateComponent]
            })
                .overrideTemplate(SectionTableUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SectionTableUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SectionTableService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new SectionTable(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.sectionTable = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new SectionTable();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.sectionTable = entity;
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
