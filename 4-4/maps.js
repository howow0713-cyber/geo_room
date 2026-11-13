KMap.points(document.getElementById("map-plants"), {
  title: "우리나라의 주요 발전소",
  layers: [
    { key: "nuc", label: "원자력", color: "#7c3aed", shape: "star", size: 10, items: [
      { name: "한울 원자력 (경북 울진)", label: "한울 · 울진", lat: 37.09, lon: 129.38, desc: "신한울 1·2호기까지 원자로 8기. 월성과 함께 경북이 원자력 공급량 1위인 까닭" },
      { name: "월성 원자력 (경북 경주)", label: "월성 · 경주", lat: 35.71, lon: 129.47, desc: "중수로 원전이 있던 곳. 월성 1호기는 2019년 영구 정지" },
      { name: "새울 원자력 (울산 울주)", label: "새울 · 울산", lat: 35.36, lon: 129.32, dy: -6, desc: "옛 이름 신고리 3·4호기" },
      { name: "고리 원자력 (부산 기장)", label: "고리 · 부산", lat: 35.30, lon: 129.29, side: "l", dy: 8, year: "1978", desc: "국내 첫 원전 고리 1호기(1978). 2025년 6월 국내 상업 원전 첫 해체 승인" },
      { name: "한빛 원자력 (전남 영광)", label: "한빛 · 영광", lat: 35.41, lon: 126.42, side: "l", desc: "서해안 유일의 원전 단지. 전남이 원자력 생산량 2위인 까닭" }
    ]},
    { key: "coal", label: "대규모 석탄 화력", color: "#44403c", shape: "circle", items: [
      { name: "영흥 화력 (인천 옹진)", label: "영흥 · 인천", lat: 37.24, lon: 126.43, side: "l", dy: -8, desc: "수도권 유일의 대형 석탄 화력" },
      { name: "당진 화력 (충남 당진)", label: "당진", lat: 37.05, lon: 126.51, desc: "설비 용량 약 6,000MW" },
      { name: "태안 화력 (충남 태안)", label: "태안", lat: 36.90, lon: 126.23, side: "l", desc: "충남 서해안 석탄 화력 벨트" },
      { name: "보령 화력 (충남 보령)", label: "보령", lat: 36.40, lon: 126.49, side: "l", desc: "1·2호기는 2020년 12월 폐지" },
      { name: "삼척 화력 (강원 삼척)", label: "삼척", lat: 37.37, lon: 129.25, desc: "동해안 석탄 화력" },
      { name: "하동 화력 (경남 하동)", label: "하동", lat: 34.95, lon: 127.82, side: "l", desc: "남해안 석탄 화력" },
      { name: "삼천포 화력 (경남 고성)", label: "고성", lat: 34.93, lon: 128.12, dy: 10, desc: "삼천포·고성하이 화력" }
    ]},
    { key: "hydro", label: "수력 · 양수 · 조력", color: "#2563eb", shape: "triangle", items: [
      { name: "소양강댐 (강원 춘천)", label: "소양강", lat: 37.945, lon: 127.815, desc: "한강 유역 · 일반 수력" },
      { name: "충주댐 (충북 충주)", label: "충주", lat: 37.004, lon: 127.99, desc: "남한강 · 일반 수력" },
      { name: "양양 양수 발전소", label: "양양 양수", lat: 38.02, lon: 128.55, desc: "국내 최대 양수 발전소" },
      { name: "청평 양수 발전소", label: "청평 양수", lat: 37.75, lon: 127.45, side: "l", desc: "국내 첫 양수 발전소(1980)" },
      { name: "산청 양수 발전소", label: "산청 양수", lat: 35.30, lon: 127.85, side: "l", dy: -8, desc: "낙동강 유역 양수" },
      { name: "청송 양수 발전소", label: "청송 양수", lat: 36.37, lon: 129.10, desc: "낙동강 유역 양수" },
      { name: "시화호 조력 발전소 (경기 안산)", label: "시화 조력", lat: 37.31, lon: 126.61, dy: 12, year: "2011", desc: "설비 용량 254MW로 세계 최대 조력 발전소. 국내 조력 발전량의 100%" }
    ]}
  ],
  source: { text: "한국전력공사·한국수력원자력 자료 종합, 교과서 153쪽" }, note: "기호 위치는 대략적인 위치 · '이름 숨기기'로 빈 지도 활동 가능"
});

KMap.points(document.getElementById("map-issue"), {
  title: "지도로 보는 에너지 쟁점",
  layers: [
    { key: "coal", label: "석탄 산업의 끝", color: "#44403c", shape: "square", items: [
      { name: "화순광업소 폐광 (2023.6)", label: "화순 폐광 2023", lat: 35.03, lon: 127.03, side: "l", desc: "전남 화순 · 대한석탄공사 탄광" },
      { name: "장성광업소 폐광 (2024.6)", label: "장성(태백) 폐광 2024", lat: 37.11, lon: 128.99, side: "l", dy: 10, desc: "강원 태백 · 한때 국내 최대 탄광" },
      { name: "도계광업소 폐광 (2025.6.30)", label: "도계(삼척) 폐광 2025", lat: 37.24, lon: 129.04, dy: -6, year: "1936~2025", desc: "강원 삼척 · 대한석탄공사의 마지막 탄광. 국영 탄광 시대가 끝났다" }
    ]},
    { key: "grid", label: "송전 · 계통", color: "#b91c1c", shape: "diamond", items: [
      { name: "밀양 765kV 송전탑", label: "밀양 송전탑", lat: 35.50, lon: 128.75, side: "l", year: "2008~2014", desc: "고리 원전의 전기를 보내는 신고리~북경남 송전선로. 밀양에만 송전탑 69기, 주민 반대로 공사가 3년 넘게 늦어졌다" },
      { name: "제주 재생 에너지 출력 제한", label: "제주 출력 제한", lat: 33.40, lon: 126.55, desc: "바람·햇빛이 좋은 날 전기가 남아 풍력·태양광 발전기를 강제로 멈추는 일이 해마다 늘었다" }
    ]},
    { key: "renew", label: "재생 에너지 이익 공유", color: "#15803d", shape: "circle", items: [
      { name: "신안 햇빛연금", label: "신안 햇빛연금", lat: 34.80, lon: 126.15, side: "l", year: "2021~", desc: "태양광 발전 수익을 주민과 나눔. 누적 지급액 220억 원 돌파(2024년 4분기까지)" }
    ]},
    { key: "gas", label: "국산 석유·가스 찾기", color: "#b45309", shape: "triangle", items: [
      { name: "동해 가스전", label: "동해 가스전", lat: 35.62, lon: 129.93, year: "2004~2021", desc: "우리나라 유일의 상업 가스전. 생산을 마치고 문을 닫았다" },
      { name: "대왕고래 유망 구조 (개략)", label: "대왕고래", lat: 36.15, lon: 130.15, year: "2024~2025", desc: "포항 앞바다 심해. 2025년 2월 1차 시추 결과 '경제성 없음' 발표" }
    ]}
  ],
  source: { text: "대한석탄공사·한국전력공사·신안군·산업통상자원부 발표와 언론 보도 종합" }, note: "기호 위치는 대략적인 위치"
});

KMap.points(document.getElementById("map-facility"), {
  title: "에너지를 많이 쓰는 시설과 LNG 인수 기지",
  layers: [
    { key: "petro", label: "석유 화학 단지 (석유 많이 씀)", color: "#b45309", shape: "circle", items: [
      { name: "울산 석유 화학 단지", label: "울산", lat: 35.50, lon: 129.38, year: "1972", desc: "우리나라 첫 석유 화학 단지. 원유를 내리는 항구 옆에 정유·화학 공장" },
      { name: "여수 석유 화학 단지", label: "여수", lat: 34.84, lon: 127.69, side: "l", dy: 8, desc: "전남 · 1970년대 말 조성" },
      { name: "대산 석유 화학 단지 (충남 서산)", label: "대산(서산)", lat: 37.00, lon: 126.38, side: "l", desc: "충남이 석유 공급량 상위인 까닭" }
    ]},
    { key: "steel", label: "일관 제철소 (석탄 많이 씀)", color: "#44403c", shape: "square", items: [
      { name: "포항 제철소", label: "포항", lat: 36.00, lon: 129.39, year: "1973", desc: "경북 · 용광로에 석탄(코크스)을 넣어 철광석을 녹인다" },
      { name: "광양 제철소", label: "광양", lat: 34.92, lon: 127.75, side: "l", dy: -8, year: "1987", desc: "전남" },
      { name: "당진 제철소", label: "당진", lat: 36.97, lon: 126.65, dy: -12, desc: "충남 · 석탄 화력과 제철소가 모두 있어 충남이 석탄 공급 1위" }
    ]},
    { key: "lng", label: "LNG 인수 기지 (천연가스 들어오는 곳)", color: "#2563eb", shape: "triangle", items: [
      { name: "평택 LNG 기지", label: "평택", lat: 36.96, lon: 126.83, dy: 16, year: "1986", desc: "우리나라 첫 LNG 인수 기지. 수도권 도시가스의 시작" },
      { name: "인천 LNG 기지", label: "인천", lat: 37.40, lon: 126.60, side: "l", desc: "바다 위 매립지에 지은 기지. 수도권 가정과 발전소로 보낸다" },
      { name: "통영 LNG 기지", label: "통영", lat: 34.85, lon: 128.45, dy: 8, desc: "경남 · 남부 지역 공급" },
      { name: "삼척 LNG 기지", label: "삼척", lat: 37.43, lon: 129.17, desc: "강원 · 동해안 공급" }
    ]}
  ],
  source: { text: "한국가스공사·한국석유화학협회 자료 종합" }, note: "기호 위치는 대략적인 위치"
});
