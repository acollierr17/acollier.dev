import React from 'react'
import { Icon } from '@chakra-ui/react'
import { FaGithub, FaDiscord } from 'react-icons/fa';
import { AiFillYoutube } from 'react-icons/ai';

interface ProfileIconProps {
  name: string;
};

export default function ProfileIcon(props: ProfileIconProps) {
  switch (props.name) {
    case 'GitHub': return <Icon as={FaGithub} color="gray.800" />
    case 'Discord': return <Icon as={FaDiscord} color="gray.800" />
    case 'YouTube': return <Icon as={AiFillYoutube} color="gray.800" />
    default: return null;
  }
}
