import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAdventureRace, AdventureRace } from 'app/shared/model/adventure-race.model';
import { AdventureRaceService } from './adventure-race.service';
import { AdventureRaceComponent } from './adventure-race.component';
import { AdventureRaceDetailComponent } from './adventure-race-detail.component';
import { AdventureRaceUpdateComponent } from './adventure-race-update.component';

@Injectable({ providedIn: 'root' })
export class AdventureRaceResolve implements Resolve<IAdventureRace> {
  constructor(private service: AdventureRaceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAdventureRace> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((adventureRace: HttpResponse<AdventureRace>) => {
          if (adventureRace.body) {
            return of(adventureRace.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AdventureRace());
  }
}

export const adventureRaceRoute: Routes = [
  {
    path: '',
    component: AdventureRaceComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'adventureGatewayApp.adventureRace.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AdventureRaceDetailComponent,
    resolve: {
      adventureRace: AdventureRaceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'adventureGatewayApp.adventureRace.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AdventureRaceUpdateComponent,
    resolve: {
      adventureRace: AdventureRaceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'adventureGatewayApp.adventureRace.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AdventureRaceUpdateComponent,
    resolve: {
      adventureRace: AdventureRaceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'adventureGatewayApp.adventureRace.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
