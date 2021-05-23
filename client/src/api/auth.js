import { API } from "../backend";

export const signin = () => {
  return fetch(`${API}/auth/shopify?shop=editMailer`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
