import { catagory } from "@prisma/client";
import { EditCategory } from "./EditCategory";
import { Translations } from "@/types/translations";
import DeleteCategory from "./DeleteCategory";

function CategoryItem({ category , translations }: { category: catagory , translations :Translations }) {
  return (
    <li className="bg-gray-300 p-4 rounded-md flex justify-between gap-3">
      <h3 className="text-black font-medium text-lg flex-1">{category.name}</h3>
      <EditCategory translations={translations} category={category} />
      <DeleteCategory  id={category.id}/>
    </li>
  );
}

export default CategoryItem;
