import React from 'react'
import { useParams, Link } from 'react-router-dom'

const Viewer: React.FC = () => {
  const { ai, filename } = useParams<{ ai: string; filename: string }>()

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
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            파일 뷰어
          </h1>
          <p className="text-gray-600">
            AI: {ai}
          </p>
          <p className="text-gray-600">
            파일명: {filename}
          </p>
          <div className="mt-6 p-4 bg-gray-100 rounded">
            <p className="text-gray-500">
              파일 내용이 여기에 표시됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Viewer