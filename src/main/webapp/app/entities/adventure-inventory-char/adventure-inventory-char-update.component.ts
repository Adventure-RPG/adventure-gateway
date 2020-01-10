import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAdventureInventoryChar, AdventureInventoryChar } from 'app/shared/model/adventure-inventory-char.model';
import { AdventureInventoryCharService } from './adventure-inventory-char.service';

@Component({
  selector: 'jhi-adventure-inventory-char-update',
  templateUrl: './adventure-inventory-char-update.component.html'
})
export class AdventureInventoryCharUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: []
  });

  constructor(
    protected adventureInventoryCharService: AdventureInventoryCharService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ adventureInventoryChar }) => {
      this.updateForm(adventureInventoryChar);
    });
  }

  updateForm(adventureInventoryChar: IAdventureInventoryChar): void {
    this.editForm.patchValue({
      id: adventureInventoryChar.id
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const adventureInventoryChar = this.createFromForm();
    if (adventureInventoryChar.id !== undefined) {
      this.subscribeToSaveResponse(this.adventureInventoryCharService.update(adventureInventoryChar));
    } else {
      this.subscribeToSaveResponse(this.adventureInventoryCharService.create(adventureInventoryChar));
    }
  }

  private createFromForm(): IAdventureInventoryChar {
    return {
      ...new AdventureInventoryChar(),
      id: this.editForm.get(['id'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAdventureInventoryChar>>): void {
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
