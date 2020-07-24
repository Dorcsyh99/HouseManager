import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoggedInUser } from '../auth-data.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.scss']
})
export class UserhomeComponent implements OnInit {

  public user = localStorage.getItem("userName");
  public id = localStorage.getItem("userId");
  public userData: LoggedInUser;

  constructor(public authService: AuthService) {

  }

  ngOnInit() {
    this.authService.getUser(this.id).subscribe(user => {
      this.userData = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        image: user.image,
        jobTitle: user.jobTitle,
        registrationDate: user.registrationDate,
        uploadedProperties: user.uploadedProperties,
        role: user.role,
        password: user.password
      }
      console.log(this.userData);
    });
  }


}
