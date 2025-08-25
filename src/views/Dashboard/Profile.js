import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Avatar,
  Badge,
  Button,
  SimpleGrid,
  Icon,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Divider,
  IconButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import { gamingTheme } from '../../theme/gaming-design-system';
import { 
  FaUser, 
  FaTrophy, 
  FaGamepad,
  FaEdit,
  FaCamera,
  FaSave,
  FaShareAlt,
  FaChartLine,
  FaMedal,
  FaFire,
  FaCrown,
  FaGem,
  FaCoins,
  FaKey,
  FaLinkedin,
  FaGithub,
  FaTwitter,
} from 'react-icons/fa';
import { 
  GiLaurelsTrophy, 
  GiDiamondHard,
  GiAchievement,
  GiRank3,
} from 'react-icons/gi';
import { MdVerified, MdTimeline } from 'react-icons/md';
import { BsLightningFill } from 'react-icons/bs';

export default function Profile() {
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  const [profile, setProfile] = useState({
    username: 'DevWarrior',
    email: 'vincenzo@leveluplearn.com',
    bio: 'Passionate developer on a journey to master coding through gamified learning. Always up for a challenge!',
    location: 'Italy',
    joinDate: 'January 2024',
    level: 42,
    xp: 3250,
    xpToNext: 5000,
    rank: 'Gold III',
    totalPoints: 15420,
    streak: 7,
    gold: 1850,
    gems: 125,
    keys: 3,
  });

  const [editedProfile, setEditedProfile] = useState({ ...profile });

  const achievements = [
    { id: 1, name: 'First Victory', icon: '🏆', unlocked: true, description: 'Complete your first lesson' },
    { id: 2, name: 'Week Warrior', icon: '🔥', unlocked: true, description: '7-day streak achieved' },
    { id: 3, name: 'Code Master', icon: '👑', unlocked: true, description: 'Complete 50 challenges' },
    { id: 4, name: 'Bug Hunter', icon: '🐛', unlocked: false, description: 'Find and fix 10 bugs' },
    { id: 5, name: 'Speed Demon', icon: '⚡', unlocked: false, description: 'Complete 5 challenges in under 5 minutes' },
    { id: 6, name: 'Perfectionist', icon: '💎', unlocked: false, description: 'Get 100% on 20 challenges' },
  ];

  const recentActivity = [
    { id: 1, type: 'lesson', title: 'Advanced React Hooks', xp: 150, time: '2 hours ago' },
    { id: 2, type: 'achievement', title: 'Week Warrior Unlocked', xp: 200, time: '1 day ago' },
    { id: 3, type: 'challenge', title: 'JavaScript Array Methods', xp: 100, time: '2 days ago' },
    { id: 4, type: 'lesson', title: 'TypeScript Basics', xp: 120, time: '3 days ago' },
  ];

  const stats = [
    { label: 'Total Lessons', value: 127, icon: FaGamepad, color: gamingTheme.colors.accent.primary },
    { label: 'Challenges Won', value: 89, icon: FaTrophy, color: '#FFD700' },
    { label: 'Hours Played', value: 234, icon: MdTimeline, color: gamingTheme.colors.accent.secondary },
    { label: 'Achievements', value: '24/50', icon: GiAchievement, color: gamingTheme.colors.accent.success },
  ];

  const handleSaveProfile = () => {
    setProfile({ ...editedProfile });
    setIsEditing(false);
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been saved successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
  };

  const handleCancelEdit = () => {
    setEditedProfile({ ...profile });
    setIsEditing(false);
  };

  return (
    <Flex flexDirection='column' pt={{ base: '140px', md: '120px' }}>
      {/* Profile Header Card */}
      <Card 
        bg={`linear-gradient(135deg, ${gamingTheme.colors.bg.card}, ${gamingTheme.colors.bg.secondary})`}
        border={`2px solid ${gamingTheme.colors.border.default}`}
        mb={6}
        position="relative"
        overflow="hidden"
      >
        {/* Animated Background Pattern */}
        <Box
          position="absolute"
          top={0}
          right={0}
          w="300px"
          h="300px"
          opacity={0.1}
          bgGradient={`radial(${gamingTheme.colors.accent.primary}, transparent)`}
          filter="blur(40px)"
          animation="float 10s ease-in-out infinite"
          sx={{
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(-20px)' },
            },
          }}
        />
        
        <CardBody position="relative" zIndex={1}>
          <Flex direction={{ base: 'column', md: 'row' }} align="center" gap={6}>
            {/* Avatar Section */}
            <Box position="relative">
              <Avatar
                size="2xl"
                name={profile.username}
                bg={gamingTheme.colors.accent.primary}
                border={`4px solid ${gamingTheme.colors.accent.secondary}`}
                boxShadow={`0 0 30px ${gamingTheme.colors.accent.primary}40`}
              />
              <IconButton
                icon={<FaCamera />}
                size="sm"
                position="absolute"
                bottom={0}
                right={0}
                borderRadius="full"
                bg={gamingTheme.colors.bg.card}
                border={`2px solid ${gamingTheme.colors.accent.primary}`}
                _hover={{ bg: gamingTheme.colors.bg.hover }}
                aria-label="Change avatar"
              />
              <Box
                position="absolute"
                top={-2}
                right={-2}
                bg={gamingTheme.colors.accent.success}
                w={4}
                h={4}
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

            {/* Profile Info */}
            <VStack align="start" flex={1} spacing={3}>
              <HStack>
                {isEditing ? (
                  <Input
                    value={editedProfile.username}
                    onChange={(e) => setEditedProfile({...editedProfile, username: e.target.value})}
                    bg={gamingTheme.colors.bg.secondary}
                    border={`1px solid ${gamingTheme.colors.border.default}`}
                    color={gamingTheme.colors.text.primary}
                    fontSize="2xl"
                    fontWeight="bold"
                  />
                ) : (
                  <>
                    <Text
                      color={gamingTheme.colors.text.primary}
                      fontSize="2xl"
                      fontWeight="bold"
                      letterSpacing={gamingTheme.typography.letterSpacing.wide}
                    >
                      {profile.username}
                    </Text>
                    <Icon as={MdVerified} color={gamingTheme.colors.accent.secondary} boxSize={6} />
                  </>
                )}
              </HStack>
              
              <HStack spacing={4}>
                <Badge
                  bg={`${gamingTheme.colors.accent.primary}20`}
                  color={gamingTheme.colors.accent.primary}
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="sm"
                >
                  Level {profile.level}
                </Badge>
                <Badge
                  bg={`${gamingTheme.colors.accent.secondary}20`}
                  color={gamingTheme.colors.accent.secondary}
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="sm"
                >
                  {profile.rank}
                </Badge>
                <HStack spacing={1}>
                  <Icon as={FaFire} color="#FF6B35" />
                  <Text color={gamingTheme.colors.text.primary} fontWeight="bold">
                    {profile.streak} day streak
                  </Text>
                </HStack>
              </HStack>

              {isEditing ? (
                <Textarea
                  value={editedProfile.bio}
                  onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                  bg={gamingTheme.colors.bg.secondary}
                  border={`1px solid ${gamingTheme.colors.border.default}`}
                  color={gamingTheme.colors.text.primary}
                  rows={3}
                />
              ) : (
                <Text color={gamingTheme.colors.text.secondary} maxW="600px">
                  {profile.bio}
                </Text>
              )}

              <HStack spacing={3}>
                <Icon as={FaLinkedin} color={gamingTheme.colors.text.muted} cursor="pointer" _hover={{ color: '#0077B5' }} />
                <Icon as={FaGithub} color={gamingTheme.colors.text.muted} cursor="pointer" _hover={{ color: gamingTheme.colors.text.primary }} />
                <Icon as={FaTwitter} color={gamingTheme.colors.text.muted} cursor="pointer" _hover={{ color: '#1DA1F2' }} />
              </HStack>
            </VStack>

            {/* Action Buttons */}
            <VStack spacing={3}>
              {isEditing ? (
                <>
                  <Button
                    leftIcon={<FaSave />}
                    bg={gamingTheme.colors.accent.success}
                    color="white"
                    _hover={{ bg: `${gamingTheme.colors.accent.success}CC` }}
                    onClick={handleSaveProfile}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    borderColor={gamingTheme.colors.border.default}
                    color={gamingTheme.colors.text.secondary}
                    _hover={{ bg: gamingTheme.colors.bg.hover }}
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    leftIcon={<FaEdit />}
                    bg={gamingTheme.colors.accent.primary}
                    color="white"
                    _hover={{ bg: gamingTheme.colors.accent.danger }}
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    leftIcon={<FaShareAlt />}
                    variant="outline"
                    borderColor={gamingTheme.colors.border.default}
                    color={gamingTheme.colors.text.primary}
                    _hover={{ bg: gamingTheme.colors.bg.hover }}
                  >
                    Share Profile
                  </Button>
                </>
              )}
            </VStack>
          </Flex>

          {/* XP Progress Bar */}
          <Box mt={6}>
            <HStack justify="space-between" mb={2}>
              <Text color={gamingTheme.colors.text.muted} fontSize="sm">
                XP Progress to Level {profile.level + 1}
              </Text>
              <Text color={gamingTheme.colors.text.primary} fontSize="sm" fontWeight="bold">
                {profile.xp}/{profile.xpToNext}
              </Text>
            </HStack>
            <Progress
              value={(profile.xp / profile.xpToNext) * 100}
              size="md"
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
        </CardBody>
      </Card>

      {/* Stats Grid */}
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} mb={6}>
        {stats.map((stat, index) => (
          <Card
            key={index}
            bg={gamingTheme.colors.bg.card}
            border={`1px solid ${gamingTheme.colors.border.default}`}
            _hover={{
              transform: 'translateY(-4px)',
              boxShadow: `0 10px 30px ${stat.color}30`,
              borderColor: stat.color,
            }}
            transition="all 0.3s"
          >
            <CardBody>
              <Stat>
                <StatLabel color={gamingTheme.colors.text.muted} fontSize="xs">
                  {stat.label}
                </StatLabel>
                <HStack mt={2}>
                  <Icon as={stat.icon} color={stat.color} boxSize={6} />
                  <StatNumber color={gamingTheme.colors.text.primary} fontSize="2xl">
                    {stat.value}
                  </StatNumber>
                </HStack>
              </Stat>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      {/* Tabs Section */}
      <Card bg={gamingTheme.colors.bg.card} border={`1px solid ${gamingTheme.colors.border.default}`}>
        <CardBody>
          <Tabs colorScheme="purple">
            <TabList borderBottom={`1px solid ${gamingTheme.colors.border.default}`}>
              <Tab
                color={gamingTheme.colors.text.secondary}
                _selected={{
                  color: gamingTheme.colors.accent.primary,
                  borderColor: gamingTheme.colors.accent.primary,
                }}
              >
                Achievements
              </Tab>
              <Tab
                color={gamingTheme.colors.text.secondary}
                _selected={{
                  color: gamingTheme.colors.accent.primary,
                  borderColor: gamingTheme.colors.accent.primary,
                }}
              >
                Recent Activity
              </Tab>
              <Tab
                color={gamingTheme.colors.text.secondary}
                _selected={{
                  color: gamingTheme.colors.accent.primary,
                  borderColor: gamingTheme.colors.accent.primary,
                }}
              >
                Statistics
              </Tab>
            </TabList>

            <TabPanels>
              {/* Achievements Tab */}
              <TabPanel>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                  {achievements.map(achievement => (
                    <Box
                      key={achievement.id}
                      p={4}
                      bg={achievement.unlocked ? gamingTheme.colors.bg.secondary : gamingTheme.colors.bg.hover}
                      borderRadius="lg"
                      border={`1px solid ${achievement.unlocked ? gamingTheme.colors.accent.success : gamingTheme.colors.border.default}`}
                      opacity={achievement.unlocked ? 1 : 0.5}
                      position="relative"
                      overflow="hidden"
                    >
                      {achievement.unlocked && (
                        <Box
                          position="absolute"
                          top={-1}
                          right={-1}
                          bg={gamingTheme.colors.accent.success}
                          px={2}
                          py={1}
                          borderBottomLeftRadius="md"
                        >
                          <Text fontSize="xs" color="white" fontWeight="bold">
                            UNLOCKED
                          </Text>
                        </Box>
                      )}
                      <VStack spacing={2}>
                        <Text fontSize="3xl">{achievement.icon}</Text>
                        <Text color={gamingTheme.colors.text.primary} fontWeight="bold">
                          {achievement.name}
                        </Text>
                        <Text color={gamingTheme.colors.text.muted} fontSize="xs" textAlign="center">
                          {achievement.description}
                        </Text>
                      </VStack>
                    </Box>
                  ))}
                </SimpleGrid>
              </TabPanel>

              {/* Recent Activity Tab */}
              <TabPanel>
                <VStack spacing={3} align="stretch">
                  {recentActivity.map(activity => (
                    <HStack
                      key={activity.id}
                      p={3}
                      bg={gamingTheme.colors.bg.secondary}
                      borderRadius="md"
                      justify="space-between"
                    >
                      <HStack>
                        <Icon
                          as={
                            activity.type === 'lesson' ? FaGamepad :
                            activity.type === 'achievement' ? FaTrophy :
                            BsLightningFill
                          }
                          color={
                            activity.type === 'lesson' ? gamingTheme.colors.accent.primary :
                            activity.type === 'achievement' ? '#FFD700' :
                            gamingTheme.colors.accent.secondary
                          }
                          boxSize={5}
                        />
                        <VStack align="start" spacing={0}>
                          <Text color={gamingTheme.colors.text.primary} fontSize="sm">
                            {activity.title}
                          </Text>
                          <Text color={gamingTheme.colors.text.muted} fontSize="xs">
                            {activity.time}
                          </Text>
                        </VStack>
                      </HStack>
                      <Badge
                        bg={`${gamingTheme.colors.accent.primary}20`}
                        color={gamingTheme.colors.accent.primary}
                      >
                        +{activity.xp} XP
                      </Badge>
                    </HStack>
                  ))}
                </VStack>
              </TabPanel>

              {/* Statistics Tab */}
              <TabPanel>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <Box>
                    <Text color={gamingTheme.colors.text.muted} fontSize="sm" mb={2}>
                      Learning Progress
                    </Text>
                    <VStack align="stretch" spacing={3}>
                      <HStack justify="space-between">
                        <Text color={gamingTheme.colors.text.secondary}>JavaScript</Text>
                        <Text color={gamingTheme.colors.text.primary}>85%</Text>
                      </HStack>
                      <Progress value={85} size="sm" bg={gamingTheme.colors.bg.hover} colorScheme="purple" borderRadius="full" />
                      
                      <HStack justify="space-between">
                        <Text color={gamingTheme.colors.text.secondary}>React</Text>
                        <Text color={gamingTheme.colors.text.primary}>72%</Text>
                      </HStack>
                      <Progress value={72} size="sm" bg={gamingTheme.colors.bg.hover} colorScheme="blue" borderRadius="full" />
                      
                      <HStack justify="space-between">
                        <Text color={gamingTheme.colors.text.secondary}>TypeScript</Text>
                        <Text color={gamingTheme.colors.text.primary}>45%</Text>
                      </HStack>
                      <Progress value={45} size="sm" bg={gamingTheme.colors.bg.hover} colorScheme="green" borderRadius="full" />
                    </VStack>
                  </Box>

                  <Box>
                    <Text color={gamingTheme.colors.text.muted} fontSize="sm" mb={2}>
                      Performance Metrics
                    </Text>
                    <VStack align="stretch" spacing={2}>
                      <HStack justify="space-between">
                        <Text color={gamingTheme.colors.text.secondary} fontSize="sm">Average Score</Text>
                        <Text color={gamingTheme.colors.accent.success} fontWeight="bold">92%</Text>
                      </HStack>
                      <HStack justify="space-between">
                        <Text color={gamingTheme.colors.text.secondary} fontSize="sm">Completion Rate</Text>
                        <Text color={gamingTheme.colors.text.primary} fontWeight="bold">78%</Text>
                      </HStack>
                      <HStack justify="space-between">
                        <Text color={gamingTheme.colors.text.secondary} fontSize="sm">Best Streak</Text>
                        <Text color={gamingTheme.colors.accent.primary} fontWeight="bold">21 days</Text>
                      </HStack>
                      <HStack justify="space-between">
                        <Text color={gamingTheme.colors.text.secondary} fontSize="sm">Total Time</Text>
                        <Text color={gamingTheme.colors.text.primary} fontWeight="bold">234 hours</Text>
                      </HStack>
                    </VStack>
                  </Box>
                </SimpleGrid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </Flex>
  );
}