export const getColorFromSeed = (seed: string): string => {
  // List of 10 predefined pastel colors
  const colors: string[] = [
    "#FFD1DC", // Pastel Pink
    "#FFC3A0", // Pastel Orange
    "#FFDFC1", // Pastel Yellow
    "#B5EAD7", // Pastel Green
    "#A7C5EB", // Pastel Blue
    "#C8A2C8", // Pastel Purple
    "#FFABAB", // Pastel Red
    "#FFE4A4", // Pastel Peach
    "#A2DED0", // Pastel Teal
    "#E6D4E6", // Pastel Lavender
  ];

  const hash = (s: string) => {
    let hashValue = 0;
    for (let i = 0; i < s.length; i++) {
      const char = s.charCodeAt(i);
      hashValue = (hashValue * 31 + char) % colors.length;
    }
    return hashValue;
  };

  const hashValue = hash(seed);

  return colors[hashValue]!;
};
