import React from "react";
import { Box, Button, Flex, Icon, Tag, Text } from "@chakra-ui/react";
import { LockIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { FaCoins } from "react-icons/fa";

export default function LessonCard({ lesson, unlocked, completed, onUnlock, onStart }) {
  return (
    <Box w={{ base: "100%", md: "calc(50% - 8px)", xl: "calc(33.33% - 10px)" }}
         bg='rgba(26, 31, 55, 0.6)'
         borderRadius='16px'
         p='5'
         backdropFilter='blur(10px)'>
      <Flex align='center' mb='2' gap='2'>
        {completed ? (
          <Icon as={CheckCircleIcon} color='green.300' />
        ) : unlocked ? (
          <Icon as={LockIcon} color='yellow.300' opacity={0.3} />
        ) : (
          <Icon as={LockIcon} color='yellow.300' />
        )}
        <Text fontWeight='bold'>
          {lesson.title}
        </Text>
        <Tag ml='auto' colorScheme='yellow' variant='subtle' display={unlocked ? 'none' : 'inline-flex'}>
          <Icon as={FaCoins} mr='1' /> {lesson.cost}
        </Tag>
      </Flex>
      <Text fontSize='sm' color='gray.300' mb='4'>
        {lesson.challenge.title}
      </Text>
      <Flex gap='3'>
        {!unlocked ? (
          <Button size='sm' colorScheme='yellow' onClick={onUnlock} leftIcon={<Icon as={FaCoins} />}>Sblocca</Button>
        ) : (
          <Button size='sm' colorScheme='brand' onClick={onStart}>Sfida</Button>
        )}
        {completed && <Tag size='sm' colorScheme='green'>Completata</Tag>}
      </Flex>
    </Box>
  );
}
