import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IAdventureFraction } from 'app/shared/model/adventure-fraction.model';

@Component({
  selector: 'jhi-adventure-fraction-detail',
  templateUrl: './adventure-fraction-detail.component.html'
})
export class AdventureFractionDetailComponent implements OnInit {
  adventureFraction: IAdventureFraction | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ adventureFraction }) => {
      this.adventureFraction = adventureFraction;
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
