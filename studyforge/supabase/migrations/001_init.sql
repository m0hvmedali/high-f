-- StudyForge schema
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  role text check (role in ('student','teacher','admin')) default 'student',
  created_at timestamp with time zone default now()
);

create table if not exists subjects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon text,
  published boolean default false,
  last_updated timestamptz default now()
);

create table if not exists sections (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid references subjects(id) on delete cascade,
  title text not null,
  order_index int default 0,
  published boolean default false,
  last_updated timestamptz default now()
);

create table if not exists lessons (
  id uuid primary key default gen_random_uuid(),
  section_id uuid references sections(id) on delete cascade,
  title text not null,
  summary text,
  order_index int default 0,
  published boolean default false,
  last_updated timestamptz default now()
);

create table if not exists media_assets (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references lessons(id) on delete cascade,
  type text check (type in ('video','audio','pdf','image','hls')),
  url text not null,
  caption text,
  thumbnail_url text,
  duration_seconds int,
  last_updated timestamptz default now()
);

create table if not exists quizzes (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references lessons(id) on delete cascade,
  title text not null,
  description text,
  published boolean default false,
  last_updated timestamptz default now()
);

create table if not exists questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid references quizzes(id) on delete cascade,
  type text check (type in ('mcq','boolean','short_text')) not null,
  body text not null,
  options text[],
  correct_answer text,
  related_lesson_id uuid references lessons(id),
  related_hint text,
  last_updated timestamptz default now()
);

create table if not exists attempts (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid references quizzes(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  score numeric,
  started_at timestamptz default now(),
  finished_at timestamptz,
  last_updated timestamptz default now()
);

create table if not exists attempt_answers (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid references attempts(id) on delete cascade,
  question_id uuid references questions(id) on delete cascade,
  answer text,
  correct boolean
);

create table if not exists notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  lesson_id uuid references lessons(id) on delete cascade,
  content_md text,
  last_updated timestamptz default now()
);

create table if not exists progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  lesson_id uuid references lessons(id) on delete cascade,
  completed boolean default false,
  percentage numeric default 0,
  last_position_seconds numeric,
  last_updated timestamptz default now()
);

create table if not exists shares (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete cascade,
  target_user_id uuid references auth.users(id) on delete cascade,
  resource_type text check (resource_type in ('lesson','quiz','subject')),
  resource_id uuid not null,
  can_edit boolean default false,
  created_at timestamptz default now()
);

-- RLS
alter table subjects enable row level security;
alter table sections enable row level security;
alter table lessons enable row level security;
alter table media_assets enable row level security;
alter table quizzes enable row level security;
alter table questions enable row level security;
alter table attempts enable row level security;
alter table attempt_answers enable row level security;
alter table notes enable row level security;
alter table progress enable row level security;

create policy "public readable content" on subjects for select using (true);
create policy "public readable content" on sections for select using (true);
create policy "public readable content" on lessons for select using (true);
create policy "public readable content" on media_assets for select using (true);
create policy "public readable content" on quizzes for select using (true);
create policy "public readable content" on questions for select using (true);

create policy "user owns attempts" on attempts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "user owns attempt answers" on attempt_answers for all using (
  exists (select 1 from attempts a where a.id = attempt_id and a.user_id = auth.uid())
) with check (
  exists (select 1 from attempts a where a.id = attempt_id and a.user_id = auth.uid())
);
create policy "user owns notes" on notes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "user owns progress" on progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- triggers to bump last_updated
create or replace function touch_last_updated() returns trigger as $$
begin
  new.last_updated = now();
  return new;
end;
$$ language plpgsql;

create trigger subjects_touch before update on subjects for each row execute procedure touch_last_updated();
create trigger sections_touch before update on sections for each row execute procedure touch_last_updated();
create trigger lessons_touch before update on lessons for each row execute procedure touch_last_updated();
create trigger media_touch before update on media_assets for each row execute procedure touch_last_updated();
create trigger quizzes_touch before update on quizzes for each row execute procedure touch_last_updated();
create trigger questions_touch before update on questions for each row execute procedure touch_last_updated();
create trigger notes_touch before update on notes for each row execute procedure touch_last_updated();
create trigger progress_touch before update on progress for each row execute procedure touch_last_updated();
