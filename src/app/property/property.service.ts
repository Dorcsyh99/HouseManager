import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Property } from "./property.model";

@Injectable({ providedIn: "root" })
export class PropertyService {
  private props: Property[] = [];
  private url = "http://localhost:3000/api/props";
  private propsUpdated = new Subject<{ props: Property[]; propCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getProps() {
    //const queryParams = `?pagesize=${propsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; props: any; maxProps: number }>(
        "http://localhost:3000/api/props" //+ queryParams
      )
      .pipe(
        map(propData => {
          return {
            props: propData.props.map(prop => {
              return {
                city: prop.city,
                city2: prop.city2,
                address: prop.address,
                type: prop.type,
                size: prop.size,
                condition: prop.condition,
                price: prop.price,
                year: prop.year,
                numberOfRooms: prop.numberOfRooms,
                parking: prop.parking,
                furnitured: prop.furnitured,
                garden: prop.garden,
                attic: prop.attic,
                pet: prop.pet,
                smoke: prop.smoke,
                elevator: prop.elevator,
                level: prop.level,
                heatingType: prop.heatingType,
                id: prop._id,
                featured: prop.featured,
                creator: prop.creator,
                image: prop.image
              };
            }),
            maxProps: propData.maxProps
          };
        })
      )
      .subscribe(transformedPropData => {
        this.props = transformedPropData.props;
        this.propsUpdated.next({
          props: [...this.props],
          propCount: transformedPropData.maxProps
        });
      });
  }

  getPropsUpdateListener() {
    return this.propsUpdated.asObservable();
  }

  getProp(id: string) {
    return this.http.get<{
      _id: string;
      city: string;
      city2: string;
      address: string;
      type: string;
      size: number;
      price: number;
      condition: string;
      numberOfRooms: number;
      year: number;
      parking: string;
      furnitured: boolean;
      elevator: boolean;
      level: number;
      garden: boolean;
      attic: boolean;
      pet: boolean;
      smoke: boolean;
      description: string,
      heatingType: string;
      featured: boolean;
      creator: string;
      image: string;
    }>("http://localhost:3000/api/props/" + id);
  }

  addProp(type: string, city: string, city2: string, address: string,  size: number, price: number, condition: string, year: number,
    numberOfRooms: number, parking: string, furnitured= 'false', garden='false', attic="false", pet="false" , smoke="false",
    heatingType: string, elevator="false", description: string, level: number, image: File
    ) {
      console.log("INADDPROP");
      const propData = new FormData();
      propData.append("city", city);
      propData.append("city2", city2);
      propData.append("address", address);
      propData.append("condition", condition);
      propData.append("price", price as unknown as string);
      propData.append("year", year as unknown as string);
      propData.append("numberOfRooms", numberOfRooms as unknown as string);
      propData.append("garden", garden as unknown as string);
      propData.append("attic", attic as unknown as string);
      propData.append("heatingType", heatingType);
      propData.append("size", size as unknown as string);
      propData.append("elevator", elevator as unknown as string);
      propData.append("level", level as unknown as Blob);
      propData.append("furnitured", furnitured as unknown as Blob);
      propData.append("pet", pet as unknown as Blob);
      propData.append("smoke", smoke as unknown as Blob);
      propData.append("parking", parking);
      propData.append("description", description);
      //propData.append("image", new Blob([image], {type: 'application/json'}));
      propData.append("type", type);
    this.http
      .post<{message: string; prop: Property, headers: {"content-type": "multipart/form-data"}}>(
        this.url,
        propData
      )
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }

  updateProp(id: string, type: string, city: string, city2: string, address: string,  size: number, price: number, condition: string, year: number,
    numberOfRooms: number, parking: string, furnitured: boolean, garden: boolean, attic: boolean, pet: boolean, smoke: boolean,
    heatingType: string, elevator: boolean, description: string, level: number, image: string) {
    let propData: Property | FormData;
    /*if (typeof image === "object") {
      propData = new FormData();
      propData.append("id", id);
      propData.append("address", address);
      propData.append("condition", condition);
      propData.append("year", year as unknown as string);
      propData.append("numberOfRooms", numberOfRooms as unknown as string);
      propData.append("moveableFrom", moveableFrom);
      propData.append("furnitured", furnitured as unknown as string);
      propData.append("garden", garden as unknown as string);
      propData.append("attic", attic as unknown as string);
      propData.append("pet", pet as unknown as string);
      propData.append("smoke", smoke as unknown as string);
      propData.append("heatingType", heatingType as unknown as string);
      propData.append("size", size as unknown as string);
      propData.append("elevator", elevator as unknown as string);
      propData.append("level", level as unknown as string);
      propData.append("type", type);
    } else {*/
      propData = {
        id: id,
        city: city,
        city2: city2,
        address: address,
        type: type,
        size: size,
        price: price,
        condition: condition,
        year: year,
        numberOfRooms: numberOfRooms,
        parking: parking,
        furnitured: furnitured,
        garden: garden,
        attic: attic,
        pet: pet,
        smoke: smoke,
        elevator: elevator,
        level: level,
        description: description,
        heatingType: heatingType,
        image: image,
        creator: '12',
        featured: false
      };
    this.http
      .put("http://localhost:3000/api/props/" + id, propData)
      .subscribe(response => {
        this.router.navigate(["/"]);
      });
  }

  deleteProp(propId: string) {
    return this.http
      .delete("http://localhost:3000/api/props/" + propId);
  }
}


/* let propDataJson = {
      'city': city,
      "city2": city2,
      'address' : address,
      'type': type,
      'condition': condition,
      'year': year,
      'numberOfRooms': numberOfRooms,
      'parking': parking,
      'price': price,
      'furnitured': furnitured,
      'garden': garden,
      'attic': attic,
      'pet': pet,
      'smoke': smoke,
      'size': size,
      'elevator': elevator,
      'level': level,
      'heatingType': heatingType,
      'description': description,
      'image': image
      */
