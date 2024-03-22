import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { MtgSet } from '../../../core/models/mtg-sets.model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subject, map, startWith, takeUntil } from 'rxjs';
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
export class HeaderComponent implements OnInit, OnChanges {
  @Input() sets: MtgSet[] = [];
  @Output() setSelected: EventEmitter<any> = new EventEmitter();
  @Output() selectDeselectClicked: EventEmitter<boolean> = new EventEmitter();
  @Output() getListClicked: EventEmitter<MouseEvent> = new EventEmitter();

  //filteredSets: MtgSet[] = [];
  setFormControl: FormControl = new FormControl<string>('');
  destroy$: Subject<boolean> = new Subject();

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredSets: Observable<MtgSet[]> = new Observable();

  ngOnInit() {
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value || '')),
    // );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['sets'].currentValue) {
      this.filteredSets = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    }
  }

  private _filter(value: string): MtgSet[] {
    const filterValue = value.toLowerCase();
    return this.sets.filter(set => set.name.toLowerCase().includes(filterValue));
  }
  
}
