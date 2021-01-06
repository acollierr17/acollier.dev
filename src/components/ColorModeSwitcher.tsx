import * as React from 'react';
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
} from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label'>;

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (
  props: ColorModeSwitcherProps,
) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      size="md"
      fontSize="xl"
      variant="ghost"
      color="current"
      _hover={{
        background:
          text === 'dark'
            ? 'rgba(237, 242, 247, .7)'
            : 'rgba(255, 255, 255, 0.08)',
      }}
      marginLeft="-2"
      marginRight="-2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      aria-label={`Switch to ${text} mode`}
      {...props}
    />
  );
};
