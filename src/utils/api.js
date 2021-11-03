import Api from "../components/Api";

export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "bd66ac46-8c3d-415b-b4fe-d77bd0af375a",
    "Content-Type": "application/json",
  },
});
