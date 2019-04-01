/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DoraTestModule } from '../../../test.module';
import { SystemConfigDetailComponent } from 'app/entities/system-config/system-config-detail.component';
import { SystemConfig } from 'app/shared/model/system-config.model';

describe('Component Tests', () => {
    describe('SystemConfig Management Detail Component', () => {
        let comp: SystemConfigDetailComponent;
        let fixture: ComponentFixture<SystemConfigDetailComponent>;
        const route = ({ data: of({ systemConfig: new SystemConfig(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DoraTestModule],
                declarations: [SystemConfigDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SystemConfigDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SystemConfigDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.systemConfig).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
