import axios from "axios";

const serverAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CONTAINER_BACKEND,
});

export { serverAxios };
