import React from "react";
import { ComplexPagination, OrderList, SectionTitle } from "../components";
import { redirect, useLoaderData } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";

const ordersQuery = (user, params) => {
  return {
    queryKey: ["orders",user,params??''],
    queryFn: ()=>customFetch.get("/orders", {
      params,
      headers: { Authorization: "Bearer " + user.token },
    })
  }
};

export const loader =
  (store,queryClient) =>
  async ({ request }) => {
    const user = store.getState().userState.user;
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    if (!user) return redirect("/login");
    try {
      const response = await queryClient.ensureQueryData(ordersQuery(user,params));
      // console.log(response);
      return { orders: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        "there was an error accessing your orders";

      toast.error(errorMessage);
      if (error?.response?.status === 401 || 403) return redirect("/login");

      return null;
    }
  };
const Orders = () => {
  const { meta } = useLoaderData();
  if (meta.pagination.total < 1) {
    return <SectionTitle text="Please make an order" />;
  }
  return (
    <>
      <SectionTitle text="Your Orders" />
      <OrderList />
      <ComplexPagination />
    </>
  );
};
export default Orders;
