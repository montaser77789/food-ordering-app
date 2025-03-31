import { cache } from "../Cache";
import { db } from "../prisma";

export const getCatagories = cache(
  () => {
    const categories = db.catagory.findMany({
      orderBy: {
        order: "asc",
      },
    });
    return categories;
  },
  ["categories"],
  { revalidate: 3600 }
);
