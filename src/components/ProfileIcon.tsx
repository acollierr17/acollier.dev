import React from 'react';
import { useColorMode } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { FaGithub, FaDiscord } from 'react-icons/fa';
import { AiFillYoutube } from 'react-icons/ai';

interface ProfileIconProps {
  name: string;
}

export default function ProfileIcon(props: ProfileIconProps) {
  const { colorMode } = useColorMode();
  const color = colorMode === 'dark' ? 'gray.800' : 'white';

  switch (props.name) {
    case 'GitHub':
      return <Icon as={FaGithub} color={color} />;
    case 'Discord':
      return <Icon as={FaDiscord} color={color} />;
    case 'YouTube':
      return <Icon as={AiFillYoutube} color={color} />;
    default:
      return null;
  }
}
