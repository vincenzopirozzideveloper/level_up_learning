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
  Text,
  VStack,
  HStack,
  Icon,
  IconButton,
  useToast,
  Divider,
  Progress,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

// Icons
import { 
  FaUser, 
  FaLock, 
  FaEye, 
  FaEyeSlash,
  FaGamepad,
  FaGoogle,
  FaGithub,
  FaDiscord,
  FaCheckCircle,
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { GiSwordSpade } from 'react-icons/gi';

// Theme
import { gamingTheme } from "../../theme/gaming-design-system";

// Services
import authService from "../../services/authService";

// Components
import AuthFooter from "components/Footer/AuthFooter";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

function SignUp() {
  const history = useHistory();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 12.5;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 12.5;
    return strength;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Calculate password strength
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Username is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Username must be at least 3 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      });
      
      toast({
        title: 'Welcome to the Arena!',
        description: 'Registration successful. Choose your character!',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      
      // Redirect to character selection
      history.push('/character-selection');
    } catch (error) {
      toast({
        title: 'Registration Failed',
        description: error.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      
      // Handle validation errors from backend
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = (provider) => {
    toast({
      title: `${provider} Registration`,
      description: 'Social registration coming soon!',
      status: 'info',
      duration: 3000,
      isClosable: true,
      position: 'top',
    });
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 30) return gamingTheme.colors.accent.danger;
    if (passwordStrength < 60) return gamingTheme.colors.accent.warning;
    if (passwordStrength < 90) return gamingTheme.colors.accent.secondary;
    return gamingTheme.colors.accent.success;
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 30) return 'Weak';
    if (passwordStrength < 60) return 'Fair';
    if (passwordStrength < 90) return 'Good';
    return 'Strong';
  };

  return (
    <Flex
      minH='100vh'
      align='center'
      justify='center'
      bg={gamingTheme.colors.bg.primary}
      position='relative'
      overflow='hidden'
      py={8}
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
            linear-gradient(${gamingTheme.colors.accent.purple}40 1px, transparent 1px),
            linear-gradient(90deg, ${gamingTheme.colors.accent.purple}40 1px, transparent 1px)
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
            width="500px"
            height="500px"
            borderRadius="50%"
            bg={`radial-gradient(circle, ${
              i === 0 ? gamingTheme.colors.accent.purple : 
              i === 1 ? gamingTheme.colors.accent.secondary : 
              gamingTheme.colors.accent.success
            }08, transparent 70%)`}
            left={`${i * 40 - 10}%`}
            top={`${i * 25}%`}
            filter="blur(80px)"
            animate={{
              x: [0, 30, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </Box>

      {/* Main Register Container */}
      <MotionFlex
        direction="column"
        bg={`linear-gradient(135deg, ${gamingTheme.colors.bg.card}, ${gamingTheme.colors.bg.secondary})`}
        border={`2px solid ${gamingTheme.colors.border.default}`}
        borderRadius={gamingTheme.borders.radius.xl}
        p={{ base: 8, md: 10 }}
        w={{ base: "90%", md: "500px" }}
        maxW="550px"
        position="relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        boxShadow={`0 20px 60px ${gamingTheme.colors.bg.primary}80`}
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          bg: `linear-gradient(90deg, transparent, ${gamingTheme.colors.accent.purple}, transparent)`,
          animation: 'glow 3s linear infinite',
          '@keyframes glow': {
            '0%': { opacity: 0 },
            '50%': { opacity: 1 },
            '100%': { opacity: 0 },
          },
        }}
      >
        {/* Logo/Title Section */}
        <VStack spacing={3} mb={6}>
          <MotionBox
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <Icon
              as={GiSwordSpade}
              w={14}
              h={14}
              color={gamingTheme.colors.accent.purple}
            />
          </MotionBox>
          
          <VStack spacing={0}>
            <Text
              fontSize="3xl"
              fontFamily={gamingTheme.typography.fonts.heading}
              fontWeight={gamingTheme.typography.weights.black}
              bgGradient={`linear-gradient(135deg, ${gamingTheme.colors.accent.purple}, ${gamingTheme.colors.accent.secondary})`}
              bgClip="text"
              textTransform="uppercase"
              letterSpacing={gamingTheme.typography.letterSpacing.gaming}
            >
              Join the Battle
            </Text>
            <Text
              fontSize="sm"
              color={gamingTheme.colors.text.muted}
              fontFamily={gamingTheme.typography.fonts.body}
              letterSpacing={gamingTheme.typography.letterSpacing.wider}
            >
              Create your warrior account
            </Text>
          </VStack>
        </VStack>

        {/* Form Section */}
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            {/* Username Input */}
            <FormControl isInvalid={!!errors.name}>
              <FormLabel
                color={gamingTheme.colors.text.secondary}
                fontSize="xs"
                fontFamily={gamingTheme.typography.fonts.mono}
                textTransform="uppercase"
                letterSpacing={gamingTheme.typography.letterSpacing.wide}
              >
                Username
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaUser} color={gamingTheme.colors.text.muted} />
                </InputLeftElement>
                <Input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="WarriorName"
                  bg={gamingTheme.colors.bg.primary}
                  border={`1px solid ${gamingTheme.colors.border.default}`}
                  color={gamingTheme.colors.text.primary}
                  _placeholder={{ color: gamingTheme.colors.text.muted }}
                  _hover={{
                    borderColor: gamingTheme.colors.accent.purple,
                    boxShadow: `0 0 0 1px ${gamingTheme.colors.accent.purple}40`,
                  }}
                  _focus={{
                    borderColor: gamingTheme.colors.accent.secondary,
                    boxShadow: `0 0 0 2px ${gamingTheme.colors.accent.secondary}40`,
                  }}
                  fontFamily={gamingTheme.typography.fonts.mono}
                  h="45px"
                />
              </InputGroup>
              <FormErrorMessage color={gamingTheme.colors.accent.danger}>
                {errors.name}
              </FormErrorMessage>
            </FormControl>

            {/* Email Input */}
            <FormControl isInvalid={!!errors.email}>
              <FormLabel
                color={gamingTheme.colors.text.secondary}
                fontSize="xs"
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
                    borderColor: gamingTheme.colors.accent.purple,
                    boxShadow: `0 0 0 1px ${gamingTheme.colors.accent.purple}40`,
                  }}
                  _focus={{
                    borderColor: gamingTheme.colors.accent.secondary,
                    boxShadow: `0 0 0 2px ${gamingTheme.colors.accent.secondary}40`,
                  }}
                  fontFamily={gamingTheme.typography.fonts.mono}
                  h="45px"
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
                fontSize="xs"
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
                    borderColor: gamingTheme.colors.accent.purple,
                    boxShadow: `0 0 0 1px ${gamingTheme.colors.accent.purple}40`,
                  }}
                  _focus={{
                    borderColor: gamingTheme.colors.accent.secondary,
                    boxShadow: `0 0 0 2px ${gamingTheme.colors.accent.secondary}40`,
                  }}
                  fontFamily={gamingTheme.typography.fonts.mono}
                  h="45px"
                />
                <InputRightElement h="45px">
                  <IconButton
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                    icon={<Icon as={showPassword ? FaEyeSlash : FaEye} />}
                    color={gamingTheme.colors.text.muted}
                    _hover={{ color: gamingTheme.colors.accent.purple }}
                    size="sm"
                  />
                </InputRightElement>
              </InputGroup>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <Box mt={2}>
                  <HStack justify="space-between" mb={1}>
                    <Text fontSize="xs" color={gamingTheme.colors.text.muted}>
                      Password Strength
                    </Text>
                    <Text fontSize="xs" color={getPasswordStrengthColor()} fontWeight="bold">
                      {getPasswordStrengthText()}
                    </Text>
                  </HStack>
                  <Progress
                    value={passwordStrength}
                    size="sm"
                    colorScheme="none"
                    bg={gamingTheme.colors.bg.primary}
                    sx={{
                      '& > div': {
                        bg: getPasswordStrengthColor(),
                      },
                    }}
                  />
                </Box>
              )}
              
              <FormErrorMessage color={gamingTheme.colors.accent.danger}>
                {errors.password}
              </FormErrorMessage>
            </FormControl>

            {/* Confirm Password Input */}
            <FormControl isInvalid={!!errors.confirmPassword}>
              <FormLabel
                color={gamingTheme.colors.text.secondary}
                fontSize="xs"
                fontFamily={gamingTheme.typography.fonts.mono}
                textTransform="uppercase"
                letterSpacing={gamingTheme.typography.letterSpacing.wide}
              >
                Confirm Password
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon 
                    as={formData.confirmPassword && formData.password === formData.confirmPassword ? FaCheckCircle : FaLock} 
                    color={formData.confirmPassword && formData.password === formData.confirmPassword ? gamingTheme.colors.accent.success : gamingTheme.colors.text.muted} 
                  />
                </InputLeftElement>
                <Input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  bg={gamingTheme.colors.bg.primary}
                  border={`1px solid ${gamingTheme.colors.border.default}`}
                  color={gamingTheme.colors.text.primary}
                  _placeholder={{ color: gamingTheme.colors.text.muted }}
                  _hover={{
                    borderColor: gamingTheme.colors.accent.purple,
                    boxShadow: `0 0 0 1px ${gamingTheme.colors.accent.purple}40`,
                  }}
                  _focus={{
                    borderColor: gamingTheme.colors.accent.secondary,
                    boxShadow: `0 0 0 2px ${gamingTheme.colors.accent.secondary}40`,
                  }}
                  fontFamily={gamingTheme.typography.fonts.mono}
                  h="45px"
                />
                <InputRightElement h="45px">
                  <IconButton
                    variant="ghost"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    icon={<Icon as={showConfirmPassword ? FaEyeSlash : FaEye} />}
                    color={gamingTheme.colors.text.muted}
                    _hover={{ color: gamingTheme.colors.accent.purple }}
                    size="sm"
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage color={gamingTheme.colors.accent.danger}>
                {errors.confirmPassword}
              </FormErrorMessage>
            </FormControl>

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
                bg={`linear-gradient(135deg, ${gamingTheme.colors.accent.purple}, ${gamingTheme.colors.accent.secondary})`}
                color={gamingTheme.colors.text.primary}
                fontSize="lg"
                fontFamily={gamingTheme.typography.fonts.heading}
                textTransform="uppercase"
                letterSpacing={gamingTheme.typography.letterSpacing.wider}
                isLoading={isLoading}
                loadingText="CREATING WARRIOR..."
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: `0 10px 30px ${gamingTheme.colors.accent.purple}50`,
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
                  bg: `linear-gradient(90deg, transparent, ${gamingTheme.colors.accent.success}30, transparent)`,
                  animation: 'shine 2s infinite',
                  '@keyframes shine': {
                    '100%': { left: '100%' },
                  },
                }}
              >
                <HStack spacing={2}>
                  <Icon as={GiSwordSpade} />
                  <Text>Create Account</Text>
                </HStack>
              </Button>
            </MotionBox>

            <Divider borderColor={gamingTheme.colors.border.default} />

            {/* Social Register */}
            <VStack w="100%" spacing={3}>
              <Text
                fontSize="xs"
                color={gamingTheme.colors.text.muted}
                textTransform="uppercase"
                letterSpacing={gamingTheme.typography.letterSpacing.wider}
              >
                Or register with
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
                    onClick={() => handleSocialRegister(social.name)}
                    size="lg"
                  />
                ))}
              </HStack>
            </VStack>

            {/* Sign In Link */}
            <HStack spacing={1}>
              <Text color={gamingTheme.colors.text.muted} fontSize="sm">
                Already a warrior?
              </Text>
              <RouterLink to="/auth/sign-in">
                <Text
                  color={gamingTheme.colors.accent.secondary}
                  fontSize="sm"
                  fontWeight="bold"
                  _hover={{ color: gamingTheme.colors.accent.purple }}
                  cursor="pointer"
                >
                  Enter the arena
                </Text>
              </RouterLink>
            </HStack>
          </VStack>
        </form>
      </MotionFlex>
    </Flex>
  );
}

export default SignUp;