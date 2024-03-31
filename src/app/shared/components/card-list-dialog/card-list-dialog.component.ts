import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogRef
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-card-list-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogTitle, MatDialogContent, MatIconModule, MatDialogActions, FormsModule, MatInputModule],
  templateUrl: './card-list-dialog.component.html',
  styleUrl: './card-list-dialog.component.scss'
})
export class CardListDialogComponent {
  constructor(public dialogRef: MatDialogRef<CardListDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  closeDialog() {
    this.dialogRef.close();
  }
}
