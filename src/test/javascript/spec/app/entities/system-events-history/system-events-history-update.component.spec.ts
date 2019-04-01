/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DoraTestModule } from '../../../test.module';
import { SystemEventsHistoryUpdateComponent } from 'app/entities/system-events-history/system-events-history-update.component';
import { SystemEventsHistoryService } from 'app/entities/system-events-history/system-events-history.service';
import { SystemEventsHistory } from 'app/shared/model/system-events-history.model';

describe('Component Tests', () => {
    describe('SystemEventsHistory Management Update Component', () => {
        let comp: SystemEventsHistoryUpdateComponent;
        let fixture: ComponentFixture<SystemEventsHistoryUpdateComponent>;
        let service: SystemEventsHistoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DoraTestModule],
                declarations: [SystemEventsHistoryUpdateComponent]
            })
                .overrideTemplate(SystemEventsHistoryUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SystemEventsHistoryUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SystemEventsHistoryService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new SystemEventsHistory(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.systemEventsHistory = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new SystemEventsHistory();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.systemEventsHistory = entity;
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
