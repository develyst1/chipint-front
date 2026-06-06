import axios from "axios";

export const mainClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080",
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});
