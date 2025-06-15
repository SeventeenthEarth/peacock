import React from 'react'
import type { FileMetadata } from '../types/metadata'

interface FileCardProps {
  file: FileMetadata
  onClick?: () => void
}

const FileCard: React.FC<FileCardProps> = ({ file, onClick }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  const getAIBadgeColor = (ai: 'claude' | 'gemini') => {
    return ai === 'claude' 
      ? 'bg-blue-100 text-blue-800 border-blue-200' 
      : 'bg-green-100 text-green-800 border-green-200'
  }

  const getTagColor = (ai: 'claude' | 'gemini') => {
    return ai === 'claude' 
      ? 'bg-blue-50 text-blue-700' 
      : 'bg-green-50 text-green-700'
  }

  return (
    <div 
      className={`
        bg-white rounded-lg border border-gray-200 p-4 
        transition-all duration-200 ease-in-out
        hover:shadow-lg hover:border-gray-300 hover:-translate-y-1
        ${onClick ? 'cursor-pointer' : ''}
      `}
      onClick={onClick}
    >
      {/* Header with title and AI badge */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-900 text-lg leading-tight flex-1 mr-2">
          {file.title}
        </h3>
        <span className={`
          px-2 py-1 text-xs font-medium rounded-full border
          ${getAIBadgeColor(file.ai)}
        `}>
          {file.ai.toUpperCase()}
        </span>
      </div>

      {/* Filename */}
      <p className="text-sm text-gray-600 mb-2 font-mono bg-gray-50 px-2 py-1 rounded">
        {file.filename}
      </p>

      {/* Description */}
      {file.description && (
        <p className="text-sm text-gray-700 mb-3 leading-relaxed">
          {file.description}
        </p>
      )}

      {/* Tags */}
      {file.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {file.tags.map(tag => (
            <span 
              key={tag} 
              className={`
                px-2 py-1 text-xs rounded
                ${getTagColor(file.ai)}
              `}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer with metadata */}
      <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-3">
          <span>
            {formatDate(file.createdAt)}
          </span>
          <span>
            {formatFileSize(file.size)}
          </span>
        </div>
        {file.dependencies && file.dependencies.length > 0 && (
          <div className="flex items-center">
            <span className="mr-1">📦</span>
            <span>{file.dependencies.length}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default FileCard