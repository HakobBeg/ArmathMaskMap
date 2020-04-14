import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth, User} from 'firebase';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  user: User;



  constructor(public  authFire: AngularFireAuth, public  router: Router, private db: AngularFirestore) {
    this.authFire.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }


  getToken() {
    return this.authFire.idToken;
  }

  async passwordReset(email: string) {
    return this.authFire.auth.sendPasswordResetEmail(email);
  }

  async login(email: string, password: string) {

    const result = await this.authFire.auth.signInWithEmailAndPassword(email, password).then(() => {
      this.router.navigate(['home']);
    });
  }

  register(email: string, password: string, dispName: string) {
    return this.authFire.auth.createUserWithEmailAndPassword(email, password).then(() => {
      this.authFire.auth.currentUser.updateProfile({displayName: dispName}).then(() => {
        this.router.navigate(['home']);
      });
    });
  }

  async sendEmailVerification() {
    await this.authFire.auth.currentUser.sendEmailVerification();
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  async loginWithGoogle() {
    await this.authFire.auth.signInWithPopup(new auth.GoogleAuthProvider());

  }

  async logout() {
    await this.authFire.auth.signOut();
    localStorage.removeItem('user');
  }

  async updateUser() {

    await this.user.updateProfile({
      displayName: 'Hakob',
      photoURL: 'https://example.com/jane-q-user/profile.jpg'
    });
  }


}
