import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

export default function About() {
  return (
    <>
      <NextSeo
        title="About Me"
        description="Let me introduce myself. Anthony Collier."
        openGraph={{
          title: 'About Me',
          description: 'Let me introduce myself. Anthony Collier.',
          url: 'https://acollier.dev/blog',
        }}
      />
      <Box>
        <Heading as="h1" mb={4}>
          About Me
        </Heading>
        <VStack spacing="2" alignItems="flex-start">
          <Text as="p">
            Hello! My name is Anthony. If you're reading this, then you're
            probably wondering who I am. I would be asking the same question if
            I were you. Let's get it on with it shall we?
          </Text>
          <Text as="p">
            I was born and raised here in Cleveland, Ohio. It's all I've really
            known for many years, but I've slowly started travelling more over
            the years. I shall continue to do so going forward!
          </Text>
        </VStack>
      </Box>
    </>
  );
}
