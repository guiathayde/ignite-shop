import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { AppProvider } from '@/hooks';

import { Cart } from '@/components/cart';
import { ShoppingBag } from '@/components/shoppingBag';

import { globalStyles } from '@/styles/global';
import { Container, Header } from '@/styles/pages/app';

import logoImg from '@/assets/logo.svg';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <AppProvider>
      <ShoppingBag />

      <Container>
        <Header>
          <Image
            src={logoImg}
            alt="Ignite Shop Logo"
            onClick={() => router.push('/')}
            style={{ cursor: 'pointer' }}
          />

          <Cart />
        </Header>

        <Component {...pageProps} />
      </Container>
    </AppProvider>
  );
}
