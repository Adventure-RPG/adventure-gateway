import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { AdventureGatewayTestModule } from '../../../test.module';
import { AdventureScriptDetailComponent } from 'app/entities/adventure-script/adventure-script-detail.component';
import { AdventureScript } from 'app/shared/model/adventure-script.model';

describe('Component Tests', () => {
  describe('AdventureScript Management Detail Component', () => {
    let comp: AdventureScriptDetailComponent;
    let fixture: ComponentFixture<AdventureScriptDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ adventureScript: new AdventureScript('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AdventureGatewayTestModule],
        declarations: [AdventureScriptDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AdventureScriptDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AdventureScriptDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load adventureScript on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.adventureScript).toEqual(jasmine.objectContaining({ id: '123' }));
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
