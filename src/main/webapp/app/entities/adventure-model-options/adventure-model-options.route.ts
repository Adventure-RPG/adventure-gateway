import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAdventureModelOptions, AdventureModelOptions } from 'app/shared/model/adventure-model-options.model';
import { AdventureModelOptionsService } from './adventure-model-options.service';
import { AdventureModelOptionsComponent } from './adventure-model-options.component';
import { AdventureModelOptionsDetailComponent } from './adventure-model-options-detail.component';
import { AdventureModelOptionsUpdateComponent } from './adventure-model-options-update.component';

@Injectable({ providedIn: 'root' })
export class AdventureModelOptionsResolve implements Resolve<IAdventureModelOptions> {
  constructor(private service: AdventureModelOptionsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAdventureModelOptions> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((adventureModelOptions: HttpResponse<AdventureModelOptions>) => {
          if (adventureModelOptions.body) {
            return of(adventureModelOptions.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AdventureModelOptions());
  }
}

export const adventureModelOptionsRoute: Routes = [
  {
    path: '',
    component: AdventureModelOptionsComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'adventureGatewayApp.adventureModelOptions.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AdventureModelOptionsDetailComponent,
    resolve: {
      adventureModelOptions: AdventureModelOptionsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'adventureGatewayApp.adventureModelOptions.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AdventureModelOptionsUpdateComponent,
    resolve: {
      adventureModelOptions: AdventureModelOptionsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'adventureGatewayApp.adventureModelOptions.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AdventureModelOptionsUpdateComponent,
    resolve: {
      adventureModelOptions: AdventureModelOptionsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'adventureGatewayApp.adventureModelOptions.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
