import React from 'react'
import { OrderList, SectionTitle } from '../components';
import PaginationContainer from '../components/PaginationContainer';
import { redirect, useLoaderData } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from 'react-toastify';

export const loader =
  (store) =>
  async ({ request }) => {
    const user = store.getState().userState.user;
    if (!user) return redirect("/login");
    try {
        const response=await customFetch.get('/orders',{headers:{Authorization:'Bearer '+user.token}});
        // console.log(response);
        return { orders: response.data.data, meta: response.data.meta };

    } catch (error) {
        const errorMessage =
        error?.response?.data?.error?.message ||
        'there was an error accessing your orders';

      toast.error(errorMessage);
      if (error?.response?.status === 401 || 403) return redirect('/login');

      return null;    
    }
  };
const Orders = () => {
  const { meta } = useLoaderData();
  if (meta.pagination.total < 1) {
    return <SectionTitle text='Please make an order' />;
  }
  return (
    <>
      <SectionTitle text='Your Orders' />
      <OrderList />
      <PaginationContainer />
    </>
  );
};
export default Orders;