-- Ju's Corner · cole tudo isto no SQL Editor do Supabase e clique em Run.
create table if not exists public.docs (
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  collection text not null,
  id         text not null,
  data       jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, collection, id)
);

alter table public.docs enable row level security;

-- cada pessoa só vê e mexe nos próprios dados
create policy "ler os meus"     on public.docs for select using (auth.uid() = user_id);
create policy "criar os meus"   on public.docs for insert with check (auth.uid() = user_id);
create policy "editar os meus"  on public.docs for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "apagar os meus"  on public.docs for delete using (auth.uid() = user_id);

-- atualiza na hora entre PC e iPhone
alter publication supabase_realtime add table public.docs;

-- deixa a sua conta (logada) ler e escrever na tabela; as regras acima limitam aos seus dados
grant select, insert, update, delete on public.docs to authenticated;
