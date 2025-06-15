import { lazy } from 'react';
import type { ComponentType } from 'react';

const claudeModules = import.meta.glob('/references/claude/*.{tsx,jsx}');
const geminiFiles = import.meta.glob('/references/gemini/*.html', { query: '?raw', import: 'default' });

export const loadClaudeComponent = async (filename: string): Promise<ComponentType<Record<string, unknown>>> => {
  const modulePath = `/references/claude/${filename}`;
  
  if (!(modulePath in claudeModules)) {
    throw new Error(`Claude file not found: ${filename}`);
  }

  const moduleLoader = claudeModules[modulePath];
  const module = await moduleLoader() as Record<string, unknown>;
  
  if (typeof module === 'object' && module !== null && 'default' in module) {
    return module.default as ComponentType<Record<string, unknown>>;
  }
  
  throw new Error(`Invalid module format for ${filename}`);
};

export const createLazyClaudeComponent = (filename: string) => {
  return lazy(async () => {
    const Component = await loadClaudeComponent(filename);
    return { default: Component };
  });
};

export const loadGeminiHTML = async (filename: string): Promise<string> => {
  const filePath = `/references/gemini/${filename}`;
  
  if (!(filePath in geminiFiles)) {
    throw new Error(`Gemini file not found: ${filename}`);
  }

  const fileLoader = geminiFiles[filePath];
  const htmlContent = await fileLoader() as string;
  
  if (typeof htmlContent !== 'string') {
    throw new Error(`Invalid HTML content for ${filename}`);
  }
  
  return htmlContent;
};