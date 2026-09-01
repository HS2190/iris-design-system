declare module '@hs2190.an/iris-tokens' {
  const tokens: {
    atomic: Record<string, string>;
    semantic: Record<string, { light: string; dark: string }>;
    scales: { space: Record<string, number>; radius: Record<string, number>; opacity: Record<string, number>; stroke: Record<string, number>; breakpoint: Record<string, number>; layout: Record<string, number> };
    platform: Record<string, { web: number; ios: number; android: number }>;
    typography: { n: string; s: number; lh: number; ls: number; w: number }[];
    elevation: Record<string, { y: number; b: number; s: number; a: number }[]>;
  };
  export default tokens;
}
