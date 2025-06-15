import React from 'react'

const Home: React.FC = () => {
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
              Claude
            </h2>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-500">파일 목록이 여기에 표시됩니다.</p>
            </div>
          </div>
          
          {/* Gemini 섹션 */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Gemini
            </h2>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-500">파일 목록이 여기에 표시됩니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home