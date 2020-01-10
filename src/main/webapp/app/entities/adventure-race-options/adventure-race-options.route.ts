import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAdventureRaceOptions, AdventureRaceOptions } from 'app/shared/model/adventure-race-options.model';
import { AdventureRaceOptionsService } from './adventure-race-options.service';
import { AdventureRaceOptionsComponent } from './adventure-race-options.component';
import { AdventureRaceOptionsDetailComponent } from './adventure-race-options-detail.component';
import { AdventureRaceOptionsUpdateComponent } from './adventure-race-options-update.component';

@Injectable({ providedIn: 'root' })
export class AdventureRaceOptionsResolve implements Resolve<IAdventureRaceOptions> {
  constructor(private service: AdventureRaceOptionsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAdventureRaceOptions> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((adventureRaceOptions: HttpResponse<AdventureRaceOptions>) => {
          if (adventureRaceOptions.body) {
            return of(adventureRaceOptions.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AdventureRaceOptions());
  }
}

export const adventureRaceOptionsRoute: Routes = [
  {
    path: '',
    component: AdventureRaceOptionsComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'adventureGatewayApp.adventureRaceOptions.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AdventureRaceOptionsDetailComponent,
    resolve: {
      adventureRaceOptions: AdventureRaceOptionsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'adventureGatewayApp.adventureRaceOptions.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AdventureRaceOptionsUpdateComponent,
    resolve: {
      adventureRaceOptions: AdventureRaceOptionsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'adventureGatewayApp.adventureRaceOptions.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AdventureRaceOptionsUpdateComponent,
    resolve: {
      adventureRaceOptions: AdventureRaceOptionsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'adventureGatewayApp.adventureRaceOptions.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
