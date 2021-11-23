import { useState } from 'react';
import { Badge, BadgeProps, Text, useColorMode } from '@chakra-ui/react';
import Link from 'next/link';
import ProfileIcon from './ProfileIcon';

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

  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

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
    animationTimingFunction: show ? 'ease-in' : 'ease-out',
    borderRadius: '60px',
  };

  const textStyle = {
    fontSize: show ? 'smaller' : '0px',
    letterSpacing: show ? 'inherit' : '-10px',
    paddingLeft: show ? '0.8rem' : 'inherit',
    paddingBottom: show ? '3px' : 'inherit',
    transition:
      'font-size 0.6s 0.1s, padding-left 0.6s, padding-bottom 0.6s, letter-spacing 0.6s 0.3s',
    animationTimingFunction: show ? 'ease-in' : 'ease-out',
  };

  return (
    <Badge
      display="inline-flex"
      alignItems="center"
      p={4}
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
        href={
          props?.external ?? false
            ? { pathname: props?.link ?? '#' }
            : props?.link ?? '#'
        }>
        <Text display="flex" alignItems="center">
          <ProfileIcon name={props.name} />
          <Text color={isDarkMode ? 'gray.800' : 'white'} style={textStyle}>
            {props.name}
          </Text>
        </Text>
      </Link>
    </Badge>
  );
}
