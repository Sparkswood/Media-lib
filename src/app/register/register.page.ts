import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';
import { Validators, FormControl, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { User } from '../shared/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  registerForm: FormGroup;
  matchPasswordForm: FormGroup;

  errorMessages = {
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'minLength', message: 'Email suspiciously short' },
      { type: 'pattern', message: 'Wrong format'}
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minLength', message: 'Password is too short' },
      {
        type: 'pattern',
        message: 'Password is too weak '
      }
    ],
    confirmPassword: [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'MatchPassword', message: 'Passwords are different'}
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

  matchPassword(abstractControl: AbstractControl) {
    let password = abstractControl.get('password').value;
    let confirmPassword = abstractControl.get('confirmPassword').value;
    if (password !== confirmPassword) {
        abstractControl.get('confirmPassword').setErrors({
          MatchPassword: true
        });
    } else {
      return null;
    }
  }

  ionViewWillLeave() {
    this.registerForm.clearValidators();
    this.registerForm.reset();
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
    this.registerForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
      ])),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.required
      ]))
    }, {
      validators: this.matchPassword
    });
  }

  register() {
    const email = this.registerForm.get('email').value;
    const password = this.registerForm.get('password').value;

    this.authService.RegisterUser(email, password).then( () => {
      this.router.navigate(['/login']);
      this.registerForm.clearValidators()
      this.registerForm.reset()
      this.initializeForm();
    }).catch( error => {
      this.presentToast(error.message, 1000);
    });

    
  }

}
