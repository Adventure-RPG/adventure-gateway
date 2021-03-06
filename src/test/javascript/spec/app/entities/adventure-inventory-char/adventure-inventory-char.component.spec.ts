import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';

import { AdventureGatewayTestModule } from '../../../test.module';
import { AdventureInventoryCharComponent } from 'app/entities/adventure-inventory-char/adventure-inventory-char.component';
import { AdventureInventoryCharService } from 'app/entities/adventure-inventory-char/adventure-inventory-char.service';
import { AdventureInventoryChar } from 'app/shared/model/adventure-inventory-char.model';

describe('Component Tests', () => {
  describe('AdventureInventoryChar Management Component', () => {
    let comp: AdventureInventoryCharComponent;
    let fixture: ComponentFixture<AdventureInventoryCharComponent>;
    let service: AdventureInventoryCharService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AdventureGatewayTestModule],
        declarations: [AdventureInventoryCharComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: {
                subscribe: (fn: (value: Data) => void) =>
                  fn({
                    pagingParams: {
                      predicate: 'id',
                      reverse: false,
                      page: 0
                    }
                  })
              }
            }
          }
        ]
      })
        .overrideTemplate(AdventureInventoryCharComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AdventureInventoryCharComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AdventureInventoryCharService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AdventureInventoryChar('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.adventureInventoryChars && comp.adventureInventoryChars[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AdventureInventoryChar('123')],
            headers
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.adventureInventoryChars && comp.adventureInventoryChars[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,desc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,desc', 'id']);
    });
  });
});
