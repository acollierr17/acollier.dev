import React, { useState } from 'react';
import { Badge, BadgeProps, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ProfileIcon from './ProfileIcon'

interface ProfileProps {
  name: 'GitHub' | 'Discord' | 'YouTube';
  colorScheme?: 'github' | 'discord' | 'youtube';
  link?: string;
  external?: boolean;
}

type HoverResult = BadgeProps | {};

export default function Profile(props: ProfileProps) {
  const [show, setShow] = useState(false);
  const [hovered, setHovered] = useState<HoverResult>({});

  const setBadgeProps = (hovering: boolean) => {
    return hovering
      ? setHovered({
          variant: 'subtle',
          colorScheme: props?.colorScheme ?? 'brand',
        })
      : setHovered({});
  };

  const badgeStyle = {
    transition: 'padding-right 0.6s',
    'animation-timing-function': show ? 'ease-in' : 'ease-out',
    'border-radius': '60px',
  };

  const textStyle = {
    'font-size': show ? 'smaller' : '0px',
    'letter-spacing': show ? 'inherit' : '-10px',
    'padding-left': show ? '0.8rem' : 'inherit',
    'padding-bottom': show ? '3px' : 'inherit',
    transition: 'font-size 0.6s 0.1s, padding-left 0.6s, padding-bottom 0.6s, letter-spacing 0.6s 0.3s',
    'animation-timing-function': show ? 'ease-in' : 'ease-out',
  };

  return (
    <Badge
      display="inline-flex"
      alignItems="center"
      px={4}
      py={4}
      fontSize="2rem"
      h="65px"
      minW="65px"
      style={badgeStyle}
      bgColor="currentColor"
      onMouseEnter={(e) => {
        setShow(true);
        setBadgeProps(true);
      }}
      onMouseLeave={(e) => {
        setShow(false);
        setBadgeProps(false);
      }}
      {...hovered}>
      <Link
        to={
          props?.external ?? false
            ? { pathname: props?.link ?? '#' }
            : props?.link ?? '#'
        }
        target="_blank"
        rel="noopener noreferrer">
        <Text display="flex" alignItems="center">
          <ProfileIcon name={props.name} />
          <Text color="gray.800" style={textStyle}>
            {props.name}
          </Text>
        </Text>
      </Link>
    </Badge>
  );
}
