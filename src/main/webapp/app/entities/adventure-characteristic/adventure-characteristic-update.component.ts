import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAdventureCharacteristic, AdventureCharacteristic } from 'app/shared/model/adventure-characteristic.model';
import { AdventureCharacteristicService } from './adventure-characteristic.service';

@Component({
  selector: 'jhi-adventure-characteristic-update',
  templateUrl: './adventure-characteristic-update.component.html'
})
export class AdventureCharacteristicUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    strength: [null, [Validators.required, Validators.min(1), Validators.max(50)]],
    agility: [null, [Validators.required, Validators.min(1), Validators.max(50)]],
    vitality: [null, [Validators.required, Validators.min(1), Validators.max(50)]],
    luck: [null, [Validators.required, Validators.min(1), Validators.max(50)]],
    intelligence: [null, [Validators.required, Validators.min(1), Validators.max(50)]],
    wisdom: [null, [Validators.required, Validators.min(1), Validators.max(50)]],
    charisma: [null, [Validators.required, Validators.min(1), Validators.max(50)]]
  });

  constructor(
    protected adventureCharacteristicService: AdventureCharacteristicService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ adventureCharacteristic }) => {
      this.updateForm(adventureCharacteristic);
    });
  }

  updateForm(adventureCharacteristic: IAdventureCharacteristic): void {
    this.editForm.patchValue({
      id: adventureCharacteristic.id,
      strength: adventureCharacteristic.strength,
      agility: adventureCharacteristic.agility,
      vitality: adventureCharacteristic.vitality,
      luck: adventureCharacteristic.luck,
      intelligence: adventureCharacteristic.intelligence,
      wisdom: adventureCharacteristic.wisdom,
      charisma: adventureCharacteristic.charisma
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const adventureCharacteristic = this.createFromForm();
    if (adventureCharacteristic.id !== undefined) {
      this.subscribeToSaveResponse(this.adventureCharacteristicService.update(adventureCharacteristic));
    } else {
      this.subscribeToSaveResponse(this.adventureCharacteristicService.create(adventureCharacteristic));
    }
  }

  private createFromForm(): IAdventureCharacteristic {
    return {
      ...new AdventureCharacteristic(),
      id: this.editForm.get(['id'])!.value,
      strength: this.editForm.get(['strength'])!.value,
      agility: this.editForm.get(['agility'])!.value,
      vitality: this.editForm.get(['vitality'])!.value,
      luck: this.editForm.get(['luck'])!.value,
      intelligence: this.editForm.get(['intelligence'])!.value,
      wisdom: this.editForm.get(['wisdom'])!.value,
      charisma: this.editForm.get(['charisma'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAdventureCharacteristic>>): void {
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
