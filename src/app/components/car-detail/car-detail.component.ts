import { Brand } from 'src/app/models/brand';
import { Color } from './../../models/color';
import { Car } from 'src/app/models/car';
import { Rental } from 'src/app/models/rental';
import { CarImage } from './../../models/carImage';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { CarDetail } from 'src/app/models/carDetails';
import { CustomerDetail } from 'src/app/models/costumerDetail';
import { CarService } from 'src/app/services/car.service';
import { UserDetail } from 'src/app/models/userDetail';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/carImage.service';
import { ColorService } from 'src/app/services/color.service';
import { RentalService } from 'src/app/services/rental.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carDetail: CarDetail;
  carImages: CarImage[] = [];
  rootPath = 'https://localhost:44379/Uploads/Images/';
  isDataLoaded = false;
  carId: number;
  lastRental = {
    id: 0,
    carId: 0,
    customerId: 0,
    rentDate: new Date(2021, 12, 12),
    returnDate: new Date(2021, 12, 12),
  };
  newRental: Rental = {
    id: 0,
    carId: 0,
    customerId: 0,
    rentDate: new Date(2021, 12, 12),
    returnDate: new Date(2021, 12, 12),
  };
  customerDetail: CustomerDetail;
  rentDate: string;
  returnDate: string;
  lastRentalReturnDate: string;
  isDatesValid = false;
  carUpdateForm: FormGroup;
  car: Car;
  colors: Color[];
  brands: Brand[];
  isCarImageNull = true;

  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private brandService: BrandService,
    private colorService: ColorService,
    private customerService: CustomerService,
    private localStorageService: LocalStorageService,
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.carId = params['carId'];
        this.getCarDetail(params['carId']);
        this.getCarImages(params['carId']);
        this.getCarById();
        this.getLastRentalByCarId(params['carId']);
        this.getCustomerDetail();
        this.getBrands();
        this.getColors();
        this.createCarUpdateForm();
      }
    });
  }

  getCarDetail(carId: number) {
    this.carService.getCarDetailById(carId).subscribe((response) => {
      this.carDetail = response.data;
      this.isDataLoaded = true;
      this.setCarUpdateFormValues();
      console.log(this.carDetail);
    });
  }

  getCustomerDetail() {
    let userDetail: UserDetail = JSON.parse(
      this.localStorageService.getItem('user_details') || ''
    );
    this.customerService
      .getCustomerDetailsByUserId(userDetail.id)
      .subscribe((response) => {
        this.customerDetail = response.data;
      });
  }

  checkAdmin(): boolean {
    if (this.localStorageService.getItem('user_claim') === '"admin"') {
      return true;
    } else {
      return false;
    }
  }

  checkFindeksScore() {
    if (this.carDetail.minFindeksScore > this.customerDetail.findeksPoint) {
      return false;
    } else {
      return true;
    }
  }

  getCarImages(carId: number) {
    this.carImageService.getImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
      this.isDataLoaded = true;
      this.checkIsCarImageNull();
    });
  }

  checkIsCarImageNull() {
    let isExistCarImage = this.carImages.find((image) => image.id === 0);
    if (isExistCarImage) {
      return true;
    } else {
      return false;
    }
  }

  getLastRentalByCarId(carId: number) {
    this.rentalService.getLastRentalByCarId(carId).subscribe((response) => {
      this.lastRental = response.data;
      if (response.data) {
        this.lastRentalReturnDate = this.returnDateFormat();
      } else {
        this.lastRentalReturnDate = new Date().toString();
      }
    });
  }

  returnDateFormat() {
    this.lastRentalReturnDate =
      new Date(this.lastRental.returnDate.toString()).getFullYear().toString() +
      '-';
    if (new Date(this.lastRental.returnDate.toString()).getMonth() < 10) {
      this.lastRentalReturnDate +=
        '0' +
        (
          new Date(this.lastRental.returnDate.toString()).getMonth() + 1
        ).toString() +
        '-';
    } else {
      this.lastRentalReturnDate +=
        (
          new Date(this.lastRental.returnDate.toString()).getMonth() + 1
        ).toString() + '-';
    }
    if (new Date(this.lastRental.returnDate.toString()).getDate() < 10) {
      this.lastRentalReturnDate +=
        '0' +
        (
          new Date(this.lastRental.returnDate.toString()).getDate() + 1
        ).toString();
    } else {
      this.lastRentalReturnDate += (
        new Date(this.lastRental.returnDate.toString()).getDate() + 1
      ).toString();
    }
    return this.lastRentalReturnDate.toString();
  }

  controlDates() {
    if (
      Date.parse(this.rentDate) > Date.parse(this.returnDate) ||
      Date.parse(this.rentDate) < Date.now() - 86400000 ||
      !this.rentDate ||
      !this.returnDate
    ) {
      this.isDatesValid = false;
    } else {
      this.isDatesValid = true;
    }
  }

  rentCar(rental: Rental) {
    if (!this.checkFindeksScore()) {
      this.router.navigate(['cars/detail/', this.carDetail.id]);
      this.toastrService.error('Findex point is not enough..', 'Failed!');
    } else {
      this.controlDates();
      rental.carId = this.carId;
      rental.customerId = this.customerDetail.id;
      rental.rentDate = new Date(this.rentDate);
      rental.returnDate = new Date(this.returnDate);
      if (this.isDatesValid === true) {
        this.toastrService.success(
          'Worked! You are redirected to the payment page..'
        );
        setTimeout(() => {
          this.router.navigate(['/cars/detail/rent/' + JSON.stringify(rental)]);
        }, 1000);
      } else {
        this.toastrService.error('The date information is invalid.');
        this.router.navigate(['/']);
      }
    }
  }

  getCarById() {
    this.carService.getCarById(this.carId).subscribe((response) => {
      this.car = response.data;
      console.log(this.car);
    });
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

  deleteCar() {
    this.carService.delete(this.car).subscribe(
      (response) => {
        this.toastrService.success('Car is deleted.', 'Worked!');
      },
      (responseError) => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(
              responseError.error.Errors[i].ErrorMessage,
              'Failed!'
            );
          }
        }
      }
    );
  }

  updateCar() {
    if (this.carUpdateForm.valid) {
      let brandId = parseInt(this.carUpdateForm.value.brandId);
      let colorId = parseInt(this.carUpdateForm.value.colorId);
      let carModel: Car = Object.assign({}, this.carUpdateForm.value);
      carModel.id = this.carDetail.id;
      carModel.brandId = brandId;
      carModel.colorId = colorId;
      this.carService.update(carModel).subscribe(
        (response) => {
          this.toastrService.success('Car is updated.', 'Worked!');
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
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

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelName: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      descriptions: ['', Validators.required],
    });
  }

  setCarUpdateFormValues() {
    this.carUpdateForm.setValue({
      brandId: [this.carDetail.brandId],
      colorId: [this.carDetail.colorId],
      modelName: [this.carDetail.carName],
      modelYear: [this.carDetail.modelYear],
      dailyPrice: [this.carDetail.dailyPrice],
      descriptions: [this.carDetail.descriptions],
    });
  }
}
