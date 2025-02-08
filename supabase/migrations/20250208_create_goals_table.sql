-- Drop existing policies if they exist
drop policy if exists "Enable read access for authenticated users" on public.goals_2025;
drop policy if exists "Enable write access for authenticated users" on public.goals_2025;
drop policy if exists "Enable insert access for authenticated users" on public.goals_2025;
drop policy if exists "Enable delete access for authenticated users" on public.goals_2025;
drop policy if exists "Enable read access for authenticated users" on public.goals_2025_updates;
drop policy if exists "Enable insert access for authenticated users" on public.goals_2025_updates;
drop policy if exists "Enable delete access for authenticated users" on public.goals_2025_updates;

-- Create new tables for 2025 goals
create table if not exists public.goals_2025 (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    target text not null,
    current text not null,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table if not exists public.goals_2025_updates (
    id uuid primary key default uuid_generate_v4(),
    goal_id uuid not null references public.goals_2025(id) on delete cascade,
    previous_value text not null,
    new_value text not null,
    note text,
    created_at timestamptz default now()
);

-- Enable RLS
alter table public.goals_2025 enable row level security;
alter table public.goals_2025_updates enable row level security;

-- Create policies for goals_2025
create policy "Enable read access for authenticated users"
    on public.goals_2025 for select
    using (auth.role() = 'authenticated');

create policy "Enable write access for authenticated users"
    on public.goals_2025 for update
    using (auth.role() = 'authenticated');

create policy "Enable insert access for authenticated users"
    on public.goals_2025 for insert
    with check (auth.role() = 'authenticated');

create policy "Enable delete access for authenticated users"
    on public.goals_2025 for delete
    using (auth.role() = 'authenticated');

-- Create policies for goals_2025_updates
create policy "Enable read access for authenticated users"
    on public.goals_2025_updates for select
    using (auth.role() = 'authenticated');

create policy "Enable insert access for authenticated users"
    on public.goals_2025_updates for insert
    with check (auth.role() = 'authenticated');

create policy "Enable update access for authenticated users"
    on public.goals_2025_updates for update
    using (auth.role() = 'authenticated');

create policy "Enable delete access for authenticated users"
    on public.goals_2025_updates for delete
    using (auth.role() = 'authenticated');

-- Insert initial goals if they don't exist
insert into public.goals_2025 (title, target, current)
select * from (values
    ('100 Levery Subscribers', '100', '0'),
    ('80% Sleep Score', '80%', '65%'),
    ('10h/day AI Development', '10h', '6h'),
    ('50 AI Events', '50', '3'),
    ('Hyrox Sub 70min', '70min', '85min'),
    ('500h Meditation', '500h', '25h'),
    ('Present to CIBC Executive', 'Done', 'Not Started')
) as v(title, target, current)
where not exists (select 1 from public.goals_2025);