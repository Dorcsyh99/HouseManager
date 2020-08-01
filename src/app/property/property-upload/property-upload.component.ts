import { Component, OnInit, Output } from "@angular/core";
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
  @Output()


    currentStep = 0;
    enteredAddress = "";
    enteredType = "";
    prop: Property;
    isLoading = false;
    imagePreview: string;
    private mode = "create";
    private propId: string;
    typeForm: FormGroup;
    addressForm: FormGroup;
    datasForm: FormGroup;
    optionalForm: FormGroup;
    imageForm: FormGroup;

    constructor(
      public propertyService: PropertyService,
      public route: ActivatedRoute
    ) {}

    ngOnInit() {
      this.typeForm = new FormGroup({
        type: new FormControl("elado")
      })
      this.addressForm = new FormGroup({
        city: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)]
        }),
        city2: new FormControl(null),
        address: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(3)]
        })
      });
      this.datasForm = new FormGroup({
        size: new FormControl(null, {validators: [Validators.required]}),
        price: new FormControl(null, {validators: [Validators.required]}),
        condition: new FormControl(null, {validators: [Validators.required]}),
        numberOfRooms: new FormControl(null, {validators: [Validators.required]}),
        year: new FormControl(null, {validators: [Validators.required, Validators.minLength(3), Validators.maxLength(3)]}),
        heatingType: new FormControl(null),
      })
      this.optionalForm = new FormGroup({
        garden: new FormControl(null),
        attic: new FormControl(null),
        pet: new FormControl(null),
        smoke: new FormControl(null),
        furnitured: new FormControl(null, {validators: [Validators.required]}),
        elevator: new FormControl(null, {validators: []}),
        parking: new FormControl(null, {validators: [Validators.required]}),
        level: new FormControl(null),
      })
      this.imageForm = new FormGroup({
        description: new FormControl(null),
        image: new FormControl(null, {
          asyncValidators: [mimeType]
        })
      })
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
              featured: propData.featured,
              image: propData.image,
              creator: propData.creator
            };
          });
          console.log(this.prop);
        } else {
          this.mode = "create";
          this.propId = null;
        }
      });
    }

    stepNext(){
      this.currentStep += 1;
    }
    stepBack(){
      this.currentStep -= 1;
    }
    typeSelect(no: number){
      if(no === 1){
        this.typeForm.patchValue({
          type: "Eladó"
        });
        this.stepNext();
      }else{
        this.typeForm.patchValue({
          type: "Kiadó"
        });
        this.stepNext();
      }
    }
    onImagePicked(event: Event) {
      const file = (event.target as HTMLInputElement).files[0];
      this.imageForm.patchValue({ image: file });
      console.log("picked");
      this.imageForm.get("image").updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }

    onSaveProperty() {
      if (this.typeForm.invalid || this.addressForm.invalid || this.datasForm.invalid || this.optionalForm.invalid || this.imageForm.invalid ) {
        console.log("invalid form");
      }
      console.log("Not invalid");
      this.isLoading = true;
      if (this.mode === "create") {
        console.log("entered here");
        this.propertyService.addProp(
          this.typeForm.value.type,
          this.addressForm.value.city,
          this.addressForm.value.city2,
          this.addressForm.value.address,
          this.datasForm.value.size,
          this.datasForm.value.price,
          this.datasForm.value.numberOfRooms,
          this.datasForm.value.condition,
          this.datasForm.value.year,
          this.datasForm.value.heatingType,
          this.optionalForm.value.level,
          this.optionalForm.value.parking,
          this.optionalForm.value.elevator,
          this.optionalForm.value.garden,
          this.optionalForm.value.attic,
          this.optionalForm.value.pet,
          this.optionalForm.value.smoke,
          this.optionalForm.value.furnitured,
          this.imageForm.value.image,
          this.imageForm.value.description
        );
        console.log("after addprop");
      } else {
        this.propertyService.updateProp(
          this.prop.id,
          this.typeForm.value.type,
          this.addressForm.value.city,
          this.addressForm.value.city2,
          this.addressForm.value.address,
          this.datasForm.value.size,
          this.datasForm.value.price,
          this.datasForm.value.numberOfRooms,
          this.datasForm.value.condition,
          this.datasForm.value.year,
          this.datasForm.value.heatingType,
          this.optionalForm.value.level,
          this.optionalForm.value.parking,
          this.optionalForm.value.elevator,
          this.optionalForm.value.garden,
          this.optionalForm.value.attic,
          this.optionalForm.value.pet,
          this.optionalForm.value.smoke,
          this.optionalForm.value.furnitured,
          this.imageForm.value.image,
          this.imageForm.value.description
        );
      }
      console.log("before reset");
      this.addressForm.reset();
      this.datasForm.reset();
      this.optionalForm.reset();
      this.imageForm.reset();
      this.typeForm.reset();
    }
  }
