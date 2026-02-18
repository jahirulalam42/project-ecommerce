import axios from "axios";

export async function getProducts() {
  try {
    const response = await axios.get("http://localhost:4000/products");
    return response;
    // console.log(response);
  } catch (error) {
    console.error(error);
  }
}
