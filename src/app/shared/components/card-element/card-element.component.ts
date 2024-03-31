import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MtgCard } from '../../../core/models/mtg-cards.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-element',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-element.component.html',
  styleUrl: './card-element.component.scss'
})
export class CardElementComponent {
  @Input()
  card!: MtgCard;

  @Output()
  cardClicked: EventEmitter<MtgCard> = new EventEmitter<MtgCard>();
}
