import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from '../../Services/authentification.service';
import {EditingPopupComponent} from '../editing-popup/editing-popup.component';
import {MatDialog} from '@angular/material/dialog';
import {AdminLoginComponent} from '../admin-login/admin-login.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DatabaseWorkerService} from '../../Services/database-worker.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private auth: AuthentificationService, public dialog: MatDialog, private SnackBar: MatSnackBar, private dbWorker: DatabaseWorkerService) {
  }

  winSize = window.innerWidth;

  get isLoged() {
    return this.auth.isLoggedIn;
  }

  dispatchAction(action: string) {
    this.dbWorker.dispatcher(action);
  }

  saveChanges() {
    this.dbWorker.saveChanges();
  }

  openSnackBar(message: string, action: string) {
    this.SnackBar.open(message, action, {
      duration: 10000,
      verticalPosition: 'top'
    });
  }

  logOut() {
    this.auth.logout();
  }

  public getUserDisplayName() {
    return (this.auth.user) ? this.auth.user.displayName : '';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AdminLoginComponent, {
      width: '350px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {

      this.auth.login(result.email, result.pass).then(() => {
        this.openSnackBar('Դուք հաջողությամբ մուտքագրվեցիք։', 'լավ');
      }).catch(() => {
        this.openSnackBar('Սխալ` մուտքագրման ընթացքում, խնդրում  ենք նորից փորձել։', 'լավ');
      });
    });
  }


  ngOnInit(): void {


  }

}
