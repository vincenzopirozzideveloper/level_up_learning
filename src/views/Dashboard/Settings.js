import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Switch,
  Button,
  SimpleGrid,
  Icon,
  Divider,
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Badge,
  useToast,
} from '@chakra-ui/react';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import { gamingTheme } from '../../theme/gaming-design-system';
import { 
  FaCog, 
  FaVolumeUp, 
  FaBell, 
  FaShieldAlt, 
  FaPalette,
  FaKeyboard,
  FaLanguage,
  FaSave,
  FaUndo,
} from 'react-icons/fa';
import { MdGraphicEq, MdBrightness4 } from 'react-icons/md';
import { IoMdSettings } from 'react-icons/io';

export default function Settings() {
  const toast = useToast();
  
  const [settings, setSettings] = useState({
    // Audio
    masterVolume: 80,
    sfxVolume: 100,
    musicVolume: 60,
    voiceVolume: 90,
    
    // Notifications
    dailyReminders: true,
    missionAlerts: true,
    friendRequests: true,
    achievementNotifications: true,
    
    // Display
    darkMode: true,
    animations: true,
    particleEffects: true,
    screenShake: false,
    
    // Privacy
    profileVisibility: 'friends',
    showOnlineStatus: true,
    shareProgress: true,
    
    // Gameplay
    difficulty: 'normal',
    autoSave: true,
    hints: true,
    language: 'en',
  });

  const handleSave = () => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
    toast({
      title: 'Settings Saved',
      description: 'Your preferences have been updated successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
  };

  const handleReset = () => {
    const defaultSettings = {
      masterVolume: 80,
      sfxVolume: 100,
      musicVolume: 60,
      voiceVolume: 90,
      dailyReminders: true,
      missionAlerts: true,
      friendRequests: true,
      achievementNotifications: true,
      darkMode: true,
      animations: true,
      particleEffects: true,
      screenShake: false,
      profileVisibility: 'friends',
      showOnlineStatus: true,
      shareProgress: true,
      difficulty: 'normal',
      autoSave: true,
      hints: true,
      language: 'en',
    };
    setSettings(defaultSettings);
    toast({
      title: 'Settings Reset',
      description: 'All settings have been restored to defaults.',
      status: 'info',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
  };

  return (
    <Flex flexDirection='column' pt={{ base: '140px', md: '120px' }}>
      {/* Header */}
      <HStack mb={6} justify="space-between">
        <HStack>
          <Icon as={IoMdSettings} color={gamingTheme.colors.accent.primary} boxSize={8} />
          <Text
            color={gamingTheme.colors.text.primary}
            fontSize="2xl"
            fontWeight="bold"
            letterSpacing={gamingTheme.typography.letterSpacing.wide}
            textTransform="uppercase"
          >
            Settings
          </Text>
        </HStack>
        <HStack spacing={3}>
          <Button
            leftIcon={<Icon as={FaUndo} />}
            variant="outline"
            borderColor={gamingTheme.colors.border.default}
            color={gamingTheme.colors.text.secondary}
            _hover={{ bg: gamingTheme.colors.bg.hover }}
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            leftIcon={<Icon as={FaSave} />}
            bg={gamingTheme.colors.accent.primary}
            color="white"
            _hover={{ bg: gamingTheme.colors.accent.danger }}
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </HStack>
      </HStack>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        {/* Audio Settings */}
        <Card bg={gamingTheme.colors.bg.card} border={`1px solid ${gamingTheme.colors.border.default}`}>
          <CardHeader>
            <HStack>
              <Icon as={FaVolumeUp} color={gamingTheme.colors.accent.secondary} boxSize={5} />
              <Text color={gamingTheme.colors.text.primary} fontSize="lg" fontWeight="bold">
                Audio
              </Text>
            </HStack>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              {/* Master Volume */}
              <Box>
                <HStack justify="space-between" mb={2}>
                  <Text color={gamingTheme.colors.text.secondary} fontSize="sm">
                    Master Volume
                  </Text>
                  <Badge bg={gamingTheme.colors.bg.tertiary} color={gamingTheme.colors.text.primary}>
                    {settings.masterVolume}%
                  </Badge>
                </HStack>
                <Slider
                  value={settings.masterVolume}
                  onChange={(val) => setSettings({...settings, masterVolume: val})}
                  min={0}
                  max={100}
                >
                  <SliderTrack bg={gamingTheme.colors.bg.hover}>
                    <SliderFilledTrack bg={gamingTheme.colors.accent.primary} />
                  </SliderTrack>
                  <SliderThumb bg={gamingTheme.colors.accent.primary} />
                </Slider>
              </Box>

              {/* SFX Volume */}
              <Box>
                <HStack justify="space-between" mb={2}>
                  <Text color={gamingTheme.colors.text.secondary} fontSize="sm">
                    Sound Effects
                  </Text>
                  <Badge bg={gamingTheme.colors.bg.tertiary} color={gamingTheme.colors.text.primary}>
                    {settings.sfxVolume}%
                  </Badge>
                </HStack>
                <Slider
                  value={settings.sfxVolume}
                  onChange={(val) => setSettings({...settings, sfxVolume: val})}
                  min={0}
                  max={100}
                >
                  <SliderTrack bg={gamingTheme.colors.bg.hover}>
                    <SliderFilledTrack bg={gamingTheme.colors.accent.secondary} />
                  </SliderTrack>
                  <SliderThumb bg={gamingTheme.colors.accent.secondary} />
                </Slider>
              </Box>

              {/* Music Volume */}
              <Box>
                <HStack justify="space-between" mb={2}>
                  <Text color={gamingTheme.colors.text.secondary} fontSize="sm">
                    Music
                  </Text>
                  <Badge bg={gamingTheme.colors.bg.tertiary} color={gamingTheme.colors.text.primary}>
                    {settings.musicVolume}%
                  </Badge>
                </HStack>
                <Slider
                  value={settings.musicVolume}
                  onChange={(val) => setSettings({...settings, musicVolume: val})}
                  min={0}
                  max={100}
                >
                  <SliderTrack bg={gamingTheme.colors.bg.hover}>
                    <SliderFilledTrack bg={gamingTheme.colors.accent.success} />
                  </SliderTrack>
                  <SliderThumb bg={gamingTheme.colors.accent.success} />
                </Slider>
              </Box>
            </VStack>
          </CardBody>
        </Card>

        {/* Notifications */}
        <Card bg={gamingTheme.colors.bg.card} border={`1px solid ${gamingTheme.colors.border.default}`}>
          <CardHeader>
            <HStack>
              <Icon as={FaBell} color={gamingTheme.colors.accent.primary} boxSize={5} />
              <Text color={gamingTheme.colors.text.primary} fontSize="lg" fontWeight="bold">
                Notifications
              </Text>
            </HStack>
          </CardHeader>
          <CardBody>
            <VStack spacing={3} align="stretch">
              <HStack justify="space-between">
                <Text color={gamingTheme.colors.text.secondary} fontSize="sm">
                  Daily Reminders
                </Text>
                <Switch
                  isChecked={settings.dailyReminders}
                  onChange={(e) => setSettings({...settings, dailyReminders: e.target.checked})}
                  colorScheme="green"
                />
              </HStack>
              <HStack justify="space-between">
                <Text color={gamingTheme.colors.text.secondary} fontSize="sm">
                  Mission Alerts
                </Text>
                <Switch
                  isChecked={settings.missionAlerts}
                  onChange={(e) => setSettings({...settings, missionAlerts: e.target.checked})}
                  colorScheme="green"
                />
              </HStack>
              <HStack justify="space-between">
                <Text color={gamingTheme.colors.text.secondary} fontSize="sm">
                  Friend Requests
                </Text>
                <Switch
                  isChecked={settings.friendRequests}
                  onChange={(e) => setSettings({...settings, friendRequests: e.target.checked})}
                  colorScheme="green"
                />
              </HStack>
              <HStack justify="space-between">
                <Text color={gamingTheme.colors.text.secondary} fontSize="sm">
                  Achievement Notifications
                </Text>
                <Switch
                  isChecked={settings.achievementNotifications}
                  onChange={(e) => setSettings({...settings, achievementNotifications: e.target.checked})}
                  colorScheme="green"
                />
              </HStack>
            </VStack>
          </CardBody>
        </Card>

        {/* Display Settings */}
        <Card bg={gamingTheme.colors.bg.card} border={`1px solid ${gamingTheme.colors.border.default}`}>
          <CardHeader>
            <HStack>
              <Icon as={MdBrightness4} color={gamingTheme.colors.accent.secondary} boxSize={5} />
              <Text color={gamingTheme.colors.text.primary} fontSize="lg" fontWeight="bold">
                Display
              </Text>
            </HStack>
          </CardHeader>
          <CardBody>
            <VStack spacing={3} align="stretch">
              <HStack justify="space-between">
                <Text color={gamingTheme.colors.text.secondary} fontSize="sm">
                  Dark Mode
                </Text>
                <Switch
                  isChecked={settings.darkMode}
                  onChange={(e) => setSettings({...settings, darkMode: e.target.checked})}
                  colorScheme="purple"
                />
              </HStack>
              <HStack justify="space-between">
                <Text color={gamingTheme.colors.text.secondary} fontSize="sm">
                  Animations
                </Text>
                <Switch
                  isChecked={settings.animations}
                  onChange={(e) => setSettings({...settings, animations: e.target.checked})}
                  colorScheme="purple"
                />
              </HStack>
              <HStack justify="space-between">
                <Text color={gamingTheme.colors.text.secondary} fontSize="sm">
                  Particle Effects
                </Text>
                <Switch
                  isChecked={settings.particleEffects}
                  onChange={(e) => setSettings({...settings, particleEffects: e.target.checked})}
                  colorScheme="purple"
                />
              </HStack>
              <HStack justify="space-between">
                <Text color={gamingTheme.colors.text.secondary} fontSize="sm">
                  Screen Shake
                </Text>
                <Switch
                  isChecked={settings.screenShake}
                  onChange={(e) => setSettings({...settings, screenShake: e.target.checked})}
                  colorScheme="purple"
                />
              </HStack>
            </VStack>
          </CardBody>
        </Card>

        {/* Privacy & Security */}
        <Card bg={gamingTheme.colors.bg.card} border={`1px solid ${gamingTheme.colors.border.default}`}>
          <CardHeader>
            <HStack>
              <Icon as={FaShieldAlt} color={gamingTheme.colors.accent.success} boxSize={5} />
              <Text color={gamingTheme.colors.text.primary} fontSize="lg" fontWeight="bold">
                Privacy & Security
              </Text>
            </HStack>
          </CardHeader>
          <CardBody>
            <VStack spacing={3} align="stretch">
              <Box>
                <Text color={gamingTheme.colors.text.secondary} fontSize="sm" mb={2}>
                  Profile Visibility
                </Text>
                <Select
                  value={settings.profileVisibility}
                  onChange={(e) => setSettings({...settings, profileVisibility: e.target.value})}
                  bg={gamingTheme.colors.bg.secondary}
                  borderColor={gamingTheme.colors.border.default}
                  color={gamingTheme.colors.text.primary}
                >
                  <option value="public">Public</option>
                  <option value="friends">Friends Only</option>
                  <option value="private">Private</option>
                </Select>
              </Box>
              <HStack justify="space-between">
                <Text color={gamingTheme.colors.text.secondary} fontSize="sm">
                  Show Online Status
                </Text>
                <Switch
                  isChecked={settings.showOnlineStatus}
                  onChange={(e) => setSettings({...settings, showOnlineStatus: e.target.checked})}
                  colorScheme="blue"
                />
              </HStack>
              <HStack justify="space-between">
                <Text color={gamingTheme.colors.text.secondary} fontSize="sm">
                  Share Progress
                </Text>
                <Switch
                  isChecked={settings.shareProgress}
                  onChange={(e) => setSettings({...settings, shareProgress: e.target.checked})}
                  colorScheme="blue"
                />
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Gameplay Settings */}
      <Card bg={gamingTheme.colors.bg.card} border={`1px solid ${gamingTheme.colors.border.default}`} mt={6}>
        <CardHeader>
          <HStack>
            <Icon as={FaKeyboard} color={gamingTheme.colors.accent.primary} boxSize={5} />
            <Text color={gamingTheme.colors.text.primary} fontSize="lg" fontWeight="bold">
              Gameplay
            </Text>
          </HStack>
        </CardHeader>
        <CardBody>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            <Box>
              <Text color={gamingTheme.colors.text.secondary} fontSize="sm" mb={2}>
                Difficulty
              </Text>
              <Select
                value={settings.difficulty}
                onChange={(e) => setSettings({...settings, difficulty: e.target.value})}
                bg={gamingTheme.colors.bg.secondary}
                borderColor={gamingTheme.colors.border.default}
                color={gamingTheme.colors.text.primary}
              >
                <option value="easy">Easy</option>
                <option value="normal">Normal</option>
                <option value="hard">Hard</option>
                <option value="expert">Expert</option>
              </Select>
            </Box>
            <Box>
              <Text color={gamingTheme.colors.text.secondary} fontSize="sm" mb={2}>
                Language
              </Text>
              <Select
                value={settings.language}
                onChange={(e) => setSettings({...settings, language: e.target.value})}
                bg={gamingTheme.colors.bg.secondary}
                borderColor={gamingTheme.colors.border.default}
                color={gamingTheme.colors.text.primary}
              >
                <option value="en">English</option>
                <option value="it">Italiano</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </Select>
            </Box>
            <HStack justify="space-between">
              <Text color={gamingTheme.colors.text.secondary} fontSize="sm">
                Auto-Save
              </Text>
              <Switch
                isChecked={settings.autoSave}
                onChange={(e) => setSettings({...settings, autoSave: e.target.checked})}
                colorScheme="green"
              />
            </HStack>
          </SimpleGrid>
        </CardBody>
      </Card>
    </Flex>
  );
}