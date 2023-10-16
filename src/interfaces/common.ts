export interface IProduct {
  productId: number;
  timeInSeconds: number;
}

export interface IProductDetails {
  productId: number;
  productName: string;
  price: number;
}

export type TProducts = IProduct[];

export type TTimerStatus = 'PAUSED' | 'RUNNING' | 'COMPLETED';
