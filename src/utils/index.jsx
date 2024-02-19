import axios from "axios";

export const customFetch = axios.create({
    baseURL: 'https://strapi-store-server.onrender.com/api'  });

  export const formatPrice = (price) => {
    const inr=new Intl.NumberFormat('en-IN',{
      style:'currency',
      currency:'INR'
    }).format((price/10).toFixed(2));
    return inr;
  }


  export const generateAmountOptions = (number) => {
    return Array.from({ length: number }, (_, index) => {
      const amount = index + 1;
  
      return (
        <option key={amount} value={amount}>
          {amount}
        </option>
      );
    });
  };