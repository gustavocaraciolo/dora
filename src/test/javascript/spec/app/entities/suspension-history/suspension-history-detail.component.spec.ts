/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DoraTestModule } from '../../../test.module';
import { SuspensionHistoryDetailComponent } from 'app/entities/suspension-history/suspension-history-detail.component';
import { SuspensionHistory } from 'app/shared/model/suspension-history.model';

describe('Component Tests', () => {
    describe('SuspensionHistory Management Detail Component', () => {
        let comp: SuspensionHistoryDetailComponent;
        let fixture: ComponentFixture<SuspensionHistoryDetailComponent>;
        const route = ({ data: of({ suspensionHistory: new SuspensionHistory(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DoraTestModule],
                declarations: [SuspensionHistoryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SuspensionHistoryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SuspensionHistoryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.suspensionHistory).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
