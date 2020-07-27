import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../property.service';
import { ActivatedRoute } from '@angular/router';
import { Property } from '../property.model';
import { LoggedInUser } from '../../auth/auth-data.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-property-view',
  templateUrl: './property-view.component.html',
  styleUrls: ['./property-view.component.scss']
})
export class PropertyViewComponent implements OnInit {

  property: Property
  user: LoggedInUser

  constructor(private propertyService: PropertyService, private router: ActivatedRoute, private authService: AuthService) { }

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
        featured: propData.featured,
        image: propData.image,
        creator: propData.creator
      }
      this.authService.getUser(this.property.creator).subscribe(userData => {
        this.user = {
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
          jobTitle: userData.jobTitle,
          role: userData.role,
          registrationDate: userData.registrationDate,
          image: userData.image,
          uploadedProperties: userData.uploadedProperties,
          password: userData.password
        }
      })
    })
  }

  priceFormatting(price: number){
    return price/1000000;
  }
}
