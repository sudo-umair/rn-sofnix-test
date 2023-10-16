import { IProduct, IProductDetails, TProducts } from '@/interfaces/common';
import { client } from './client';
import { AxiosResponse } from 'axios';

export const getProducts = async (): Promise<AxiosResponse<TProducts>> => {
  const response = await client.get('/rentole-api/api/Product/GetProductIds');
  return response;
};

export const getProductDetails = async (
  id: number
): Promise<AxiosResponse<IProductDetails>> => {
  const response = await client.get(
    `/TestAPI/api/Product/GetProductDetailById?ProductId=${id}`
  );
  return response;
};
