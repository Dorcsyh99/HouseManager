import { Component, OnInit, OnDestroy } from "@angular/core";
import { PageEvent } from "@angular/material";
import { Subscription } from "rxjs";

import { Property } from "../property.model";
import { PropertyService } from "../property.service";
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: "app-property-list",
  templateUrl: "./property-list.component.html",
  styleUrls: ["./property-list.component.scss"]
})
export class PropertyListComponent implements OnInit, OnDestroy {

  props: Property[] = [];
  isLoading = false;
  totalProps = 0;
  propsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private propsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public propertyService: PropertyService,
    public authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.propertyService.getProps(this.propsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.propsSub = this.propertyService
      .getPropsUpdateListener()
      .subscribe((propData: {props: Property[], propCount: number}) => {
        this.isLoading = false;
        this.totalProps = propData.propCount;
        this.props = propData.props;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.propsPerPage = pageData.pageSize;
    this.propertyService.getProps(this.propsPerPage, this.currentPage);
  }

  onDelete(propId: string) {
    this.isLoading = true;
    this.propertyService.deleteProp(propId).subscribe(() => {
      this.propertyService.getProps(this.propsPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    this.propsSub.unsubscribe();
  }
}
