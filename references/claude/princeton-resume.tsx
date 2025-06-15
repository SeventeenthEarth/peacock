import React from 'react';
import { Mail, Phone, Calendar, Award, Briefcase, GraduationCap, Code, Users, Target, Globe, CheckCircle } from 'lucide-react';

const Resume = () => {
  return (
    <div className="max-w-5xl mx-auto bg-white p-8">
      {/* Header Section with Background */}
      <div className="bg-blue-800 text-white rounded-t-lg p-8 shadow-lg">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">정영훈</h1>
            <p className="text-lg mb-4 text-blue-100">클라우드 네이티브 기술 전문가</p>
            <div className="flex flex-wrap gap-6 text-sm text-blue-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>1984년 11월 27일</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>aeuveritas@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>010-2155-8466</span>
              </div>
            </div>
          </div>
          <div className="w-36 h-44 bg-white/10 backdrop-blur border-2 border-white/30 rounded-lg flex items-center justify-center text-white/60 text-sm text-center">
            <div>
              <p>증명사진</p>
              <p className="text-xs mt-1">(3.5cm × 4.5cm)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-b-lg shadow-lg border border-gray-200">
        {/* Profile Section */}
        <section className="p-8 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-blue-700" />
            <h2 className="text-2xl font-bold text-slate-900">프로필</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            소프트웨어 개발자로서 복잡한 기술 문제를 해결하는 것에서 큰 보람을 느끼면서도, 늘 우리 사회와 정치에 대한 깊은 관심을 놓지 않았습니다.
            기술의 발전이 어떻게 하면 시민의 삶을 더 풍요롭게 하고 민주주의에 기여할 수 있을까를 항상 고민해 왔습니다.
            SAP 한국 연구소에서 엔터프라이즈 소프트웨어 기술 전문가로 일하며 얻은 경험과 더불어민주당 당원으로서 참여한 활동들은 이러한 고민을 실천으로 옮기는 소중한 자산이 되었습니다.
            이제는 IT 기술 전문가로서 기술 현장과 정책 결정 사이의 간극을 메우고 현장의 의견을 수렴하여, 실질적인 'AI 강국 대한민국' 정책이 수립될 수 있도록 최선을 다하겠습니다.
          </p>
        </section>

        {/* Experience Section */}
        <section className="p-8 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="w-6 h-6 text-blue-700" />
            <h2 className="text-2xl font-bold text-slate-900">주요 경력</h2>
          </div>

          {/* SAP */}
          <div className="mb-8">
            <div className="bg-gray-50 rounded-lg p-6 mb-4 border-l-4 border-blue-600">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">SAP 한국연구소</h3>
                  <p className="text-gray-700 font-medium">클라우드 네이티브(Kubernetes) 기술 전문가</p>
                </div>
                <span className="bg-blue-700 text-white px-3 py-1 rounded text-sm">2016.10 ~ 현재 (9년차)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 ml-4">
              <div>
                <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  핵심 성과
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400 mt-1">•</span>
                    <span>해외 특허 2건 핵심 기여자 등재 (등록 1건, 출원 1건)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400 mt-1">•</span>
                    <span>2년 연속 최우수 성과자 선정 (2021-2022)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400 mt-1">•</span>
                    <span>글로벌 대규모 클라우드 DB 서비스의 핵심 기능들의 설계 및 개발에 참여하고, 안정적인 상용 서비스 출시</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400 mt-1">•</span>
                    <span>국제공인 자격증 CKAD, CKA 취득</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-600" />
                  주요 프로젝트
                </h4>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-slate-800 mb-2">2020~현재: 글로벌 탑티어급 클라우드 데이터베이스 서비스 개발</p>
                    <ul className="text-sm text-gray-600 space-y-1 ml-4">
                      <li>• 탄력적 컴퓨팅 노드 연결 기술 개발</li>
                      <li>• 다중 사용자 데이터베이스 공유 기능 연구개발</li>
                      <li className="text-blue-700 font-medium">• 해외 특허: Native database tenant lifecycle management</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 mb-2">2016~2020: 데이터베이스 핵심 기술 연구개발</p>
                    <ul className="text-sm text-gray-600 space-y-1 ml-4">
                      <li>• DB 재시작 시 클라이언트 컨텍스트 유지 기술 개발</li>
                      <li>• 신규 코어 엔진 개발로 시스템 안정성 강화</li>
                      <li className="text-blue-700 font-medium">• 해외 특허: Transparent database session recovery with client-side caching</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LG Electronics */}
          <div>
            <div className="bg-gray-50 rounded-lg p-6 mb-4 border-l-4 border-gray-400">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">LG전자 CTO부문 SW플랫폼연구소</h3>
                  <p className="text-gray-700 font-medium">모바일 플랫폼팀 주임연구원</p>
                </div>
                <span className="bg-gray-600 text-white px-3 py-1 rounded text-sm">2013.08 ~ 2016.10 (3년 2개월)</span>
              </div>
            </div>

            <div className="ml-4">
              <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-gray-600" />
                핵심 성과
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 mt-1">•</span>
                  <span>신입사원 교육 최우수상 및 베스트 동료상 수상</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 mt-1">•</span>
                  <span>모바일 WebOS 저전력 기술을 개발하여 신규 스마트 시계 모델 출시에 기여</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 mt-1">•</span>
                  <span>ADAS 개발용 embedded AI 개발 프로세스 정립</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="p-8 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-6 h-6 text-blue-700" />
            <h2 className="text-2xl font-bold text-slate-900">학력</h2>
          </div>

          <div className="space-y-6">
            <div className="pl-6 border-l-4 border-blue-600">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-slate-900">울산과학기술원(UNIST)</h3>
                <span className="text-gray-600">2011.09 ~ 2013.08</span>
              </div>
              <p className="font-medium text-gray-700 mb-3">컴퓨터공학 석사</p>
              <ul className="space-y-2 text-gray-700">
                <li>• 병렬 연산 반도체 설계 연구</li>
                <li>• 한국 반도체 학술대회 동부 논문상 수상
                  <div className="ml-4 mt-1 text-sm text-gray-600">- Selective Execution of Conditional Statements for CGRAs</div>
                </li>
                <li>• SCI급 국제학술지 주저자 논문 게재 (ACM TACO)
                  <div className="ml-4 mt-1 text-sm text-gray-600">- Evaluator-executor transformation for efficient pipelining of loops with conditionals, 2013</div>
                </li>
                <li>• LG전자 취업연계 장학생 선발</li>
              </ul>
            </div>

            <div className="pl-6 border-l-4 border-gray-400">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-slate-900">부산대학교</h3>
                <span className="text-gray-600">2003.03 ~ 2011.02</span>
              </div>
              <p className="font-medium text-gray-700 mb-3">전자전기공학 학사</p>
              <ul className="space-y-2 text-gray-700">
                <li>• 4년 전액 이공계 장학생 선발</li>
                <li>• 해병대 복무 (2004.04 ~ 2006.04, 24개월)</li>
                <li>• 미국 어학연수 1년 및 장기 자동차 유럽 여행을 통한 글로벌 마인드 함양</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Certifications & Awards Section */}
        <section className="p-8 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-blue-700" />
            <h2 className="text-2xl font-bold text-slate-900">자격증 및 수상</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                국제공인 자격증
              </h3>
              <ul className="space-y-2 text-gray-700 ml-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  CKAD (Certified Kubernetes Application Developer)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  CKA (Certified Kubernetes Administrator)
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                주요 수상
              </h3>
              <ul className="space-y-2 text-gray-700 ml-6">
                <li>• 한국 반도체 학술대회 우수 논문상 (2013)</li>
                <li>• SAP 최우수 성과자 (2021, 2022 연속)</li>
                <li>• LG전자 최우수 신입사원상 및 베스트 동료상 (2013)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Activities Section */}
        <section className="p-8 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-blue-700" />
            <h2 className="text-2xl font-bold text-slate-900">특별활동 및 관심사항</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* AI Projects */}
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-bold text-slate-800 mb-4">AI 활용 사회 기여 프로젝트</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-700 mb-2">AI 기반 공공서비스 개선</h4>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• AI 챗봇 독서 토론 모임 지식 공유 시스템 개발</li>
                    <li>• AI 댓글 감정분석 시스템으로 온라인 여론 분석</li>
                    <li>• 정부 창업지원사업 검색 SW 개발로 공공정보 접근성 개선</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-slate-700 mb-2">기술 커뮤니티 리더십</h4>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• 개발 스터디 모임 1년간 운영 (2017, 롯데액셀러레이터)</li>
                    <li>• 맞춤형 업무 도구 개발 및 동료들에게 무료 제공</li>
                    <li>• 신기술 토이 프로젝트 지속적 진행</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Political Activities */}
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-bold text-slate-800 mb-4">정치 참여 및 민주주의 기술 융합</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-700 mb-2">당내 활동</h4>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• 이재명 후보 정책 홍보 퀴즈 게임 개발·운영 (2025 대선)</li>
                    <li>• 더불어민주당 후보자 정보 웹사이트 개발 (2024 총선)</li>
                    <li>• 더불어민주당 서울시당 비상임위원회 초대 수석 부위원장 (2023)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-slate-700 mb-2">데이터 기반 정치 혁신</h4>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• 2024년 총선 서울 지하철 유동인구 공공데이터를 분석하여 효율적 선거운동 전략 수립 및 후보자 지원</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Vision */}
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="p-6 border-l-4 border-blue-600">
              <h3 className="text-lg font-bold text-slate-800 mb-4">AI 강국 대한민국 비전</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 전 국민 AI 활용 문화 정착을 통한 생산성 혁신</li>
                <li>• AI 기술의 민주적 활용으로 사회적 가치 창출</li>
                <li>• 정부 디지털 전환 가속화 및 정책 수립 지원</li>
              </ul>
            </div>

            <div className="p-6 border-l-4 border-gray-400">
              <h3 className="text-lg font-bold text-slate-800 mb-4">일상 관심사</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 신기술 학습 및 실험 (지속적 자기계발)</li>
                <li>• 철학, 정치, 역사 관련 책 독서</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Special Notes */}
        <section className="p-8">
          <div className="bg-blue-800 text-white rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">특기사항</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-300 mt-1 flex-shrink-0" />
                  <span className="text-sm">글로벌 협업 경험: 다국적 팀과의 엔터프라이즈 솔루션 개발</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                  <span className="text-sm">해외 특허 보유: 글로벌 기업에서 인정받은 기술 혁신 능력</span>
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                  <span className="text-sm">기술-정책 융합 역량: 기술 전문성을 바탕으로 실효성 있는 정책 수립을 지원하는 가교 역할 수행 능력</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                  <span className="text-sm">정치적 실행력: 당내 활동과 선거 지원을 통한 현장 경험</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
            background: white;
          }
          .max-w-5xl {
            max-width: 100%;
            margin: 0;
            padding: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Resume;
