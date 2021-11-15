import { Box, Text, Heading, HStack } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

import Profile from '../components/Profile';

export default function Home() {
  return (
    <>
      <NextSeo
        description="My corner on the internet. Welcome!"
        openGraph={{
          title: 'Home',
          description: 'My corner on the internet. Welcome!',
          url: 'https://acollier.dev',
        }}
      />
      <Box>
        <Heading mb={4} w={[300, 400, 560]}>
          Hello, the name's Anthony
        </Heading>
        <Text fontSize="xl">
          This is my own personal website and corner on the internet. It's 2021
          and it's about time I created one of these. So welcome!
        </Text>
        <br />
        <Text fontSize="xl">
          If you've seen my site before, you can see notable changes such as a
          blog and a page to give you a bit more information about me. Thanks
          for stopping by!
        </Text>
      </Box>
      <HStack mt={6} spacing="17px" justify="left">
        <Profile
          name="GitHub"
          link="https://github.com/acollierr17"
          colorScheme="github"
          external
        />
        <Profile
          name="Discord"
          link="https://discord.gg/rgK9cGTwEs"
          colorScheme="discord"
          external
        />
        <Profile
          name="YouTube"
          link="https://www.youtube.com/channel/UCI_HY3KnAH_VusYqFvL2U9g"
          colorScheme="youtube"
          external
        />
      </HStack>
    </>
  );
}
