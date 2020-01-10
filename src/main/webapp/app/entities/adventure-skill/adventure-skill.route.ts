import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAdventureSkill, AdventureSkill } from 'app/shared/model/adventure-skill.model';
import { AdventureSkillService } from './adventure-skill.service';
import { AdventureSkillComponent } from './adventure-skill.component';
import { AdventureSkillDetailComponent } from './adventure-skill-detail.component';
import { AdventureSkillUpdateComponent } from './adventure-skill-update.component';

@Injectable({ providedIn: 'root' })
export class AdventureSkillResolve implements Resolve<IAdventureSkill> {
  constructor(private service: AdventureSkillService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAdventureSkill> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((adventureSkill: HttpResponse<AdventureSkill>) => {
          if (adventureSkill.body) {
            return of(adventureSkill.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AdventureSkill());
  }
}

export const adventureSkillRoute: Routes = [
  {
    path: '',
    component: AdventureSkillComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'adventureGatewayApp.adventureSkill.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AdventureSkillDetailComponent,
    resolve: {
      adventureSkill: AdventureSkillResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'adventureGatewayApp.adventureSkill.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AdventureSkillUpdateComponent,
    resolve: {
      adventureSkill: AdventureSkillResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'adventureGatewayApp.adventureSkill.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AdventureSkillUpdateComponent,
    resolve: {
      adventureSkill: AdventureSkillResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'adventureGatewayApp.adventureSkill.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
