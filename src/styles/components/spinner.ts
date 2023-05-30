import { styled, keyframes } from '..';

const spinner = keyframes({
  to: {
    transform: 'rotate(360deg)',
  },
});

export const Spinner = styled('div', {
  dispaly: 'inline-block',
  width: '10px',
  height: '10px',
  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: 'white',
  borderRadius: 999,
  animation: `${spinner}  1.6s linear infinite`,
  variants: {
    color: {
      green: {
        borderTopColor: '$green500',
      },
    },
    size: {
      '1': {
        size: 64,
        height: 64,
      },
      '2': {
        width: 128,
        height: 128,
      },
      '3': {
        width: 256,
        height: 256,
      },
      '4': {
        width: 512,
        height: 512,
      },
    },
    thickness: {
      '1': {
        borderWidth: 2,
      },
      '2': {
        borderWidth: 4,
      },
      '3': {
        borderWidth: 6,
      },
      '4': {
        borderWidth: 12,
      },
    },
  },
});
