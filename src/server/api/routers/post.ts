import { z } from 'zod';

import { createTRPCRouter, publicProcedure, protectedProcedure } from './../trpc';

export const postRouter = createTRPCRouter({
    fetchAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.post.findMany({
            include: {
                user: true
            }
        })
    }),
    addPost: protectedProcedure
        .input(z.object({ title: z.string(), text: z.string()}))
        .mutation(({ input, ctx }) => {
            const { title, text } = input;
            const userId = ctx.session?.user?.id;
            return ctx.prisma.post.create({
                data: { title, text, userId }
            })
        }),
    fetchUserPosts: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.post.findMany({
            where: { userId: ctx.session.user.id },
            include: {
                user: true
            }
        })
    })
})