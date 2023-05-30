import { styled } from '..';
import Link from 'next/link';

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: 656,

  h1: {
    fontSize: '$2xl',
    color: '$gray100',
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    textAlign: 'center',
    lineHeight: 1.4,
    maxWidth: 560,
    marginTop: '2rem',
  },
});

export const ImagesContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
});

export const ImageContainer = styled('div', {
  width: 145,
  height: 145,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: '50%',
  boxShadow: '0px 0px 60px rgba(0, 0, 0, 0.8)',
  padding: '0.25rem',
  marginTop: '4rem',
  marginLeft: -(145 / 2.5),

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
    borderRadius: '50%',
  },
});

export const BackLink = styled(Link, {
  display: 'block',
  marginTop: '5rem',
  fontSize: '$lg',
  color: '$green500',
  textDecoration: 'none',
  fontWeight: 'bold',

  '&:hover': {
    color: '$green300',
  },
});
