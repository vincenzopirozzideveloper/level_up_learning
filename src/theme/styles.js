import { gamingTheme } from './gaming-design-system';

export const globalStyles = {
  colors: {
    // Gaming grayscale palette
    gray: {
      50: "#f8f8f9",
      100: "#e8e8eb",
      200: "#d1d1d6",
      300: "#b8b8c0",
      400: "#9a9aa5",
      500: "#7a7a85",
      600: "#5a5a65",
      700: "#4a4a52",
      800: "#2a2a32",
      900: "#1a1a1f",
    },
    
    // Gaming brand colors (red/pink accent)
    brand: {
      50: "#ffe5e8",
      100: "#ffb8bf",
      200: "#ff8a96",
      300: "#ff5c6d",
      400: "#ff4655",
      500: "#ff2e44",
      600: "#e6263c",
      700: "#cc1e33",
      800: "#b3162b",
      900: "#990e22",
    },
    
    // Gaming accent colors
    accent: {
      cyan: "#00d4ff",
      purple: "#9945ff",
      green: "#44ff88",
      orange: "#ffaa00",
      gold: "#ffd700",
    },
    
    // Background colors
    bg: {
      primary: "#0a0a0c",
      secondary: "#131316",
      tertiary: "#1a1a1f",
      card: "#1f1f24",
      hover: "#28282f",
    },
    
    // Semantic colors
    success: "#44ff88",
    warning: "#ffaa00",
    error: "#ff3366",
    info: "#00d4ff",
  },
  
  styles: {
    global: (props) => ({
      body: {
        bg: gamingTheme.colors.bg.primary,
        color: gamingTheme.colors.text.primary,
        fontFamily: gamingTheme.typography.fonts.body,
        fontSize: gamingTheme.typography.sizes.md,
        lineHeight: gamingTheme.typography.lineHeights.normal,
        overflowX: "hidden",
      },
      
      "*::placeholder": {
        color: gamingTheme.colors.text.muted,
      },
      
      html: {
        fontFamily: gamingTheme.typography.fonts.body,
        scrollBehavior: "smooth",
      },
      
      // Headings with gaming font
      "h1, h2, h3, h4, h5, h6": {
        fontFamily: gamingTheme.typography.fonts.heading,
        letterSpacing: gamingTheme.typography.letterSpacing.wide,
        fontWeight: gamingTheme.typography.weights.bold,
        textTransform: "uppercase",
      },
      
      // Links
      a: {
        color: gamingTheme.colors.accent.primary,
        textDecoration: "none",
        transition: `color ${gamingTheme.animations.duration.fast} ${gamingTheme.animations.easing.gaming}`,
        _hover: {
          color: gamingTheme.colors.accent.secondary,
          textDecoration: "none",
        },
      },
      
      // Scrollbar styling
      "::-webkit-scrollbar": {
        width: "8px",
        height: "8px",
      },
      "::-webkit-scrollbar-track": {
        background: gamingTheme.colors.bg.secondary,
      },
      "::-webkit-scrollbar-thumb": {
        background: gamingTheme.colors.border.default,
        borderRadius: gamingTheme.borders.radius.full,
        transition: `background ${gamingTheme.animations.duration.fast}`,
        _hover: {
          background: gamingTheme.colors.text.muted,
        },
      },
      
      // Selection
      "::selection": {
        background: gamingTheme.colors.accent.primary,
        color: gamingTheme.colors.text.primary,
      },
      
      // Focus styles
      "*:focus": {
        outline: "none",
        boxShadow: `0 0 0 2px ${gamingTheme.colors.accent.primary}`,
      },
      
      // Disable default button styles
      button: {
        cursor: "pointer",
        fontFamily: gamingTheme.typography.fonts.body,
      },
      
      // Input styles
      input: {
        fontFamily: gamingTheme.typography.fonts.body,
      },
    }),
  },
  
  // Component specific styles
  components: {
    Button: {
      baseStyle: {
        fontFamily: gamingTheme.typography.fonts.heading,
        fontWeight: gamingTheme.typography.weights.bold,
        textTransform: "uppercase",
        letterSpacing: gamingTheme.typography.letterSpacing.wider,
        borderRadius: gamingTheme.borders.radius.gaming,
        transition: `all ${gamingTheme.animations.duration.normal} ${gamingTheme.animations.easing.gaming}`,
        _hover: {
          transform: "translateY(-2px)",
          boxShadow: gamingTheme.shadows.button,
        },
        _active: {
          transform: "translateY(0)",
        },
      },
      variants: {
        gaming: {
          bg: gamingTheme.colors.accent.primary,
          color: gamingTheme.colors.text.primary,
          _hover: {
            bg: gamingTheme.colors.accent.primary,
            boxShadow: gamingTheme.shadows.neon.red,
          },
        },
        ghost: {
          color: gamingTheme.colors.text.secondary,
          _hover: {
            bg: gamingTheme.colors.bg.hover,
            color: gamingTheme.colors.text.primary,
          },
        },
      },
    },
    
    Card: {
      baseStyle: {
        bg: gamingTheme.colors.bg.card,
        borderRadius: gamingTheme.borders.radius.lg,
        border: `1px solid ${gamingTheme.colors.border.default}`,
        boxShadow: gamingTheme.shadows.card,
        transition: `all ${gamingTheme.animations.duration.normal} ${gamingTheme.animations.easing.gaming}`,
        _hover: {
          borderColor: gamingTheme.colors.border.hover,
          transform: "translateY(-4px)",
          boxShadow: gamingTheme.shadows.xl,
        },
      },
    },
    
    Input: {
      baseStyle: {
        field: {
          bg: gamingTheme.colors.bg.secondary,
          color: gamingTheme.colors.text.primary,
          borderColor: gamingTheme.colors.border.default,
          _hover: {
            borderColor: gamingTheme.colors.border.hover,
          },
          _focus: {
            borderColor: gamingTheme.colors.accent.primary,
            boxShadow: `0 0 0 1px ${gamingTheme.colors.accent.primary}`,
          },
          _placeholder: {
            color: gamingTheme.colors.text.muted,
          },
        },
      },
    },
    
    Text: {
      baseStyle: {
        color: gamingTheme.colors.text.primary,
      },
    },
    
    Heading: {
      baseStyle: {
        color: gamingTheme.colors.text.primary,
        fontFamily: gamingTheme.typography.fonts.heading,
        letterSpacing: gamingTheme.typography.letterSpacing.wider,
      },
    },
  },
  
  // Semantic tokens for light/dark mode
  semanticTokens: {
    colors: {
      text: {
        default: gamingTheme.colors.text.primary,
        _dark: gamingTheme.colors.text.primary,
      },
      bg: {
        default: gamingTheme.colors.bg.primary,
        _dark: gamingTheme.colors.bg.primary,
      },
      border: {
        default: gamingTheme.colors.border.default,
        _dark: gamingTheme.colors.border.default,
      },
    },
  },
};