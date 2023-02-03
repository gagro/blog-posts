# Blog App (WIP)

This is a simple fullstack (Register -> Login -> Create posts) project bootstrapped with `create-t3-app`.

## Tehnologies used in this project:

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Running project locally

#### At this moment this project is not deployed anywhere. You can only see it if you run it locally on your machine. To run it locally:

1. Clone project
2. Create .env file in the root
3. Copy from .env.example and add necessary env variables (you just need to add NEXTAUTH_SECRET, which can be any string)
4. Run `npm install`
5. Run `npx prisma db push`
6. Run `npm run dev`

## TODO List:

- Add comments
- Add pagination
- Add backend validation
- Add images
