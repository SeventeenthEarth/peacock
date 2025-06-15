import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { RefreshCw, HelpCircle } from 'lucide-react'
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
  const [refreshing, setRefreshing] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  // Close help popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showHelp && !((event.target as Element)?.closest('.help-popup-container'))) {
        setShowHelp(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showHelp])

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

  const handleRefreshMetadata = async () => {
    try {
      setRefreshing(true)
      setError(null)
      
      // Force reload metadata by clearing cache
      const metadata = await loadMetadata(true)
      setFiles(metadata.files)
      
      // Show success message briefly
      setTimeout(() => {
        setRefreshing(false)
      }, 1000)
      
    } catch (err) {
      // Show helpful error message with instructions
      const errorMessage = err instanceof Error ? err.message : 'Failed to refresh metadata'
      setError(`${errorMessage}\n\n새 파일을 추가했다면 터미널에서 'npm run generate-metadata' 명령을 실행한 후 다시 시도해주세요.`)
      setRefreshing(false)
    }
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
        <div className="max-w-md text-center">
          <div className="bg-white border border-red-200 rounded-lg p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-red-800 mb-3">오류가 발생했습니다</h2>
            <pre className="text-red-600 mb-4 text-sm whitespace-pre-wrap text-left bg-red-50 p-3 rounded border">
              {error}
            </pre>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              다시 시도
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 home-page">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            AI 생성 파일 목록
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              총 {files.length}개 파일
            </div>
            <div className="relative help-popup-container">
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                title="도움말"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
              
              {showHelp && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10">
                  <h3 className="font-semibold text-gray-800 mb-2">새 파일 추가 방법</h3>
                  <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                    <li>Claude 파일(.tsx, .jsx)을 <code className="bg-gray-100 px-1 rounded">references/claude/</code> 폴더에 저장</li>
                    <li>Gemini 파일(.html)을 <code className="bg-gray-100 px-1 rounded">references/gemini/</code> 폴더에 저장</li>
                    <li>터미널에서 <code className="bg-gray-100 px-1 rounded">npm run generate-metadata</code> 실행</li>
                    <li>'파일 목록 새로고침' 버튼 클릭</li>
                  </ol>
                  <button
                    onClick={() => setShowHelp(false)}
                    className="mt-3 text-xs text-blue-600 hover:text-blue-800"
                  >
                    닫기
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={handleRefreshMetadata}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? '새로고침 중...' : '파일 목록 새로고침'}
            </button>
          </div>
        </div>
        
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