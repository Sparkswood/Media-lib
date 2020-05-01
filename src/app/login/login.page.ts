import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../shared/authentication.service';
import { User } from '../shared/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  loginForm: FormGroup;

  errorMessages = {
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'minLength', message: 'Email suspiciously short' },
      { type: 'pattern', message: 'Wrong format'}
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minLength', message: 'Required length is minimum 8 characters' },
      {
        type: 'pattern',
        message: 'Password is too weak'
      }
    ]
  };

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private authService: AuthenticationService
  ) {
    this.initializeForm();
  }
  

  ionViewWillLeave() {
    this.loginForm.clearValidators()
    this.loginForm.reset()
    this.initializeForm();
  }

  async presentToast(message, duration) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
      ]))
    });
  }

  authorize() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.authService.SignIn(email, password).then( () => {
      this.router.navigate(['/menu/film']);
      this.loginForm.clearValidators()
      this.loginForm.reset()
      this.initializeForm();
    }).catch( error => {
      this.presentToast(error.message, 1000);
    });
  }

  register() {
    this.router.navigate(['/register']);
  }

  authorizeGoogle() {
    this.authService.GoogleAuth();
  }
}
