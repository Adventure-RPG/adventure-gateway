import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import { AdventureAttributesService } from 'app/entities/adventure-attributes/adventure-attributes.service';
import { IAdventureAttributes, AdventureAttributes } from 'app/shared/model/adventure-attributes.model';
import { AdventureDefenceArmorType } from 'app/shared/model/enumerations/adventure-defence-armor-type.model';
import { AdventureActiveWeaponAttackDamage } from 'app/shared/model/enumerations/adventure-active-weapon-attack-damage.model';

describe('Service Tests', () => {
  describe('AdventureAttributes Service', () => {
    let injector: TestBed;
    let service: AdventureAttributesService;
    let httpMock: HttpTestingController;
    let elemDefault: IAdventureAttributes;
    let expectedResult: IAdventureAttributes | IAdventureAttributes[] | boolean | null;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(AdventureAttributesService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new AdventureAttributes(
        'ID',
        0,
        AdventureDefenceArmorType.BASIC,
        0,
        0,
        0,
        0,
        AdventureActiveWeaponAttackDamage.BLUNT,
        0,
        0,
        0
      );
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

      it('should create a AdventureAttributes', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID'
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new AdventureAttributes())
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp.body));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a AdventureAttributes', () => {
        const returnedFromService = Object.assign(
          {
            defence: 1,
            defenceArmorType: 'BBBBBB',
            fireResistance: 1,
            earthResistance: 1,
            waterResistance: 1,
            windResistance: 1,
            activeWeaponAttackDamage: 'BBBBBB',
            activeWeaponAttackHit: 1,
            activeWeaponAttackType: 1,
            size: 1
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

      it('should return a list of AdventureAttributes', () => {
        const returnedFromService = Object.assign(
          {
            defence: 1,
            defenceArmorType: 'BBBBBB',
            fireResistance: 1,
            earthResistance: 1,
            waterResistance: 1,
            windResistance: 1,
            activeWeaponAttackDamage: 'BBBBBB',
            activeWeaponAttackHit: 1,
            activeWeaponAttackType: 1,
            size: 1
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

      it('should delete a AdventureAttributes', () => {
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
