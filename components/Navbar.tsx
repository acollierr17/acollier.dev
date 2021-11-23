import {
  Box,
  Flex,
  HStack,
  Link as ChakraLink,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FaBars, FaTimesCircle } from 'react-icons/fa';
import { ColorModeSwitcher } from './ColorModeSwitcher';

interface NavLink {
  name: string;
  url: string;
}

const Links: Array<NavLink> = [
  { name: 'Home', url: '/' },
  { name: 'Blog', url: '/blog' },
  { name: 'Projects', url: '#' },
  { name: 'About', url: '/about' },
];

const NavLink = ({ name, url }: NavLink) => (
  <Link href={url} passHref>
    <ChakraLink
      px={3}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue(
          'rgba(237, 242, 247, .7)',
          'rgba(255, 255, 255, 0.08)',
        ),
      }}
      color={useColorModeValue('current', '#999999')}>
      {name}
    </ChakraLink>
  </Link>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box mb={6}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <FaTimesCircle /> : <FaBars />}
            aria-label={'Open Menu'}
            display={{ md: 'none', base: 'flex' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack alignItems={'center'}>
            <HStack
              as={'nav'}
              ml="-0.75rem"
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link: NavLink, index: number) => (
                <NavLink key={index} name={link.name} url={link.url} />
              ))}
            </HStack>
          </HStack>
          <ColorModeSwitcher />
        </Flex>

        {isOpen && (
          <Box display={{ md: 'none' }} ml={'-2'}>
            <Stack as={'nav'} spacing={0.75}>
              {Links.map((link: NavLink, index: number) => (
                <NavLink key={index} name={link.name} url={link.url} />
              ))}
            </Stack>
          </Box>
        )}
      </Box>
    </>
  );
}
