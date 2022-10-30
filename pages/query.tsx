import { useQuery } from "@tanstack/react-query";
import { getProductAPI } from "../services/api";

export const UseGetProduct = () => useQuery(['product'], getProductAPI);