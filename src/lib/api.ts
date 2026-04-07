import axios from "axios";

export async function getProducts() {
  try {
    const response = await axios.get("http://localhost:5000/products");
    return response;
    // console.log(response);
  } catch (error) {
    console.error(error);
  }
}

export async function getSingleProduct(id: string) {
  try {
    const response = await axios.get(`http://localhost:5000/products/${id}`);
    return response;
    // console.log(response);
  } catch (error) {
    console.error(error);
  }
}

export async function getCategories() {
  try {
    const response = await axios.get("http://localhost:5000/categories");
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
      "http://localhost:3000/api/users",
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
      "http://localhost:3000/api/login",
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
