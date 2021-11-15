import useSWR from 'swr';
import { useEffect } from 'react';
import { animate } from 'motion';
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

function AnimatedBars() {
  const barColor = useColorModeValue('gray.300', 'gray.500');

  useEffect(() => {
    animate(
      '#bar1',
      {
        transform: [
          'scaleY(1.0) translateY(0rem)',
          'scaleY(1.5) translateY(0.082rem)',
          'scaleY(1.0) translateY(0rem)',
        ],
      },
      {
        duration: 1.0,
        repeat: Infinity,
        easing: ['ease-in-out'],
      },
    );
    animate(
      '#bar2',
      {
        transform: [
          'scaleY(1.0) translateY(0rem)',
          'scaleY(3) translateY(-0.083rem)',
          'scaleY(1.0) translateY(0rem)',
        ],
      },
      {
        delay: 0.2,
        duration: 1.5,
        repeat: Infinity,
        easing: ['ease-in-out'],
      },
    );
    animate(
      '#bar3',
      {
        transform: [
          'scaleY(1.0)  translateY(0rem)',
          'scaleY(0.5) translateY(0.37rem)',
          'scaleY(1.0)  translateY(0rem)',
        ],
      },
      {
        delay: 0.3,
        duration: 1.5,
        repeat: Infinity,
        easing: ['ease-in-out'],
      },
    );
  }, []);

  return (
    <Flex w="auto" alignItems="end" overflow="hidden">
      <Box
        as="span"
        id="bar1"
        w={1}
        mr="3px"
        h={2}
        bg={barColor}
        opacity={0.75}
      />
      <Box as="span" id="bar2" w={1} mr="3px" h={1} bg={barColor} />
      <Box as="span" id="bar3" w={1} h={3} bg={barColor} opacity={0.8} />
    </Flex>
  );
}

export default function NowPlaying() {
  const { data } = useSWR<NowPlayingSong>('/api/spotify/now-playing', fetcher);

  return (
    <>
      <HStack
        display="flex"
        flexDirection={{ base: 'row-reverse', sm: 'row' }}
        alignItems="center"
        spacing={{ base: 0, sm: 2 }}
        w="100%">
        {data?.songUrl ? <AnimatedBars /> : <SpotifyIcon />}
        <Box
          display="inline-flex"
          direction={{ base: 'column', sm: 'row' }}
          w="100%"
          maxW="100%"
          isTruncated>
          {data?.songUrl ? (
            <Link
              color={useColorModeValue('gray.800', 'gray.200')}
              size="md"
              maxW="max-content"
              href={data.songUrl}
              target="_blank"
              rel="noopener noreferrer">
              {data.title}
            </Link>
          ) : (
            <Text
              as="p"
              color={useColorModeValue('gray.800', 'gray.200')}
              fontWeight="medium">
              Not Playing
            </Text>
          )}
          <Text
            as="span"
            mx={2}
            color={useColorModeValue('gray.500', 'gray.300')}
            overflow={{ base: 'hidden', sm: 'block' }}>
            {' – '}
          </Text>
          <Text
            as="p"
            color={useColorModeValue('gray.500', 'gray.300')}
            maxW="max-content"
            isTruncated>
            {data?.artist ?? 'Spotify'}
          </Text>
        </Box>
      </HStack>
    </>
  );
}
