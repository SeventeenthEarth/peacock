/**
 * File metadata interfaces for AI-generated files
 */

export interface FileMetadata {
  id: string                    // Unique identifier (e.g., "claude-dashboard-tsx")
  filename: string              // File name
  path: string                  // Relative path
  ai: 'claude' | 'gemini'      // AI tool
  type: 'react' | 'html'       // File type
  title: string                 // Display title
  description?: string          // File description
  tags: string[]               // Search tags
  createdAt: string            // ISO 8601 format
  updatedAt: string            // ISO 8601 format
  dependencies?: string[]       // Used libraries
  size: number                 // File size in bytes
  searchText?: string          // Search optimization text
}

export interface MetadataFile {
  version: string              // Metadata version
  lastUpdated: string          // Last update timestamp
  files: FileMetadata[]        // File list
}

/**
 * Filter options for file search
 */
export interface FilterOptions {
  ai?: 'claude' | 'gemini'
  tags?: string[]
  startDate?: string
  endDate?: string
  dependencies?: string[]
}

/**
 * Sort options for file list
 */
export type SortOption = 'name' | 'date' | 'size' | 'ai'
export type SortDirection = 'asc' | 'desc'

export interface SortConfig {
  by: SortOption
  direction: SortDirection
}