import { productWithRelations } from "@/types";
import MenuItem from "./MenuItem";

const Menu = ({ items }: { items: productWithRelations[] }) => {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {items?.length > 0 ? (
        items?.map((item: productWithRelations) => (
          <MenuItem key={item.id} item={item} />
        ))
      ) : (
        <p>No items available</p>
      )}
    </ul>
  );
};

export default Menu;
