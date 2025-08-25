import React, { useState, useRef, Suspense } from "react";
import {
  Box,
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
function Character({ url, isActive, onClick }) {
  const { scene } = useGLTF(url);
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current && isActive) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });

  return (
    <Float
      speed={isActive ? 2 : 0}
      rotationIntensity={isActive ? 0.5 : 0}
      floatIntensity={isActive ? 0.5 : 0}
    >
      <primitive
        ref={meshRef}
        object={scene}
        scale={isActive ? 1.2 : 1}
        onClick={onClick}
        onPointerOver={(e) => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          document.body.style.cursor = 'auto';
        }}
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
function CharacterSection({ index, isActive, onSelect, characterData }) {
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
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Background gradient - simplified per UX-UI guidelines */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg={gamingTheme.colors.bg.primary}
        opacity={isActive ? 1 : 0.85}
        transition="opacity 0.3s"
      />

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

      {/* 3D Canvas */}
      <Box
        w={{ base: "90%", md: "60%", lg: "40%" }}
        h="70%"
        position="relative"
        zIndex={1}
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
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
              onClick={onSelect}
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

        {/* Character info - minimalist approach per UX-UI guidelines */}
        <MotionBox
          position="absolute"
          bottom="30px"
          left="50%"
          transform="translateX(-50%)"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
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
      </Box>

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

  // Handle scroll to detect active section
  const handleScroll = () => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const windowHeight = window.innerHeight;
      const newActiveSection = Math.round(scrollTop / windowHeight);
      setActiveSection(newActiveSection);
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

          {/* Scrollable container */}
          <Box
            ref={containerRef}
            h="100vh"
            overflowY="auto"
            onScroll={handleScroll}
            sx={{
              scrollSnapType: "y mandatory",
              scrollBehavior: "smooth",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: gamingTheme.colors.bg.secondary,
              },
              "&::-webkit-scrollbar-thumb": {
                background: gamingTheme.colors.accent.primary,
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: gamingTheme.colors.accent.danger,
              },
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