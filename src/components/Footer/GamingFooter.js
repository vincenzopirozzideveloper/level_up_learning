import React from "react";
import { 
  Box, 
  Flex, 
  Text, 
  HStack, 
  VStack,
  Icon,
  Link,
  Progress,
  Badge,
  Divider
} from "@chakra-ui/react";
import { gamingTheme } from "../../theme/gaming-design-system";
import { 
  FaCode, 
  FaHeart, 
  FaRocket, 
  FaGamepad,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaCoffee
} from "react-icons/fa";
import { 
  SiReact, 
  SiJavascript, 
  SiNodedotjs 
} from "react-icons/si";
import { FaCube } from "react-icons/fa";

export default function GamingFooter() {
  const year = new Date().getFullYear();
  
  return (
    <Box
      as="footer"
      position="relative"
      mt={8}
      pt={10}
      pb={6}
      px={{ base: 4, md: 8 }}
      bg={`linear-gradient(180deg, transparent 0%, ${gamingTheme.colors.bg.secondary}80 20%, ${gamingTheme.colors.bg.primary} 100%)`}
      borderTop={`2px solid ${gamingTheme.colors.border.default}`}
      overflow="hidden"
    >
      {/* Animated background particles */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.3}
        pointerEvents="none"
      >
        {[...Array(3)].map((_, i) => (
          <Box
            key={i}
            position="absolute"
            width="300px"
            height="300px"
            borderRadius="50%"
            bg={`radial-gradient(circle, ${
              i === 0 ? gamingTheme.colors.accent.primary : 
              i === 1 ? gamingTheme.colors.accent.secondary : 
              gamingTheme.colors.accent.success
            }10, transparent 70%)`}
            left={`${i * 30}%`}
            top={`${i * 20}px`}
            filter="blur(40px)"
            animation={`float${i} ${15 + i * 5}s ease-in-out infinite`}
            sx={{
              [`@keyframes float${i}`]: {
                '0%, 100%': { 
                  transform: `translate(0, 0) scale(1)`,
                  opacity: 0.3,
                },
                '50%': { 
                  transform: `translate(${i * 50}px, -${i * 30}px) scale(1.1)`,
                  opacity: 0.5,
                },
              },
            }}
          />
        ))}
      </Box>

      {/* Main footer content */}
      <VStack spacing={8} position="relative" zIndex={1}>
        {/* Developer Info Section */}
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          w="100%"
          maxW="1200px"
          mx="auto"
          gap={8}
        >
          {/* Left side - Developer info */}
          <VStack align={{ base: "center", md: "start" }} spacing={3}>
            <HStack spacing={3}>
              <Icon 
                as={FaGamepad} 
                color={gamingTheme.colors.accent.primary} 
                boxSize={8}
                animation="bounce 2s infinite"
                sx={{
                  '@keyframes bounce': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                  },
                }}
              />
              <Text
                fontSize="2xl"
                fontWeight="bold"
                fontFamily={gamingTheme.typography.fonts.heading}
                color={gamingTheme.colors.text.primary}
                letterSpacing={gamingTheme.typography.letterSpacing.wide}
                textTransform="uppercase"
              >
                Level Up Learn
              </Text>
            </HStack>
            
            <Text 
              color={gamingTheme.colors.text.secondary}
              fontSize="sm"
              textAlign={{ base: "center", md: "left" }}
            >
              Gamified Learning Platform • Work in Progress
            </Text>
            
            <HStack spacing={2}>
              <Badge
                bg={`${gamingTheme.colors.accent.primary}20`}
                color={gamingTheme.colors.accent.primary}
                px={2}
                py={1}
                borderRadius="md"
                fontSize="xs"
              >
                v1.0.0-beta
              </Badge>
              <Badge
                bg={`${gamingTheme.colors.accent.success}20`}
                color={gamingTheme.colors.accent.success}
                px={2}
                py={1}
                borderRadius="md"
                fontSize="xs"
              >
                Active Development
              </Badge>
            </HStack>
          </VStack>

          {/* Center - Tech Stack */}
          <VStack spacing={2}>
            <Text
              fontSize="xs"
              color={gamingTheme.colors.text.muted}
              textTransform="uppercase"
              letterSpacing="wider"
            >
              Powered By
            </Text>
            <HStack spacing={4}>
              <Icon
                as={SiReact}
                color="#61DAFB"
                boxSize={6}
                _hover={{ transform: "rotate(180deg)" }}
                transition="transform 0.5s"
                cursor="pointer"
              />
              <Icon
                as={SiJavascript}
                color="#F7DF1E"
                boxSize={6}
                _hover={{ transform: "scale(1.2)" }}
                transition="transform 0.3s"
                cursor="pointer"
              />
              <Icon
                as={SiNodedotjs}
                color="#339933"
                boxSize={6}
                _hover={{ transform: "scale(1.2)" }}
                transition="transform 0.3s"
                cursor="pointer"
              />
              <Icon
                as={FaCube}
                color={gamingTheme.colors.text.primary}
                boxSize={6}
                _hover={{ transform: "scale(1.2)" }}
                transition="transform 0.3s"
                cursor="pointer"
              />
            </HStack>
          </VStack>

          {/* Right side - Social Links */}
          <VStack align={{ base: "center", md: "end" }} spacing={2}>
            <Text
              fontSize="xs"
              color={gamingTheme.colors.text.muted}
              textTransform="uppercase"
              letterSpacing="wider"
            >
              Connect
            </Text>
            <HStack spacing={3}>
              <Link
                href="https://github.com/vincenzopirozzi"
                target="_blank"
                _hover={{ transform: "translateY(-2px)" }}
                transition="transform 0.2s"
              >
                <Icon
                  as={FaGithub}
                  color={gamingTheme.colors.text.secondary}
                  boxSize={5}
                  _hover={{ color: gamingTheme.colors.accent.primary }}
                />
              </Link>
              <Link
                href="https://linkedin.com/in/vincenzopirozzi"
                target="_blank"
                _hover={{ transform: "translateY(-2px)" }}
                transition="transform 0.2s"
              >
                <Icon
                  as={FaLinkedin}
                  color={gamingTheme.colors.text.secondary}
                  boxSize={5}
                  _hover={{ color: "#0077B5" }}
                />
              </Link>
              <Link
                href="mailto:vincenzo@leveluplearn.com"
                _hover={{ transform: "translateY(-2px)" }}
                transition="transform 0.2s"
              >
                <Icon
                  as={FaEnvelope}
                  color={gamingTheme.colors.text.secondary}
                  boxSize={5}
                  _hover={{ color: gamingTheme.colors.accent.secondary }}
                />
              </Link>
            </HStack>
          </VStack>
        </Flex>

        {/* Progress Bar - Development Status */}
        <Box w="100%" maxW="600px" mx="auto">
          <HStack justify="space-between" mb={2}>
            <Text fontSize="xs" color={gamingTheme.colors.text.muted}>
              Development Progress
            </Text>
            <Text fontSize="xs" color={gamingTheme.colors.accent.primary}>
              35%
            </Text>
          </HStack>
          <Progress
            value={35}
            size="sm"
            bg={gamingTheme.colors.bg.hover}
            sx={{
              '& > div': {
                background: `linear-gradient(90deg, ${gamingTheme.colors.accent.primary}, ${gamingTheme.colors.accent.secondary})`,
              }
            }}
            borderRadius="full"
            hasStripe
            isAnimated
          />
        </Box>

        <Divider borderColor={gamingTheme.colors.border.default} opacity={0.3} />

        {/* Copyright Section */}
        <Flex
          direction={{ base: "column", sm: "row" }}
          align="center"
          justify="center"
          gap={2}
          textAlign="center"
        >
          <HStack spacing={2}>
            <Text fontSize="sm" color={gamingTheme.colors.text.muted}>
              © {year}
            </Text>
            <Text 
              fontSize="sm" 
              color={gamingTheme.colors.text.primary}
              fontWeight="bold"
            >
              Vincenzo Pirozzi
            </Text>
            <Text fontSize="sm" color={gamingTheme.colors.text.muted}>
              •
            </Text>
          </HStack>
          
          <HStack spacing={1}>
            <Text fontSize="sm" color={gamingTheme.colors.text.muted}>
              Crafted with
            </Text>
            <Icon
              as={FaHeart}
              color={gamingTheme.colors.accent.primary}
              boxSize={4}
              animation="heartbeat 1.5s infinite"
              sx={{
                '@keyframes heartbeat': {
                  '0%, 100%': { transform: 'scale(1)' },
                  '25%': { transform: 'scale(1.1)' },
                  '50%': { transform: 'scale(1)' },
                  '75%': { transform: 'scale(1.1)' },
                },
              }}
            />
            <Text fontSize="sm" color={gamingTheme.colors.text.muted}>
              and
            </Text>
            <Icon
              as={FaCoffee}
              color="#6F4E37"
              boxSize={4}
              _hover={{ transform: 'rotate(20deg)' }}
              transition="transform 0.3s"
            />
          </HStack>
        </Flex>

        {/* Fun Easter Egg Text */}
        <Text
          fontSize="xs"
          color={gamingTheme.colors.text.muted}
          opacity={0.5}
          textAlign="center"
          fontStyle="italic"
        >
          🚀 Building the future of learning, one commit at a time
        </Text>
      </VStack>
    </Box>
  );
}