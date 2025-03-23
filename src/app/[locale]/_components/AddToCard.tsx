"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatCurrency } from "@/lib/formatters";
import { Checkbox } from "@/components/ui/checkbox";
import { productWithRelations } from "@/types";
import { Extras, productSize, Size } from "@prisma/client";
import { addCartItem, removeCartItem, removeItemFromCart, selectCartItems } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { getItemQuantity } from "@/lib/cart";

const AddToCard = ({ item }: { item: productWithRelations }) => {
  const cart = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();
  const defaultExtras = cart.find((extra) => item.id === extra.id)?.extra || [];
  const defaultSize =
    item.sizes.find((size) => size.name === productSize.Small) || item.sizes[0];

  const [selectedSize, setSelectedSize] = useState<Size>(defaultSize);

  const [selectedExtras, setSelectedExtras] = useState<Extras[]>(defaultExtras);
  let totalPrice = item.basePrise;

  if (selectedSize) {
    totalPrice += selectedSize.price;
  }
  if (selectedExtras) {
    for (const extra of selectedExtras) {
      totalPrice += extra.price;
    }
  }

  const quantity = getItemQuantity(item.id, cart);

  const handleCartItems = () => {
    dispatch(
      addCartItem({
        basePrise: item.basePrise,
        id: item.id,
        image: item.image,
        name: item.name,
        extra: selectedExtras,
        size: selectedSize,
      })
    );
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button type="button" size={"lg"} className="rounded-full mt-4 !px-4">
            Add to Cart
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] md:h-[80vh] overflow-y-auto">
          <DialogHeader className="flex-col justify-center items-center">
            <Image
              src={item?.image}
              alt={item?.name}
              className="object-cover "
              width={200}
              height={200}
            />
            <DialogTitle>Pizaa</DialogTitle>
            <DialogDescription>This is Pizza</DialogDescription>
          </DialogHeader>
          <div className="w-full text-center space-y-3">
            <Label>Pick Your Size</Label>
            <Sizes
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              item={item}
              sizes={item.sizes}
            />
          </div>
          <div className="w-full text-center space-y-3">
            <Label>Extras</Label>
            <ExtrasComponent
              item={item}
              selectedExtras={selectedExtras}
              setSelectedExtras={setSelectedExtras}
            />
          </div>
          <DialogFooter className="text-center w-full ">
            {quantity! > 0 ? (
              <ChooseQuantity item={item} selectedExtras={selectedExtras} selectedSize={selectedSize}  quantity={quantity!}/>
            ) : (
              <Button
                onClick={handleCartItems}
                className="w-full h-10"
                type="submit"
              >
                Add to Cart {formatCurrency(totalPrice)}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddToCard;

function Sizes({
  sizes,
  item,
  selectedSize,
  setSelectedSize,
}: {
  item: productWithRelations;
  sizes: Size[];
  setSelectedSize: React.Dispatch<React.SetStateAction<Size>>;
  selectedSize: Size;
}) {
  return (
    <RadioGroup defaultValue="comfortable">
      {sizes?.map((size) => (
        <div
          key={size.id}
          className="flex items-center space-x-2 py-4 px-2 border "
        >
          <RadioGroupItem
            checked={selectedSize.id === size.id}
            value={selectedSize.name}
            onClick={() => {
              setSelectedSize(size);
            }}
          />
          <Label htmlFor={size.id}>
            {size.name} {formatCurrency(size.price + item.basePrise)}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}

function ExtrasComponent({
  item,
  selectedExtras,
  setSelectedExtras,
}: {
  item: productWithRelations;
  selectedExtras: Extras[];
  setSelectedExtras: React.Dispatch<React.SetStateAction<Extras[]>>;
}) {
  const handeExtra = (extra: Extras) => {
    if (selectedExtras.find((e) => e.id === extra.id)) {
      const filter = selectedExtras.filter((e) => e.id !== extra.id);
      setSelectedExtras(filter);
    } else {
      setSelectedExtras((prev) => [...prev, extra]);
    }
  };
  return item?.extras?.map((extra) => (
    <div
      key={extra.id}
      className="flex items-center space-x-2 py-4 px-2 border "
    >
      <Checkbox
        checked={Boolean(selectedExtras.find((e) => e.id === extra.id))}
        onClick={() => {
          handeExtra(extra);
        }}
      />
      <Label htmlFor={extra.id}>
        {extra.name} {formatCurrency(extra.price)}
      </Label>
    </div>
  ));
}

function ChooseQuantity({
  item,
  selectedSize,
  selectedExtras,
  quantity
}: {
  item: productWithRelations;
  selectedSize: Size;
  selectedExtras : Extras[],
  quantity:number
}) {
  const dispatch = useAppDispatch();

  const handleCartItems = () => {
    dispatch(
      addCartItem({
        basePrise: item.basePrise,
        id: item.id,
        image: item.image,
        name: item.name,
        extra: selectedExtras,
        size: selectedSize,
      })
    );
  };
  const handleRemoveCartItem = ()=>{
    dispatch(removeCartItem({
      id:item.id
    }))
  }

  const handleClearCart = ()=>{
    dispatch(removeItemFromCart({
      id : item.id
    }))
  }
  return (
    <div className="flex items-center flex-col gap-2 mt-4 w-full">
      <div className="flex items-center justify-center gap-2">
        <Button onClick={handleRemoveCartItem} variant={"outline"}>-</Button>
        <div>
          <span>{quantity} in cart</span>
        </div>
        <Button onClick={handleCartItems} variant={"outline"}>+</Button>
      </div>
      <Button onClick={handleClearCart} size={"sm"}>Remove</Button>
    </div>
  );
}
