import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MtgSet } from '../../../core/models/mtg-sets.model';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() sets: MtgSet[] = [];
  @Output() setSelected: EventEmitter<any> = new EventEmitter();
  @Output() selectDeselectClicked: EventEmitter<boolean> = new EventEmitter();
  @Output() getListClicked: EventEmitter<MouseEvent> = new EventEmitter();

  setFormControl: FormControl = new FormControl<string>('');

}
