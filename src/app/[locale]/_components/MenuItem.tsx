import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import AddToCard from "./AddToCard";
import { productWithRelations } from "@/types";

function MenuItem({ item }: { item: productWithRelations }) {
  return (
    <div className="text-center list-none hover:shadow-xl py-3 px-5 space-y-4 ">
      <div className="w-48 h-48 rounded-full m-auto">
        <Image
          width={200}
          height={200}
          src={item.image}
          alt={item.name}
          className="object-cover rounded-full m-auto w-48 h-48"
        />
      </div>
      <div className="text-center flex justify-between items-center ">
        <h3>{item.name}</h3>
        <p>{formatCurrency(item.basePrise)}</p>
      </div>
      <div className="mt-3">
        <p>{item.description}</p>
      </div>
      <AddToCard item={item} />
    </div>
  );
}

export default MenuItem;
