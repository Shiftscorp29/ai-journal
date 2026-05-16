# Environment Variables Setup

## Required Variables

Your application needs these environment variables to work properly:

### 1. Supabase Variables (Required)
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. GROQ API Variables (Required)
```
GROQ_API_KEY=gsk_your_groq_api_key...
```

## How to Get These Values

### For Supabase:

1. **Create Supabase Project**
   - Go to https://supabase.com
   - Sign up or log in
   - Click "New project"
   - Choose a name and password
   - Wait for it to be created (2-3 minutes)

2. **Get Your Credentials**
   - Go to **Settings** → **API** in your Supabase dashboard
   - Copy the values:
     - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
     - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### For GROQ:

1. **Create GROQ Account**
   - Go to https://groq.com
   - Sign up for free
   - Wait for approval (usually instant)

2. **Get Your API Key**
   - Go to https://console.groq.com/keys
   - Click "Create API Key"
   - Copy the key → `GROQ_API_KEY`

## Where to Add These

### In Builder.io Project:

1. Click **Settings** (gear icon) in the top right
2. Find **Environment Variables** section
3. Add each variable:
   - **Key**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: Your project URL
   - Click **Add** or **Save**
4. Repeat for:
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (mark as secret)
   - `GROQ_API_KEY` (mark as secret)

### For Local Development (.env.local):

Create a `.env.local` file in your project root:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
GROQ_API_KEY=gsk_your_groq_api_key...
```

**Important**: `.env.local` is in `.gitignore`, so it won't be committed.

## Testing the Setup

### 1. Start the App
The dev server should be running. If not:
```bash
npm run dev
```

### 2. Test Authentication
- Visit `http://localhost:3000`
- Click "Get Started"
- Try to sign up with an email and password

### What Should Happen:
- ✅ Sign up form should work
- ✅ You should be able to create an account
- ✅ You'll be redirected to journal page
- ✅ Journal page should load with no errors

### 3. Test Journal Entry
- Write some text in the journal
- Click "Analyze Emotion"
- Wait for AI response

### What Should Happen:
- ✅ AI should analyze your text
- ✅ You should see mood, stress level, positivity score
- ✅ Emotional themes should appear
- ✅ Moodboard section should show colors and vibes

### 4. Test Analytics
- Click "Analytics" in navbar
- You should see your entry counted

### What Should Happen:
- ✅ "Total Entries" should show 1
- ✅ Average stress and positivity should display
- ✅ Charts should show your data point

## Troubleshooting

### Issue: "Invalid supabaseUrl" error

**Cause**: Environment variable not set or has "PLACEHOLDER" value

**Fix**:
1. Make sure you set `NEXT_PUBLIC_SUPABASE_URL` correctly
2. Restart the dev server: `npm run dev`
3. Clear your browser cache (Ctrl+Shift+Delete)

### Issue: Can't sign up, getting 401 or 403 errors

**Cause**: Supabase not configured properly

**Fix**:
1. Check your `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
2. Make sure you ran the SQL from `SUPABASE_SETUP.md`
3. Check Supabase settings → Authentication → Providers (Email should be enabled)

### Issue: AI analysis not working, timeout or 500 error

**Cause**: GROQ API key missing or invalid

**Fix**:
1. Make sure you set `GROQ_API_KEY` correctly
2. Go to https://console.groq.com/keys and verify your key is active
3. Restart dev server

### Issue: Dev server keeps restarting

**Cause**: Missing environment variables causing import errors

**Fix**:
1. Check all three variables are set
2. Restart manually: `npm run dev`

## Variable Reference

| Variable | Type | Purpose |
|----------|------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Database connection URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public (safe) | Anonymous access token |
| `GROQ_API_KEY` | Secret | AI analysis API key |

**Why "NEXT_PUBLIC"?**
- These variables are included in the browser (Supabase is designed for this)
- The key is "anonymous" so it's safe to expose
- The API key for GROQ should NOT be public (no NEXT_PUBLIC prefix)

## Security Notes

1. **NEVER commit `.env.local`** - it's in `.gitignore`
2. **NEVER push secrets** to your repository
3. **Use Builder's secret variable feature** for production
4. **Rotate API keys** if you think they've been compromised
5. **RLS policies** protect your data (database-level security)

## Next: Database Setup

Once your environment variables are set, follow `SUPABASE_SETUP.md` to:
1. Create the `entries` table
2. Set up Row Level Security policies
3. Enable authentication

Then your app will be fully functional! 🎉
