export type BadgePreset = {
  diameter: number;
  borderWidth: number;
  inset: number;
  contentPercent: number;
};

export const badgePresets = {
  header: (width: number): BadgePreset => ({
    diameter: width * 0.3073, 
    borderWidth: 3,
    inset: 0,
    contentPercent: 85,
  }),

  button: {
    diameter: 56,
    borderWidth: 3,
    inset: 0,
    contentPercent: 80,
  } as BadgePreset,
} as const;
