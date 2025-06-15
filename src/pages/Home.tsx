import React, { useEffect, useState } from 'react'
import { loadMetadata } from '../utils/metadataManager'
import type { FileMetadata } from '../types/metadata'

const Home: React.FC = () => {
  const [files, setFiles] = useState<FileMetadata[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  const claudeFiles = files.filter(file => file.ai === 'claude')
  const geminiFiles = files.filter(file => file.ai === 'gemini')

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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          AI 생성 파일 목록
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Claude 섹션 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Claude ({claudeFiles.length}개)
            </h2>
            <div className="bg-white rounded-lg shadow p-6">
              {claudeFiles.length > 0 ? (
                <ul className="space-y-4">
                  {claudeFiles.map(file => (
                    <li key={file.id} className="border-b pb-4 last:border-b-0">
                      <h3 className="font-semibold text-gray-800">{file.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{file.filename}</p>
                      {file.description && (
                        <p className="text-sm text-gray-500 mt-2">{file.description}</p>
                      )}
                      {file.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {file.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">Claude 파일이 없습니다.</p>
              )}
            </div>
          </div>
          
          {/* Gemini 섹션 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Gemini ({geminiFiles.length}개)
            </h2>
            <div className="bg-white rounded-lg shadow p-6">
              {geminiFiles.length > 0 ? (
                <ul className="space-y-4">
                  {geminiFiles.map(file => (
                    <li key={file.id} className="border-b pb-4 last:border-b-0">
                      <h3 className="font-semibold text-gray-800">{file.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{file.filename}</p>
                      {file.description && (
                        <p className="text-sm text-gray-500 mt-2">{file.description}</p>
                      )}
                      {file.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {file.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">Gemini 파일이 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home