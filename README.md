This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started (Dev)

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Setup

1. In admin panel, create role Authenticated User without app access.
1. Copy primary key and create a rule for data model access - allow Public role to create users when role Equals (primary key for Authenticated User)
1. Set USER_ROLE env to primary key.

## Data models

### Location

- id
- user_created | date_created | user_updated | date_updated
- name\*
- type\* (City/Town - city, County/Region - region, State - state)
- parent (M2M location)

### Topic

- id
- user_created | date_created | user_updated | date_updated
- name\*
- parent (M2M topic)

### Content

- id
- status
- user_created | date_created | user_updated | date_updated
- title\*
- article\*
- parent (M2M content)
- next (M2M content)
- age_min (0-200)
- age_max (0-200)
- topics (M2M topic)
- locations (M2M location)

## Permissions

### Public

- View all content

### Authenticated User

- View all content
- Create content (draft status)
