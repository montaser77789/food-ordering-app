import { cache } from "../Cache";
import { db } from "../prisma";

export const BestSellers = cache(
  (limit?: number | undefined) => {
    const bestSellers = db.product.findMany({
      where: {
        orders: {
          // some: {},
        },
      },
      orderBy: {
        orders: {
          _count: "desc",
        },
      },
      include: {
        sizes: true,

        extras: true,
      },
      take: limit,
    });

    return bestSellers;
  },
  ["bestSellers"],
  { revalidate: 3600 }
);

export const getProductByCategory = cache(
  () => {
    const catagory = db.catagory.findMany({
      include: {
        products: {
          include: {
            sizes: true,
            extras: true,
          },
        },
      },
    });
    return catagory;
  },
  ["catagory"],
  { revalidate: 3600 }
);
