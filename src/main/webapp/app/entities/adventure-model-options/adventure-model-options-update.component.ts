import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAdventureModelOptions, AdventureModelOptions } from 'app/shared/model/adventure-model-options.model';
import { AdventureModelOptionsService } from './adventure-model-options.service';
import { IAdventureRaceOptions } from 'app/shared/model/adventure-race-options.model';
import { AdventureRaceOptionsService } from 'app/entities/adventure-race-options/adventure-race-options.service';

@Component({
  selector: 'jhi-adventure-model-options-update',
  templateUrl: './adventure-model-options-update.component.html'
})
export class AdventureModelOptionsUpdateComponent implements OnInit {
  isSaving = false;

  adventureraceoptions: IAdventureRaceOptions[] = [];

  editForm = this.fb.group({
    id: [],
    color: [],
    adventureRaceOptionsId: []
  });

  constructor(
    protected adventureModelOptionsService: AdventureModelOptionsService,
    protected adventureRaceOptionsService: AdventureRaceOptionsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ adventureModelOptions }) => {
      this.updateForm(adventureModelOptions);

      this.adventureRaceOptionsService
        .query()
        .pipe(
          map((res: HttpResponse<IAdventureRaceOptions[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IAdventureRaceOptions[]) => (this.adventureraceoptions = resBody));
    });
  }

  updateForm(adventureModelOptions: IAdventureModelOptions): void {
    this.editForm.patchValue({
      id: adventureModelOptions.id,
      color: adventureModelOptions.color,
      adventureRaceOptionsId: adventureModelOptions.adventureRaceOptionsId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const adventureModelOptions = this.createFromForm();
    if (adventureModelOptions.id !== undefined) {
      this.subscribeToSaveResponse(this.adventureModelOptionsService.update(adventureModelOptions));
    } else {
      this.subscribeToSaveResponse(this.adventureModelOptionsService.create(adventureModelOptions));
    }
  }

  private createFromForm(): IAdventureModelOptions {
    return {
      ...new AdventureModelOptions(),
      id: this.editForm.get(['id'])!.value,
      color: this.editForm.get(['color'])!.value,
      adventureRaceOptionsId: this.editForm.get(['adventureRaceOptionsId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAdventureModelOptions>>): void {
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

  trackById(index: number, item: IAdventureRaceOptions): any {
    return item.id;
  }
}
