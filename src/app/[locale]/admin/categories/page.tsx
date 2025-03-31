import { Locale } from "@/i18n.config";
import getTrans from "@/lib/translation";
import { getCatagories } from "@/server/db/catagories";
import React from "react";
import CategoryItem from "./_components/CategoryItem";
import Form from "./_components/Form";

const CatagoryPage = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) => {
  const locale = (await params).locale;
  const translations = await getTrans(locale);

  const catagory = await getCatagories();
  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <div className="sm:max-w-[625px] mx-auto space-y-6">
            <Form translations={translations} />
          </div>
          {catagory.length > 0 ? (
            <ul className="sm:max-w-[625px] mx-auto space-y-6 mt-4">
              {catagory.map((category) => (
                <CategoryItem
                  translations={translations}
                  key={category.id}
                  category={category}
                />
              ))}
            </ul>
          ) : (
            <p className="text-accent text-center py-10">
              {translations.noCategoriesFound}
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export default CatagoryPage;
