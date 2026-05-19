import axios from "axios";

export async function getProducts() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/api/products`
    );
    return response;
    // console.log(response);
  } catch (error) {
    console.error(error);
  }
}

export async function getSingleProduct(id: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/api/products/${id}`
    );
    return response;
    // console.log(response);
  } catch (error) {
    console.error(error);
  }
}

export async function getCategories() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/api/categories`
    );
    return response;
    // console.log(response);
  } catch (error) {
    console.error(error);
  }
}

export async function registerUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/users`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
    // console.log(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
    // console.log(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function submitOrder(orderData: any) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/orders`,
      orderData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getOrder(orderId: any) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/api/orders/${orderId}`
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getMyOrders(userId: any) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/api/orders/user/${userId}`
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const createReturn = async (data: {
  orderId: string;
  items: string[];
  type: string;
  reason: string;
  notes?: string;
}) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/returns`,
      data,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function searchProducts(query: string) {
  try {
    const response = await axios.get(
      `${
        process.env.NEXT_PUBLIC_URL
      }/api/products/search?q=${encodeURIComponent(query)}`
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
