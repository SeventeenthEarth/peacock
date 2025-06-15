import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadMetadata, searchFiles, filterFiles, getAllTags } from '../utils/metadataManager'
import type { FileMetadata, FilterOptions } from '../types/metadata'
import FileCard from '../components/FileCard'
import SearchBar from '../components/SearchBar'
import FilterPanel from '../components/FilterPanel'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const [files, setFiles] = useState<FileMetadata[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<FilterOptions>({})

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setLoading(true)
        const metadata = await loadMetadata()
        setFiles(metadata.files)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load metadata')
        console.error('Error loading metadata:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMetadata()
  }, [])

  // Get available tags for filter panel
  const availableTags = useMemo(() => {
    return getAllTags(files)
  }, [files])

  // Apply search and filter
  const filteredFiles = useMemo(() => {
    let result = files
    
    // Apply search first
    if (searchQuery) {
      result = searchFiles(result, searchQuery)
    }
    
    // Apply filters
    result = filterFiles(result, filters)
    
    return result
  }, [files, searchQuery, filters])

  const claudeFiles = filteredFiles.filter(file => file.ai === 'claude')
  const geminiFiles = filteredFiles.filter(file => file.ai === 'gemini')

  const handleFileClick = (file: FileMetadata) => {
    navigate(`/view/${file.ai}/${file.filename}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">메타데이터를 로드하는 중...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            다시 시도
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 home-page">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          AI 생성 파일 목록
        </h1>
        
        <SearchBar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <FilterPanel 
          filters={filters}
          onFiltersChange={setFilters}
          availableTags={availableTags}
        />

        {/* Search and filter results summary */}
        {(searchQuery || Object.keys(filters).length > 0) && (
          <div className="mb-6 text-sm text-gray-600">
            <span className="font-medium">
              총 {filteredFiles.length}개 파일 발견
            </span>
            {filteredFiles.length === 0 && (
              <span className="text-gray-500 ml-2">
                - 검색/필터 조건에 맞는 파일이 없습니다.
              </span>
            )}
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Claude 섹션 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Claude ({claudeFiles.length}개)
            </h2>
            <div className="space-y-4">
              {claudeFiles.length > 0 ? (
                claudeFiles.map(file => (
                  <FileCard 
                    key={file.id} 
                    file={file}
                    onClick={() => handleFileClick(file)}
                  />
                ))
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                  <p className="text-gray-500">
                    {(searchQuery || Object.keys(filters).length > 0) 
                      ? '검색/필터 조건에 맞는 Claude 파일이 없습니다.' 
                      : 'Claude 파일이 없습니다.'
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Gemini 섹션 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Gemini ({geminiFiles.length}개)
            </h2>
            <div className="space-y-4">
              {geminiFiles.length > 0 ? (
                geminiFiles.map(file => (
                  <FileCard 
                    key={file.id} 
                    file={file}
                    onClick={() => handleFileClick(file)}
                  />
                ))
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                  <p className="text-gray-500">
                    {(searchQuery || Object.keys(filters).length > 0) 
                      ? '검색/필터 조건에 맞는 Gemini 파일이 없습니다.' 
                      : 'Gemini 파일이 없습니다.'
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home