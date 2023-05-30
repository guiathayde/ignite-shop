import { useCallback, useState } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Stripe from 'stripe';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';

import { Product as ProductProps } from '@/hooks/shoppingBag';

import { stripe } from '@/lib/stipe';
import { wheelControls } from '@/lib/keen-slider/wheelControls';
import { Arrow } from '@/lib/keen-slider/Arrow';

import { priceFormatter } from '@/utils/formatter';

import { Cart } from '@/components/cart';

import { HomeContainer, Product } from '@/styles/pages/home';
import 'keen-slider/keen-slider.min.css';

interface HomeProps {
  products: ProductProps[];
}

export default function Home({ products }: HomeProps) {
  const router = useRouter();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSliderLoaded, setIsSliderLoaded] = useState(false);

  const [sliderRef, sliderInstanceRef] = useKeenSlider(
    {
      mode: 'free',
      slides: {
        perView: 'auto',
        spacing: 48,
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setIsSliderLoaded(true);
      },
    },
    [wheelControls]
  );

  const handleClickCart = useCallback(
    (productId: string) => {
      router.push(`/product/${productId}`);
    },
    [router]
  );

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <Product
            key={product.id}
            href={`/product/${product.id}`}
            prefetch={false}
            className="keen-slider__slide"
          >
            <Image src={product.imageUrl} width={520} height={480} alt="" />

            <footer>
              <div>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </div>
              <Cart
                variant="green"
                onClick={() => handleClickCart(product.id)}
              />
            </footer>
          </Product>
        ))}

        {isSliderLoaded && sliderInstanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e) =>
                e.stopPropagation() || sliderInstanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e: any) =>
                e.stopPropagation() || sliderInstanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                sliderInstanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: priceFormatter.format((price.unit_amount ?? 0) / 100),
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};
