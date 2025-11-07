# Como Adicionar Fotos aos Produtos no Supabase

## Opção 1: Usar URLs de Imagens Externas (Mais Rápido)

Se você já tem URLs de imagens de produtos, pode atualizar diretamente no Supabase:

### Passo 1: Acesse o Supabase
Vá para: https://huatypzoqcwjnjqonmep.supabase.co

### Passo 2: Execute SQL para atualizar os produtos

No SQL Editor do Supabase, execute comandos como:

```sql
-- Exemplo: Atualizar produto específico
UPDATE products 
SET image_url = 'https://url-da-imagem.com/produto1.jpg'
WHERE id = 1;

-- Atualizar múltiplos produtos de uma vez
UPDATE products SET image_url = 'https://example.com/tinta-branca.jpg' WHERE name LIKE '%Tinta Branca%';
UPDATE products SET image_url = 'https://example.com/rolo-pintura.jpg' WHERE category = 'acessorios';
```

## Opção 2: Usar Supabase Storage (Recomendado)

### Passo 1: Criar um Bucket de Storage

No Supabase, vá em Storage e crie um bucket público chamado "products":

```sql
-- Execute no SQL Editor
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true);

-- Criar política para permitir leitura pública
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'products');

-- Criar política para permitir upload (ajuste conforme necessário)
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'products');
```

### Passo 2: Fazer Upload das Imagens

1. Vá em Storage > products no dashboard do Supabase
2. Faça upload das imagens dos produtos
3. Copie a URL pública de cada imagem

### Passo 3: Atualizar os Produtos

```sql
-- Use as URLs do Storage
UPDATE products 
SET image_url = 'https://huatypzoqcwjnjqonmep.supabase.co/storage/v1/object/public/products/nome-do-arquivo.jpg'
WHERE id = 1;
```

## Opção 3: URLs de Placeholder

Enquanto não tiver imagens reais, use serviços de placeholder:

```sql
UPDATE products 
SET image_url = 'https://placehold.co/600x600/orange/white?text=Tinta'
WHERE category = 'tintas';

UPDATE products 
SET image_url = 'https://placehold.co/600x600/blue/white?text=Acessorio'
WHERE category = 'acessorios';
```

## Exemplos de URLs de Imagens Reais de Produtos de Tinta

Se quiser usar imagens de exemplo temporárias:

```sql
-- Tintas
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800' WHERE category = 'tintas' AND id = 1;

-- Ferramentas/Acessórios
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800' WHERE category = 'acessorios' AND id = 2;
```

## Verificar Estrutura da Tabela

Se não tem certeza dos campos da sua tabela, execute:

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'products';
```

## Ver Produtos Atuais

```sql
SELECT id, name, category, image_url 
FROM products 
LIMIT 10;
```

---

**Nota**: Geramos algumas imagens profissionais na pasta `src/assets/products/` do projeto. Você pode fazer upload delas no Supabase Storage e usar as URLs públicas nos seus produtos!
