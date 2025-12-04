import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-unused-vars": "off", // Disable for all variables
      "@typescript-eslint/no-empty-interface": "off", // Allows empty objects
      "@typescript-eslint/no-empty-object-type": "off", // Disables this rule
      "@typescript-eslint/no-unused-vars": "off", // Specifically for TypeScript
      "@typescript-eslint/no-unused-expressions": "off"
    },
  },
];

export default eslintConfig;

