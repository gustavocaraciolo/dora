/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DoraTestModule } from '../../../test.module';
import { SystemEventsHistoryDetailComponent } from 'app/entities/system-events-history/system-events-history-detail.component';
import { SystemEventsHistory } from 'app/shared/model/system-events-history.model';

describe('Component Tests', () => {
    describe('SystemEventsHistory Management Detail Component', () => {
        let comp: SystemEventsHistoryDetailComponent;
        let fixture: ComponentFixture<SystemEventsHistoryDetailComponent>;
        const route = ({ data: of({ systemEventsHistory: new SystemEventsHistory(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DoraTestModule],
                declarations: [SystemEventsHistoryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SystemEventsHistoryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SystemEventsHistoryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.systemEventsHistory).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
