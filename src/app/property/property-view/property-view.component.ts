import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../property.service';
import { ActivatedRoute } from '@angular/router';
import { Property } from '../property.model';

@Component({
  selector: 'app-property-view',
  templateUrl: './property-view.component.html',
  styleUrls: ['./property-view.component.scss']
})
export class PropertyViewComponent implements OnInit {

  property: Property

  constructor(private propertyService: PropertyService, private router: ActivatedRoute) { }

  ngOnInit() {
    const id = this.router.snapshot.params['id'];
    this.propertyService.getProp(id).subscribe(propData => {
      this.property = {
        id: propData._id,
        city: propData.city,
        city2: propData.city2,
        address: propData.address,
        type: propData.type,
        size: propData.size,
        price: propData.price,
        condition: propData.condition,
        year: propData.year,
        numberOfRooms: propData.numberOfRooms,
        parking: propData.parking,
        furnitured: propData.furnitured,
        garden: propData.garden,
        attic: propData.attic,
        pet: propData.pet,
        smoke: propData.smoke,
        elevator: propData.elevator,
        level: propData.level,
        description: propData.description,
        heatingType: propData.heatingType,
        featured: propData.featured
      }
    })
  }



}
