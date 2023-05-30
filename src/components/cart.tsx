import { useCallback } from 'react';
import Image from 'next/image';

import { useShoppingBag } from '@/hooks/shoppingBag';

import { CartContainer, Counter } from '@/styles/components/cart';

import bagImg from '@/assets/bag.svg';
import bagWhiteImg from '@/assets/bag-white.svg';

interface CartProps {
  variant?: 'default' | 'green';
  onClick?: () => void;
}

export function Cart({ variant = 'default', onClick }: CartProps) {
  const { changeShoppingBagVisibility, products } = useShoppingBag();

  const handleClick = useCallback(() => {
    changeShoppingBagVisibility(true);
  }, [changeShoppingBagVisibility]);

  return (
    <CartContainer
      variant={variant}
      onClick={variant === 'default' ? handleClick : onClick}
    >
      {variant === 'default' ? (
        <Image src={bagImg} width={24} height={24} alt="Cart" />
      ) : (
        <Image src={bagWhiteImg} width={24} height={24} alt="Cart" />
      )}
      {variant === 'default' && products.length > 0 && (
        <Counter>{products.length}</Counter>
      )}
    </CartContainer>
  );
}
