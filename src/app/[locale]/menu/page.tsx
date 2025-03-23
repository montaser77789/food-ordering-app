import { getProductByCategory } from "@/server/db/Products";
import React from "react";
import Menu from "../_components/Menu";

const MenuPage = async () => {
  // const catagory = await db.catagory.createMany({
  //   data: [
  //     {
  //       name: "Pizza",
  //     },
  //     {
  //       name: "Burger",
  //     },
  //     { name: "Sandwich" },
  //   ],
  // });
  const catagory = await getProductByCategory();
  console.log(catagory);

  return (
    <main className="container">
      {catagory?.map((item) => (
        <section className="section-gap text-center " key={item.id}>
          <h2 className="text-3xl text-primary">{item.name}</h2>
          <Menu items={item.products} />
        </section>
      ))}
    </main>
  );
};

export default MenuPage;
