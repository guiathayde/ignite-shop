import { styled } from '..';

export const ArrowSliderContainer = styled('svg', {
  width: 30,
  height: 30,
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  WebkitTransform: 'translateY(-50%)',
  fill: '#fff',
  cursor: 'pointer',

  variants: {
    direction: {
      left: {
        left: 16,
      },
      right: {
        left: 'auto',
        right: 24,
      },
    },
    disabled: {
      true: {
        fill: 'rgba(255, 255, 255, 0.5)',
      },
      false: {},
    },
  },
});
