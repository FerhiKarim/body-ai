create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  has_completed_onboarding boolean default false,
  weight numeric(5,2),
  height numeric(5,2),
  neck_measurement numeric(5,2),
  waist_measurement numeric(5,2),
  hip_measurement numeric(5,2),
  medical_conditions text,
  daily_routine text,
  workout_days integer,
  goals text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create policy to allow users to read their own profile
create policy "Users can read own profile"
  on profiles for select
  using ( auth.uid() = id );

-- Create policy to allow users to update their own profile
create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );

-- Enable RLS
alter table profiles enable row level security;

-- Create function to handle user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();