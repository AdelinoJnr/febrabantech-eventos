import axios from "axios";
import { environment } from "@/src/environments/environment";

// Você pode colocar essa URL no .env depois
export const api = axios.create({
  baseURL: environment.SERVICE_URL,
});