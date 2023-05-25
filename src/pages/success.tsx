import {
  ImageContainer,
  SuccessContainer,
  BackLink,
} from '@/styles/pages/success';

export default function Success() {
  return (
    <SuccessContainer>
      <h1>Compra efetuada!</h1>

      <ImageContainer></ImageContainer>

      <p>
        Uhuul <strong>Guilherme Athayde</strong>, sua{' '}
        <strong>Camiseta Beyond the Limits</strong>
        já está a caminho da sua casa.
      </p>

      <BackLink href="/">Voltar ao catálogo</BackLink>
    </SuccessContainer>
  );
}
