import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAdventureSkill } from 'app/shared/model/adventure-skill.model';

@Component({
  selector: 'jhi-adventure-skill-detail',
  templateUrl: './adventure-skill-detail.component.html'
})
export class AdventureSkillDetailComponent implements OnInit {
  adventureSkill: IAdventureSkill | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ adventureSkill }) => {
      this.adventureSkill = adventureSkill;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
