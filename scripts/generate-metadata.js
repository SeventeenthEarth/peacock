#!/usr/bin/env node

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, resolve, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');

// Scan files in references directory and generate metadata
async function generateMetadata() {
  const referencesDir = join(projectRoot, 'references');
  const claudeDir = join(referencesDir, 'claude');
  const geminiDir = join(referencesDir, 'gemini');
  
  const files = [];
  
  // Scan Claude files
  try {
    const claudeFiles = readdirSync(claudeDir);
    for (const filename of claudeFiles) {
      if (filename.endsWith('.tsx') || filename.endsWith('.jsx')) {
        const filePath = join(claudeDir, filename);
        const stats = statSync(filePath);
        const content = readFileSync(filePath, 'utf-8');
        
        // Extract title from component name or first comment
        const title = extractTitle(content, filename);
        const description = extractDescription(content);
        const dependencies = extractDependencies(content);
        const tags = generateTags(content, filename);
        
        files.push({
          id: `claude-${basename(filename, extname(filename))}`,
          filename,
          path: `/references/claude/${filename}`,
          ai: 'claude',
          type: 'react',
          title,
          description,
          tags,
          createdAt: stats.birthtime.toISOString(),
          updatedAt: stats.mtime.toISOString(),
          dependencies,
          size: stats.size,
          searchText: `${title} ${description} ${tags.join(' ')}`
        });
      }
    }
  } catch (error) {
    console.warn('Claude directory not found or empty:', error.message);
  }
  
  // Scan Gemini files
  try {
    const geminiFiles = readdirSync(geminiDir);
    for (const filename of geminiFiles) {
      if (filename.endsWith('.html')) {
        const filePath = join(geminiDir, filename);
        const stats = statSync(filePath);
        const content = readFileSync(filePath, 'utf-8');
        
        // Extract title from HTML title tag or filename
        const title = extractHtmlTitle(content, filename);
        const description = extractHtmlDescription(content);
        const dependencies = extractHtmlDependencies(content);
        const tags = generateHtmlTags(content, filename);
        
        files.push({
          id: `gemini-${basename(filename, extname(filename))}`,
          filename,
          path: `/references/gemini/${filename}`,
          ai: 'gemini',
          type: 'html',
          title,
          description,
          tags,
          createdAt: stats.birthtime.toISOString(),
          updatedAt: stats.mtime.toISOString(),
          dependencies,
          size: stats.size,
          searchText: `${title} ${description} ${tags.join(' ')}`
        });
      }
    }
  } catch (error) {
    console.warn('Gemini directory not found or empty:', error.message);
  }
  
  // Generate metadata file
  const metadata = {
    version: '1.0.0',
    lastUpdated: new Date().toISOString(),
    files: files.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
  };
  
  const metadataPath = join(referencesDir, 'metadata.json');
  writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  
  console.log(`Generated metadata for ${files.length} files:`);
  console.log(`- Claude files: ${files.filter(f => f.ai === 'claude').length}`);
  console.log(`- Gemini files: ${files.filter(f => f.ai === 'gemini').length}`);
  console.log(`Metadata saved to: ${metadataPath}`);
}

// Extract title from React component
function extractTitle(content, filename) {
  // Try to find component export name
  const exportMatch = content.match(/export\s+(?:default\s+)?(?:function\s+)?(\w+)/);
  if (exportMatch) {
    return formatTitle(exportMatch[1]);
  }
  
  // Try to find first comment with title
  const commentMatch = content.match(/\/\*\*?\s*([^\n\*]+)/);
  if (commentMatch) {
    return commentMatch[1].trim();
  }
  
  // Fallback to filename
  return formatTitle(basename(filename, extname(filename)));
}

// Extract description from React component
function extractDescription(content) {
  // Look for description in comments
  const descMatch = content.match(/\/\*\*\s*[^\n]*\n\s*\*\s*([^\n\*]+)/);
  if (descMatch) {
    return descMatch[1].trim();
  }
  
  // Look for JSDoc description
  const jsdocMatch = content.match(/@description\s+([^\n\*]+)/);
  if (jsdocMatch) {
    return jsdocMatch[1].trim();
  }
  
  return '';
}

// Extract dependencies from React component
function extractDependencies(content) {
  const deps = [];
  
  // Extract imports
  const importMatches = content.matchAll(/import\s+.*?from\s+['"]([^'"]+)['"]/g);
  for (const match of importMatches) {
    const dep = match[1];
    if (!dep.startsWith('.') && !dep.startsWith('/')) {
      deps.push(dep);
    }
  }
  
  return [...new Set(deps)];
}

// Generate tags from React component content
function generateTags(content, filename) {
  const tags = [];
  
  // Add component-related tags
  if (content.includes('useState')) tags.push('state');
  if (content.includes('useEffect')) tags.push('effect');
  if (content.includes('className')) tags.push('styled');
  if (content.includes('onClick')) tags.push('interactive');
  if (content.includes('form') || content.includes('Form')) tags.push('form');
  if (content.includes('chart') || content.includes('Chart')) tags.push('chart');
  if (content.includes('table') || content.includes('Table')) tags.push('table');
  if (content.includes('modal') || content.includes('Modal')) tags.push('modal');
  if (content.includes('card') || content.includes('Card')) tags.push('card');
  if (content.includes('button') || content.includes('Button')) tags.push('button');
  
  // Add filename-based tags
  const name = basename(filename, extname(filename)).toLowerCase();
  if (name.includes('dashboard')) tags.push('dashboard');
  if (name.includes('resume')) tags.push('resume');
  if (name.includes('profile')) tags.push('profile');
  if (name.includes('landing')) tags.push('landing');
  if (name.includes('admin')) tags.push('admin');
  
  return [...new Set(tags)];
}

// Extract title from HTML file
function extractHtmlTitle(content, filename) {
  // Try to find HTML title tag
  const titleMatch = content.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) {
    return titleMatch[1].trim();
  }
  
  // Try to find h1 tag
  const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  if (h1Match) {
    return h1Match[1].replace(/<[^>]+>/g, '').trim();
  }
  
  // Fallback to filename
  return formatTitle(basename(filename, extname(filename)));
}

// Extract description from HTML file
function extractHtmlDescription(content) {
  // Try to find meta description
  const metaMatch = content.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
  if (metaMatch) {
    return metaMatch[1].trim();
  }
  
  // Try to find first paragraph
  const pMatch = content.match(/<p[^>]*>([^<]+)<\/p>/i);
  if (pMatch) {
    return pMatch[1].replace(/<[^>]+>/g, '').trim();
  }
  
  return '';
}

// Extract dependencies from HTML file
function extractHtmlDependencies(content) {
  const deps = [];
  
  // Extract script src
  const scriptMatches = content.matchAll(/<script[^>]+src=['"]([^'"]+)['"]/gi);
  for (const match of scriptMatches) {
    const src = match[1];
    if (src.includes('cdn') || src.includes('unpkg')) {
      // Extract library name from CDN URL
      const libMatch = src.match(/\/([^\/]+)@?[^\/]*\/[^\/]*\.js/);
      if (libMatch) {
        deps.push(libMatch[1]);
      }
    }
  }
  
  // Extract CSS links
  const linkMatches = content.matchAll(/<link[^>]+href=['"]([^'"]+)['"]/gi);
  for (const match of linkMatches) {
    const href = match[1];
    if (href.includes('tailwind')) deps.push('tailwindcss');
    if (href.includes('bootstrap')) deps.push('bootstrap');
    if (href.includes('bulma')) deps.push('bulma');
  }
  
  return [...new Set(deps)];
}

// Generate tags from HTML content
function generateHtmlTags(content, filename) {
  const tags = [];
  
  // Add content-based tags
  if (content.includes('chart') || content.includes('Chart')) tags.push('chart');
  if (content.includes('table') || content.includes('Table')) tags.push('table');
  if (content.includes('form') || content.includes('Form')) tags.push('form');
  if (content.includes('modal') || content.includes('Modal')) tags.push('modal');
  if (content.includes('carousel') || content.includes('slider')) tags.push('carousel');
  if (content.includes('infographic')) tags.push('infographic');
  if (content.includes('dashboard')) tags.push('dashboard');
  if (content.includes('landing')) tags.push('landing');
  
  // Add filename-based tags
  const name = basename(filename, extname(filename)).toLowerCase();
  if (name.includes('aveva')) tags.push('aveva');
  if (name.includes('comparison')) tags.push('comparison');
  if (name.includes('analysis')) tags.push('analysis');
  if (name.includes('report')) tags.push('report');
  
  return [...new Set(tags)];
}

// Format title from filename or component name
function formatTitle(str) {
  return str
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .replace(/[-_]/g, ' ') // Replace hyphens and underscores with spaces
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
    .trim();
}

// Run the script
generateMetadata().catch(console.error);