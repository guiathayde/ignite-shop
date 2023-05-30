import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import Stripe from 'stripe';

import {
  SuccessContainer,
  ImageContainer,
  ImagesContainer,
  BackLink,
} from '@/styles/pages/success';

import { stripe } from '@/lib/stipe';

interface SuccessProps {
  customerName: string;
  products: {
    id: string;
    name: string;
    imageUrl: string;
  }[];
}

export default function Success({ customerName, products }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <ImagesContainer>
          {products.map((product) => (
            <ImageContainer key={product.id}>
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={120}
                height={120}
              />
            </ImageContainer>
          ))}
        </ImagesContainer>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de {products.length}{' '}
          camiseta{products.length > 1 ? 's' : ''} já está a caminho da sua
          casa.
        </p>

        <BackLink href="/">Voltar ao catálogo</BackLink>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  });

  const customerName = session.customer_details?.name;
  const products = session.line_items?.data.map((product) => {
    const stripeProduct = product.price?.product as Stripe.Product;

    return {
      id: stripeProduct.id,
      name: stripeProduct.name,
      imageUrl: stripeProduct.images[0],
    };
  });

  return {
    props: {
      customerName,
      products,
    },
  };
};
