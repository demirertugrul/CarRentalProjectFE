import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetails';
import { CarFilter } from 'src/app/models/carFilter';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  isDataLoaded = false;
  filterText = '';
  carDetails: CarDetail[] = [];

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId'] && params['colorId']) {
        this.getCarDetailsByFiltered(params['brandId'], params['colorId']);
      } else if (params['brandId']) {
        this.getCarDetailsByBrandId(params['brandId']);
      } else if (params['colorId']) {
        this.getCarDetailsByColorId(params['colorId']);
      } else {
        this.getCarDetails();
      }
    });
  }

  getCarDetails() {
    return this.carService.getCarDetails().subscribe((response) => {
      this.carDetails = response.data;
      this.isDataLoaded = true;
    });
  }

  getCarDetailsByBrandId(brandId: number) {
    return this.carService
      .getCarDetailsByBrandId(brandId)
      .subscribe((response) => {
        this.carDetails = response.data;
        this.isDataLoaded = true;
      });
  }

  getCarDetailsByColorId(colorId: number) {
    return this.carService
      .getCarDetailsByColorId(colorId)
      .subscribe((response) => {
        this.carDetails = response.data;
        this.isDataLoaded = true;
        console.log(response.data);
      });
  }

  getCarDetailsByFiltered(brandId: number, colorId: number) {
    let carFilter: CarFilter = {
      brandId: parseInt(brandId.toString()),
      colorId: parseInt(colorId.toString()),
    };
    return this.carService
      .getCarDetailsByFiltered(carFilter)
      .subscribe((response) => {
        this.carDetails = response.data;
        this.isDataLoaded = true;
      });
  }
}
