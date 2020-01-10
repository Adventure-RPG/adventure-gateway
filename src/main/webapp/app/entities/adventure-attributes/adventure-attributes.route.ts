import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAdventureAttributes, AdventureAttributes } from 'app/shared/model/adventure-attributes.model';
import { AdventureAttributesService } from './adventure-attributes.service';
import { AdventureAttributesComponent } from './adventure-attributes.component';
import { AdventureAttributesDetailComponent } from './adventure-attributes-detail.component';
import { AdventureAttributesUpdateComponent } from './adventure-attributes-update.component';

@Injectable({ providedIn: 'root' })
export class AdventureAttributesResolve implements Resolve<IAdventureAttributes> {
  constructor(private service: AdventureAttributesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAdventureAttributes> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((adventureAttributes: HttpResponse<AdventureAttributes>) => {
          if (adventureAttributes.body) {
            return of(adventureAttributes.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AdventureAttributes());
  }
}

export const adventureAttributesRoute: Routes = [
  {
    path: '',
    component: AdventureAttributesComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'adventureGatewayApp.adventureAttributes.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AdventureAttributesDetailComponent,
    resolve: {
      adventureAttributes: AdventureAttributesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'adventureGatewayApp.adventureAttributes.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AdventureAttributesUpdateComponent,
    resolve: {
      adventureAttributes: AdventureAttributesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'adventureGatewayApp.adventureAttributes.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AdventureAttributesUpdateComponent,
    resolve: {
      adventureAttributes: AdventureAttributesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'adventureGatewayApp.adventureAttributes.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
