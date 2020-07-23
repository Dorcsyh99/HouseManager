import { Component, OnInit } from '@angular/core';

import { Property } from "../property.model";
import { PropertyService } from "../property.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-featured-properties',
  templateUrl: './featured-properties.component.html',
  styleUrls: ['./featured-properties.component.scss']
})
export class FeaturedPropertiesComponent implements OnInit {

  stockImage = "../../assets/images/stock-house.jpg";
  isLoading = true;
  props: Property[] = [];
  propsPerPage = 4;
  totalProps = 0;
  currentPage = 0;
  public propsSub: Subscription;


  constructor(public propertyService: PropertyService) { }

  ngOnInit() {
    this.isLoading = true;
    this.propertyService.getProps(this.propsPerPage, this.currentPage);
    this.propsSub = this.propertyService
      .getPropsUpdateListener()
      .subscribe((propData: {props: Property[], propCount: number}) => {
        this.isLoading = false;
        this.totalProps = propData.propCount;
        this.props = propData.props;
      });
    }
  }

