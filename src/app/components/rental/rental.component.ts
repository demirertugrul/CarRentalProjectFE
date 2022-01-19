import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  rentals: Rental[] = [];
  users: any[] = [];
  brands: Brand[] = [];
  constructor(private rentalService: RentalService) {}

  ngOnInit(): void {
    this.getRentals();
  }

  getRentals() {
    this.rentalService.getRentals().subscribe((res) => {
      this.rentals = res.data;
      this.rentalService.getUsers().subscribe((res) => {
        this.users = res.data;
        this.rentalService.getBrands().subscribe((res) => {
          this.brands = res.data;
          this.matchTableInfos();
        });
      });
    });
  }

  matchTableInfos() {
    for (let i = 0; i < this.rentals.length; i++) {
      this.rentals[i].brandName = this.brands[i].brandName;
      this.rentals[i].firstAndLastName =
        this.users[0].firstName + ' ' + this.users[0].lastName;
    }
  }
}
