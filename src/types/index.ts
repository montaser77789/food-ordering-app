import { Prisma } from "@prisma/client";

export type productWithRelations = Prisma.productGetPayload<{
    include: {
        sizes: true;
        extras: true;
    };
}>;
