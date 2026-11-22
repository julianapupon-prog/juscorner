# Ju's Corner · como colocar o app no ar

O app são estes arquivos. Para ele virar um ícone no seu iPhone e no PC, com seus dados sincronizados, são 3 etapas: banco de dados, endereço e instalação. Leva uns 15 minutos e é tudo gratuito.

## 1. Banco de dados (Supabase) · ✓ já feito

O `config.js` já está preenchido com o seu projeto `ju's corner`. As instruções abaixo ficam só como referência.

### Referência

1. Entre em **supabase.com** e crie uma conta grátis.
2. Clique em **New project**. Dê o nome `juscorner`, crie uma senha para o banco (guarde-a) e escolha a região **South America (São Paulo)**.
3. Quando o projeto terminar de criar, abra **SQL Editor** no menu da esquerda. Cole todo o conteúdo do arquivo `supabase.sql` e clique em **Run**.
4. Vá em **Authentication › Sign In / Providers › Email** e desligue **Confirm email**. Assim você não precisa confirmar por e-mail; só você vai usar.
5. Vá em **Project Settings › API** e copie dois valores:
   - **Project URL** (algo como `https://abcdefgh.supabase.co`)
   - **anon public** key (um texto longo que começa com `eyJ`)
6. Abra o arquivo `config.js` num editor de texto (Bloco de Notas ou TextEdit) e cole os dois valores entre as aspas:

   ```js
   window.JC_CONFIG = {
     supabaseUrl: 'https://abcdefgh.supabase.co',
     supabaseAnonKey: 'eyJhbGciOi...'
   };
   ```

A chave "anon" foi feita para ficar no app. Quem protege seus dados são as regras do `supabase.sql`: cada conta só enxerga os próprios dados.

Se você pular esta etapa, o app funciona do mesmo jeito, mas salva só no aparelho em que você usar.

## 2. Endereço próprio (Netlify) · coloca o app na internet

1. Entre em **app.netlify.com** e crie uma conta grátis.
2. Abra **app.netlify.com/drop**.
3. Arraste a pasta `juscorner-app` inteira, já com o `config.js` preenchido, para a área pontilhada.
4. Em poucos segundos aparece um endereço como `https://nome-aleatorio.netlify.app`.
5. Para mudar o nome, abra **Site configuration › Change site name** e escolha, por exemplo, `juscorner`. O endereço fica `https://juscorner.netlify.app`.

Para atualizar o app no futuro: abra **Deploys** e arraste a pasta de novo.

## 3. Instalar como app

**iPhone**
1. Abra o endereço no **Safari**.
2. Toque em **Compartilhar** (o quadrado com a seta) e depois em **Adicionar à Tela de Início**.
3. Abra pelo ícone novo, com o selo de cera. Ele abre em tela cheia, como um app.

**PC ou Mac (Chrome ou Edge)**
1. Abra o endereço.
2. Clique no ícone de instalar que aparece na barra de endereço (um monitor com uma seta) ou vá em **menu › Instalar Ju's Corner**.

## 4. Primeiro uso

1. Na tela **entrar.exe**, toque em **criar conta** com seu e-mail e uma senha. Nas próximas vezes, e no outro aparelho, use **entrar**.
2. No início aparece o cartão **importar meus dados**. Ele traz os 48 livros, as 43 fichas do jardim, o progresso de russo e os seus ajustes que estavam no Claude.
3. Pronto. O que você muda no iPhone aparece no PC na hora, e vice-versa.

## Backup

Em **⚙ ajustes › conta e dados**:
- **baixar backup** salva um arquivo `.json` com tudo.
- **restaurar backup** traz os dados de volta a partir desse arquivo.

## O que tem nesta pasta

| arquivo | para que serve |
|---|---|
| `index.html` | o app inteiro |
| `config.js` | onde você cola os dados do Supabase |
| `supabase.sql` | cria a tabela e as regras de privacidade |
| `dados.json` | seus dados exportados do Claude |
| `manifest.webmanifest`, `sw.js` | fazem o app ser instalável e abrir offline |
| `img/` | fotos, selo e ícones |
