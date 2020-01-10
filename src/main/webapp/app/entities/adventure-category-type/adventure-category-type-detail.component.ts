import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAdventureCategoryType } from 'app/shared/model/adventure-category-type.model';

@Component({
  selector: 'jhi-adventure-category-type-detail',
  templateUrl: './adventure-category-type-detail.component.html'
})
export class AdventureCategoryTypeDetailComponent implements OnInit {
  adventureCategoryType: IAdventureCategoryType | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ adventureCategoryType }) => {
      this.adventureCategoryType = adventureCategoryType;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
