import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import Image from 'next/image';

import { useShoppingBag } from '@/hooks/shoppingBag';

import { priceFormatter } from '@/utils/formatter';

import {
  ShoppingBagContainer,
  CloseButton,
  ProductList,
  ProductDetails,
  ProductImage,
  ProductNamePriceRemoveContainer,
  RemoveProductButton,
  QuantityInfo,
  TotalInfo,
} from '@/styles/components/shoppingBag';
import { Button } from '@/styles/components/button';

import closeImg from '@/assets/close.svg';

export function ShoppingBag() {
  const {
    isShoppingBagVisible,
    changeShoppingBagVisibility,
    products,
    removeProduct,
  } = useShoppingBag();

  const portalElementRef = useRef<HTMLDivElement | null>(null);

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  const handleFinishPurchase = useCallback(async () => {
    setIsCreatingCheckoutSession(true);

    try {
      const response = await axios.post('/api/checkout', {
        pricesIds: products.map((product) => product.defaultPriceId),
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (error) {
      console.error(error);

      setIsCreatingCheckoutSession(false);

      alert('Erro ao realizar compra, falha ao redirecionar ao checkout.');
    }
  }, [products]);

  useEffect(() => {
    const portalElement = document.createElement('div');
    portalElementRef.current = portalElement;
    document.body.appendChild(portalElement);

    return () => {
      document.body.removeChild(portalElement);
    };
  }, []);

  const total = products.reduce((acc, product) => {
    const price = Number(product.price.split('$')[1].trim().replace(',', ''));
    return acc + price;
  }, 0);

  return (
    portalElementRef.current &&
    createPortal(
      <ShoppingBagContainer isOpen={isShoppingBagVisible}>
        <CloseButton onClick={() => changeShoppingBagVisibility(false)}>
          <Image src={closeImg} width={24} height={24} alt="Fechar sacola" />
        </CloseButton>

        <h1>Sacola de compras</h1>

        <ProductList>
          {products.length > 0 &&
            products.map((product) => (
              <ProductDetails key={product.id}>
                <ProductImage>
                  <Image
                    src={product.imageUrl}
                    width={100}
                    height={93}
                    alt={product.name}
                  />
                </ProductImage>

                <ProductNamePriceRemoveContainer>
                  <h2>{product.name}</h2>
                  <span>{product.price}</span>
                  <RemoveProductButton
                    onClick={() => removeProduct(product.id)}
                  >
                    <span>Remover</span>
                  </RemoveProductButton>
                </ProductNamePriceRemoveContainer>
              </ProductDetails>
            ))}
        </ProductList>

        <QuantityInfo>
          <h3>Quantidade</h3>
          <span>
            {products.length} {products.length === 1 ? 'item' : 'itens'}
          </span>
        </QuantityInfo>

        <TotalInfo>
          <h3>Valor total</h3>
          <span>{priceFormatter.format(total / 100)}</span>
        </TotalInfo>

        <Button
          style={{
            marginTop: '3.5rem',
          }}
          disabled={products.length === 0 || isCreatingCheckoutSession}
          onClick={async () => await handleFinishPurchase()}
        >
          Finalizar compra
        </Button>
      </ShoppingBagContainer>,
      portalElementRef.current
    )
  );
}
