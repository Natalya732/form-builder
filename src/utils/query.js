import { toast } from "react-hot-toast";

const base_url = "https://general-purpose.onrender.com";
export default async function query(route, body, method) {
  if (!method && body) method = "POST";

  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        token,
      },
    };

    if (method !== "GET" || method !== "DELETE") {
      options.body = body;
    }
    const response = await fetch(base_url + route, options);
    const json = await response.json();

    if (!json.success) {
      toast.error(json.message);
      // show toast here
      console.error(json.message);
      return false;
    }
   
    return json.data;
  } catch (error) {
    toast.error(error.message);
    console.log("error", error.message);
    return false;
  }
}