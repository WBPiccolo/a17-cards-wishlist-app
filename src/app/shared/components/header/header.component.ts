import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MtgSet } from '../../../core/models/mtg-sets.model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    AsyncPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnChanges {
  @Input() sets: MtgSet[] = [];
  @Output() setSelected: EventEmitter<any> = new EventEmitter();
  @Output() selectDeselectClicked: EventEmitter<boolean> = new EventEmitter();
  @Output() getListClicked: EventEmitter<MouseEvent> = new EventEmitter();

  setFormControl = new FormControl<string | MtgSet>('');
  filteredSets: Observable<MtgSet[]> = new Observable();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sets'].currentValue) {
      this.filteredSets = this.setFormControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.name;
          return name ? this._filter(name as string) : this.sets.slice();
        }),
      );
    }
  }

  private _filter(value: string): MtgSet[] {
    const filterValue = value.toLowerCase();
    return this.sets.filter(set => set.name.toLowerCase().includes(filterValue) || set.code.toLowerCase().includes(filterValue));
  }

  displayFn(user: MtgSet): string {
    return user && user.name ? user.name : '';
  }
}