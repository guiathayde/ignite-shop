import { useCallback, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { stripe } from '@/lib/stipe';
import Image from 'next/image';
import Stripe from 'stripe';

import { Product, useShoppingBag } from '@/hooks/shoppingBag';

import { priceFormatter } from '@/utils/formatter';

import { Spinner } from '@/styles/components/spinner';
import { Button } from '@/styles/components/button';

import {
  ImageContainer,
  LoadingContainer,
  ProductContainer,
  ProductDetails,
} from '@/styles/pages/product';

interface ProductProps {
  product: Product;
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter();
  const { addProduct } = useShoppingBag();

  const handleAddProduct = useCallback(() => {
    addProduct(product);
  }, [addProduct, product]);

  if (isFallback) {
    return (
      <LoadingContainer>
        <Spinner color="green" size="2" thickness="4" />
      </LoadingContainer>
    );
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image
            src={product.imageUrl}
            width={520}
            height={480}
            alt={product.name}
          />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <Button onClick={handleAddProduct}>Colocar na sacola</Button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const revalidate = 60 * 60 * 2; // 2 hours

  if (!params) return { props: {}, revalidate };

  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: priceFormatter.format((price.unit_amount ?? 0) / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate,
  };
};
