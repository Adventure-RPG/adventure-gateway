import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAdventureFraction, AdventureFraction } from 'app/shared/model/adventure-fraction.model';
import { AdventureFractionService } from './adventure-fraction.service';
import { AdventureFractionComponent } from './adventure-fraction.component';
import { AdventureFractionDetailComponent } from './adventure-fraction-detail.component';
import { AdventureFractionUpdateComponent } from './adventure-fraction-update.component';

@Injectable({ providedIn: 'root' })
export class AdventureFractionResolve implements Resolve<IAdventureFraction> {
  constructor(private service: AdventureFractionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAdventureFraction> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((adventureFraction: HttpResponse<AdventureFraction>) => {
          if (adventureFraction.body) {
            return of(adventureFraction.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AdventureFraction());
  }
}

export const adventureFractionRoute: Routes = [
  {
    path: '',
    component: AdventureFractionComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'adventureGatewayApp.adventureFraction.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AdventureFractionDetailComponent,
    resolve: {
      adventureFraction: AdventureFractionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'adventureGatewayApp.adventureFraction.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AdventureFractionUpdateComponent,
    resolve: {
      adventureFraction: AdventureFractionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'adventureGatewayApp.adventureFraction.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AdventureFractionUpdateComponent,
    resolve: {
      adventureFraction: AdventureFractionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'adventureGatewayApp.adventureFraction.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
