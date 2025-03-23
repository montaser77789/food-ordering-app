import { ShoppingCartIcon } from 'lucide-react'
import React from 'react'
import Link from '../link'
import { Routes } from '../constants/enums'
import { useAppSelector } from '@/redux/hooks/hooks'
import { selectCartItems } from '@/redux/features/cart/cartSlice'
import { getCartQuantity } from '@/lib/cart'

const Cartbutton = () => {
  const CartQuantity = useAppSelector(selectCartItems)
  const Quantity =  getCartQuantity(CartQuantity)
  return (
    <Link href={`/${Routes.CART}`} className='relative block group'> 
        <span className='absolute -top-4 start-4 bg-primary text-white w-5 h-5 flex items-center justify-center rounded-full'>{Quantity}</span>
        <ShoppingCartIcon  className='text-accent  group:hover:text-primary duration-200 transition-colors '/>
    </Link>
  )
}

export default Cartbutton
