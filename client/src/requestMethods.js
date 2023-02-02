import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDhhMDViNmY1NWEyMGU4NWY2OTU3MiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NTI1OTA1MiwiZXhwIjoxNjc1ODYzODUyfQ.41eev7hpxky37hqcb8pX_cqnryCldjSpFqET7dVR3Bg";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
