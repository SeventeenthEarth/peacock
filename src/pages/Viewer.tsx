import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { loadMetadata, getFileByFilenameAndAI } from '../utils/metadataManager'
import type { FileMetadata } from '../types/metadata'

const Viewer: React.FC = () => {
  const { ai, filename } = useParams<{ ai: string; filename: string }>()
  const [fileMetadata, setFileMetadata] = useState<FileMetadata | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFileMetadata = async () => {
      if (!ai || !filename) {
        setError('잘못된 URL 파라미터입니다.')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const metadata = await loadMetadata()
        const file = getFileByFilenameAndAI(
          metadata.files, 
          filename, 
          ai as 'claude' | 'gemini'
        )
        
        if (file) {
          setFileMetadata(file)
          setError(null)
        } else {
          setError('파일을 찾을 수 없습니다.')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : '파일 메타데이터를 불러오는 중 오류가 발생했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchFileMetadata()
  }, [ai, filename])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">파일 정보를 로드하는 중...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <Link 
              to="/" 
              className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
            >
              ← 목록으로 돌아가기
            </Link>
          </div>
        </nav>
        
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">오류</h1>
            <p className="text-gray-600 mb-4">{error}</p>
            <Link 
              to="/" 
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link 
            to="/" 
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            ← 목록으로 돌아가기
          </Link>
        </div>
      </nav>
      
      <div className="container mx-auto px-4 py-8">
        {fileMetadata && (
          <>
            {/* File Header */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-800 flex-1 mr-4">
                  {fileMetadata.title}
                </h1>
                <span className={`
                  px-3 py-1 text-sm font-medium rounded-full border
                  ${getAIBadgeColor(fileMetadata.ai)}
                `}>
                  {fileMetadata.ai.toUpperCase()}
                </span>
              </div>

              {fileMetadata.description && (
                <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                  {fileMetadata.description}
                </p>
              )}

              {/* File Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-sm text-gray-500 block">파일명</span>
                  <span className="font-mono text-sm">{fileMetadata.filename}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-sm text-gray-500 block">파일 크기</span>
                  <span className="font-medium">{formatFileSize(fileMetadata.size)}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-sm text-gray-500 block">생성일</span>
                  <span className="text-sm">{formatDate(fileMetadata.createdAt)}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-sm text-gray-500 block">수정일</span>
                  <span className="text-sm">{formatDate(fileMetadata.updatedAt)}</span>
                </div>
              </div>

              {/* Tags */}
              {fileMetadata.tags.length > 0 && (
                <div className="mb-4">
                  <span className="text-sm text-gray-500 block mb-2">태그</span>
                  <div className="flex flex-wrap gap-2">
                    {fileMetadata.tags.map(tag => (
                      <span 
                        key={tag}
                        className={`
                          px-2 py-1 text-xs rounded
                          ${fileMetadata.ai === 'claude' 
                            ? 'bg-blue-50 text-blue-700' 
                            : 'bg-green-50 text-green-700'
                          }
                        `}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Dependencies */}
              {fileMetadata.dependencies && fileMetadata.dependencies.length > 0 && (
                <div>
                  <span className="text-sm text-gray-500 block mb-2">의존성</span>
                  <div className="flex flex-wrap gap-2">
                    {fileMetadata.dependencies.map(dep => (
                      <span 
                        key={dep}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded font-mono"
                      >
                        📦 {dep}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* File Content Area */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                파일 내용
              </h2>
              <div className="p-6 bg-gray-50 rounded-lg border">
                <p className="text-gray-500 text-center">
                  {fileMetadata.type === 'react' 
                    ? 'React 컴포넌트가 여기에 렌더링됩니다.' 
                    : 'HTML 콘텐츠가 여기에 표시됩니다.'
                  }
                </p>
                <p className="text-sm text-gray-400 text-center mt-2">
                  실제 파일 렌더링은 PR11, PR12에서 구현됩니다.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Viewer