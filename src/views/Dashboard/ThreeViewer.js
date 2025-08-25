import React, { Suspense, useRef, useState } from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Button,
  Spinner,
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Html,
  useProgress,
} from "@react-three/drei";
import { FaExpand, FaCompress, FaPlay, FaPause, FaRedo, FaCube } from "react-icons/fa";
import { gamingTheme } from "../../theme/gaming-design-system";
import * as THREE from "three";

// Loading component
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <VStack spacing="4">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color={gamingTheme.colors.accent.primary}
          size="xl"
        />
        <Text color="white" fontSize="lg" fontFamily={gamingTheme.typography.fonts.heading}>
          LOADING {progress.toFixed(0)}%
        </Text>
      </VStack>
    </Html>
  );
}

// Model component
function Model({ url, scale = 1, rotation = [0, 0, 0], position = [0, 0, 0], autoRotate }) {
  const { scene } = useGLTF(url);
  const meshRef = useRef();

  // Auto rotate using useFrame
  useFrame(() => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <primitive
      ref={meshRef}
      object={scene}
      scale={scale}
      rotation={rotation}
      position={position}
    />
  );
}

// 3D Viewer Component
export default function ThreeViewer() {
  const toast = useToast();
  const [selectedModel, setSelectedModel] = useState("base_basic_pbr.glb");
  const [autoRotate, setAutoRotate] = useState(true);
  const [scale, setScale] = useState(1);
  const [lightIntensity, setLightIntensity] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const models = [
    { name: "PBR Model", file: "base_basic_pbr.glb" },
    { name: "Shaded Model", file: "base_basic_shaded.glb" },
  ];

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const resetView = () => {
    setScale(1);
    setLightIntensity(1);
    setAutoRotate(true);
    toast({
      title: "View Reset",
      description: "Camera and settings have been reset",
      status: "info",
      duration: 2000,
      position: "top",
    });
  };

  return (
    <Box
      minH="100vh"
      bg={gamingTheme.colors.bg.primary}
      p={{ base: "4", lg: "8" }}
    >
      {/* Header */}
      <VStack spacing="6" mb="8">
        <Text
          fontSize="4xl"
          fontFamily={gamingTheme.typography.fonts.heading}
          fontWeight={gamingTheme.typography.weights.black}
          color={gamingTheme.colors.text.primary}
          letterSpacing={gamingTheme.typography.letterSpacing.gaming}
          textTransform="uppercase"
          textAlign="center"
        >
          3D MODEL VIEWER
        </Text>
        <Text
          fontSize="lg"
          color={gamingTheme.colors.text.secondary}
          textAlign="center"
        >
          Interactive 3D model visualization with React Three Fiber
        </Text>
      </VStack>

      <Flex
        direction={{ base: "column", lg: "row" }}
        gap="8"
        height={{ base: "auto", lg: "calc(100vh - 250px)" }}
      >
        {/* Controls Panel */}
        <Box
          bg={gamingTheme.colors.bg.card}
          borderRadius={gamingTheme.borders.radius.lg}
          border="1px solid"
          borderColor={gamingTheme.colors.border.default}
          p="6"
          w={{ base: "100%", lg: "350px" }}
          boxShadow={gamingTheme.shadows.card}
        >
          <VStack spacing="6" align="stretch">
            <Text
              fontSize="xl"
              fontFamily={gamingTheme.typography.fonts.heading}
              fontWeight={gamingTheme.typography.weights.bold}
              color={gamingTheme.colors.text.primary}
              letterSpacing={gamingTheme.typography.letterSpacing.wide}
              textTransform="uppercase"
            >
              Controls
            </Text>

            {/* Model Selection */}
            <VStack align="stretch" spacing="2">
              <Text color={gamingTheme.colors.text.secondary} fontSize="sm">
                Model Selection
              </Text>
              <Select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                bg={gamingTheme.colors.bg.secondary}
                borderColor={gamingTheme.colors.border.default}
                color={gamingTheme.colors.text.primary}
                _hover={{ borderColor: gamingTheme.colors.border.hover }}
                _focus={{
                  borderColor: gamingTheme.colors.accent.primary,
                  boxShadow: `0 0 0 1px ${gamingTheme.colors.accent.primary}`,
                }}
              >
                {models.map((model) => (
                  <option key={model.file} value={model.file}>
                    {model.name}
                  </option>
                ))}
              </Select>
            </VStack>

            {/* Scale Control */}
            <VStack align="stretch" spacing="2">
              <HStack justify="space-between">
                <Text color={gamingTheme.colors.text.secondary} fontSize="sm">
                  Scale
                </Text>
                <Text color={gamingTheme.colors.accent.cyan} fontSize="sm">
                  {scale.toFixed(1)}x
                </Text>
              </HStack>
              <Slider
                value={scale}
                onChange={setScale}
                min={0.5}
                max={2}
                step={0.1}
              >
                <SliderTrack bg={gamingTheme.colors.bg.secondary}>
                  <SliderFilledTrack bg={gamingTheme.colors.accent.primary} />
                </SliderTrack>
                <SliderThumb
                  boxSize="6"
                  bg={gamingTheme.colors.accent.primary}
                  _focus={{
                    boxShadow: `0 0 0 3px ${gamingTheme.colors.accent.primary}40`,
                  }}
                />
              </Slider>
            </VStack>

            {/* Light Intensity */}
            <VStack align="stretch" spacing="2">
              <HStack justify="space-between">
                <Text color={gamingTheme.colors.text.secondary} fontSize="sm">
                  Light Intensity
                </Text>
                <Text color={gamingTheme.colors.accent.cyan} fontSize="sm">
                  {(lightIntensity * 100).toFixed(0)}%
                </Text>
              </HStack>
              <Slider
                value={lightIntensity}
                onChange={setLightIntensity}
                min={0}
                max={2}
                step={0.1}
              >
                <SliderTrack bg={gamingTheme.colors.bg.secondary}>
                  <SliderFilledTrack bg={gamingTheme.colors.accent.yellow} />
                </SliderTrack>
                <SliderThumb
                  boxSize="6"
                  bg={gamingTheme.colors.accent.yellow}
                  _focus={{
                    boxShadow: `0 0 0 3px ${gamingTheme.colors.accent.yellow}40`,
                  }}
                />
              </Slider>
            </VStack>

            {/* Action Buttons */}
            <VStack spacing="3">
              <Button
                w="full"
                leftIcon={autoRotate ? <FaPause /> : <FaPlay />}
                onClick={() => setAutoRotate(!autoRotate)}
                bg={gamingTheme.colors.accent.primary}
                color="white"
                _hover={{
                  bg: gamingTheme.colors.accent.primary,
                  transform: "translateY(-2px)",
                  boxShadow: gamingTheme.shadows.neon.red,
                }}
                fontFamily={gamingTheme.typography.fonts.heading}
                letterSpacing={gamingTheme.typography.letterSpacing.wide}
                textTransform="uppercase"
              >
                {autoRotate ? "Pause Rotation" : "Start Rotation"}
              </Button>

              <HStack w="full" spacing="3">
                <Button
                  flex="1"
                  leftIcon={<FaRedo />}
                  onClick={resetView}
                  variant="outline"
                  borderColor={gamingTheme.colors.border.default}
                  color={gamingTheme.colors.text.secondary}
                  _hover={{
                    borderColor: gamingTheme.colors.border.hover,
                    color: gamingTheme.colors.text.primary,
                  }}
                >
                  Reset
                </Button>
                <IconButton
                  icon={isFullscreen ? <FaCompress /> : <FaExpand />}
                  onClick={handleFullscreen}
                  variant="outline"
                  borderColor={gamingTheme.colors.border.default}
                  color={gamingTheme.colors.text.secondary}
                  _hover={{
                    borderColor: gamingTheme.colors.border.hover,
                    color: gamingTheme.colors.text.primary,
                  }}
                  aria-label="Toggle fullscreen"
                />
              </HStack>
            </VStack>

            {/* Info */}
            <Box
              p="4"
              bg={gamingTheme.colors.bg.secondary}
              borderRadius={gamingTheme.borders.radius.md}
              border="1px solid"
              borderColor={gamingTheme.colors.border.default}
            >
              <VStack align="start" spacing="1">
                <Text color={gamingTheme.colors.text.muted} fontSize="xs">
                  CONTROLS
                </Text>
                <Text color={gamingTheme.colors.text.secondary} fontSize="sm">
                  • Left click + drag to rotate
                </Text>
                <Text color={gamingTheme.colors.text.secondary} fontSize="sm">
                  • Right click + drag to pan
                </Text>
                <Text color={gamingTheme.colors.text.secondary} fontSize="sm">
                  • Scroll to zoom
                </Text>
              </VStack>
            </Box>
          </VStack>
        </Box>

        {/* 3D Canvas */}
        <Box
          flex="1"
          bg={gamingTheme.colors.bg.secondary}
          borderRadius={gamingTheme.borders.radius.lg}
          border="2px solid"
          borderColor={gamingTheme.colors.accent.primary}
          overflow="hidden"
          position="relative"
          boxShadow={gamingTheme.shadows.neon.red}
        >
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            style={{ width: "100%", height: "100%" }}
            gl={{ alpha: false }}
            onCreated={({ gl }) => {
              gl.setClearColor('#1a1a1f', 1);
            }}
          >
            <Suspense fallback={<Loader />}>
              <ambientLight intensity={0.5 * lightIntensity} />
              <spotLight 
                position={[10, 10, 10]} 
                angle={0.15} 
                penumbra={1} 
                intensity={lightIntensity}
              />
              <pointLight position={[-10, -10, -10]} intensity={0.5 * lightIntensity} />
              <fog attach="fog" args={['#1a1a1f', 5, 15]} />
              
              <Model
                url={`/vision-ui-dashboard-chakra/${selectedModel}`}
                scale={scale}
                autoRotate={autoRotate}
              />
              
              <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={!autoRotate}
                autoRotate={autoRotate}
                autoRotateSpeed={1}
              />
            </Suspense>
          </Canvas>

          {/* Model Name Overlay */}
          <Box
            position="absolute"
            top="4"
            left="4"
            bg={`${gamingTheme.colors.bg.primary}CC`}
            backdropFilter="blur(10px)"
            px="4"
            py="2"
            borderRadius={gamingTheme.borders.radius.md}
            border="1px solid"
            borderColor={gamingTheme.colors.border.default}
          >
            <Text
              color={gamingTheme.colors.text.primary}
              fontSize="sm"
              fontFamily={gamingTheme.typography.fonts.mono}
            >
              {models.find((m) => m.file === selectedModel)?.name}
            </Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}