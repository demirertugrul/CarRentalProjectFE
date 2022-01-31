import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  filterText = '';
  selectedBrand: any = 'Sort By';
  selectedColor: any = 'Sort By';
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else {
        this.getCars();
      }
    });
  }

  getCars() {
    this.carService.getCars().subscribe((res) => {
      this.cars = res.data;
      this.selectedColor = 0;
      this.selectedBrand = 0;
    });
  }

  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((res) => {
      this.cars = res.data;
    });
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((res) => {
      this.cars = res.data;
    });
  }

  filterBySelected() {
    // Number(this.selectedBrand)
    // console.log(Number(this.selectedBrand));
    // console.log(Number(this.selectedColor));
    if (this.selectedBrand !== 0 && this.selectedColor !== 0) {
      this.carService
        .getCarsByFilter(this.selectedBrand, this.selectedColor)
        .subscribe((res) => {
          this.cars = res.data;
        });
      this.toastrService.success('Filter worked.', 'Filtered!');
    }
  }
}
