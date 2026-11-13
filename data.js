/* =========================================================================
   한국지리 탐구 수업 자료 목록
   -------------------------------------------------------------------------
   수업 준비할 때는 이 파일만 수정하면 됩니다.

   각 중단원에는 두 칸이 있습니다.
     worksheet : 화면 왼쪽(학습지)
     slides    : 화면 오른쪽(수업자료)

   한 칸에 자료를 여러 개 넣으면 칸 위쪽에 탭으로 나타납니다.
     { title: "탭 이름", src: "파일 경로 또는 링크" }

   src에 넣을 수 있는 것
     - 사이트 폴더 안의 파일 : "materials/2-1/학습지.pdf"  (PDF, PNG, JPG, HTML)
     - 구글 슬라이드·문서·드라이브 공유 링크 (자동으로 화면에 맞게 바뀜)
     - 유튜브 링크, 캔바 디자인 링크
     - 그 밖의 웹페이지 주소 (사이트에 따라 화면 안에 안 뜰 수 있음 → 칸 위
       '새 창' 버튼으로 열기)

   자료가 아직 없으면 [] 로 비워 두세요.

   학습지 PDF(한글에서 저장한 것)를 '정답 보기'가 되는 화면으로 바꾸려면:
     python3 tools/build_worksheet.py 학습지.pdf materials/4-2 "Ⅳ-2 학습지"
   → materials/4-2/worksheet.html 을 worksheet 의 src 로 넣으면 됩니다.
   ========================================================================= */

window.COURSE = {
  title: "한국지리 탐구",
  school: "신도고등학교 2학년 2학기",
  textbook: "비상교육",

  units: [
    {
      roman: "Ⅰ",
      title: "공간 정보와 지리 탐구",
      code: "12한탐01",
      lessons: [
        {
          id: "1-1",
          title: "지리 탐구의 시작",
          worksheet: [{ title: "학습지", src: "materials/1-1/worksheet.html" }],
          slides: [{ title: "수업자료", src: "materials/1-1/slides.html" }]
        },
        { id: "1-2", title: "지리 탐구의 방법", worksheet: [], slides: [] }
      ]
    },
    {
      roman: "Ⅱ",
      title: "생활 속 지리 탐구",
      code: "12한탐02",
      lessons: [
        { id: "2-1", title: "상품사슬과 나", worksheet: [], slides: [] },
        { id: "2-2", title: "핫 플레이스와 지역 활성화", worksheet: [], slides: [] },
        { id: "2-3", title: "모빌리티 변화와 공간의 미래", worksheet: [], slides: [] }
      ]
    },
    {
      roman: "Ⅲ",
      title: "국토의 변화와 균형 발전 탐구",
      code: "12한탐03",
      lessons: [
        { id: "3-1", title: "우리나라 인구 변화와 다문화 사회", worksheet: [], slides: [] },
        { id: "3-2", title: "지속가능한 농업과 농촌", worksheet: [], slides: [] },
        { id: "3-3", title: "산업 구조와 지역의 변화", worksheet: [], slides: [] },
        {
          id: "3-4",
          title: "국토의 균형 발전",
          worksheet: [{ title: "학습지 9", src: "materials/3-4/worksheet.html" }],
          slides: [{ title: "수업자료", src: "materials/3-4/resources.html" }]
        }
      ]
    },
    {
      roman: "Ⅳ",
      title: "환경과 지속가능성 탐구",
      code: "12한탐04",
      lessons: [
        {
          id: "4-1",
          title: "세계유산과 자연경관",
          worksheet: [{ title: "학습지 10", src: "materials/4-1/worksheet.html" }],
          slides: [{ title: "수업자료", src: "materials/4-1/resources.html" }]
        },
        {
          id: "4-2",
          title: "환경의 개발과 변화 그리고 보전",
          worksheet: [{ title: "학습지 11", src: "materials/4-2/worksheet.html" }],
          slides: [{ title: "수업자료", src: "materials/4-2/resources.html" }]
        },
        {
          id: "4-3",
          title: "자연재해의 유형과 경감 대책",
          worksheet: [{ title: "학습지 12", src: "materials/4-3/worksheet.html" }],
          slides: [{ title: "수업자료", src: "materials/4-3/resources.html" }]
        },
        {
          id: "4-4",
          title: "에너지 소비와 탄소중립",
          worksheet: [{ title: "학습지 13", src: "materials/4-4/worksheet.html" }],
          slides: [
            { title: "수업자료", src: "materials/4-4/resources.html" },
            { title: "자원지도 분석", src: "https://kier-solar.org/user/gis/intro" },
            { title: "주요 발전소 분포", src: "https://ziriboy.github.io/powerplants_korea.html" }
          ]
        }
      ]
    },
    {
      roman: "Ⅴ",
      title: "동아시아 갈등과 공존 탐구",
      code: "12한탐05",
      lessons: [
        { id: "5-1", title: "북한의 지리적 특징과 남북 협력", worksheet: [], slides: [] },
        { id: "5-2", title: "동아시아의 평화와 공존", worksheet: [], slides: [] }
      ]
    }
  ]
};
