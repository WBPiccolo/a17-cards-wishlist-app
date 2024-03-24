import { Component, Input, OnChanges, SimpleChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MtgSet } from '../../../core/models/mtg-sets.model';
import { Observable, startWith, map } from 'rxjs';

@Component({
  selector: 'app-set-selector',
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
  templateUrl: './set-selector.component.html',
  styleUrl: './set-selector.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SetSelectorComponent),
    multi: true
  }]
})
export class SetSelectorComponent implements ControlValueAccessor, OnChanges {
  @Input() sets: MtgSet[] = [];

  setFormControl = new FormControl<string | MtgSet>('');
  filteredSets: Observable<MtgSet[]> = new Observable();

  private onChange!: (value: string) => void;
  private onTouched!: () => void;

  writeValue(obj: any): void {
    //throw new Error('Method not implemented.');
    //th
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  inputChanged(data: any) {
    this.onChange(data);
  }

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

  selectOption(option: MatAutocompleteSelectedEvent) {
    this.onChange(option.option.value);
  }

  private _filter(value: string): MtgSet[] {
    const filterValue = value.toLowerCase();
    return this.sets.filter(set => set.name.toLowerCase().includes(filterValue) || set.code.toLowerCase().includes(filterValue));
  }

  displayFn(set: MtgSet): string {
    return set && set.name ? set.name : '';
  }
}
