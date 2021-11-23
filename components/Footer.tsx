import { Box, Divider, Text, useColorModeValue } from '@chakra-ui/react';

import Emoji from './Emoji';
import NowPlaying from './NowPlaying';

export default function Footer() {
  const textColor = useColorModeValue('current', '#999999');

  return (
    <>
      <Box mt={16}>
        <Divider my={6} />
        <NowPlaying />
        <Box mt={6} />
        <Text align="center" color={textColor}>
          Made with <Emoji symbol="❤️" label="heart" />
        </Text>
      </Box>
    </>
  );
}
