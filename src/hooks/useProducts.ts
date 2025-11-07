import { useQuery } from '@tanstack/react-query';
import { supabase, type Product } from '@/lib/supabase';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Product[];
    },
  });
};

export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['products', category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Product[];
    },
    enabled: !!category,
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Product;
    },
    enabled: !!id,
  });
};
