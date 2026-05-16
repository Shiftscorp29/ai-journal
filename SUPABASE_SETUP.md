# Supabase Setup Instructions

## 1. Create Supabase Project

1. Go to https://supabase.com and sign up/login
2. Create a new project
3. Copy your `Project URL` and `anon public key`

## 2. Update Environment Variables

Add these to your `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
GROQ_API_KEY=your_groq_api_key
```

## 3. Create Database Tables

In your Supabase project, go to SQL Editor and run:

### Create entries table (with user isolation)

```sql
-- Create entries table with user_id for data isolation
CREATE TABLE entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  ai_response TEXT,
  mood VARCHAR(100),
  stress_level INTEGER,
  positivity_score INTEGER,
  themes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id for faster queries
CREATE INDEX idx_entries_user_id ON entries(user_id);
CREATE INDEX idx_entries_created_at ON entries(created_at);
```

## 4. Enable Authentication

1. Go to Authentication > Settings
2. Ensure "Email" provider is enabled
3. Go to Email Templates and customize if needed (optional)

## 5. Set Up Row Level Security (RLS)

In SQL Editor, run:

```sql
-- Enable RLS on entries table
ALTER TABLE entries ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can only see their own entries
CREATE POLICY "Users can view their own entries"
  ON entries
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy: Users can only insert their own entries
CREATE POLICY "Users can create their own entries"
  ON entries
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy: Users can only update their own entries
CREATE POLICY "Users can update their own entries"
  ON entries
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create policy: Users can only delete their own entries
CREATE POLICY "Users can delete their own entries"
  ON entries
  FOR DELETE
  USING (auth.uid() = user_id);
```

## 6. Verify Setup

1. Go to Authentication > Users to confirm users can be created
2. Go to Database > Tables > entries to confirm the table structure
3. Go to Security > Policies to confirm RLS policies are active

## Complete! ✅

Your Supabase is now ready with:
- ✅ User authentication (signup/signin)
- ✅ Secure database with RLS policies
- ✅ User data isolation (each user sees only their own entries)
- ✅ Automatic timestamps and user tracking
