import { gamingTheme } from './gaming-design-system';

export const bgAdmin = {
  styles: {
    global: (props) => ({
      body: {
        bg: gamingTheme.colors.bg.primary,
        position: "relative",
        "&::before": {
          content: '""',
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(
              circle at 20% 50%,
              rgba(255, 70, 85, 0.03) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 80% 80%,
              rgba(0, 212, 255, 0.03) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 40% 20%,
              rgba(153, 69, 255, 0.02) 0%,
              transparent 50%
            )
          `,
          pointerEvents: "none",
          zIndex: 0,
        },
        "&::after": {
          content: '""',
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            linear-gradient(
              180deg,
              transparent 0%,
              rgba(10, 10, 12, 0.2) 50%,
              rgba(10, 10, 12, 0.8) 100%
            )
          `,
          pointerEvents: "none",
          zIndex: 0,
        },
      },
      "#root": {
        position: "relative",
        zIndex: 1,
      },
    }),
  },
};