import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAdventureCharacteristic, AdventureCharacteristic } from 'app/shared/model/adventure-characteristic.model';
import { AdventureCharacteristicService } from './adventure-characteristic.service';
import { AdventureCharacteristicComponent } from './adventure-characteristic.component';
import { AdventureCharacteristicDetailComponent } from './adventure-characteristic-detail.component';
import { AdventureCharacteristicUpdateComponent } from './adventure-characteristic-update.component';

@Injectable({ providedIn: 'root' })
export class AdventureCharacteristicResolve implements Resolve<IAdventureCharacteristic> {
  constructor(private service: AdventureCharacteristicService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAdventureCharacteristic> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((adventureCharacteristic: HttpResponse<AdventureCharacteristic>) => {
          if (adventureCharacteristic.body) {
            return of(adventureCharacteristic.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AdventureCharacteristic());
  }
}

export const adventureCharacteristicRoute: Routes = [
  {
    path: '',
    component: AdventureCharacteristicComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'adventureGatewayApp.adventureCharacteristic.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AdventureCharacteristicDetailComponent,
    resolve: {
      adventureCharacteristic: AdventureCharacteristicResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'adventureGatewayApp.adventureCharacteristic.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AdventureCharacteristicUpdateComponent,
    resolve: {
      adventureCharacteristic: AdventureCharacteristicResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'adventureGatewayApp.adventureCharacteristic.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AdventureCharacteristicUpdateComponent,
    resolve: {
      adventureCharacteristic: AdventureCharacteristicResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'adventureGatewayApp.adventureCharacteristic.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
