import { GetServerSideProps } from 'next';
import Stripe from 'stripe';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';

import { stripe } from '@/lib/stipe';

import { priceFormatter } from '@/utils/formatter';

import { HomeContainer, Product } from '@/styles/pages/home';

import shirt1 from '@/assets/shirts/1.png';
import shirt2 from '@/assets/shirts/2.png';
import shirt3 from '@/assets/shirts/3.png';
import shirt4 from '@/assets/shirts/4.png';

import 'keen-slider/keen-slider.min.css';

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
}

interface HomeProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((product) => (
        <Product key={product.id} className="keen-slider__slide">
          <Image src={product.imageUrl} width={520} height={480} alt="" />

          <footer>
            <strong>{product.name}</strong>
            <span>{priceFormatter.format(product.price)}</span>
          </footer>
        </Product>
      ))}
    </HomeContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: (price.unit_amount ?? 0) / 100,
    };
  });

  return {
    props: {
      products,
    },
  };
};
