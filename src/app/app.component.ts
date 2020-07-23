import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatStepperModule } from '@angular/material';
import {AuthService} from '../app/auth/auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'house-manager';
  isAuthenticated = false;

  constructor(private authService: AuthService) {}

  ngOnInit(){
    this.authService.autoAuthUser();
  }


}
