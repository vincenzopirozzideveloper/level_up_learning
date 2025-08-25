// Gaming Design System for Level Up Learn
// Inspired by Valorant, Overwatch, and modern gaming UIs

export const gamingColors = {
  // Primary Background Colors (Dark)
  bg: {
    primary: "#0a0a0c",      // Almost black
    secondary: "#131316",     // Slightly lighter black
    tertiary: "#1a1a1f",      // Dark gray
    card: "#1f1f24",          // Card background
    hover: "#28282f",         // Hover state
    elevated: "#2a2a32",      // Elevated elements
  },

  // Accent Colors (Gaming style)
  accent: {
    primary: "#ff4655",       // Red/Pink (Valorant inspired)
    secondary: "#00d4ff",     // Cyan (tech feel)
    success: "#44ff88",       // Green (success/online)
    warning: "#ffaa00",       // Orange (warning)
    danger: "#ff3366",        // Red (danger/error)
    purple: "#9945ff",        // Purple (epic/rare)
    gold: "#ffd700",          // Gold (legendary)
  },

  // Text Colors
  text: {
    primary: "#ffffff",       // Pure white
    secondary: "#b8b8c0",     // Light gray
    muted: "#7a7a85",        // Muted gray
    disabled: "#4a4a52",     // Dark gray
  },

  // Border Colors
  border: {
    default: "rgba(255, 255, 255, 0.08)",
    hover: "rgba(255, 255, 255, 0.12)",
    active: "rgba(255, 70, 85, 0.5)",
  },

  // Gradient Combinations
  gradients: {
    primary: "linear-gradient(135deg, #ff4655 0%, #ff8855 100%)",
    secondary: "linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)",
    dark: "linear-gradient(180deg, #0a0a0c 0%, #1a1a1f 100%)",
    card: "linear-gradient(145deg, #1f1f24 0%, #28282f 100%)",
    shine: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
  },

  // Special Effects
  effects: {
    glow: {
      red: "0 0 20px rgba(255, 70, 85, 0.5)",
      cyan: "0 0 20px rgba(0, 212, 255, 0.5)",
      white: "0 0 20px rgba(255, 255, 255, 0.1)",
    },
    neon: {
      red: "0 0 10px #ff4655, 0 0 20px #ff4655, 0 0 30px #ff4655",
      cyan: "0 0 10px #00d4ff, 0 0 20px #00d4ff, 0 0 30px #00d4ff",
    },
  },
};

export const gamingTypography = {
  // Font Families
  fonts: {
    heading: "'Bebas Neue', 'Oswald', sans-serif",  // Wide, bold font for headings
    body: "'Inter', 'Roboto', sans-serif",           // Clean font for body
    mono: "'JetBrains Mono', 'Fira Code', monospace", // Monospace for code/stats
    display: "'Orbitron', 'Audiowide', sans-serif",   // Futuristic display font
  },

  // Font Sizes
  sizes: {
    xs: "0.75rem",      // 12px
    sm: "0.875rem",     // 14px
    md: "1rem",         // 16px
    lg: "1.125rem",     // 18px
    xl: "1.25rem",      // 20px
    "2xl": "1.5rem",    // 24px
    "3xl": "1.875rem",  // 30px
    "4xl": "2.25rem",   // 36px
    "5xl": "3rem",      // 48px
    "6xl": "4rem",      // 64px
    "7xl": "5rem",      // 80px
  },

  // Font Weights
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  // Letter Spacing
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
    gaming: "0.15em",  // Extra wide for gaming headers
  },

  // Line Heights
  lineHeights: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
};

export const gamingSpacing = {
  0: "0",
  1: "0.25rem",   // 4px
  2: "0.5rem",    // 8px
  3: "0.75rem",   // 12px
  4: "1rem",      // 16px
  5: "1.25rem",   // 20px
  6: "1.5rem",    // 24px
  8: "2rem",      // 32px
  10: "2.5rem",   // 40px
  12: "3rem",     // 48px
  16: "4rem",     // 64px
  20: "5rem",     // 80px
  24: "6rem",     // 96px
  32: "8rem",     // 128px
};

export const gamingBorders = {
  radius: {
    none: "0",
    sm: "0.125rem",    // 2px
    md: "0.25rem",     // 4px
    lg: "0.5rem",      // 8px
    xl: "0.75rem",     // 12px
    "2xl": "1rem",     // 16px
    "3xl": "1.5rem",   // 24px
    full: "9999px",
    gaming: "3px",     // Sharp but not completely square
  },
  width: {
    0: "0",
    1: "1px",
    2: "2px",
    3: "3px",
    4: "4px",
  },
};

export const gamingShadows = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.5)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.5)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
  inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.6)",
  none: "none",
  
  // Gaming specific shadows
  card: "0 4px 20px rgba(0, 0, 0, 0.4)",
  button: "0 2px 10px rgba(0, 0, 0, 0.3)",
  neon: {
    red: "0 0 20px rgba(255, 70, 85, 0.4)",
    cyan: "0 0 20px rgba(0, 212, 255, 0.4)",
    purple: "0 0 20px rgba(153, 69, 255, 0.4)",
  },
};

export const gamingAnimations = {
  // Transition durations
  duration: {
    instant: "0ms",
    fast: "150ms",
    normal: "250ms",
    slow: "350ms",
    slower: "500ms",
  },

  // Easing functions
  easing: {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    gaming: "cubic-bezier(0.4, 0, 0.2, 1)",
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  },

  // Keyframes for animations
  keyframes: {
    pulse: {
      "0%, 100%": { opacity: 1 },
      "50%": { opacity: 0.5 },
    },
    glow: {
      "0%, 100%": { 
        boxShadow: "0 0 5px rgba(255, 70, 85, 0.5)",
        borderColor: "rgba(255, 70, 85, 0.5)",
      },
      "50%": { 
        boxShadow: "0 0 20px rgba(255, 70, 85, 0.8)",
        borderColor: "rgba(255, 70, 85, 0.8)",
      },
    },
    slideIn: {
      "0%": { transform: "translateX(-100%)", opacity: 0 },
      "100%": { transform: "translateX(0)", opacity: 1 },
    },
    fadeIn: {
      "0%": { opacity: 0 },
      "100%": { opacity: 1 },
    },
    scaleIn: {
      "0%": { transform: "scale(0.9)", opacity: 0 },
      "100%": { transform: "scale(1)", opacity: 1 },
    },
  },
};

// Breakpoints for responsive design
export const gamingBreakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
  "3xl": "1920px",
};

// Z-index layers
export const gamingZIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
  notification: 1700,
};

// Export complete theme
export const gamingTheme = {
  colors: gamingColors,
  typography: gamingTypography,
  spacing: gamingSpacing,
  borders: gamingBorders,
  shadows: gamingShadows,
  animations: gamingAnimations,
  breakpoints: gamingBreakpoints,
  zIndex: gamingZIndex,
};

export default gamingTheme;