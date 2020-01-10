import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IAdventureModel } from 'app/shared/model/adventure-model.model';

@Component({
  selector: 'jhi-adventure-model-detail',
  templateUrl: './adventure-model-detail.component.html'
})
export class AdventureModelDetailComponent implements OnInit {
  adventureModel: IAdventureModel | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ adventureModel }) => {
      this.adventureModel = adventureModel;
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
