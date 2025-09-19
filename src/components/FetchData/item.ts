import { useQuery } from "@tanstack/react-query";
import {api} from "../exporter/exporter"

async function fetchItems(){
  const items=await api.get("/item/all");
  if(!items.data.item) return "Error fetching products";

  return items.data.item || [];
};

export function useItems(){
  return useQuery({
    queryKey:["items"],
    queryFn:fetchItems,
    retry:false,
  })
}