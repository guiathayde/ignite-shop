import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { stripe } from '@/lib/stipe';
import Image from 'next/image';
import Stripe from 'stripe';

import { priceFormatter } from '@/utils/formatter';

import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@/styles/pages/product';

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
  };
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Carregando...</p>;
  }

  return (
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

        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_J1Z2X2X2X2X2X2' } }],
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
      },
    },
    revalidate,
  };
};
