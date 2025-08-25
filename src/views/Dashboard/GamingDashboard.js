import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  SimpleGrid,
  Progress,
  VStack,
  HStack,
  Badge,
  Button,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Avatar,
  AvatarBadge,
  Divider,
  Spacer,
  useColorModeValue,
  CircularProgress,
  CircularProgressLabel,
  Tooltip,
} from '@chakra-ui/react';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import IconBox from 'components/Icons/IconBox';
import { gamingTheme } from '../../theme/gaming-design-system';

// Icons
import { FaTrophy, FaFire, FaGem, FaKey, FaCoins, FaStar, FaRocket, FaShieldAlt, FaBolt } from 'react-icons/fa';
import { GiTwoCoins, GiDiamondHard, GiKey, GiLaurelsTrophy } from 'react-icons/gi';
import { MdTimeline, MdLocalFireDepartment } from 'react-icons/md';
import { IoMdTrophy } from 'react-icons/io';
import { BsLightningFill, BsFillShieldFill } from 'react-icons/bs';

export default function GamingDashboard() {
  // Fake data per ora
  const [userData] = useState({
    username: "DevWarrior",
    level: 42,
    xp: 3250,
    xpToNext: 5000,
    gold: 1850,
    gems: 125,
    keys: 3,
    streak: 7,
    rank: "Gold III",
    totalLessons: 127,
    completedToday: 3,
    avatar: "/avatar-placeholder.png"
  });

  const [dailyMissions] = useState([
    { id: 1, title: "Complete 2 Python Katas", reward: "150 Gold", completed: true, xp: 50 },
    { id: 2, title: "Review 3 Code Snippets", reward: "1 Key", completed: false, xp: 75 },
    { id: 3, title: "Solve 1 Bug Challenge", reward: "50 Gems", completed: false, xp: 100 },
  ]);

  const [weeklyMissions] = useState([
    { id: 1, title: "Complete React Path", progress: 3, total: 5, reward: "Epic Crate", xp: 500 },
    { id: 2, title: "7-Day Streak", progress: 7, total: 7, reward: "Streak Freeze", xp: 200 },
    { id: 3, title: "Join a Hackathon", progress: 0, total: 1, reward: "300 Gems", xp: 300 },
  ]);

  const [leaderboard] = useState([
    { rank: 1, name: "CodeNinja", xp: 4580, badge: "🔥" },
    { rank: 2, name: "ByteMaster", xp: 4320, badge: "⚡" },
    { rank: 3, name: "AlgoKing", xp: 4100, badge: "👑" },
    { rank: 4, name: "You", xp: 3250, badge: "🎯", isUser: true },
    { rank: 5, name: "DevGuru", xp: 3180, badge: "💎" },
  ]);

  const xpPercentage = (userData.xp / userData.xpToNext) * 100;

  return (
    <Flex flexDirection='column' pt={{ base: '140px', md: '120px' }}>
      {/* Header Stats Section */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing='24px' mb={6}>
        {/* Level & XP Card with 3D effect */}
        <Card 
          bg={`linear-gradient(135deg, ${gamingTheme.colors.bg.card}, ${gamingTheme.colors.bg.secondary})`}
          border={`2px solid ${gamingTheme.colors.border.default}`}
          boxShadow={`0 10px 30px ${gamingTheme.colors.bg.primary}80, inset 0 1px 0 ${gamingTheme.colors.accent.primary}10`}
          transition="all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
          _hover={{
            transform: "translateY(-5px)",
            boxShadow: `0 15px 40px ${gamingTheme.colors.accent.primary}30, inset 0 1px 0 ${gamingTheme.colors.accent.primary}20`,
            borderColor: gamingTheme.colors.accent.primary,
          }}
        >
          <CardBody>
            <VStack spacing={3} align="stretch">
              <HStack justify="space-between">
                <VStack align="start" spacing={0}>
                  <Text color={gamingTheme.colors.text.muted} fontSize="sm">LEVEL</Text>
                  <Text color={gamingTheme.colors.text.primary} fontSize="3xl" fontWeight="bold">
                    {userData.level}
                  </Text>
                </VStack>
                <Box position="relative">
                  <CircularProgress 
                    value={xpPercentage} 
                    size="60px" 
                    color={gamingTheme.colors.accent.primary}
                    trackColor={gamingTheme.colors.bg.hover}
                    thickness="8px"
                  >
                    <CircularProgressLabel color={gamingTheme.colors.text.primary} fontSize="xs">
                      {Math.round(xpPercentage)}%
                    </CircularProgressLabel>
                  </CircularProgress>
                </Box>
              </HStack>
              <Box>
                <HStack justify="space-between" mb={1}>
                  <Text fontSize="xs" color={gamingTheme.colors.text.muted}>XP Progress</Text>
                  <Text fontSize="xs" color={gamingTheme.colors.text.secondary}>
                    {userData.xp}/{userData.xpToNext}
                  </Text>
                </HStack>
                <Progress 
                  value={xpPercentage} 
                  size="sm" 
                  bg={gamingTheme.colors.bg.hover}
                  sx={{
                    '& > div': {
                      background: `linear-gradient(90deg, ${gamingTheme.colors.accent.primary}, ${gamingTheme.colors.accent.secondary})`,
                    }
                  }}
                  borderRadius="full"
                />
              </Box>
            </VStack>
          </CardBody>
        </Card>

        {/* Currencies Card */}
        <Card bg={gamingTheme.colors.bg.card} border={`1px solid ${gamingTheme.colors.border.default}`}>
          <CardBody>
            <VStack spacing={3} align="stretch">
              <HStack>
                <Icon as={FaCoins} color="#FFD700" boxSize={5} />
                <Text color={gamingTheme.colors.text.secondary} fontSize="sm">Gold</Text>
                <Spacer />
                <Text color={gamingTheme.colors.text.primary} fontSize="xl" fontWeight="bold">
                  {userData.gold.toLocaleString()}
                </Text>
              </HStack>
              <HStack>
                <Icon as={FaGem} color={gamingTheme.colors.accent.secondary} boxSize={5} />
                <Text color={gamingTheme.colors.text.secondary} fontSize="sm">Gems</Text>
                <Spacer />
                <Text color={gamingTheme.colors.text.primary} fontSize="xl" fontWeight="bold">
                  {userData.gems}
                </Text>
              </HStack>
              <HStack>
                <Icon as={FaKey} color={gamingTheme.colors.accent.success} boxSize={5} />
                <Text color={gamingTheme.colors.text.secondary} fontSize="sm">Keys</Text>
                <Spacer />
                <Text color={gamingTheme.colors.text.primary} fontSize="xl" fontWeight="bold">
                  {userData.keys}
                </Text>
              </HStack>
            </VStack>
          </CardBody>
        </Card>

        {/* Streak Card */}
        <Card bg={gamingTheme.colors.bg.card} border={`1px solid ${gamingTheme.colors.border.default}`}>
          <CardBody>
            <Flex align="center" justify="space-between" h="100%">
              <VStack align="start" spacing={2}>
                <HStack>
                  <Icon as={FaFire} color="#FF6B35" boxSize={6} />
                  <Text color={gamingTheme.colors.text.muted} fontSize="sm">STREAK</Text>
                </HStack>
                <Text color={gamingTheme.colors.text.primary} fontSize="4xl" fontWeight="bold">
                  {userData.streak}
                </Text>
                <Text color={gamingTheme.colors.accent.success} fontSize="xs">
                  +40% XP Bonus Active!
                </Text>
              </VStack>
              <Box>
                <HStack spacing={1}>
                  {[...Array(7)].map((_, i) => (
                    <Box
                      key={i}
                      w={2}
                      h={8}
                      bg={i < userData.streak ? gamingTheme.colors.accent.primary : gamingTheme.colors.bg.hover}
                      borderRadius="sm"
                    />
                  ))}
                </HStack>
              </Box>
            </Flex>
          </CardBody>
        </Card>

        {/* Rank Card */}
        <Card bg={gamingTheme.colors.bg.card} border={`1px solid ${gamingTheme.colors.border.default}`}>
          <CardBody>
            <Flex align="center" justify="space-between" h="100%">
              <VStack align="start" spacing={2}>
                <Text color={gamingTheme.colors.text.muted} fontSize="sm">RANK</Text>
                <HStack>
                  <Icon as={FaTrophy} color="#FFD700" boxSize={8} />
                  <Text color={gamingTheme.colors.text.primary} fontSize="2xl" fontWeight="bold">
                    {userData.rank}
                  </Text>
                </HStack>
                <Text color={gamingTheme.colors.text.secondary} fontSize="xs">
                  Top 15% of learners
                </Text>
              </VStack>
            </Flex>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Main Content Grid */}
      <SimpleGrid columns={{ base: 1, lg: 2, xl: 3 }} spacing={6}>
        {/* Daily Missions */}
        <Card bg={gamingTheme.colors.bg.card} border={`1px solid ${gamingTheme.colors.border.default}`}>
          <CardHeader>
            <HStack>
              <Icon as={FaRocket} color={gamingTheme.colors.accent.primary} boxSize={5} />
              <Text color={gamingTheme.colors.text.primary} fontSize="lg" fontWeight="bold">
                Daily Missions
              </Text>
              <Spacer />
              <Badge 
                colorScheme="green" 
                bg={gamingTheme.colors.accent.success + "20"}
                color={gamingTheme.colors.accent.success}
              >
                {dailyMissions.filter(m => m.completed).length}/3
              </Badge>
            </HStack>
          </CardHeader>
          <CardBody pt={0}>
            <VStack spacing={3} align="stretch">
              {dailyMissions.map(mission => (
                <Box
                  key={mission.id}
                  p={3}
                  bg={mission.completed ? gamingTheme.colors.bg.hover : gamingTheme.colors.bg.secondary}
                  borderRadius="md"
                  border={`1px solid ${mission.completed ? gamingTheme.colors.accent.success : gamingTheme.colors.border.default}`}
                  opacity={mission.completed ? 0.7 : 1}
                >
                  <HStack justify="space-between">
                    <VStack align="start" spacing={1}>
                      <Text 
                        color={gamingTheme.colors.text.primary} 
                        fontSize="sm"
                        textDecoration={mission.completed ? "line-through" : "none"}
                      >
                        {mission.title}
                      </Text>
                      <HStack spacing={2}>
                        <Badge bg={gamingTheme.colors.bg.tertiary} color={gamingTheme.colors.text.secondary}>
                          {mission.reward}
                        </Badge>
                        <Badge bg={gamingTheme.colors.accent.primary + "20"} color={gamingTheme.colors.accent.primary}>
                          +{mission.xp} XP
                        </Badge>
                      </HStack>
                    </VStack>
                    {mission.completed ? (
                      <Icon as={FaStar} color={gamingTheme.colors.accent.success} boxSize={5} />
                    ) : (
                      <Button 
                        size="sm" 
                        variant="ghost"
                        color={gamingTheme.colors.accent.primary}
                        _hover={{ bg: gamingTheme.colors.bg.hover }}
                      >
                        Start
                      </Button>
                    )}
                  </HStack>
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>

        {/* Weekly Challenges */}
        <Card bg={gamingTheme.colors.bg.card} border={`1px solid ${gamingTheme.colors.border.default}`}>
          <CardHeader>
            <HStack>
              <Icon as={BsLightningFill} color={gamingTheme.colors.accent.secondary} boxSize={5} />
              <Text color={gamingTheme.colors.text.primary} fontSize="lg" fontWeight="bold">
                Weekly Challenges
              </Text>
            </HStack>
          </CardHeader>
          <CardBody pt={0}>
            <VStack spacing={4} align="stretch">
              {weeklyMissions.map(mission => (
                <Box key={mission.id}>
                  <HStack justify="space-between" mb={2}>
                    <Text color={gamingTheme.colors.text.primary} fontSize="sm">
                      {mission.title}
                    </Text>
                    <Text color={gamingTheme.colors.text.secondary} fontSize="xs">
                      {mission.progress}/{mission.total}
                    </Text>
                  </HStack>
                  <Progress 
                    value={(mission.progress / mission.total) * 100} 
                    size="sm" 
                    bg={gamingTheme.colors.bg.hover}
                    sx={{
                      '& > div': {
                        background: mission.progress === mission.total 
                          ? gamingTheme.colors.accent.success
                          : `linear-gradient(90deg, ${gamingTheme.colors.accent.secondary}, ${gamingTheme.colors.accent.primary})`,
                      }
                    }}
                    borderRadius="full"
                    mb={2}
                  />
                  <HStack spacing={2}>
                    <Badge bg={gamingTheme.colors.bg.tertiary} color={gamingTheme.colors.text.secondary}>
                      {mission.reward}
                    </Badge>
                    <Badge bg={gamingTheme.colors.accent.primary + "20"} color={gamingTheme.colors.accent.primary}>
                      +{mission.xp} XP
                    </Badge>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>

        {/* Leaderboard */}
        <Card bg={gamingTheme.colors.bg.card} border={`1px solid ${gamingTheme.colors.border.default}`}>
          <CardHeader>
            <HStack>
              <Icon as={IoMdTrophy} color="#FFD700" boxSize={5} />
              <Text color={gamingTheme.colors.text.primary} fontSize="lg" fontWeight="bold">
                Gold League
              </Text>
              <Spacer />
              <Text color={gamingTheme.colors.text.muted} fontSize="xs">
                Top 50
              </Text>
            </HStack>
          </CardHeader>
          <CardBody pt={0}>
            <VStack spacing={2} align="stretch">
              {leaderboard.map(player => (
                <HStack
                  key={player.rank}
                  p={2}
                  bg={player.isUser ? gamingTheme.colors.accent.primary + "20" : gamingTheme.colors.bg.secondary}
                  borderRadius="md"
                  border={player.isUser ? `1px solid ${gamingTheme.colors.accent.primary}` : "none"}
                >
                  <Text 
                    color={player.rank <= 3 ? gamingTheme.colors.accent.primary : gamingTheme.colors.text.muted}
                    fontWeight="bold"
                    w={8}
                  >
                    #{player.rank}
                  </Text>
                  <Text fontSize="lg">{player.badge}</Text>
                  <Text color={gamingTheme.colors.text.primary} fontWeight={player.isUser ? "bold" : "normal"}>
                    {player.name}
                  </Text>
                  <Spacer />
                  <Text color={gamingTheme.colors.text.secondary} fontSize="sm">
                    {player.xp.toLocaleString()} XP
                  </Text>
                </HStack>
              ))}
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Quick Actions Bar */}
      <Flex mt={6} gap={4} flexWrap="wrap">
        <Button
          leftIcon={<Icon as={FaRocket} />}
          bg={gamingTheme.colors.accent.primary}
          color="white"
          _hover={{ bg: gamingTheme.colors.accent.danger }}
          size="lg"
        >
          Continue Learning
        </Button>
        <Button
          leftIcon={<Icon as={GiKey} />}
          variant="outline"
          borderColor={gamingTheme.colors.border.default}
          color={gamingTheme.colors.text.primary}
          _hover={{ bg: gamingTheme.colors.bg.hover }}
          size="lg"
        >
          Open Crate (3 Keys)
        </Button>
        <Button
          leftIcon={<Icon as={BsFillShieldFill} />}
          variant="outline"
          borderColor={gamingTheme.colors.border.default}
          color={gamingTheme.colors.text.primary}
          _hover={{ bg: gamingTheme.colors.bg.hover }}
          size="lg"
        >
          Join Hackathon
        </Button>
      </Flex>
    </Flex>
  );
}