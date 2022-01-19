import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { CarService } from 'src/app/services/car.service/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  brands: Brand[] = [];
  colors: Color[] = [];
  cars: Car[] = [];
  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.getCars();
  }

  getCars() {
    this.carService.getCars().subscribe((res) => {
      this.cars = res.data;

      this.carService.getColors().subscribe((res) => {
        this.colors = res.data;

        this.carService.getBrands().subscribe((res) => {
          this.brands = res.data;

          if (this.cars.length > 0) {
            this.matchTableInfos();
          }
        });
      });
    });
  }

  matchTableInfos() {
    let colorsArray = [];
    let brandsArray = [];
    let carsColorArray = [];
    let carsBrandArray = [];
    let brandNameArray = [];
    let colorNameArray = [];
    for (let i = 0; i < this.colors.length; i++) {
      colorsArray.push(this.colors[i].colorId);
      brandsArray.push(this.brands[i].brandId);
      carsBrandArray.push(this.cars[i].brandId);
      carsColorArray.push(this.cars[i].colorId);
      brandsArray.push(this.brands[i].brandId);
      brandNameArray.push(this.brands[i].brandName);
      colorNameArray.push(this.colors[i].colorName);
      if (carsColorArray[i] == brandsArray[i]) {
        this.cars[i].brandId = brandNameArray[i];
      }
      if (carsColorArray[i] == colorsArray[i]) {
        this.cars[i].colorId = colorNameArray[i];
      }
    }
  }
}
