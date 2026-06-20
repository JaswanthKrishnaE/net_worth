/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */


import { Platform } from 'react-native';

// constants/theme.ts
export const Colors = {
  light: {
    text: '#11181C',          // Deep Slate, not harsh black
    background: '#F4F5F7',    // Soft off-white, reduces eye strain
    backgroundElement: '#FFFFFF', // Pure white for cards/surfaces
    backgroundSelected: '#EBEBEF', // Subtle gray for active states
    textSecondary: '#6B7280', // Modern slate-gray
    success: "#16A34A",
    danger: "#DC2626",
    warning: "#F59E0B",
    info: "#2563EB",
  },
  dark: {
    text: '#F4F4F5',          // Soft white, not harsh white
    background: '#09090B',    // Near-black, very premium
    backgroundElement: '#18181B', // Deep grey for cards
    backgroundSelected: '#27272A', // Subtle highlight for dark mode
    textSecondary: '#A1A1AA', // Muted silver
    success: "#22C55E",
    danger: "#EF4444",
    warning: "#FBBF24",
    info: "#3B82F6",
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
} as const;

export const Shadows = {
  card: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 10,
    },
    android: {
      elevation: 5,
    },
  }),
};
export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
