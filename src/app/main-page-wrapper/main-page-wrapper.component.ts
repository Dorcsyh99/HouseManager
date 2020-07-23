import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-main-page-wrapper',
  templateUrl: './main-page-wrapper.component.html',
  styleUrls: ['./main-page-wrapper.component.scss']
})
export class MainPageWrapperComponent implements OnInit {

  mainPagePic = '../assets/images/pic2.jpg';


  constructor(public dialog: MatDialog) { }



  ngOnInit() {
  }

}


