import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

interface Role {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  role = "User";

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  onSignup(form: NgForm){
    if(form.invalid){
      console.log('invalid form!');
    }
    this.authService.createUser(form.value.email, form.value.password, form.value.firstName, form.value.lastName, this.role);
  }

}

@Component({
  selector: 'app-successful-registration',
  templateUrl: './success.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SuccessfulRegistrationComponent{

}
