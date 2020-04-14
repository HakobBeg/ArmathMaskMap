import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

interface DialogData {
  email: string;
  pass: string;
}

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<AdminLoginComponent>,
               @Inject(MAT_DIALOG_DATA) public data: DialogData) { }




  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
