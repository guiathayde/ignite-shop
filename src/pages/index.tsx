import { styled } from '@/styles';

const Button = styled('button', {
  backgroundColor: '$green500',
  borderRadius: 4,
  border: 0,
  padding: '0.8rem 1.2rem',

  span: {
    fontWeight: 'bold',
  },

  '&:hover': {
    cursor: 'pointer',
    filter: 'brightness(0.8)',
  },
});

export default function Home() {
  return (
    <Button>
      <span>Teste</span> Styled Button
    </Button>
  );
}
