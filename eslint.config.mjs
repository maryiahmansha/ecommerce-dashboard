import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettierPlugin from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // Ensure Prettier show up as ESLint errors
      'prettier/prettier': 'error',

      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': 'off', // handled by TS
      '@typescript-eslint/no-unused-vars': ['warn'],
      'react/react-in-jsx-scope': 'off', // not needed in Next.js
    },
  },
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
];

export default eslintConfig;
