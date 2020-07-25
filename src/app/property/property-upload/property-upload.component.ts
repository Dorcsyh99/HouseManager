import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { PropertyService } from "../property.service";
import { Property } from "../property.model";
import { mimeType } from "./mime-type.validator";

@Component({
  selector: 'app-property-upload',
  templateUrl: './property-upload.component.html',
  styleUrls: ['./property-upload.component.scss']
})
export class PropertyUploadComponent implements OnInit {

    enteredAddress = "";
    enteredType = "";
    prop: Property;
    isLoading = false;
    form: FormGroup;
    imagePreview: string;
    private mode = "create";
    private propId: string;

    constructor(
      public propertyService: PropertyService,
      public route: ActivatedRoute
    ) {}

    ngOnInit() {
      this.form = new FormGroup({
        city: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)]
        }),
        city2: new FormControl(null),
        address: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)]
        }),
        size: new FormControl(null, {validators: [Validators.required]}),
        type: new FormControl(null, { validators: [Validators.required] }),
        price: new FormControl(null, {validators: [Validators.required]}),
        description: new FormControl(null),
        image: new FormControl(null, {
          asyncValidators: [mimeType]
        }),
        condition: new FormControl(null, {validators: [Validators.required]}),
        numberOfRooms: new FormControl(null, {validators: [Validators.required]}),
        year: new FormControl(null, {validators: [Validators.required, Validators.minLength(3), Validators.maxLength(3)]}),
        parking: new FormControl(null, {validators: [Validators.required]}),
        furnitured: new FormControl(null, {validators: [Validators.required]}),
        elevator: new FormControl(null, {validators: []}),
        level: new FormControl(null),
        garden: new FormControl(null),
        attic: new FormControl(null),
        pet: new FormControl(null),
        smoke: new FormControl(null),
        heatingType: new FormControl(null),
        featured: new FormControl(null)
      });
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has("propId")) {
          this.mode = "edit";
          this.propId = paramMap.get("propId");
          this.isLoading = true;
          this.propertyService.getProp(this.propId).subscribe(propData => {
            this.isLoading = false;
            this.prop = {
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
            };
            this.form.setValue({
              city: this.prop.city,
              city2: this.prop.city2,
              address: this.prop.address,
              type: this.prop.type,
              size: this.prop.size,
              condition: this.prop.condition,
              year: this.prop.year,
              price: this.prop.price,
              numberOfRooms: this.prop.numberOfRooms,
              parking: this.prop.parking,
              furnitured: this.prop.furnitured,
              garden: this.prop.garden,
              attic: this.prop.attic,
              pet: this.prop.pet,
              smoke: this.prop.smoke,
              elevator: this.prop.elevator,
              level: this.prop.level,
              heatingType: this.prop.heatingType,
            });
          });
          console.log(this.prop);
        } else {
          this.mode = "create";
          this.propId = null;
        }
      });
    }

    onImagePicked(event: Event) {
      const file = (event.target as HTMLInputElement).files[0];
      this.form.patchValue({ image: file });
      this.form.get("image").updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }

    onSaveProperty() {
      if (this.form.invalid) {
        return;
      }
      this.isLoading = true;
      if (this.mode === "create") {
        this.propertyService.addProp(
          this.form.value.city,
          this.form.value.city2,
          this.form.value.address,
          this.form.value.type,
          this.form.value.size,
          this.form.value.price,
          this.form.value.condition,
          this.form.value.year,
          this.form.value.numberOfRooms,
          this.form.value.parking,
          this.form.value.furnitured,
          this.form.value.garden,
          this.form.value.attic,
          this.form.value.heatingType,
          this.form.value.elevator,
          this.form.value.descripton,
          this.form.value.level,
          this.form.value.image
        );
        console.log(this.form.value.image.name);
      } else {
        this.propertyService.updateProp(
          this.propId,
          this.form.value.city,
          this.form.value.city2,
          this.form.value.address,
          this.form.value.type,
          this.form.value.size,
          this.form.value.condition,
          this.form.value.year,
          this.form.value.numberOfRooms,
          this.form.value.parking,
          this.form.value.furnitured,
          this.form.value.garden,
          this.form.value.attic,
          this.form.value.pet,
          this.form.value.smoke,
          this.form.value.heatingType,
          this.form.value.elevator,
          this.form.value.level,
          this.form.value.description,
          this.form.value.price,
          this.form.value.featured
        );
      }
      this.form.reset();
    }
  }
