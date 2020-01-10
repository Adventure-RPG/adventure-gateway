import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { AdventureGatewayTestModule } from '../../../test.module';
import { AdventureFractionDetailComponent } from 'app/entities/adventure-fraction/adventure-fraction-detail.component';
import { AdventureFraction } from 'app/shared/model/adventure-fraction.model';

describe('Component Tests', () => {
  describe('AdventureFraction Management Detail Component', () => {
    let comp: AdventureFractionDetailComponent;
    let fixture: ComponentFixture<AdventureFractionDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ adventureFraction: new AdventureFraction('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AdventureGatewayTestModule],
        declarations: [AdventureFractionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AdventureFractionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AdventureFractionDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load adventureFraction on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.adventureFraction).toEqual(jasmine.objectContaining({ id: '123' }));
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
