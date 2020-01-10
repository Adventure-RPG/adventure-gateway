import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAdventureRaceOptions, AdventureRaceOptions } from 'app/shared/model/adventure-race-options.model';
import { AdventureRaceOptionsService } from './adventure-race-options.service';
import { IAdventureModel } from 'app/shared/model/adventure-model.model';
import { AdventureModelService } from 'app/entities/adventure-model/adventure-model.service';
import { IAdventureRace } from 'app/shared/model/adventure-race.model';
import { AdventureRaceService } from 'app/entities/adventure-race/adventure-race.service';

type SelectableEntity = IAdventureModel | IAdventureRace;

@Component({
  selector: 'jhi-adventure-race-options-update',
  templateUrl: './adventure-race-options-update.component.html'
})
export class AdventureRaceOptionsUpdateComponent implements OnInit {
  isSaving = false;

  adventuremodels: IAdventureModel[] = [];

  adventureraces: IAdventureRace[] = [];

  editForm = this.fb.group({
    id: [],
    height: [null, [Validators.required, Validators.min(1)]],
    weight: [null, [Validators.required, Validators.min(1)]],
    adventureModels: [],
    adventureRaceId: []
  });

  constructor(
    protected adventureRaceOptionsService: AdventureRaceOptionsService,
    protected adventureModelService: AdventureModelService,
    protected adventureRaceService: AdventureRaceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ adventureRaceOptions }) => {
      this.updateForm(adventureRaceOptions);

      this.adventureModelService
        .query()
        .pipe(
          map((res: HttpResponse<IAdventureModel[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IAdventureModel[]) => (this.adventuremodels = resBody));

      this.adventureRaceService
        .query()
        .pipe(
          map((res: HttpResponse<IAdventureRace[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IAdventureRace[]) => (this.adventureraces = resBody));
    });
  }

  updateForm(adventureRaceOptions: IAdventureRaceOptions): void {
    this.editForm.patchValue({
      id: adventureRaceOptions.id,
      height: adventureRaceOptions.height,
      weight: adventureRaceOptions.weight,
      adventureModels: adventureRaceOptions.adventureModels,
      adventureRaceId: adventureRaceOptions.adventureRaceId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const adventureRaceOptions = this.createFromForm();
    if (adventureRaceOptions.id !== undefined) {
      this.subscribeToSaveResponse(this.adventureRaceOptionsService.update(adventureRaceOptions));
    } else {
      this.subscribeToSaveResponse(this.adventureRaceOptionsService.create(adventureRaceOptions));
    }
  }

  private createFromForm(): IAdventureRaceOptions {
    return {
      ...new AdventureRaceOptions(),
      id: this.editForm.get(['id'])!.value,
      height: this.editForm.get(['height'])!.value,
      weight: this.editForm.get(['weight'])!.value,
      adventureModels: this.editForm.get(['adventureModels'])!.value,
      adventureRaceId: this.editForm.get(['adventureRaceId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAdventureRaceOptions>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: IAdventureModel[], option: IAdventureModel): IAdventureModel {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
