import { z } from "zod";
import { prisma } from "@acme/db";

import { protectedProcedure, publicProcedure, router } from "../trpc";

export const socialMediaRouter = router({
  // Create SocialMedia
  // Create SocialMedia
  createSocialMedia: protectedProcedure
    .input(
      z.object({
        business_id: z.number(),
        facebook: z.string().optional(),
        instagram: z.string().optional(),
        tiktok: z.string().optional(),
        youtube: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const newSocialMedia = await prisma.socialMedia.create({
        data: {
          business: {
            connect: { id: input.business_id },
          },
          facebook: input.facebook,
          instagram: input.instagram,
          tiktok: input.tiktok,
          youtube: input.youtube,
        },
      });

      return newSocialMedia;
    }),

  // Get SocialMedia by ID
  getSocialMedia: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const socialMedia = await prisma.socialMedia.findUnique({
        where: { id: input.id },
      });

      return socialMedia;
    }),

  // Update SocialMedia
  updateSocialMedia: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        facebook: z.string().optional(),
        instagram: z.string().optional(),
        tiktok: z.string().optional(),
        youtube: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const updatedSocialMedia = await prisma.socialMedia.update({
        where: { id: input.id },
        data: {
          ...input,
        },
      });

      return updatedSocialMedia;
    }),

  // Delete SocialMedia
  deleteSocialMedia: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const deletedSocialMedia = await prisma.socialMedia.delete({
        where: { id: input.id },
      });

      return deletedSocialMedia;
    }),
});
