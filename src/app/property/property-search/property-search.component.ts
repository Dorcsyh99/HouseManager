import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../property.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Property } from '../property.model';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-property-search',
  templateUrl: './property-search.component.html',
  styleUrls: ['./property-search.component.scss']
})
export class PropertySearchComponent implements OnInit {

  searchForm: FormGroup;

  constructor(private propertyService: PropertyService) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      city: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      minSize: new FormControl(null, ),
      maxSize: new FormControl(null, ),
      minPrice: new FormControl(null, ),
      maxPrice: new FormControl(null, )
    })
  }

  searchProps(){
    if(this.searchForm.invalid){
      console.log("invalid");
      return;
    }else{
      this.propertyService.searchProps(
        this.searchForm.value.city,
        this.searchForm.value.minSize,
        this.searchForm.value.maxSize,
        this.searchForm.value.minPrice,
        this.searchForm.value.maxPrice
      );
      console.log(this.searchForm.value.city);
      this.searchForm.reset();
    }
  }
}

@Component({
  selector: 'app-searcg-results',
  templateUrl: './property-search-result.component.html',
  styleUrls: ['./property-search.component.scss']
})
export class PropertySearchResultsComponent implements OnInit {

  resultSub: Subscription;
  props: Property [] = [];
  totalResults: number;


  constructor(private propertyService: PropertyService, private router: ActivatedRoute){}

  ngOnInit(){
    this.resultSub = this.propertyService
      .getSearchResultListener()
      .subscribe((propData: {props: Property[], resultCount: number}) => {
        this.totalResults = propData.resultCount;
        this.props = propData.props;
        console.log(this.props);
      });
  }
}

