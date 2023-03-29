
import axios from "axios";

//TODO: Use API Context

export async function authenticate(payload) {
  return await axios.post(
    "http://localhost:8000/auth/login",
    payload
  );
}
