import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAdventureItem, AdventureItem } from 'app/shared/model/adventure-item.model';
import { AdventureItemService } from './adventure-item.service';
import { AdventureItemComponent } from './adventure-item.component';
import { AdventureItemDetailComponent } from './adventure-item-detail.component';
import { AdventureItemUpdateComponent } from './adventure-item-update.component';

@Injectable({ providedIn: 'root' })
export class AdventureItemResolve implements Resolve<IAdventureItem> {
  constructor(private service: AdventureItemService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAdventureItem> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((adventureItem: HttpResponse<AdventureItem>) => {
          if (adventureItem.body) {
            return of(adventureItem.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AdventureItem());
  }
}

export const adventureItemRoute: Routes = [
  {
    path: '',
    component: AdventureItemComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'adventureGatewayApp.adventureItem.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AdventureItemDetailComponent,
    resolve: {
      adventureItem: AdventureItemResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'adventureGatewayApp.adventureItem.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AdventureItemUpdateComponent,
    resolve: {
      adventureItem: AdventureItemResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'adventureGatewayApp.adventureItem.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AdventureItemUpdateComponent,
    resolve: {
      adventureItem: AdventureItemResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'adventureGatewayApp.adventureItem.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
