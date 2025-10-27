import { supabase } from "@/lib/supabaseClient";

export async function getProducts() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
  
  return products || [];
}

