This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Store owner admin

The private product manager is available at `/admin`. It uses server-only credentials and a signed, HTTP-only session cookie; product changes are stored in `data/products.json` with no database.

1. Copy `.env.example` to `.env.local`.
2. Set a private `ADMIN_EMAIL` and a long, unique `ADMIN_PASSWORD`.
3. Set `ADMIN_SESSION_SECRET` to a random secret with at least 32 characters.
4. Restart the Next.js server, then sign in at `/admin`.

Never commit `.env.local` or share the owner password. In the admin form, the owner can select a JPEG, PNG, or WebP image from their device (up to 8 MB); uploads are saved under `public/product-uploads/` with generated filenames. This file-based store is suitable for a single self-hosted Node.js server; deployments with ephemeral/read-only filesystems (including typical serverless hosting) need persistent mounted storage or a database instead. Back up `data/products.json` and `public/product-uploads/` regularly.
