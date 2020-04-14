import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavBarComponent} from './Components/nav-bar/nav-bar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ContentComponent} from './Components/content/content.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatExpansionModule} from '@angular/material/expansion';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {EditingPopupComponent} from './Components/editing-popup/editing-popup.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {AuthentificationService} from './Services/authentification.service';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import { AdminLoginComponent } from './Components/admin-login/admin-login.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ContentComponent,
    EditingPopupComponent,
    AdminLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    DragDropModule,
    MatExpansionModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    AngularFireAuthModule,
    MatInputModule,
    MatSnackBarModule
  ],

  exports: [
  ],

  providers: [AuthentificationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
