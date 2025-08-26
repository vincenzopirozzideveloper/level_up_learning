import React, { useState } from "react";
import { useHistory, Link as RouterLink } from "react-router-dom";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Switch,
  Text,
  VStack,
  HStack,
  Icon,
  IconButton,
  useToast,
  Divider,
  Checkbox,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

// Icons
import { 
  FaGamepad, 
  FaLock, 
  FaEye, 
  FaEyeSlash,
  FaGoogle,
  FaGithub,
  FaDiscord,
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { BsLightningFill } from 'react-icons/bs';

// Theme
import { gamingTheme } from "../../theme/gaming-design-system";

// Services
import authService from "../../services/authService";

// Components
import AuthFooter from "components/Footer/AuthFooter";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

function SignIn() {
  const history = useHistory();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const response = await authService.login(formData.email, formData.password);
      
      toast({
        title: 'Welcome back, Warrior!',
        description: 'Login successful. Prepare for battle!',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      
      // Delay redirect slightly to avoid state update warning
      setTimeout(() => {
        // Check if user has selected a character
        if (response.user?.character_selected) {
          history.push('/admin/dashboard');
        } else {
          history.push('/character-selection');
        }
      }, 100);
    } catch (error) {
      setIsLoading(false); // Only set loading false on error
      toast({
        title: 'Login Failed',
        description: error.response?.data?.message || 'Invalid credentials',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const handleSocialLogin = (provider) => {
    toast({
      title: `${provider} Login`,
      description: 'Social login coming soon!',
      status: 'info',
      duration: 3000,
      isClosable: true,
      position: 'top',
    });
  };

  return (
    <Flex
      minH='100vh'
      align='center'
      justify='center'
      bg={gamingTheme.colors.bg.primary}
      position='relative'
      overflow='hidden'
    >
      {/* Animated Background Effects */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        overflow="hidden"
        pointerEvents="none"
      >
        {/* Grid Pattern */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          opacity={0.03}
          backgroundImage={`
            linear-gradient(${gamingTheme.colors.accent.primary}40 1px, transparent 1px),
            linear-gradient(90deg, ${gamingTheme.colors.accent.primary}40 1px, transparent 1px)
          `}
          backgroundSize="100px 100px"
          animation="slide 10s linear infinite"
          sx={{
            '@keyframes slide': {
              '0%': { transform: 'translate(0, 0)' },
              '100%': { transform: 'translate(100px, 100px)' },
            },
          }}
        />

        {/* Floating Orbs */}
        {[...Array(3)].map((_, i) => (
          <MotionBox
            key={i}
            position="absolute"
            width="400px"
            height="400px"
            borderRadius="50%"
            bg={`radial-gradient(circle, ${
              i === 0 ? gamingTheme.colors.accent.primary : 
              i === 1 ? gamingTheme.colors.accent.secondary : 
              gamingTheme.colors.accent.purple
            }10, transparent 70%)`}
            left={`${i * 30}%`}
            top={`${i * 20}%`}
            filter="blur(60px)"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </Box>

      {/* Main Login Container */}
      <MotionFlex
        direction="column"
        bg={`linear-gradient(135deg, ${gamingTheme.colors.bg.card}, ${gamingTheme.colors.bg.secondary})`}
        border={`2px solid ${gamingTheme.colors.border.default}`}
        borderRadius={gamingTheme.borders.radius.xl}
        p={{ base: 8, md: 12 }}
        w={{ base: "90%", md: "450px" }}
        maxW="500px"
        position="relative"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        boxShadow={`0 20px 60px ${gamingTheme.colors.bg.primary}80`}
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          bg: `linear-gradient(90deg, transparent, ${gamingTheme.colors.accent.primary}, transparent)`,
          animation: 'glow 3s linear infinite',
          '@keyframes glow': {
            '0%': { opacity: 0 },
            '50%': { opacity: 1 },
            '100%': { opacity: 0 },
          },
        }}
      >
        {/* Logo/Title Section */}
        <VStack spacing={4} mb={8}>
          <MotionBox
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Icon
              as={FaGamepad}
              w={16}
              h={16}
              color={gamingTheme.colors.accent.primary}
            />
          </MotionBox>
          
          <VStack spacing={1}>
            <Text
              fontSize="4xl"
              fontFamily={gamingTheme.typography.fonts.heading}
              fontWeight={gamingTheme.typography.weights.black}
              bgGradient={`linear-gradient(135deg, ${gamingTheme.colors.accent.primary}, ${gamingTheme.colors.accent.secondary})`}
              bgClip="text"
              textTransform="uppercase"
              letterSpacing={gamingTheme.typography.letterSpacing.gaming}
            >
              Level Up
            </Text>
            <Text
              fontSize="md"
              color={gamingTheme.colors.text.muted}
              fontFamily={gamingTheme.typography.fonts.body}
              letterSpacing={gamingTheme.typography.letterSpacing.wider}
            >
              Enter the Learning Arena
            </Text>
          </VStack>
        </VStack>

        {/* Form Section */}
        <form onSubmit={handleSubmit}>
          <VStack spacing={5}>
            {/* Email Input */}
            <FormControl isInvalid={!!errors.email}>
              <FormLabel
                color={gamingTheme.colors.text.secondary}
                fontSize="sm"
                fontFamily={gamingTheme.typography.fonts.mono}
                textTransform="uppercase"
                letterSpacing={gamingTheme.typography.letterSpacing.wide}
              >
                Email
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={MdEmail} color={gamingTheme.colors.text.muted} />
                </InputLeftElement>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="warrior@levelup.com"
                  bg={gamingTheme.colors.bg.primary}
                  border={`1px solid ${gamingTheme.colors.border.default}`}
                  color={gamingTheme.colors.text.primary}
                  _placeholder={{ color: gamingTheme.colors.text.muted }}
                  _hover={{
                    borderColor: gamingTheme.colors.accent.primary,
                    boxShadow: `0 0 0 1px ${gamingTheme.colors.accent.primary}40`,
                  }}
                  _focus={{
                    borderColor: gamingTheme.colors.accent.secondary,
                    boxShadow: `0 0 0 2px ${gamingTheme.colors.accent.secondary}40`,
                  }}
                  fontFamily={gamingTheme.typography.fonts.mono}
                  h="50px"
                />
              </InputGroup>
              <FormErrorMessage color={gamingTheme.colors.accent.danger}>
                {errors.email}
              </FormErrorMessage>
            </FormControl>

            {/* Password Input */}
            <FormControl isInvalid={!!errors.password}>
              <FormLabel
                color={gamingTheme.colors.text.secondary}
                fontSize="sm"
                fontFamily={gamingTheme.typography.fonts.mono}
                textTransform="uppercase"
                letterSpacing={gamingTheme.typography.letterSpacing.wide}
              >
                Password
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaLock} color={gamingTheme.colors.text.muted} />
                </InputLeftElement>
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  bg={gamingTheme.colors.bg.primary}
                  border={`1px solid ${gamingTheme.colors.border.default}`}
                  color={gamingTheme.colors.text.primary}
                  _placeholder={{ color: gamingTheme.colors.text.muted }}
                  _hover={{
                    borderColor: gamingTheme.colors.accent.primary,
                    boxShadow: `0 0 0 1px ${gamingTheme.colors.accent.primary}40`,
                  }}
                  _focus={{
                    borderColor: gamingTheme.colors.accent.secondary,
                    boxShadow: `0 0 0 2px ${gamingTheme.colors.accent.secondary}40`,
                  }}
                  fontFamily={gamingTheme.typography.fonts.mono}
                  h="50px"
                />
                <InputRightElement h="50px">
                  <IconButton
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                    icon={<Icon as={showPassword ? FaEyeSlash : FaEye} />}
                    color={gamingTheme.colors.text.muted}
                    _hover={{ color: gamingTheme.colors.accent.primary }}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage color={gamingTheme.colors.accent.danger}>
                {errors.password}
              </FormErrorMessage>
            </FormControl>

            {/* Remember Me & Forgot Password */}
            <Flex justify="space-between" w="100%">
              <Checkbox
                isChecked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                colorScheme="red"
                color={gamingTheme.colors.text.secondary}
                fontFamily={gamingTheme.typography.fonts.body}
              >
                Remember me
              </Checkbox>
              <RouterLink to="/auth/forgot-password">
                <Text
                  color={gamingTheme.colors.accent.secondary}
                  fontSize="sm"
                  fontFamily={gamingTheme.typography.fonts.body}
                  _hover={{ color: gamingTheme.colors.accent.primary }}
                  cursor="pointer"
                >
                  Forgot password?
                </Text>
              </RouterLink>
            </Flex>

            {/* Submit Button */}
            <MotionBox
              w="100%"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                w="100%"
                h="50px"
                bg={`linear-gradient(135deg, ${gamingTheme.colors.accent.primary}, ${gamingTheme.colors.accent.danger})`}
                color={gamingTheme.colors.text.primary}
                fontSize="lg"
                fontFamily={gamingTheme.typography.fonts.heading}
                textTransform="uppercase"
                letterSpacing={gamingTheme.typography.letterSpacing.wider}
                isLoading={isLoading}
                loadingText="ENTERING..."
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: `0 10px 30px ${gamingTheme.colors.accent.primary}50`,
                }}
                _active={{
                  transform: 'translateY(0)',
                }}
                position="relative"
                overflow="hidden"
                _before={{
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  bg: `linear-gradient(90deg, transparent, ${gamingTheme.colors.accent.secondary}30, transparent)`,
                  animation: 'shine 2s infinite',
                  '@keyframes shine': {
                    '100%': { left: '100%' },
                  },
                }}
              >
                <HStack spacing={2}>
                  <Icon as={BsLightningFill} />
                  <Text>Enter Arena</Text>
                </HStack>
              </Button>
            </MotionBox>

            <Divider borderColor={gamingTheme.colors.border.default} />

            {/* Social Login */}
            <VStack w="100%" spacing={3}>
              <Text
                fontSize="xs"
                color={gamingTheme.colors.text.muted}
                textTransform="uppercase"
                letterSpacing={gamingTheme.typography.letterSpacing.wider}
              >
                Or continue with
              </Text>
              <HStack spacing={3}>
                {[
                  { icon: FaGoogle, color: '#DB4437', name: 'Google' },
                  { icon: FaGithub, color: '#333', name: 'GitHub' },
                  { icon: FaDiscord, color: '#5865F2', name: 'Discord' },
                ].map((social) => (
                  <IconButton
                    key={social.name}
                    icon={<Icon as={social.icon} />}
                    variant="outline"
                    borderColor={gamingTheme.colors.border.default}
                    color={gamingTheme.colors.text.secondary}
                    _hover={{
                      bg: social.color,
                      borderColor: social.color,
                      color: 'white',
                      transform: 'translateY(-2px)',
                      boxShadow: `0 5px 20px ${social.color}40`,
                    }}
                    onClick={() => handleSocialLogin(social.name)}
                    size="lg"
                  />
                ))}
              </HStack>
            </VStack>

            {/* Sign Up Link */}
            <HStack spacing={1}>
              <Text color={gamingTheme.colors.text.muted} fontSize="sm">
                New warrior?
              </Text>
              <RouterLink to="/auth/sign-up">
                <Text
                  color={gamingTheme.colors.accent.secondary}
                  fontSize="sm"
                  fontWeight="bold"
                  _hover={{ color: gamingTheme.colors.accent.primary }}
                  cursor="pointer"
                >
                  Join the battle
                </Text>
              </RouterLink>
            </HStack>
          </VStack>
        </form>
      </MotionFlex>
    </Flex>
  );
}

export default SignIn;