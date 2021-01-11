import React from 'react';
import { Box, Text, Stack, Container, Heading } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { ColorModeSwitcher } from '../components/ColorModeSwitcher';
import Profile from '../components/Profile';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta property="og:title" content="Home" />
      </Helmet>
      <Container
        pos="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)">
        <Box
          p={4}
          fontFamily="'Merriweather Sans', sans-serif"
          fontStyle="normal">
          <Heading
            mb={4}
            w={[300, 400, 560]}
            fontFamily="'Merriweather Sans', sans-serif">
            Hello, the name's Anth{''}
            {<ColorModeSwitcher />}
            {''}ny
          </Heading>
          <Text fontSize="xl" align="justify">
            This is my own personal website and corner on the internet. It's
            2021 and it's about time I created one of these. So welcome!
          </Text>
          <br />
          <Text fontSize="xl" align="justify">
            I know there isn't much here, but, this website will evolve into
            something formidable and greater over time. Thanks for stopping by!
          </Text>
        </Box>
        <Container>
          <Stack direction="row" spacing="17px" justify="center">
            <Profile
              name="GitHub"
              link="https://github.com/acollierr17"
              external
            />
            <Profile
              name="Discord"
              link="https://discord.gg/g7wr8xb"
              external
            />
            <Profile
              name="YouTube"
              link="https://www.youtube.com/channel/UCI_HY3KnAH_VusYqFvL2U9g"
              external
            />
          </Stack>
        </Container>
      </Container>
    </>
  );
}
