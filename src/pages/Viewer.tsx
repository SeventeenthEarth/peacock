import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { loadMetadata, getFileByFilenameAndAI } from '../utils/metadataManager'
import type { FileMetadata } from '../types/metadata'
import ReactRenderer from '../components/renderers/ReactRenderer'
import HTMLRenderer from '../components/renderers/HTMLRenderer'

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


  if (loading) {
    return null
  }

  if (error) {
    return null
  }

  if (!fileMetadata) {
    return null
  }

  return (
    <>
      {fileMetadata.ai === 'claude' && fileMetadata.type === 'react' ? (
        <ReactRenderer filename={fileMetadata.filename} />
      ) : fileMetadata.ai === 'gemini' && fileMetadata.type === 'html' ? (
        <HTMLRenderer filename={fileMetadata.filename} />
      ) : null}
    </>
  )
}

export default Viewer