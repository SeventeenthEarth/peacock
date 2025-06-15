import React from 'react'
import type { FilterOptions } from '../types/metadata'

interface FilterPanelProps {
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
  availableTags: string[]
}

const FilterPanel: React.FC<FilterPanelProps> = ({ 
  filters, 
  onFiltersChange, 
  availableTags 
}) => {
  const handleAIFilterChange = (ai: 'claude' | 'gemini' | undefined) => {
    onFiltersChange({
      ...filters,
      ai
    })
  }

  const handleTagToggle = (tag: string) => {
    const currentTags = filters.tags || []
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag]
    
    onFiltersChange({
      ...filters,
      tags: newTags.length > 0 ? newTags : undefined
    })
  }

  const clearFilters = () => {
    onFiltersChange({})
  }

  const hasActiveFilters = filters.ai || (filters.tags && filters.tags.length > 0)

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">필터</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            모든 필터 초기화
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* AI 도구 필터 */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">AI 도구</h4>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleAIFilterChange(undefined)}
              className={`
                px-3 py-2 text-sm rounded-lg border transition-colors duration-200
                ${!filters.ai 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }
              `}
            >
              전체
            </button>
            <button
              onClick={() => handleAIFilterChange('claude')}
              className={`
                px-3 py-2 text-sm rounded-lg border transition-colors duration-200
                ${filters.ai === 'claude'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }
              `}
            >
              Claude
            </button>
            <button
              onClick={() => handleAIFilterChange('gemini')}
              className={`
                px-3 py-2 text-sm rounded-lg border transition-colors duration-200
                ${filters.ai === 'gemini'
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }
              `}
            >
              Gemini
            </button>
          </div>
        </div>

        {/* 태그 필터 */}
        {availableTags.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">태그</h4>
            <div className="flex flex-wrap gap-2">
              {availableTags.map(tag => (
                <label
                  key={tag}
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.tags?.includes(tag) || false}
                    onChange={() => handleTagToggle(tag)}
                    className="sr-only"
                  />
                  <span
                    className={`
                      px-3 py-2 text-sm rounded-lg border transition-colors duration-200
                      ${filters.tags?.includes(tag)
                        ? 'bg-gray-800 text-white border-gray-800'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                      }
                    `}
                  >
                    #{tag}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* 활성 필터 요약 */}
        {hasActiveFilters && (
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-2">활성 필터</h4>
            <div className="flex flex-wrap gap-2">
              {filters.ai && (
                <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                  AI: {filters.ai}
                  <button
                    onClick={() => handleAIFilterChange(undefined)}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.tags?.map(tag => (
                <span 
                  key={tag}
                  className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded"
                >
                  #{tag}
                  <button
                    onClick={() => handleTagToggle(tag)}
                    className="ml-1 text-gray-600 hover:text-gray-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FilterPanel