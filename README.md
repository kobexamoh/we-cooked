# we cooked 🍳

A mobile-first weekly cooking challenge app for people who don't love cooking.

> "Wordle, but dinner."

Each week there's one shared challenge — a simple, low-effort recipe. Cook it, snap a photo, see what the other person made.

## Stack

- **Vite + React 18 + Tailwind CSS 4** — frontend
- **Supabase** — shared gallery (Postgres + Storage), RLS enabled
- **Vercel** — hosting at [we-cooked-lyart.vercel.app](https://we-cooked-lyart.vercel.app)
- **localStorage** — theme preference

## Project Structure

```
src/
├── main.jsx              # Entry point
├── App.jsx               # Router + layout
├── index.css             # Tailwind + theme variables (lilac / charcoal)
├── lib/
│   └── supabase.js       # Supabase client
├── hooks/
│   └── useTheme.js       # Theme toggle (persisted to localStorage)
├── data/
│   └── challenges.js     # Hardcoded weekly challenge recipes
├── components/
│   ├── Header.jsx        # App header + theme toggle
│   ├── ThemeToggle.jsx   # Lilac ↔ charcoal button
│   ├── ChallengeCard.jsx # Challenge display (time, difficulty, etc.)
│   ├── CookingStep.jsx   # Single step display
│   ├── Timer.jsx         # Countdown timer for cooking steps
│   ├── PhotoUpload.jsx   # Camera/file upload, strips EXIF metadata
│   └── GalleryGrid.jsx   # Grid of submissions
└── pages/
    ├── Home.jsx          # Weekly challenge + ingredient list
    ├── CookingFlow.jsx   # Step-by-step guided cooking
    ├── Complete.jsx       # Photo upload + save to Supabase
    └── Gallery.jsx        # Shared gallery (fetched from Supabase)
```

## Local Setup

```bash
# Install dependencies
npm install

# Create .env with your Supabase credentials
cp .env.example .env
# Then fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

# Start dev server
npm run dev
```

## Environment Variables

Create a `.env` file (gitignored) with:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_publishable_key_here
```

These are also set on Vercel for production deploys.

## Supabase Setup

The project uses one table and one storage bucket. Run this SQL in the Supabase SQL Editor:

```sql
create table submissions (
  id uuid default gen_random_uuid() primary key,
  challenge_id text not null,
  challenge_title text not null,
  photo_url text,
  caption text,
  created_at timestamptz default now()
);

alter table submissions enable row level security;
create policy "Anyone can read" on submissions for select using (true);
create policy "Anyone can insert" on submissions for insert with check (true);

insert into storage.buckets (id, name, public) values ('photos', 'photos', true);
create policy "Anyone can upload" on storage.objects for insert with check (bucket_id = 'photos');
create policy "Anyone can view" on storage.objects for select using (bucket_id = 'photos');
```

## Deploy

```bash
# Build
npm run build

# Deploy to Vercel
npx vercel --prod
```

## Themes

Two color themes, toggled via the button in the header:

- **Lilac** (default) — soft purple `#B8A9C9`, warm off-white bg
- **Charcoal** — blue-grey `#2C3E5A`, cool off-white bg

Preference is saved per-device in localStorage.

## Privacy

- Photos are stripped of EXIF metadata (GPS, device info) before upload
- No authentication or personal data collected
- RLS enabled on all Supabase tables
- `.env` is gitignored — keys never committed

## Adding New Recipes

Edit `src/data/challenges.js`. Each challenge needs:

- `id` — unique string
- `title` / `subtitle`
- `cookTime` — minutes
- `difficulty` — emoji + label
- `ingredients` — array of `{ name, amount }`
- `steps` — array of `{ instruction, timer }` (timer in seconds, or null)

## Next Steps

**Quick wins:**
- Add more hardcoded recipes to `challenges.js` (3-4 to start)
- Auto-rotate challenges weekly based on current week number

**Medium effort:**
- Ingredient substitution flow — "I Don't Have These" button with swap suggestions
- Gallery improvements — emoji reactions, delete your own entries
- Cosmetic polish based on real-world usage

**Bigger features:**
- AI recipe generation via Claude API (generate challenges from category + constraints)
- Auth via Supabase magic links — friend groups / private cooking circles
- Gamification — streaks, voting, "most creative substitution" awards
