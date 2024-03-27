import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MtgSet } from '../../../core/models/mtg-sets.model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SetSelectorComponent } from "../set-selector/set-selector.component";
import { MatSelectModule } from '@angular/material/select';
import { LanguageOption } from '../../../core/models/language-option';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

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
    SetSelectorComponent,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule
  ]
})
export class HeaderComponent {
  @Input() sets: MtgSet[] = [];
  @Input() languages: LanguageOption[] = [];
  @Input() form: FormGroup = new FormGroup({});

  @Output() selectDeselectClicked: EventEmitter<boolean> = new EventEmitter();
  @Output() getListClicked: EventEmitter<MouseEvent> = new EventEmitter();

}