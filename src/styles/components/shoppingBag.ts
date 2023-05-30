import { styled } from '..';

export const ShoppingBagContainer = styled('div', {
  position: 'absolute',

  width: 480,

  right: 0,
  top: 0,
  bottom: 0,

  padding: '3rem',

  backgroundColor: '$gray800',
  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',

  display: 'flex',
  flexDirection: 'column',

  transform: 'translateX(110%)',
  opacity: 0,
  transition: 'all 0.2s ease-in-out',

  variants: {
    isOpen: {
      true: {
        transform: 'translateX(0%)',
        opacity: 1,
      },
      false: {
        transform: 'translateX(110%)',
        opacity: 0,
      },
    },
  },

  h1: {
    marginTop: '1.5rem',
    marginBottom: '2rem',

    fontWeight: 700,
    fontSize: '$lg',
    lineHeight: 1.6,
    color: '$gray100',
  },
});

export const CloseButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  position: 'absolute',
  top: 24,
  right: 24,

  width: 24,
  height: 24,

  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  opacity: 0.7,

  transition: 'opacity 0.2s ease-in-out',

  '&:hover': {
    opacity: 1,
  },
});

export const ProductList = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap: '1rem',
  overflowY: 'auto',
});

export const ProductDetails = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1.25rem',

  h2: {
    fontWeight: 400,
    fontSize: '$md',
    lineHeight: 1.6,
    color: '$gray300',
  },

  span: {
    fontWeight: 700,
    fontSize: '$md',
    lineHeight: 1.6,
    color: '$gray100',
  },
});

export const ProductNamePriceRemoveContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
});

export const ProductImage = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: 101.94,
  height: 93,
  background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
  borderRadius: 8,

  img: {
    objectFit: 'cover',
  },
});

export const RemoveProductButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  marginTop: 'auto',

  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',

  span: {
    fontWeight: 700,
    fontSize: '1rem',
    lineHeight: 1.6,
    color: '$green500',
  },

  transition: 'color 0.2s ease-in-out',

  '&:hover': {
    span: {
      color: '$green300',
    },
  },
});

export const QuantityInfo = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  width: '100%',

  marginTop: '0.5rem',

  h3: {
    fontSize: '$md',
    lineHeight: 1.6,
    color: '$gray100',
  },

  span: {
    fontSize: '$lg',
    lineHeight: 1.6,
    color: '$gray300',
  },
});

export const TotalInfo = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  width: '100%',

  marginTop: '0.5rem',

  h3: {
    fontSize: '$lg',
    lineHeight: 1.4,
    color: '$gray100',
  },

  span: {
    fontSize: '$xl',
    lineHeight: 1.6,
    color: '$gray300',
  },
});
