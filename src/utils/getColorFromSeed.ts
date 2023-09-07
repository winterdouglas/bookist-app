import { pastelColors } from "@/theme";

const MagicNumber = 31;

const hash = (seed: string) => {
  let hashValue = 0;
  for (let i = 0; i < seed.length; i++) {
    const charCode = seed.charCodeAt(i);

    // The fixed number 31 is used in this hash function as a constant multiplier in the hashing formula.
    // Prime numbers are often used in hash functions because they tend to produce better distribution of hash values,
    // reducing the likelihood of collisions.
    //
    // 31 is a prime number that is close to a power of 2 (i.e., 2^5 = 32)
    // (x << 5) - x === x * 31
    hashValue = (hashValue * MagicNumber + charCode) % pastelColors.length;
  }
  return hashValue;
};

export const getColorFromSeed = (seed: string): string => {
  const index = hash(seed);

  return pastelColors[index]!;
};
