import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetails';
import { CarFilter } from 'src/app/models/carFilter';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import { CarImageService } from 'src/app/services/carImage.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  isDataLoaded = false;
  filterText = '';
  carDetails: CarDetail[] = [];
  carImages: CarImage[] = [];
  rootPath = 'https://localhost:44379/Uploads/Images/';
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService
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

  // getImageSource(carId: number): string {
  //   this.carImageService.getImagesByCarId(carId).subscribe((response) => {
  //     this.carImages = response.data;
  //   });
  //   console.log(this.rootPath + this.carImages[0].imagePath);
  //   return this.rootPath + this.carImages[0].imagePath;
  // }

  checkIsCarImageNull() {
    if (this.carImages.length > 0) {
      return false;
    } else {
      return true;
    }
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
