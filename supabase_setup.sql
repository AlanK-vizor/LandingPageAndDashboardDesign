-- Run this once in your Supabase project's SQL Editor (Dashboard -> SQL Editor -> New query)

-- 1. Profiles table (one row per user, stores their display name)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique,
  created_at timestamptz default now()
);

alter table profiles enable row level security;

create policy "Profiles are viewable by everyone"
  on profiles for select using (true);

create policy "Users can insert their own profile"
  on profiles for insert with check (auth.uid() = id);

-- 2. Threads (Q&A questions)
create table if not exists threads (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  code_snippet text,
  code_language text,
  author_id uuid references auth.users(id) on delete cascade not null,
  author_username text not null,
  created_at timestamptz default now()
);

alter table threads enable row level security;

create policy "Threads are viewable by everyone"
  on threads for select using (true);

create policy "Logged in users can create threads"
  on threads for insert with check (auth.uid() = author_id);

-- 3. Replies
create table if not exists replies (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid references threads(id) on delete cascade not null,
  body text not null,
  code_snippet text,
  code_language text,
  author_id uuid references auth.users(id) on delete cascade not null,
  author_username text not null,
  created_at timestamptz default now()
);

alter table replies enable row level security;

create policy "Replies are viewable by everyone"
  on replies for select using (true);

create policy "Logged in users can reply"
  on replies for insert with check (auth.uid() = author_id);

-- 4. Live chat messages
create table if not exists chat_messages (
  id uuid primary key default gen_random_uuid(),
  body text not null,
  is_code boolean default false,
  author_id uuid references auth.users(id) on delete cascade not null,
  author_username text not null,
  created_at timestamptz default now()
);

alter table chat_messages enable row level security;

create policy "Chat messages are viewable by everyone"
  on chat_messages for select using (true);

create policy "Logged in users can send chat messages"
  on chat_messages for insert with check (auth.uid() = author_id);

-- 5. Helper view: threads with reply counts + whether they have a code snippet
-- (used by the Q&A list page)
create or replace view threads_with_meta as
select
  t.id,
  t.title,
  t.body,
  t.created_at,
  t.author_username,
  (t.code_snippet is not null) as has_code,
  (select count(*) from replies r where r.thread_id = t.id) as reply_count
from threads t;

-- 6. Early access waitlist (public insert, no auth required)
create table if not exists waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  interest text check (interest in ('student', 'educator', 'maker')),
  created_at timestamptz default now()
);

alter table waitlist enable row level security;

create policy "Anyone can join the waitlist"
  on waitlist for insert with check (true);

-- 7. Enable Realtime on chat_messages so live chat updates instantly.
-- In the Supabase Dashboard: Database -> Replication -> toggle "chat_messages" on.
-- (Or run this, depending on your project's default publication setup):
alter publication supabase_realtime add table chat_messages;
