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

  constructor(public authService: AuthService) {

  }

  ngOnInit() {
    this.authService.autoAuthUser();
   this.authService.getUser(this.id);

  }

}
