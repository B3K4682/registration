export type Car = {
  id: number;
  horsepower: number;
  img_url: string;
  /**
   * @example "Ford"
   */
  make: string;
  /**
   * This is the model of the car (Main usage)
   */
  model: string;
  price: number;
  year: number;
  map: (fn: (car: Car) => Car) => Car[];
};