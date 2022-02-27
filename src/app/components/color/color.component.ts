import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
})
export class ColorComponent implements OnInit {
  filterText = '';
  isDataLoaded = false;
  isAdminClass: boolean = false;
  colors: Color[] = [];

  constructor(
    private colorService: ColorService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.isDataLoaded = true;
    });
  }
  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  checkIsAdmin(): boolean {
    if (this.localStorageService.getItem('user_claim') === '"admin"') {
      this.isAdminClass = true;
      return true;
    } else {
      return false;
    }
  }
}
