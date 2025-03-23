import CartItems from "./_components/CartItems";
import CheckOutForm from "./_components/CheckOutForm";

export default function CartPage() {
    return (
        <main>
            <section className="section-gap">
                <div className="container">
                    <h1 className="text-3xl text-primary font-bold italic mb-10 text-center" >
                        Cart
                    </h1>
                    <div className="grid grid-col-1 lg:grid-cols-2 gap-10">
                        <CartItems />
                        <CheckOutForm />
                    </div>

                </div>

            </section>
        </main>
    )
}