import React from "react";
import { Box, Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useLearning } from "context/LearningContext";

export default function Courses() {
  const history = useHistory();
  const { courses } = useLearning();

  return (
    <Box>
      <Text fontSize='2xl' fontWeight='bold' mb='6'>
        Corsi disponibili
      </Text>
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", xl: "repeat(3, 1fr)" }} gap='6'>
        {courses.map((course) => (
          <GridItem key={course.id} bg='rgba(26, 31, 55, 0.6)' borderRadius='16px' p='6' backdropFilter='blur(10px)'>
            <Flex direction='column' h='100%'>
              <Text fontSize='xl' fontWeight='bold' mb='2'>
                {course.title}
              </Text>
              <Text color='gray.300' mb='4'>
                {course.description}
              </Text>
              <Flex mt='auto'>
                <Button colorScheme='brand' onClick={() => history.push(`/admin/learn/${course.id}`)}>
                  Entra
                </Button>
              </Flex>
            </Flex>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
