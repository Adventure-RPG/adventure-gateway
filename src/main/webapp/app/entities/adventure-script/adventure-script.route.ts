import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAdventureScript, AdventureScript } from 'app/shared/model/adventure-script.model';
import { AdventureScriptService } from './adventure-script.service';
import { AdventureScriptComponent } from './adventure-script.component';
import { AdventureScriptDetailComponent } from './adventure-script-detail.component';
import { AdventureScriptUpdateComponent } from './adventure-script-update.component';

@Injectable({ providedIn: 'root' })
export class AdventureScriptResolve implements Resolve<IAdventureScript> {
  constructor(private service: AdventureScriptService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAdventureScript> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((adventureScript: HttpResponse<AdventureScript>) => {
          if (adventureScript.body) {
            return of(adventureScript.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AdventureScript());
  }
}

export const adventureScriptRoute: Routes = [
  {
    path: '',
    component: AdventureScriptComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'adventureGatewayApp.adventureScript.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AdventureScriptDetailComponent,
    resolve: {
      adventureScript: AdventureScriptResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'adventureGatewayApp.adventureScript.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AdventureScriptUpdateComponent,
    resolve: {
      adventureScript: AdventureScriptResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'adventureGatewayApp.adventureScript.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AdventureScriptUpdateComponent,
    resolve: {
      adventureScript: AdventureScriptResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'adventureGatewayApp.adventureScript.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
