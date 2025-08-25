/*eslint-disable*/
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Text,
  VStack,
  HStack,
  Icon,
  IconButton,
  useDisclosure,
  keyframes,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import { gamingTheme } from "../../theme/gaming-design-system";
import { FaGamepad, FaTrophy, FaCog, FaSignOutAlt } from "react-icons/fa";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

// Glowing animation
const glowAnimation = keyframes`
  0%, 100% { 
    box-shadow: 0 0 5px rgba(255, 70, 85, 0.5);
    border-color: rgba(255, 70, 85, 0.5);
  }
  50% { 
    box-shadow: 0 0 20px rgba(255, 70, 85, 0.8);
    border-color: rgba(255, 70, 85, 0.8);
  }
`;

// Sidebar Item Component
const SidebarItem = ({ item, isActive, layout }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <NavLink to={layout + item.path}>
      <MotionBox
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        position="relative"
        mb="2"
      >
        <Flex
          align="center"
          p="3"
          borderRadius={gamingTheme.borders.radius.gaming}
          bg={isActive ? gamingTheme.colors.bg.hover : "transparent"}
          border="2px solid"
          borderColor={isActive ? gamingTheme.colors.accent.primary : "transparent"}
          position="relative"
          overflow="hidden"
          transition={`all ${gamingTheme.animations.duration.normal} ${gamingTheme.animations.easing.gaming}`}
          _hover={{
            bg: gamingTheme.colors.bg.hover,
            borderColor: gamingTheme.colors.border.hover,
          }}
          animation={isActive ? `${glowAnimation} 2s infinite` : "none"}
        >
          {/* Background gradient on hover */}
          <Box
            position="absolute"
            top="0"
            left="-100%"
            right="0"
            bottom="0"
            bg={gamingTheme.colors.gradients.shine}
            transform={isHovered ? "translateX(200%)" : "translateX(0)"}
            transition={`transform ${gamingTheme.animations.duration.slow} ${gamingTheme.animations.easing.gaming}`}
          />

          {/* Active indicator */}
          {isActive && (
            <Box
              position="absolute"
              left="0"
              top="50%"
              transform="translateY(-50%)"
              w="3px"
              h="70%"
              bg={gamingTheme.colors.accent.primary}
              boxShadow={gamingTheme.colors.effects.neon.red}
            />
          )}

          {/* Icon */}
          <Flex
            align="center"
            justify="center"
            w="40px"
            h="40px"
            borderRadius={gamingTheme.borders.radius.gaming}
            bg={isActive ? gamingTheme.colors.accent.primary : gamingTheme.colors.bg.card}
            mr="3"
            position="relative"
            zIndex="1"
          >
            {item.icon}
          </Flex>

          {/* Text */}
          <VStack align="start" spacing="0" flex="1" position="relative" zIndex="1">
            <Text
              fontSize={gamingTheme.typography.sizes.md}
              fontFamily={gamingTheme.typography.fonts.heading}
              fontWeight={gamingTheme.typography.weights.bold}
              color={isActive ? gamingTheme.colors.text.primary : gamingTheme.colors.text.secondary}
              letterSpacing={gamingTheme.typography.letterSpacing.wide}
              textTransform="uppercase"
            >
              {item.name}
            </Text>
            {item.subtitle && (
              <Text
                fontSize={gamingTheme.typography.sizes.xs}
                color={gamingTheme.colors.text.muted}
              >
                {item.subtitle}
              </Text>
            )}
          </VStack>

          {/* Notification badge */}
          {item.badge && (
            <Flex
              align="center"
              justify="center"
              minW="24px"
              h="24px"
              borderRadius="full"
              bg={gamingTheme.colors.accent.primary}
              position="relative"
              zIndex="1"
            >
              <Text
                fontSize={gamingTheme.typography.sizes.xs}
                fontWeight={gamingTheme.typography.weights.bold}
                color={gamingTheme.colors.text.primary}
              >
                {item.badge}
              </Text>
            </Flex>
          )}
        </Flex>
      </MotionBox>
    </NavLink>
  );
};

// Gaming Sidebar Component
export default function GamingSidebar(props) {
  const { routes, display } = props;
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [credits, setCredits] = useState(1500);

  // Check if route is active
  const isRouteActive = (routePath) => {
    return location.pathname === routePath;
  };

  // Create sidebar links
  const createLinks = (routes) => {
    return routes.map((route, index) => {
      if (route.redirect || route.invisible) return null;
      
      if (route.category) {
        return (
          <Box key={index} mb="6">
            <Text
              fontSize={gamingTheme.typography.sizes.xs}
              fontFamily={gamingTheme.typography.fonts.heading}
              fontWeight={gamingTheme.typography.weights.bold}
              color={gamingTheme.colors.text.muted}
              letterSpacing={gamingTheme.typography.letterSpacing.gaming}
              textTransform="uppercase"
              mb="3"
              px="3"
            >
              {route.name}
            </Text>
            {createLinks(route.views)}
          </Box>
        );
      }

      return (
        <SidebarItem
          key={index}
          item={route}
          isActive={isRouteActive(route.layout + route.path)}
          layout={route.layout}
        />
      );
    });
  };

  return (
    <>
      <Box
        bg={gamingTheme.colors.bg.secondary}
        backdropFilter="blur(20px)"
        transition={gamingTheme.animations.duration.normal}
        w="280px"
        h="100vh"
        m="0px"
        minH="100%"
        overflowX="hidden"
        boxShadow={gamingTheme.shadows.xl}
        borderRight="1px solid"
        borderColor={gamingTheme.colors.border.default}
        position="fixed"
        left="0"
        top="0"
        display={display}
        zIndex="1200"
      >
        <Box>
          {/* Logo Section */}
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            p="6"
            borderBottom="1px solid"
            borderColor={gamingTheme.colors.border.default}
          >
            <Flex align="center" justify="space-between">
              <HStack spacing="3">
                <Icon as={FaGamepad} color={gamingTheme.colors.accent.primary} boxSize="30px" />
                <VStack align="start" spacing="0">
                  <Text
                    fontSize={gamingTheme.typography.sizes["2xl"]}
                    fontFamily={gamingTheme.typography.fonts.heading}
                    fontWeight={gamingTheme.typography.weights.black}
                    color={gamingTheme.colors.text.primary}
                    letterSpacing={gamingTheme.typography.letterSpacing.gaming}
                    textTransform="uppercase"
                  >
                    Level Up
                  </Text>
                  <Text
                    fontSize={gamingTheme.typography.sizes.xs}
                    color={gamingTheme.colors.accent.cyan}
                    fontFamily={gamingTheme.typography.fonts.mono}
                  >
                    GAMING PLATFORM
                  </Text>
                </VStack>
              </HStack>
            </Flex>
          </MotionBox>

          {/* User Stats */}
          <MotionBox
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            p="4"
            m="4"
            bg={gamingTheme.colors.bg.card}
            borderRadius={gamingTheme.borders.radius.lg}
            border="1px solid"
            borderColor={gamingTheme.colors.border.default}
          >
            <VStack spacing="3">
              <Flex justify="space-between" w="full">
                <Text
                  fontSize={gamingTheme.typography.sizes.sm}
                  color={gamingTheme.colors.text.muted}
                >
                  CREDITS
                </Text>
                <HStack>
                  <Box
                    w="8px"
                    h="8px"
                    borderRadius="full"
                    bg={gamingTheme.colors.accent.success}
                    animation={`${glowAnimation} 2s infinite`}
                  />
                  <Text
                    fontSize={gamingTheme.typography.sizes.lg}
                    fontWeight={gamingTheme.typography.weights.bold}
                    color={gamingTheme.colors.accent.gold}
                  >
                    {credits.toLocaleString()}
                  </Text>
                </HStack>
              </Flex>
              <Flex justify="space-between" w="full">
                <Text
                  fontSize={gamingTheme.typography.sizes.sm}
                  color={gamingTheme.colors.text.muted}
                >
                  RANK
                </Text>
                <Text
                  fontSize={gamingTheme.typography.sizes.sm}
                  fontWeight={gamingTheme.typography.weights.bold}
                  color={gamingTheme.colors.accent.purple}
                >
                  ELITE
                </Text>
              </Flex>
            </VStack>
          </MotionBox>

          {/* Navigation Links */}
          <VStack spacing="1" align="stretch" p="4">
            {createLinks(routes)}
          </VStack>

          {/* Bottom Actions */}
          <Box
            position="absolute"
            bottom="0"
            left="0"
            right="0"
            p="4"
            borderTop="1px solid"
            borderColor={gamingTheme.colors.border.default}
            bg={gamingTheme.colors.bg.secondary}
          >
            <VStack spacing="2">
              <Button
                w="full"
                variant="ghost"
                leftIcon={<FaCog />}
                justifyContent="flex-start"
                color={gamingTheme.colors.text.secondary}
                fontFamily={gamingTheme.typography.fonts.heading}
                letterSpacing={gamingTheme.typography.letterSpacing.wide}
                textTransform="uppercase"
                _hover={{
                  bg: gamingTheme.colors.bg.hover,
                  color: gamingTheme.colors.text.primary,
                }}
              >
                Settings
              </Button>
              <Button
                w="full"
                variant="ghost"
                leftIcon={<FaSignOutAlt />}
                justifyContent="flex-start"
                color={gamingTheme.colors.accent.danger}
                fontFamily={gamingTheme.typography.fonts.heading}
                letterSpacing={gamingTheme.typography.letterSpacing.wide}
                textTransform="uppercase"
                _hover={{
                  bg: gamingTheme.colors.bg.hover,
                  color: gamingTheme.colors.accent.danger,
                }}
              >
                Logout
              </Button>
            </VStack>
          </Box>
        </Box>
      </Box>

      {/* Mobile Hamburger Icon */}
      <IconButton
        aria-label="Open menu"
        icon={<HamburgerIcon />}
        onClick={onOpen}
        display={{ base: "flex", xl: "none" }}
        position="fixed"
        top="20px"
        left="20px"
        zIndex="9999"
        bg={gamingTheme.colors.bg.card}
        color={gamingTheme.colors.text.primary}
        _hover={{
          bg: gamingTheme.colors.bg.hover,
        }}
      />

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={gamingTheme.colors.bg.secondary}>
          <DrawerCloseButton color={gamingTheme.colors.text.primary} />
          <DrawerBody>
            {/* Mobile sidebar content */}
            <VStack spacing="4" mt="50px">
              {createLinks(routes)}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}