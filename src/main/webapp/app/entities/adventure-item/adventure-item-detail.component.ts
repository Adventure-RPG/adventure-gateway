import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAdventureItem } from 'app/shared/model/adventure-item.model';

@Component({
  selector: 'jhi-adventure-item-detail',
  templateUrl: './adventure-item-detail.component.html'
})
export class AdventureItemDetailComponent implements OnInit {
  adventureItem: IAdventureItem | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ adventureItem }) => {
      this.adventureItem = adventureItem;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
