import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
  count: number;
  name: string;
  action?: string;
}


@Component({
  selector: 'app-editing-popup',
  templateUrl: './editing-popup.component.html',
  styleUrls: ['./editing-popup.component.css']
})



export class EditingPopupComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<EditingPopupComponent>,
               @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
