import { Component, Input } from '@angular/core';
import { MtgCard } from '../../../core/models/mtg-cards.model';

@Component({
  selector: 'app-card-element',
  standalone: true,
  imports: [],
  templateUrl: './card-element.component.html',
  styleUrl: './card-element.component.scss'
})
export class CardElementComponent {
  @Input()
  card!: MtgCard;
}
