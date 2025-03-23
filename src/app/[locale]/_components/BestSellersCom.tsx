import MainHeading from "@/components/main-Heading";
import Menu from "./Menu";
import { BestSellers } from "@/server/db/Products";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";

const BestSellersCom = async () => {
  const bestSellers = await BestSellers(3);
  const locale = await getCurrentLocale();
  const { home } = await getTrans(locale);
  const { bestSeller } = home;
  // const createSize = await db.extras.create({
  //   data:{
  //     name:"Cheese",
  //     productId :"1235848656",
  //     price:20
  //   }
  // })

  // console.log(createSize);
  return (
    <section className="section-gap container">
      <div className="w-full text-center">
        <div className="text-center mb-4">
          <MainHeading
            subTitle={bestSeller.checkOut}
            title={bestSeller.OurBestSellers}
          />
        </div>{" "}
      </div>
      <Menu items={bestSellers} />
    </section>
  );
};

export default BestSellersCom;
