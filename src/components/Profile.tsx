import React, { useState } from 'react';
import { Badge, BadgeProps, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaGithub, FaDiscord } from 'react-icons/fa';
import { AiFillYoutube } from 'react-icons/ai';

interface ProfileProps {
  name: string;
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
          colorScheme: 'brand',
        })
      : setHovered({});
  };

  const getProfileIcon = () => {
    switch (props.name) {
      case 'GitHub':
        return <FaGithub />;
      case 'Discord':
        return <FaDiscord />;
      case 'YouTube':
        return <AiFillYoutube />;
      default:
        return;
    }
  };

  const badgeStyle = {
    transition: 'padding-right 0.6s',
    'animation-timing-function': show ? 'ease-in' : 'ease-out',
    'border-radius': '60px',
  };

  const textStyle = {
    'font-size': show ? 'smaller' : '0px',
    'padding-left': show ? '3px' : '0px',
    transition: 'font-size 0.6s 0.1s, padding-left 0.6s',
    'animation-timing-function': show ? 'ease-in' : 'ease-out',
  };

  return (
    <Badge
      display="inline-flex"
      alignItems="center"
      px={4}
      py={4}
      fontSize="2rem"
      maxW="560px"
      maxH="100px"
      h="65px"
      style={badgeStyle}
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
          {getProfileIcon()}
          <Text px="1px" style={textStyle}>
            {props.name}
          </Text>
        </Text>
      </Link>
    </Badge>
  );
}