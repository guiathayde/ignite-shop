import { styled } from '..';

export const CartContainer = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  position: 'relative',

  width: 48,
  height: 48,

  border: 'none',
  borderRadius: 6,

  backgroundColor: '$gray800',

  opacity: 0.8,
  cursor: 'pointer',

  '&:hover': {
    opacity: 1,
  },

  variants: {
    variant: {
      default: {},
      green: {
        backgroundColor: '$green500',
        opacity: 1,

        '&:hover': {
          backgroundColor: '$green300',
        },
      },
    },
  },
});

export const Counter = styled('span', {
  position: 'absolute',
  top: -8,
  right: -8,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: 24,
  height: 24,

  backgroundColor: '$green500',

  borderRadius: '50%',
  border: '2px solid $background',

  color: '$white',
  fontWeight: 700,
  fontSize: '0.875rem',
});
