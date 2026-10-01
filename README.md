# Before I Forget — API

**Live API:** https://before-i-forget-2-server.vercel.app

**Client:** https://before-i-forget-app.vercel.app/

## Stack

- Node.js / Express 5 / TypeScript
- PostgreSQL on Supabase + Prisma 7 
- Supabase Auth: the client signs up and logs in, the server only checks the access token (`@supabase/supabase-js`)

## Getting started

Create a `.env` in the project root:

```
PORT=8008
ORIGIN=http://localhost:5173

DATABASE_URL=
DIRECT_URL=

SUPABASE_URL=
SUPABASE_PUBLISHABLE_KEY=
```

## Models

| Model | Purpose |
| --- | --- |
| `User` | one row per Supabase user: the same `id` as in Supabase Auth, `email`, optional `name`. Created on that user's first request with a token |
| `Mood` | the 10 moods (`name` is unique). Every model below has many moods |
| `Book`, `Movie`, `Song` | the shared catalog that Discover suggests from. Filled by the seed, read-only through the API |
| `favBook`, `favMovie`, `favSong` | a user's own archive: the same fields as the catalog models, plus `userId` |
| `myMind` | a user's thought, dream, memory or website (`category`), with optional description, image, url and date |

## API

Base URL: `https://before-i-forget-2-server.vercel.app/api` — every route below is prefixed with `/api`.

**Auth** column: `public` = open · `token` = send `Authorization: Bearer <access_token>`.

There are no sign-up or log-in routes here. The client does that with Supabase Auth and sends the access token of its session. On `token` routes the `verifyToken` middleware checks the token with Supabase, creates the `User` row the first time that person calls the API, and gives the route their `id`, so every query only touches the caller's own rows. A missing, wrong or expired token gets `401`.

`moods` is always an array of mood names from `GET /moods`, for example `["Calm", "Curious"]`, and needs at least one name.

Errors come back as `{ "message": "..." }`. A path that does not exist answers `404`.

### Catalog

| Method | Path | Auth | Body | What it does |
| --- | --- | --- | --- | --- |
| GET | `/moods` | public | — | All moods. |
| GET | `/books` | public | — | The whole book catalog, each book with its moods. |
| GET | `/books/:bookId` | public | — | One catalog book. `404` if it does not exist. |
| GET | `/movies` | public | — | The whole movie catalog, each movie with its moods. |
| GET | `/movies/:movieId` | public | — | One catalog movie. `404` if it does not exist. |
| GET | `/songs` | public | — | The whole song catalog, each song with its moods. |
| GET | `/songs/:songId` | public | — | One catalog song. `404` if it does not exist. |

### Books in the archive

| Method | Path | Auth | Body | What it does |
| --- | --- | --- | --- | --- |
| GET | `/books/favbooks` | token | — | The caller's books, with moods. |
| GET | `/books/favbooks/:favbookId` | token | — | One of the caller's books. `404` if it is not in their archive. |
| POST | `/books/favbooks` | token | `title`, `category`, `moods`, `author?`, `description?`, `image?`, `pageCount?` | Adds a book to the caller's archive: one they typed in, or a copy of a catalog book. Returns `201` with `{ message, book }`. `400` without a title, a category or a mood. |
| PATCH | `/books/favbooks/:favbookId` | token | `title`, `category`, `moods`, `author?`, `description?`, `image?`, `pageCount?` | Edits one of the caller's books. `title`, `category` and `moods` are sent again and the mood list is replaced. `404` if it is not theirs, `400` on the same rule as POST. |
| DELETE | `/books/favbooks/:favbookId` | token | — | Removes the book from the archive. `404` if it is not theirs. |

### Movies in the archive

| Method | Path | Auth | Body | What it does |
| --- | --- | --- | --- | --- |
| GET | `/movies/favmovies` | token | — | The caller's movies, with moods. |
| GET | `/movies/favmovies/:favmovieId` | token | — | One of the caller's movies. `404` if it is not in their archive. |
| POST | `/movies/favmovies` | token | `title`, `category`, `moods`, `overview?`, `poster_path?` | Adds a movie to the caller's archive. Returns `201` with `{ message, movie }`. `400` without a title, a category or a mood. |
| PATCH | `/movies/favmovies/:favmovieId` | token | `title`, `category`, `moods`, `overview?`, `poster_path?` | Edits one of the caller's movies; the mood list is replaced. `404` if it is not theirs, `400` on the same rule as POST. |
| DELETE | `/movies/favmovies/:favmovieId` | token | — | Removes the movie from the archive. `404` if it is not theirs. |

### Songs in the archive

| Method | Path | Auth | Body | What it does |
| --- | --- | --- | --- | --- |
| GET | `/songs/favsongs` | token | — | The caller's songs, with moods. |
| GET | `/songs/favsongs/:favsongId` | token | — | One of the caller's songs. `404` if it is not in their archive. |
| POST | `/songs/favsongs` | token | `title`, `moods`, `singerOrComposer?`, `image?`, `url?` | Adds a song to the caller's archive. `url` can be a Spotify track link, which the client shows as a player. Returns `201` with `{ message, song }`. `400` without a title or a mood. |
| PATCH | `/songs/favsongs/:favsongId` | token | `title`, `moods`, `singerOrComposer?`, `image?`, `url?` | Edits one of the caller's songs; the mood list is replaced. `404` if it is not theirs, `400` on the same rule as POST. |
| DELETE | `/songs/favsongs/:favsongId` | token | — | Removes the song from the archive. `404` if it is not theirs. |

### My mind

`category` is one of `THOUGHT`, `DREAM`, `MEMORY`, `WEBSITE`.

| Method | Path | Auth | Body | What it does |
| --- | --- | --- | --- | --- |
| GET | `/mymind` | token | — | Everything the caller saved, all four categories together. |
| GET | `/mymind/thoughts` | token | — | Only the caller's thoughts. |
| GET | `/mymind/dreams` | token | — | Only the caller's dreams. |
| GET | `/mymind/memories` | token | — | Only the caller's memories. |
| GET | `/mymind/websites` | token | — | Only the caller's websites. |
| GET | `/mymind/:mymindId` | token | — | One entry. `404` if it is not in their archive. |
| POST | `/mymind` | token | `title`, `category`, `moods`, `description?`, `image?`, `url?`, `date?` | Creates an entry. Returns `201` with `{ message, mymind }`. `400` without a title, a valid category or a mood, and `400` when `url` does not start with `http://` or `https://`. |
| PATCH | `/mymind/:mymindId` | token | `title`, `category`, `moods`, `description?`, `image?`, `url?`, `date?` | Edits an entry of any category; the mood list is replaced. `404` if it is not theirs, `400` on the same rules as POST. |
| DELETE | `/mymind/:mymindId` | token | — | Removes the entry. `404` if it is not theirs. |

### Health

| Method | Path | Auth | Body | What it does |
| --- | --- | --- | --- | --- |
| GET | `/` | public | — | Not under `/api`. Answers `"Hello All good in here!"`, handy for waking the server up. |
