import {
  Alert,
  Box,
  Heading,
  Text,
  VStack,
  List,
  UnorderedList,
  OrderedList,
  ListItem,
  Link,
  Image,
} from '@chakra-ui/react';

import { urlFor } from './';

type HeadingSize = `h${1 | 2 | 3 | 4}`;

const mappedHeadings: Record<HeadingSize, string> = {
  h1: '2xl',
  h2: 'xl',
  h3: 'lg',
  h4: 'md',
};

const BlockRenderer = (props) => {
  const { style = 'normal' } = props.node;

  if (/^h\d/.test(style)) {
    return (
      <Heading as={style} size={mappedHeadings[style]}>
        {props.children}
      </Heading>
    );
  }

  if (style === 'blockquote') {
    return (
      <Alert
        mt="4"
        role="none"
        borderInlineStartColor="inherit"
        background="inherit"
        variant="left-accent"
        as="blockquote"
        rounded="4px"
        my="1.5rem">
        <Text as="p">{props.children}</Text>
      </Alert>
    );
  }

  return <Text lineHeight="1.75em">{props.children}</Text>;
};

const MainImageRenderer = (props) => (
  <Box as="figure">
    <Image src={urlFor(props.node.asset).url()!} alt={props.node.alt} />
    <Text as="figcaption" color="gray.400" textAlign="center" fontSize="sm">
      {props.node.caption}
    </Text>
  </Box>
);

const LinkMarkRenderer = (props) => (
  <Link href={props.mark.href} isExternal>
    {props.children}
  </Link>
);

const ContainerRenderer = (props) => (
  <VStack spacing="6" alignItems="flex-start">
    {props.children}
  </VStack>
);

const ListRenderer = (props) => {
  switch (props.type) {
    case 'bullet':
      return (
        <UnorderedList stylePosition="inside">{props.children}</UnorderedList>
      );
    case 'number':
      return <OrderedList stylePosition="inside">{props.children}</OrderedList>;
    default:
      return <List stylePosition="inside">{props.children}</List>;
  }
};

const serializers = {
  types: {
    block: BlockRenderer,
    mainImage: MainImageRenderer,
  },
  marks: {
    link: LinkMarkRenderer,
  },
  container: ContainerRenderer,
  list: ListRenderer,
  listItem: (props) => <ListItem>{props.children}</ListItem>,
};

export default serializers;
