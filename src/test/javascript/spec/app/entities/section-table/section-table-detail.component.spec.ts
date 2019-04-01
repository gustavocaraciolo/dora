/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DoraTestModule } from '../../../test.module';
import { SectionTableDetailComponent } from 'app/entities/section-table/section-table-detail.component';
import { SectionTable } from 'app/shared/model/section-table.model';

describe('Component Tests', () => {
    describe('SectionTable Management Detail Component', () => {
        let comp: SectionTableDetailComponent;
        let fixture: ComponentFixture<SectionTableDetailComponent>;
        const route = ({ data: of({ sectionTable: new SectionTable(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DoraTestModule],
                declarations: [SectionTableDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SectionTableDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SectionTableDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.sectionTable).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
