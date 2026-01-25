// Credits: https://github.com/leerob/leerob.io/blob/main/components/NowPlaying.tsx
import useSWR from 'swr';
import { keyframes } from '@emotion/react';
import {
  Box,
  Flex,
  Link,
  Text,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';

import fetcher from '@lib/fetcher';
import type { NowPlayingSong } from '@lib/types';
import SpotifyIcon from './SpotifyIcon';

const bar1Animation = keyframes`
  0%, 100% { transform: scaleY(1.0) translateY(0rem); }
  50% { transform: scaleY(1.5) translateY(0.082rem); }
`;

const bar2Animation = keyframes`
  0%, 100% { transform: scaleY(1.0) translateY(0rem); }
  50% { transform: scaleY(3) translateY(-0.083rem); }
`;

const bar3Animation = keyframes`
  0%, 100% { transform: scaleY(1.0) translateY(0rem); }
  50% { transform: scaleY(0.5) translateY(0.37rem); }
`;

function AnimatedBars() {
  const barColor = useColorModeValue('gray.300', 'gray.500');

  return (
    <Flex w="auto" alignItems="end" overflow="hidden">
      <Box
        as="span"
        w={1}
        mr="3px"
        h={2}
        bg={barColor}
        opacity={0.75}
        animation={`${bar1Animation} 1s ease-in-out infinite`}
      />
      <Box
        as="span"
        w={1}
        mr="3px"
        h={1}
        bg={barColor}
        animation={`${bar2Animation} 1.5s ease-in-out 0.2s infinite`}
      />
      <Box
        as="span"
        w={1}
        h={3}
        bg={barColor}
        opacity={0.8}
        animation={`${bar3Animation} 1.5s ease-in-out 0.3s infinite`}
      />
    </Flex>
  );
}

export default function NowPlaying() {
  const { data } = useSWR<NowPlayingSong>('/api/spotify/now-playing', fetcher);
  const linkColor = useColorModeValue('gray.800', 'gray.200');
  const textColor = useColorModeValue('gray.500', 'gray.300');

  return (
    <HStack
      display="flex"
      flexDirection={{ base: 'row-reverse', sm: 'row' }}
      alignItems="center"
      spacing={{ base: 0, sm: 2 }}
      w="100%">
      {data?.songUrl ? <AnimatedBars /> : <SpotifyIcon />}
      <Box
        display="inline-flex"
        w="100%"
        maxW="100%"
        noOfLines={1}>
        {data?.songUrl ? (
          <Link
            color={linkColor}
            maxW="max-content"
            href={data.songUrl}
            target="_blank"
            rel="noopener noreferrer">
            {data.title}
          </Link>
        ) : (
          <Text
            as="p"
            color={linkColor}
            fontWeight="medium">
            Not Playing
          </Text>
        )}
        <Text
          as="span"
          mx={2}
          color={textColor}
          overflow={{ base: 'hidden', sm: 'visible' }}>
          {' – '}
        </Text>
        <Text
          as="p"
          color={textColor}
          maxW="max-content"
          noOfLines={1}>
          {data?.artist ?? 'Spotify'}
        </Text>
      </Box>
    </HStack>
  );
}
