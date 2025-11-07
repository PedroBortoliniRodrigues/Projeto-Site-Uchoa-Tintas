import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://huatypzoqcwjnjqonmep.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1YXR5cHpvcWN3am5qcW9ubWVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NDY0ODQsImV4cCI6MjA3ODAyMjQ4NH0.h92ubqenQzu6RaHLdtwKQPC7cm_KHWZGH8sUoUtFRmY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  size: string;
  color?: string;
  stock: number;
  image_url?: string;
  created_at?: string;
};
