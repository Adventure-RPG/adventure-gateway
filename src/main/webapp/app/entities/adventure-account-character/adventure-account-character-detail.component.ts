import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAdventureAccountCharacter } from 'app/shared/model/adventure-account-character.model';

@Component({
  selector: 'jhi-adventure-account-character-detail',
  templateUrl: './adventure-account-character-detail.component.html'
})
export class AdventureAccountCharacterDetailComponent implements OnInit {
  adventureAccountCharacter: IAdventureAccountCharacter | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ adventureAccountCharacter }) => {
      this.adventureAccountCharacter = adventureAccountCharacter;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
