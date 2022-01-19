import { Component, OnInit } from '@angular/core';
import { Costumer } from 'src/app/models/costumer';
import { CostumerService } from 'src/app/services/costumer.service/costumer.service';

@Component({
  selector: 'app-costumer',
  templateUrl: './costumer.component.html',
  styleUrls: ['./costumer.component.css'],
})
export class CostumerComponent implements OnInit {
  costumers: Costumer[] = [];
  constructor(private costumerService: CostumerService) {}

  ngOnInit(): void {
    this.getCostumers();
  }

  getCostumers() {
    this.costumerService.getCostumers().subscribe((res) => {
      this.costumers = res.data;
    });
  }
}
