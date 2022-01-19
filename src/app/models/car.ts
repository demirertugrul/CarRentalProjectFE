export interface Car {
  carId: number;
  brandId: number | string;
  colorId: number | string; //!todo color ve car string olacak
  carName: string;
  modelYear: string;
  dailyPrice: number;
  descriptions: string;
}
