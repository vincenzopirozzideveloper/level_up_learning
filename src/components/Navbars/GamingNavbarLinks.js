import React from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Avatar,
  Badge,
  VStack,
  Button,
  Divider,
  Icon,
} from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";
import { FaCoins, FaGem, FaKey, FaTrophy, FaCog, FaSignOutAlt, FaFire } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { gamingTheme } from "../../theme/gaming-design-system";
import { SidebarResponsive } from "components/Sidebar/Sidebar";
import PropTypes from "prop-types";
import routes from "routes.js";

export default function GamingNavbarLinks(props) {
  const { onOpen, ...rest } = props;

  // Fake user data
  const userData = {
    username: "DevWarrior",
    level: 42,
    gold: 1850,
    gems: 125,
    keys: 3,
    streak: 7,
    avatar: "/avatar-placeholder.png"
  };

  const notifications = [
    { id: 1, type: "mission", text: "Daily mission completed!", time: "5 min ago", icon: "🎯" },
    { id: 2, type: "achievement", text: "Achievement unlocked: First Victory", time: "1 hour ago", icon: "🏆" },
    { id: 3, type: "friend", text: "CodeNinja sent you a challenge", time: "2 hours ago", icon: "⚔️" },
  ];

  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems='center'
      flexDirection='row'
      gap={4}
    >
      {/* Currency Display with 3D effect */}
      <HStack 
        display={{ base: "none", lg: "flex" }}
        spacing={4}
        bg={`linear-gradient(135deg, ${gamingTheme.colors.bg.card}DD, ${gamingTheme.colors.bg.secondary}DD)`}
        px={4}
        py={2}
        borderRadius="full"
        border={`1px solid ${gamingTheme.colors.border.default}`}
        boxShadow={`inset 0 2px 4px ${gamingTheme.colors.bg.primary}40, 0 4px 12px ${gamingTheme.colors.accent.primary}20`}
        backdropFilter="blur(10px)"
        transition="all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
        _hover={{
          transform: "translateY(-2px) scale(1.02)",
          boxShadow: `inset 0 2px 6px ${gamingTheme.colors.bg.primary}60, 0 8px 20px ${gamingTheme.colors.accent.primary}30`,
          borderColor: gamingTheme.colors.accent.primary,
        }}
      >
        <HStack spacing={1}>
          <Icon as={FaCoins} color="#FFD700" boxSize={4} />
          <Text color={gamingTheme.colors.text.primary} fontSize="sm" fontWeight="bold">
            {userData.gold.toLocaleString()}
          </Text>
        </HStack>
        <Divider orientation="vertical" h="20px" borderColor={gamingTheme.colors.border.default} />
        <HStack spacing={1}>
          <Icon as={FaGem} color={gamingTheme.colors.accent.secondary} boxSize={4} />
          <Text color={gamingTheme.colors.text.primary} fontSize="sm" fontWeight="bold">
            {userData.gems}
          </Text>
        </HStack>
        <Divider orientation="vertical" h="20px" borderColor={gamingTheme.colors.border.default} />
        <HStack spacing={1}>
          <Icon as={FaKey} color={gamingTheme.colors.accent.success} boxSize={4} />
          <Text color={gamingTheme.colors.text.primary} fontSize="sm" fontWeight="bold">
            {userData.keys}
          </Text>
        </HStack>
      </HStack>

      {/* Streak Display with glow effect */}
      <HStack
        bg={`linear-gradient(135deg, ${gamingTheme.colors.accent.primary}20, ${gamingTheme.colors.bg.card}DD)`}
        px={3}
        py={2}
        borderRadius="full"
        border={`2px solid ${gamingTheme.colors.accent.primary}`}
        display={{ base: "none", md: "flex" }}
        position="relative"
        boxShadow={`0 0 20px ${gamingTheme.colors.accent.primary}40, inset 0 1px 2px ${gamingTheme.colors.accent.primary}30`}
        animation="fireGlow 2s ease-in-out infinite alternate"
        sx={{
          '@keyframes fireGlow': {
            '0%': { 
              boxShadow: `0 0 15px ${gamingTheme.colors.accent.primary}30, inset 0 1px 2px ${gamingTheme.colors.accent.primary}20`,
            },
            '100%': { 
              boxShadow: `0 0 30px ${gamingTheme.colors.accent.primary}50, inset 0 1px 4px ${gamingTheme.colors.accent.primary}40`,
            },
          },
        }}
        _hover={{
          transform: "translateY(-2px) scale(1.05)",
        }}
      >
        <Icon as={FaFire} color="#FF6B35" boxSize={4} />
        <Text color={gamingTheme.colors.text.primary} fontSize="sm" fontWeight="bold">
          {userData.streak}
        </Text>
      </HStack>

      {/* Notifications */}
      <Menu>
        <MenuButton
          as={IconButton}
          icon={
            <Box position="relative">
              <BellIcon color={gamingTheme.colors.text.primary} w='20px' h='20px' />
              <Badge
                position="absolute"
                top="-8px"
                right="-8px"
                bg={gamingTheme.colors.accent.primary}
                color="white"
                borderRadius="full"
                fontSize="xs"
                px={1.5}
              >
                3
              </Badge>
            </Box>
          }
          variant="ghost"
          _hover={{ bg: gamingTheme.colors.bg.hover }}
          aria-label="Notifications"
        />
        <MenuList
          bg={gamingTheme.colors.bg.card}
          border={`1px solid ${gamingTheme.colors.border.default}`}
          borderRadius="xl"
          py={2}
        >
          <Text px={4} py={2} fontSize="sm" color={gamingTheme.colors.text.muted} fontWeight="bold">
            NOTIFICATIONS
          </Text>
          <Divider borderColor={gamingTheme.colors.border.default} />
          {notifications.map(notif => (
            <MenuItem
              key={notif.id}
              bg="transparent"
              _hover={{ bg: gamingTheme.colors.bg.hover }}
              py={3}
            >
              <HStack spacing={3} w="100%">
                <Text fontSize="xl">{notif.icon}</Text>
                <VStack align="start" spacing={0} flex={1}>
                  <Text color={gamingTheme.colors.text.primary} fontSize="sm">
                    {notif.text}
                  </Text>
                  <Text color={gamingTheme.colors.text.muted} fontSize="xs">
                    {notif.time}
                  </Text>
                </VStack>
              </HStack>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      {/* User Profile Menu with 3D avatar */}
      <Menu>
        <MenuButton>
          <HStack
            spacing={3}
            bg={`linear-gradient(135deg, ${gamingTheme.colors.bg.card}EE, ${gamingTheme.colors.bg.secondary}EE)`}
            px={3}
            py={2}
            borderRadius="full"
            border={`2px solid ${gamingTheme.colors.border.default}`}
            cursor="pointer"
            position="relative"
            overflow="hidden"
            transition="all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
            boxShadow={`inset 0 2px 4px ${gamingTheme.colors.bg.primary}40, 0 4px 12px ${gamingTheme.colors.accent.primary}20`}
            _hover={{ 
              borderColor: gamingTheme.colors.accent.primary,
              transform: "translateY(-2px) scale(1.02)",
              boxShadow: `inset 0 2px 6px ${gamingTheme.colors.bg.primary}60, 0 8px 24px ${gamingTheme.colors.accent.primary}40`,
            }}
            _before={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: `linear-gradient(90deg, transparent, ${gamingTheme.colors.accent.primary}10, transparent)`,
              transition: 'left 0.5s',
            }}
            _hover={{
              borderColor: gamingTheme.colors.accent.primary,
              transform: "translateY(-2px) scale(1.02)",
              boxShadow: `inset 0 2px 6px ${gamingTheme.colors.bg.primary}60, 0 8px 24px ${gamingTheme.colors.accent.primary}40`,
              '&::before': {
                left: '100%',
              },
            }}
          >
            <Box position="relative">
              <Avatar
                size="sm"
                name={userData.username}
                bg={gamingTheme.colors.accent.primary}
                border={`2px solid ${gamingTheme.colors.accent.secondary}`}
                boxShadow={`0 0 15px ${gamingTheme.colors.accent.primary}40`}
              />
              <Box
                position="absolute"
                bottom="-2px"
                right="-2px"
                w="10px"
                h="10px"
                bg={gamingTheme.colors.accent.success}
                borderRadius="full"
                border={`2px solid ${gamingTheme.colors.bg.primary}`}
                animation="pulse 2s infinite"
                sx={{
                  '@keyframes pulse': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.2)' },
                  },
                }}
              />
            </Box>
            <VStack align="start" spacing={0} display={{ base: "none", md: "flex" }}>
              <Text color={gamingTheme.colors.text.primary} fontSize="sm" fontWeight="bold">
                {userData.username}
              </Text>
              <HStack spacing={1}>
                <Text color={gamingTheme.colors.text.muted} fontSize="xs">
                  Level {userData.level}
                </Text>
                <Icon as={FaTrophy} color="#FFD700" boxSize={3} />
              </HStack>
            </VStack>
          </HStack>
        </MenuButton>
        <MenuList
          bg={gamingTheme.colors.bg.card}
          border={`1px solid ${gamingTheme.colors.border.default}`}
          borderRadius="xl"
          py={2}
        >
          <Box px={4} py={3}>
            <VStack align="start" spacing={2}>
              <Text color={gamingTheme.colors.text.primary} fontWeight="bold">
                {userData.username}
              </Text>
              <Badge
                bg={gamingTheme.colors.accent.primary + "20"}
                color={gamingTheme.colors.accent.primary}
              >
                Level {userData.level}
              </Badge>
            </VStack>
          </Box>
          <Divider borderColor={gamingTheme.colors.border.default} />
          <MenuItem
            icon={<Icon as={FaTrophy} color={gamingTheme.colors.accent.primary} />}
            bg="transparent"
            _hover={{ bg: gamingTheme.colors.bg.hover }}
            color={gamingTheme.colors.text.primary}
          >
            Achievements
          </MenuItem>
          <MenuItem
            icon={<Icon as={IoMdSettings} color={gamingTheme.colors.text.secondary} />}
            bg="transparent"
            _hover={{ bg: gamingTheme.colors.bg.hover }}
            color={gamingTheme.colors.text.primary}
            onClick={onOpen}
          >
            Settings
          </MenuItem>
          <Divider borderColor={gamingTheme.colors.border.default} />
          <MenuItem
            icon={<Icon as={FaSignOutAlt} color={gamingTheme.colors.accent.danger} />}
            bg="transparent"
            _hover={{ bg: gamingTheme.colors.bg.hover }}
            color={gamingTheme.colors.accent.danger}
          >
            Sign Out
          </MenuItem>
        </MenuList>
      </Menu>

      {/* Mobile Sidebar Toggle */}
      <SidebarResponsive
        iconColor={gamingTheme.colors.text.primary}
        logoText={props.logoText}
        secondary={props.secondary}
        routes={routes}
        {...rest}
      />
    </Flex>
  );
}

GamingNavbarLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
  logoText: PropTypes.string,
};