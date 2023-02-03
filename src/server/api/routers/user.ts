import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from './../trpc';
import { TRPCError } from '@trpc/server';
import { hash } from 'bcryptjs';

export const userRouter = createTRPCRouter({
    registerUser: publicProcedure
        .input(z.object({ 
            username: z.string(), 
            password: z.string(), 
            firstName: z.string(), 
            lastName: z.string()}))
        .mutation( async ({ input, ctx }) => {
            const { username, password } = input;

            const userExists = await ctx.prisma.user.findFirst({
                where: { username }
            });

            if(userExists) throw new TRPCError({ code: "BAD_REQUEST", message: "User already exists" });

            return ctx.prisma.user.create({ data: { ...input, password: await hash(password, 12)}})
            
        })
})