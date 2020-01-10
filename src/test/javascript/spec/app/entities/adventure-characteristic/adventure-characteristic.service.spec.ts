import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import { AdventureCharacteristicService } from 'app/entities/adventure-characteristic/adventure-characteristic.service';
import { IAdventureCharacteristic, AdventureCharacteristic } from 'app/shared/model/adventure-characteristic.model';

describe('Service Tests', () => {
  describe('AdventureCharacteristic Service', () => {
    let injector: TestBed;
    let service: AdventureCharacteristicService;
    let httpMock: HttpTestingController;
    let elemDefault: IAdventureCharacteristic;
    let expectedResult: IAdventureCharacteristic | IAdventureCharacteristic[] | boolean | null;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(AdventureCharacteristicService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new AdventureCharacteristic('ID', 0, 0, 0, 0, 0, 0, 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);
        service
          .find('123')
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a AdventureCharacteristic', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID'
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new AdventureCharacteristic())
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a AdventureCharacteristic', () => {
        const returnedFromService = Object.assign(
          {
            strength: 1,
            agility: 1,
            vitality: 1,
            luck: 1,
            intelligence: 1,
            wisdom: 1,
            charisma: 1
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of AdventureCharacteristic', () => {
        const returnedFromService = Object.assign(
          {
            strength: 1,
            agility: 1,
            vitality: 1,
            luck: 1,
            intelligence: 1,
            wisdom: 1,
            charisma: 1
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .query()
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a AdventureCharacteristic', () => {
        service.delete('123').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
