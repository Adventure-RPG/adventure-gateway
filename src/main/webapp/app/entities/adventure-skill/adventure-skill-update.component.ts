import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAdventureSkill, AdventureSkill } from 'app/shared/model/adventure-skill.model';
import { AdventureSkillService } from './adventure-skill.service';

@Component({
  selector: 'jhi-adventure-skill-update',
  templateUrl: './adventure-skill-update.component.html'
})
export class AdventureSkillUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    position: []
  });

  constructor(protected adventureSkillService: AdventureSkillService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ adventureSkill }) => {
      this.updateForm(adventureSkill);
    });
  }

  updateForm(adventureSkill: IAdventureSkill): void {
    this.editForm.patchValue({
      id: adventureSkill.id,
      name: adventureSkill.name,
      position: adventureSkill.position
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const adventureSkill = this.createFromForm();
    if (adventureSkill.id !== undefined) {
      this.subscribeToSaveResponse(this.adventureSkillService.update(adventureSkill));
    } else {
      this.subscribeToSaveResponse(this.adventureSkillService.create(adventureSkill));
    }
  }

  private createFromForm(): IAdventureSkill {
    return {
      ...new AdventureSkill(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      position: this.editForm.get(['position'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAdventureSkill>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
