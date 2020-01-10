import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { AdventureGatewayTestModule } from '../../../test.module';
import { AdventureRaceDetailComponent } from 'app/entities/adventure-race/adventure-race-detail.component';
import { AdventureRace } from 'app/shared/model/adventure-race.model';

describe('Component Tests', () => {
  describe('AdventureRace Management Detail Component', () => {
    let comp: AdventureRaceDetailComponent;
    let fixture: ComponentFixture<AdventureRaceDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ adventureRace: new AdventureRace('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AdventureGatewayTestModule],
        declarations: [AdventureRaceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AdventureRaceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AdventureRaceDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load adventureRace on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.adventureRace).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
