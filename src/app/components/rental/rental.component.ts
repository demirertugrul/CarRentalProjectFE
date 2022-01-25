import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  rentals: Rental[] = [];

  constructor(private rentalService: RentalService) {}

  ngOnInit(): void {
    this.getRentals();
  }

  getRentals() {
    this.rentalService.getRentals().subscribe((response) => {
      this.rentals = response.data;
      var result = this.rentals.filter((r) => r.rentDate.toLocaleDateString);
      console.log(result);
    });
  }

  formatDate(rentals: Rental[]) {
    var startDate = new Date('2015-08-04');
    var endDate = new Date('2015-08-12');

    var resultProductData = rentals.filter((a) => {
      var date = new Date(a.rentDate);
      return date >= startDate && date <= endDate;
    });
  }
}
