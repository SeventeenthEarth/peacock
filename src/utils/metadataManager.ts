/**
 * Metadata management utilities for loading, searching, and filtering AI-generated files
 */

import type { MetadataFile, FileMetadata, FilterOptions, SortConfig } from '../types/metadata'

// Cache for loaded metadata
let metadataCache: MetadataFile | null = null

/**
 * Load metadata from JSON file and cache in memory
 * @returns Promise<MetadataFile> The loaded metadata
 */
export const loadMetadata = async (): Promise<MetadataFile> => {
  // Return cached metadata if available
  if (metadataCache) {
    return metadataCache
  }

  try {
    // Fetch metadata from public directory
    const response = await fetch('/references/metadata.json')
    if (!response.ok) {
      throw new Error(`Failed to load metadata: ${response.status} ${response.statusText}`)
    }
    
    const metadata: MetadataFile = await response.json()
    
    // Validate metadata structure
    if (!metadata.version || !Array.isArray(metadata.files)) {
      throw new Error('Invalid metadata format')
    }
    
    // Cache the loaded metadata
    metadataCache = metadata
    
    // Log successful load with file count
    console.log(`Metadata loaded successfully: ${metadata.files.length} files found`)
    
    return metadata
  } catch (error) {
    console.error('Error loading metadata:', error)
    throw new Error('Failed to load file metadata')
  }
}

/**
 * Clear the metadata cache to force reload
 */
export const clearMetadataCache = (): void => {
  metadataCache = null
}

/**
 * Search files by text query
 * Searches in title, description, tags, and filename
 * @param files Array of file metadata
 * @param query Search query string
 * @returns Filtered array of files matching the query
 */
export const searchFiles = (files: FileMetadata[], query: string): FileMetadata[] => {
  if (!query || query.trim() === '') {
    return files
  }
  
  const lowerQuery = query.toLowerCase().trim()
  
  return files.filter(file => {
    // Search in title
    if (file.title.toLowerCase().includes(lowerQuery)) {
      return true
    }
    
    // Search in description
    if (file.description && file.description.toLowerCase().includes(lowerQuery)) {
      return true
    }
    
    // Search in filename
    if (file.filename.toLowerCase().includes(lowerQuery)) {
      return true
    }
    
    // Search in tags
    if (file.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) {
      return true
    }
    
    // Search in dependencies
    if (file.dependencies && file.dependencies.some(dep => dep.toLowerCase().includes(lowerQuery))) {
      return true
    }
    
    // Search in searchText if available
    if (file.searchText && file.searchText.toLowerCase().includes(lowerQuery)) {
      return true
    }
    
    return false
  })
}

/**
 * Filter files based on multiple criteria
 * @param files Array of file metadata
 * @param filters Filter options
 * @returns Filtered array of files
 */
export const filterFiles = (files: FileMetadata[], filters: FilterOptions): FileMetadata[] => {
  let filtered = [...files]
  
  // Filter by AI tool
  if (filters.ai) {
    filtered = filtered.filter(file => file.ai === filters.ai)
  }
  
  // Filter by tags (OR operation - matches any tag)
  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter(file => 
      filters.tags!.some(filterTag => 
        file.tags.some(fileTag => fileTag.toLowerCase() === filterTag.toLowerCase())
      )
    )
  }
  
  // Filter by date range
  if (filters.startDate) {
    const startTime = new Date(filters.startDate).getTime()
    filtered = filtered.filter(file => 
      new Date(file.createdAt).getTime() >= startTime
    )
  }
  
  if (filters.endDate) {
    const endTime = new Date(filters.endDate).getTime()
    filtered = filtered.filter(file => 
      new Date(file.createdAt).getTime() <= endTime
    )
  }
  
  // Filter by dependencies
  if (filters.dependencies && filters.dependencies.length > 0) {
    filtered = filtered.filter(file => 
      file.dependencies && 
      filters.dependencies!.some(dep => 
        file.dependencies!.some(fileDep => fileDep.toLowerCase() === dep.toLowerCase())
      )
    )
  }
  
  return filtered
}

/**
 * Sort files based on specified criteria
 * @param files Array of file metadata
 * @param sortConfig Sort configuration
 * @returns Sorted array of files
 */
export const sortFiles = (files: FileMetadata[], sortConfig: SortConfig): FileMetadata[] => {
  const sorted = [...files]
  const { by, direction } = sortConfig
  const multiplier = direction === 'asc' ? 1 : -1
  
  sorted.sort((a, b) => {
    switch (by) {
      case 'name':
        return a.filename.localeCompare(b.filename) * multiplier
        
      case 'date':
        return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * multiplier
        
      case 'size':
        return (a.size - b.size) * multiplier
        
      case 'ai': {
        // Sort by AI tool, then by filename
        const aiCompare = a.ai.localeCompare(b.ai)
        if (aiCompare !== 0) {
          return aiCompare * multiplier
        }
        return a.filename.localeCompare(b.filename) * multiplier
      }
        
      default:
        return 0
    }
  })
  
  return sorted
}

/**
 * Get all unique tags from files
 * @param files Array of file metadata
 * @returns Array of unique tags
 */
export const getAllTags = (files: FileMetadata[]): string[] => {
  const tagsSet = new Set<string>()
  
  files.forEach(file => {
    file.tags.forEach(tag => tagsSet.add(tag))
  })
  
  return Array.from(tagsSet).sort()
}

/**
 * Get all unique dependencies from files
 * @param files Array of file metadata
 * @returns Array of unique dependencies
 */
export const getAllDependencies = (files: FileMetadata[]): string[] => {
  const depsSet = new Set<string>()
  
  files.forEach(file => {
    if (file.dependencies) {
      file.dependencies.forEach(dep => depsSet.add(dep))
    }
  })
  
  return Array.from(depsSet).sort()
}

/**
 * Get file metadata by ID
 * @param files Array of file metadata
 * @param id File ID
 * @returns File metadata or undefined
 */
export const getFileById = (files: FileMetadata[], id: string): FileMetadata | undefined => {
  return files.find(file => file.id === id)
}

/**
 * Get file metadata by filename and AI type
 * @param files Array of file metadata
 * @param filename Filename to search
 * @param ai AI type (claude or gemini)
 * @returns File metadata or undefined
 */
export const getFileByFilenameAndAI = (
  files: FileMetadata[], 
  filename: string, 
  ai: 'claude' | 'gemini'
): FileMetadata | undefined => {
  return files.find(file => file.filename === filename && file.ai === ai)
}