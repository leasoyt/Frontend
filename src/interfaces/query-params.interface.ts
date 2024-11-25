import { z } from "zod";

export const ZodQueryParams = z.object({
    page: z.coerce.number(),

    limit: z.coerce.number(),

    search: z.string().optional(),

    rating: z.coerce.number().optional()
});

export type IQueryParams = z.infer<typeof ZodQueryParams>