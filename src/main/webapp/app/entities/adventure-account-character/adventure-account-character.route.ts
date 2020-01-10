import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAdventureAccountCharacter, AdventureAccountCharacter } from 'app/shared/model/adventure-account-character.model';
import { AdventureAccountCharacterService } from './adventure-account-character.service';
import { AdventureAccountCharacterComponent } from './adventure-account-character.component';
import { AdventureAccountCharacterDetailComponent } from './adventure-account-character-detail.component';
import { AdventureAccountCharacterUpdateComponent } from './adventure-account-character-update.component';

@Injectable({ providedIn: 'root' })
export class AdventureAccountCharacterResolve implements Resolve<IAdventureAccountCharacter> {
  constructor(private service: AdventureAccountCharacterService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAdventureAccountCharacter> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((adventureAccountCharacter: HttpResponse<AdventureAccountCharacter>) => {
          if (adventureAccountCharacter.body) {
            return of(adventureAccountCharacter.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AdventureAccountCharacter());
  }
}

export const adventureAccountCharacterRoute: Routes = [
  {
    path: '',
    component: AdventureAccountCharacterComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'adventureGatewayApp.adventureAccountCharacter.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AdventureAccountCharacterDetailComponent,
    resolve: {
      adventureAccountCharacter: AdventureAccountCharacterResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'adventureGatewayApp.adventureAccountCharacter.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AdventureAccountCharacterUpdateComponent,
    resolve: {
      adventureAccountCharacter: AdventureAccountCharacterResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'adventureGatewayApp.adventureAccountCharacter.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AdventureAccountCharacterUpdateComponent,
    resolve: {
      adventureAccountCharacter: AdventureAccountCharacterResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'adventureGatewayApp.adventureAccountCharacter.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
