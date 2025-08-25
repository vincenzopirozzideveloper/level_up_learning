import React, { useState, useRef, Suspense } from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  Spinner,
  IconButton,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Float } from "@react-three/drei";
import { gamingTheme } from "../../theme/gaming-design-system";
import { FaChevronDown } from "react-icons/fa";

const MotionBox = motion(Box);

// 3D Model Component
function Character({ url, isActive }) {
  const { scene } = useGLTF(url);
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      // Continuous rotation when not active, interactive when active
      if (!isActive) {
        meshRef.current.rotation.y += 0.005;
      } else {
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      }
    }
  });

  return (
    <Float
      speed={isActive ? 1.5 : 0.5}
      rotationIntensity={isActive ? 0.4 : 0.2}
      floatIntensity={isActive ? 0.6 : 0.3}
    >
      <primitive
        ref={meshRef}
        object={scene}
        scale={isActive ? 1.2 : 1}
        position={[0, -1.5, 0]}  // Move model down
      />
    </Float>
  );
}

// Loading Component
function Loader() {
  return (
    <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color={gamingTheme.colors.accent.primary}
        size="xl"
      />
    </Box>
  );
}

// Character Section Component
function CharacterSection({ index, isActive, onSelect, characterData, scrollProgress }) {
  // Select the correct GLB file based on index
  const modelUrl = `/vision-ui-dashboard-chakra/character_${index + 1}.glb`;
  
  return (
    <MotionBox
      h="100vh"
      w="100%"
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: isActive ? 1 : 0.4,
        scale: isActive ? 1 : 0.95
      }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Animated background with particles effect */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        overflow="hidden"
      >
        {/* Base gradient */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg={`radial-gradient(circle at 50% 50%, ${gamingTheme.colors.bg.secondary}00 0%, ${gamingTheme.colors.bg.primary} 70%)`}
        />
        
        {/* Animated gradient orb */}
        <MotionBox
          position="absolute"
          width="600px"
          height="600px"
          borderRadius="50%"
          bg={`radial-gradient(circle, ${gamingTheme.colors.accent.primary}20, transparent 70%)`}
          left="50%"
          top="50%"
          transform="translate(-50%, -50%)"
          animate={{
            scale: isActive ? [1, 1.2, 1] : 0.8,
            opacity: isActive ? [0.3, 0.5, 0.3] : 0.1,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Grid pattern overlay */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          opacity={0.05}
          backgroundImage={`
            linear-gradient(${gamingTheme.colors.accent.primary}40 1px, transparent 1px),
            linear-gradient(90deg, ${gamingTheme.colors.accent.primary}40 1px, transparent 1px)
          `}
          backgroundSize="50px 50px"
          transform={isActive ? "scale(1)" : "scale(1.1)"}
          transition="transform 0.6s"
        />
      </Box>

      {/* Section number - minimalist approach */}
      <MotionBox
        position="absolute"
        left={{ base: "30px", md: "50px" }}
        top="50%"
        transform="translateY(-50%)"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
      >
        <Text
          fontSize={{ base: "6xl", md: "8xl" }}
          fontFamily={gamingTheme.typography.fonts.heading}
          fontWeight={gamingTheme.typography.weights.black}
          color={gamingTheme.colors.accent.primary}
          opacity={0.15}
        >
          0{index + 1}
        </Text>
      </MotionBox>

      {/* 3D Canvas Container */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        position="relative"
        zIndex={1}
        w={{ base: "90%", md: "70%", lg: "50%" }}
        h="80vh"
      >
        {/* 3D Canvas */}
        <Box
          w="100%"
          h="60%"
          position="relative"
          mb={8}
        >
          <Canvas
            camera={{ position: [0, 0, 5], fov: 40 }}
            style={{ width: "100%", height: "100%" }}
            gl={{ alpha: true, antialias: true }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                intensity={1}
              />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />
              
              <Character
                url={modelUrl}
                isActive={isActive}
              />
              
              <OrbitControls
                enablePan={false}
                enableZoom={false}
                enableRotate={true}
                autoRotate={!isActive}
                autoRotateSpeed={1}
              />
            </Suspense>
          </Canvas>
        </Box>

        {/* Character info - below 3D model */}
        <MotionBox
          w="100%"
          initial={{ y: 50, opacity: 0 }}
          animate={{ 
            y: isActive ? 0 : 20, 
            opacity: isActive ? 1 : 0.6 
          }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
        >
          <VStack spacing={4}>
            <VStack spacing={1}>
              <Text
                fontSize={{ base: "xl", md: "2xl" }}
                fontFamily={gamingTheme.typography.fonts.heading}
                fontWeight={gamingTheme.typography.weights.bold}
                color={gamingTheme.colors.text.primary}
                textTransform="uppercase"
                letterSpacing={gamingTheme.typography.letterSpacing.wide}
              >
                {characterData.name}
              </Text>
              <Text
                fontSize={{ base: "sm", md: "md" }}
                color={gamingTheme.colors.text.secondary}
                textAlign="center"
                maxW="300px"
              >
                {characterData.description}
              </Text>
            </VStack>
            <MotionBox
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Box
                as="button"
                px={{ base: 6, md: 8 }}
                py={{ base: 2, md: 3 }}
                bg={isActive ? gamingTheme.colors.accent.primary : "transparent"}
                color={isActive ? gamingTheme.colors.text.primary : gamingTheme.colors.text.secondary}
                borderRadius="4px"
                border="2px solid"
                borderColor={isActive ? gamingTheme.colors.accent.primary : gamingTheme.colors.border.default}
                fontFamily={gamingTheme.typography.fonts.heading}
                fontSize={{ base: "md", md: "lg" }}
                letterSpacing={gamingTheme.typography.letterSpacing.wide}
                textTransform="uppercase"
                onClick={onSelect}
                cursor="pointer"
                position="relative"
                overflow="hidden"
                _hover={{
                  bg: gamingTheme.colors.accent.primary,
                  borderColor: gamingTheme.colors.accent.primary,
                  color: gamingTheme.colors.text.primary,
                  boxShadow: `0 4px 20px ${gamingTheme.colors.accent.primary}40`,
                }}
                transition="all 0.2s ease"
              >
                Select
              </Box>
            </MotionBox>
          </VStack>
        </MotionBox>
      </Flex>

      {/* Scroll indicator */}
      {index < 3 && (
        <MotionBox
          position="absolute"
          bottom="20px"
          left="50%"
          transform="translateX(-50%)"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <IconButton
            icon={<FaChevronDown />}
            variant="ghost"
            color={gamingTheme.colors.text.muted}
            aria-label="Scroll down"
            fontSize="2xl"
            _hover={{ color: gamingTheme.colors.accent.primary }}
          />
        </MotionBox>
      )}
    </MotionBox>
  );
}

// Main Character Selection Component
export default function CharacterSelection({ onComplete }) {
  const [activeSection, setActiveSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef();

  // Character data (placeholder - same model for now)
  const characters = [
    { name: "Warrior", description: "Strong and brave, master of close combat" },
    { name: "Mage", description: "Wielder of ancient magic and mystic arts" },
    { name: "Rogue", description: "Swift and stealthy, expert in precision" },
    { name: "Paladin", description: "Holy warrior, protector of the realm" },
  ];

  // Handle scroll to detect active section with debounce for smoothness
  const handleScroll = () => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const windowHeight = window.innerHeight;
      const newActiveSection = Math.round(scrollTop / windowHeight);
      
      // Only update if section actually changed
      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }
    }
  };

  // Handle character selection
  const handleSelectCharacter = (index) => {
    setIsTransitioning(true);
    
    // Epic transition animation
    setTimeout(() => {
      onComplete(characters[index]);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {!isTransitioning ? (
        <MotionBox
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          zIndex="9999"
          bg={gamingTheme.colors.bg.primary}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
        >
          {/* Fixed header */}
          <MotionBox
            position="fixed"
            top="0"
            left="0"
            right="0"
            zIndex="10000"
            p={8}
            bg={`${gamingTheme.colors.bg.primary}CC`}
            backdropFilter="blur(10px)"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Text
              fontSize={{ base: "4xl", md: "6xl" }}
              fontFamily={gamingTheme.typography.fonts.heading}
              fontWeight={gamingTheme.typography.weights.black}
              color={gamingTheme.colors.text.primary}
              textAlign="center"
              textTransform="uppercase"
              letterSpacing={gamingTheme.typography.letterSpacing.gaming}
            >
              Pick Your Character!
            </Text>
          </MotionBox>

          {/* Scrollable container with smoother scrolling */}
          <Box
            ref={containerRef}
            h="100vh"
            overflowY="auto"
            onScroll={handleScroll}
            sx={{
              scrollSnapType: "y mandatory",
              scrollBehavior: "smooth",
              scrollPaddingTop: "0px",
              WebkitOverflowScrolling: "touch",
              "&::-webkit-scrollbar": {
                width: "10px",
              },
              "&::-webkit-scrollbar-track": {
                background: gamingTheme.colors.bg.secondary,
              },
              "&::-webkit-scrollbar-thumb": {
                background: gamingTheme.colors.accent.primary,
                borderRadius: "5px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: gamingTheme.colors.accent.danger,
              },
            }}
            // Add smooth scroll physics
            style={{
              scrollBehavior: "smooth",
            }}
          >
            {characters.map((character, index) => (
              <Box
                key={index}
                h="100vh"
                sx={{ scrollSnapAlign: "start" }}
              >
                <CharacterSection
                  index={index}
                  isActive={activeSection === index}
                  onSelect={() => handleSelectCharacter(index)}
                  characterData={character}
                />
              </Box>
            ))}
          </Box>

          {/* Side navigation dots */}
          <MotionBox
            position="fixed"
            right="30px"
            top="50%"
            transform="translateY(-50%)"
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <VStack spacing={4}>
              {[0, 1, 2, 3].map((index) => (
                <Box
                  key={index}
                  w="12px"
                  h="12px"
                  borderRadius="full"
                  bg={activeSection === index ? gamingTheme.colors.accent.primary : gamingTheme.colors.border.default}
                  cursor="pointer"
                  onClick={() => {
                    containerRef.current.scrollTo({
                      top: index * window.innerHeight,
                      behavior: "smooth",
                    });
                  }}
                  transition="all 0.3s"
                  _hover={{
                    transform: "scale(1.5)",
                    bg: gamingTheme.colors.accent.primary,
                  }}
                />
              ))}
            </VStack>
          </MotionBox>
        </MotionBox>
      ) : (
        // Epic transition effect
        <MotionBox
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          zIndex="9999"
          bg={gamingTheme.colors.bg.primary}
          initial={{ opacity: 1 }}
          animate={{
            opacity: 0,
            scale: [1, 1.2, 0],
          }}
          transition={{ duration: 1.5 }}
        >
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          >
            <MotionBox
              animate={{
                rotate: 360,
                scale: [1, 2, 0],
              }}
              transition={{ duration: 1.5 }}
            >
              <Text
                fontSize="6xl"
                fontFamily={gamingTheme.typography.fonts.heading}
                fontWeight={gamingTheme.typography.weights.black}
                color={gamingTheme.colors.accent.primary}
                textTransform="uppercase"
              >
                Loading...
              </Text>
            </MotionBox>
          </Box>
        </MotionBox>
      )}
    </AnimatePresence>
  );
}