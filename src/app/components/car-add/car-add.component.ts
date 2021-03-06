import { Car } from 'src/app/models/car';
import { Color } from './../../models/color';
import { Brand } from 'src/app/models/brand';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
} from '@angular/forms';
import { CarService } from 'src/app/services/car.service';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  carAddForm: FormGroup;
  brands: Brand[] = [];
  colors: Color[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createCarAddForm();
    this.getBrands();
    this.getColors();
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      carName: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      minFindeksScore: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  add() {
    if (this.carAddForm.valid) {
      let brandId = parseInt(this.carAddForm.value.brandId);
      let colorId = parseInt(this.carAddForm.value.colorId);
      let carModel: Car = Object.assign({}, this.carAddForm.value);
      carModel.brandId = brandId;
      carModel.colorId = colorId;
      carModel.descriptions = this.carAddForm.value.description;
      carModel.modelName = this.carAddForm.value.carName;
      this.carService.add(carModel).subscribe(
        (response) => {
          this.toastrService.success('Car is added..', 'Worked!');
        },
        (errorResponse) => {
          console.log(errorResponse);
          if (errorResponse.error.Errors.length > 0) {
            for (let i = 0; i < errorResponse.error.Errors.length; i++) {
              this.toastrService.error(
                errorResponse.error.Errors[i].ErrorMessage,
                'Failed!'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Missing data..', 'Failed!');
    }
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
}
