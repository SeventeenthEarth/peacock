import React from 'react'

interface SearchBarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  placeholder?: string
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  searchQuery, 
  onSearchChange, 
  placeholder = "파일 제목, 설명, 태그로 검색..."
}) => {
  return (
    <div className="relative mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg 
            className="h-5 w-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="
            block w-full pl-10 pr-4 py-3
            text-gray-900 placeholder-gray-500
            bg-white border border-gray-300 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            transition-colors duration-200
          "
          placeholder={placeholder}
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="
              absolute inset-y-0 right-0 pr-3 flex items-center
              text-gray-400 hover:text-gray-600
              transition-colors duration-200
            "
          >
            <svg 
              className="h-5 w-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        )}
      </div>
      
      {searchQuery && (
        <div className="mt-2 text-sm text-gray-600">
          <span className="font-medium">"{searchQuery}"</span>로 검색 중...
        </div>
      )}
    </div>
  )
}

export default SearchBar