import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/carImage.service';

@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.css'],
})
export class CarImageComponent implements OnInit {
  carImages: CarImage[] = [];
  baseUrl = 'https://localhost:44379/Uploads/Images/';
  constructor(
    private carImageService: CarImageService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarImagesByCarId(params['carId']);
      }
    });
  }

  getCarImagesByCarId(carId: number) {
    this.carImageService.getCarImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }

  getActiveImageClass(carImage: CarImage) {
    if (carImage === this.carImages[0]) {
      return 'active';
    } else {
      return '';
    }
  }

  getImageSource(carImage: CarImage): string {
    let url: string = this.baseUrl + carImage.imagePath;
    return url;
  }
}
