import { Box, Text, Heading, HStack } from '@chakra-ui/react';

import Profile from '../components/Profile';
import { SocialLinks } from '../lib/types';

export default function Home() {
  return (
    <>
      <Box>
        <Heading mb={4} w={[300, 400, 560]}>
          Hello, the name's Anthony
        </Heading>
        <Text fontSize="xl">
          This is my own personal website and corner on the internet. Feel free
          to look around and get an idea of who I am! If you have any feedback,
          drop it over on the GitHub!
        </Text>
      </Box>
      <HStack mt={6} spacing="17px" justify="left">
        <Profile
          name="GitHub"
          link={SocialLinks.GITHUB}
          colorScheme="github"
          external
        />
        <Profile
          name="Discord"
          link={SocialLinks.DISCORD}
          colorScheme="discord"
          external
        />
        <Profile
          name="YouTube"
          link={SocialLinks.YOUTUBE}
          colorScheme="youtube"
          external
        />
      </HStack>
    </>
  );
}
