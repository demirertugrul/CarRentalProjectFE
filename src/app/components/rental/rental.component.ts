import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  rentals: RentalDetail[] = [];
  rentals2: Rental[] = [];
  isDataLoaded = false;

  constructor(
    private rentalService: RentalService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getRentals();
    this.getAll();
  }

  getRentals() {
    this.rentalService.getRentals().subscribe((response) => {
      this.rentals = response.data;
      this.isDataLoaded = true;
    });
  }

  deleteRental(rentalId: number) {
    let willDeleteRental = this.rentals.find(
      (rental) => rental.id === rentalId
    );
    let deletedRental = this.rentals2.find(
      (rental) => rental.id === willDeleteRental.id
    );
    this.rentalService.delete(deletedRental).subscribe((res) => {
      this.toastrService.info(res.message, 'Deleted rental..');
    });
    location.reload();
  }
  getAll() {
    this.rentalService.getAll().subscribe((res) => {
      this.rentals2 = res.data;
    });
  }
}
