import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MtgSet } from '../../../core/models/mtg-sets.model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SetSelectorComponent } from "../set-selector/set-selector.component";
import { takeUntil, tap } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        AsyncPipe,
        SetSelectorComponent
    ]
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() sets: MtgSet[] = [];
  @Output() setSelected: EventEmitter<string> = new EventEmitter();
  @Output() selectDeselectClicked: EventEmitter<boolean> = new EventEmitter();
  @Output() getListClicked: EventEmitter<MouseEvent> = new EventEmitter();

  setFormControl = new FormControl<string | MtgSet>('');
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  ngOnInit(): void {
    this.setFormControl.valueChanges.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((newVal) => {
      if(typeof newVal === 'object') {
        this.setSelected.emit(newVal?.code);
      }
    })
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}