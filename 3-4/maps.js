var MOIS = { text: "행정안전부 주민등록 인구통계 (2026년 9월 말)", url: "https://jumin.mois.go.kr/" };

KMap.choropleth(document.getElementById("map-pop"), {
  title: "시도별 주민등록 인구", unit: "만 명", merge: true,
  data: { 경기: 1377.7, 서울: 928.0, 부산: 322.8, 경남: 319.1, 전남광주: 315.4, 인천: 306.8, 경북: 249.2, 대구: 234.6, 충남: 214.0, 전북: 171.6, 충북: 160.2, 강원: 150.7, 대전: 144.3, 울산: 108.6, 제주: 66.2, 세종: 39.1 },
  breaks: [100, 150, 250, 500],
  format: function (v) { return v.toLocaleString("ko-KR", { maximumFractionDigits: 1 }); },
  shortFormat: function (v) { return Math.round(v) + "만"; },
  highlight: { label: "수도권", keys: ["서울", "인천", "경기"], note: "수도권 2,612만 명 = 전국의 51.1%" },
  avg: 5108.2, avgLabel: "전국 합계",
  source: MOIS
});

KMap.choropleth(document.getElementById("map-old"), {
  title: "시도별 65세 이상 인구 비율", unit: "%", merge: true,
  data: { 경북: 28.65, 강원: 27.98, 전북: 27.63, 부산: 26.27, 전남광주: 25.12, 충남: 24.42, 경남: 24.40, 충북: 24.12, 대구: 23.10, 서울: 21.18, 제주: 20.89, 대전: 20.00, 인천: 19.83, 울산: 19.77, 경기: 18.64, 세종: 12.94 },
  breaks: [17, 20, 23, 26],
  format: function (v) { return v.toFixed(1); },
  avg: 22.15, avgLabel: "전국",
  source: MOIS, note: "20% 이상이면 초고령 사회(UN 기준)"
});

KMap.choropleth(document.getElementById("map-grdp"), {
  title: "1인당 지역내총생산 (2024년)", unit: "만 원",
  data: { 울산: 8519, 충남: 6776, 서울: 6122, 전남: 5918, 충북: 5633, 경북: 5230, 경기: 4700, 경남: 4655, 세종: 4461, 강원: 4256, 인천: 4119, 제주: 3991, 대전: 3822, 전북: 3798, 광주: 3768, 부산: 3708, 대구: 3137 },
  breaks: [4000, 4500, 5500, 7000],
  format: function (v) { return v.toLocaleString("ko-KR"); },
  highlight: { label: "수도권", keys: ["서울", "인천", "경기"], note: "수도권 지역내총생산 = 전국의 52.8%" },
  avg: 4948, avgLabel: "전국",
  source: { text: "국가데이터처 2024년 지역소득(잠정)", url: "https://www.korea.kr/briefing/policyBriefingView.do?newsId=156736434" }, note: "통합 전 17개 시도 기준"
});

KChart.line(document.getElementById("chart-cap"), {
  title: "수도권 인구 비중의 변화",
  points: [[1960, 20.8], [1970, 28.3], [1980, 35.5], [1990, 42.8], [2000, 46.3], [2010, 49.1], [2020, 50.2], [2025, 50.9, "등록센서스"]],
  bands: [[1972, 1981, "제1차"], [1982, 1991, "제2차"], [1992, 1999, "제3차"], [2000, 2020, "제4차"], [2021, 2025, "제5차"]],
  yMin: 10, yMax: 60, yStep: 10, unit: "%", ref: 50, refLabel: "인구의 절반",
  label: [0, 2, 4, 7]
});

KMap.points(document.getElementById("map-newtown"), {
  title: "수도권 1·2·3기 신도시",
  view: { lon: [126.45, 127.45], lat: [36.98, 37.92], names: { 서울: [37.55, 126.99], 인천: [37.40, 126.58], 경기: [37.86, 127.33] } },
  layers: [
    { key: "nt1", label: "1기 신도시 (1990년대 입주)", color: "#1f6f78", shape: "circle", size: 8, items: [
      { name: "분당", lat: 37.36, lon: 127.12, desc: "성남 · 1기 중 가장 큰 규모. 2026년 현재 선도지구 재건축이 가장 빠름" },
      { name: "일산", lat: 37.67, lon: 126.77, side: "l", desc: "고양 · 선도지구 정비계획 단계" },
      { name: "평촌", lat: 37.39, lon: 126.96, desc: "안양" },
      { name: "산본", lat: 37.36, lon: 126.93, side: "l", dy: 10, desc: "군포" },
      { name: "중동", lat: 37.50, lon: 126.765, side: "l", desc: "부천" }
    ]},
    { key: "nt2", label: "2기 신도시 (2000년대~)", color: "#b45309", shape: "square", size: 8, items: [
      { name: "판교", lat: 37.39, lon: 127.10, dy: -14, desc: "성남 · 판교 테크노밸리" },
      { name: "광교", lat: 37.29, lon: 127.05, desc: "수원·용인" },
      { name: "동탄", lat: 37.19, lon: 127.08, desc: "화성 · 동탄1·2" },
      { name: "위례", lat: 37.48, lon: 127.14, desc: "서울 송파·성남·하남에 걸침" },
      { name: "김포한강", lat: 37.64, lon: 126.66, side: "l", desc: "김포" },
      { name: "파주운정", lat: 37.72, lon: 126.75, side: "l", dy: -12, desc: "파주" },
      { name: "양주", lat: 37.82, lon: 127.08, desc: "양주 옥정·회천" },
      { name: "인천검단", lat: 37.60, lon: 126.67, side: "l", dy: 12, desc: "인천 서구" },
      { name: "평택고덕", lat: 37.05, lon: 127.05, desc: "평택" }
    ]},
    { key: "nt3", label: "3기 신도시 (조성 중)", color: "#6d28d9", shape: "diamond", size: 8, items: [
      { name: "인천계양", lat: 37.555, lon: 126.735, dy: 14, desc: "2026년 12월 첫 입주 예정(1,285가구) · 3기 중 가장 빠름" },
      { name: "부천대장", lat: 37.525, lon: 126.79, dy: 14, desc: "부천" },
      { name: "고양창릉", lat: 37.64, lon: 126.87, desc: "고양" },
      { name: "남양주왕숙", lat: 37.63, lon: 127.19, desc: "남양주" },
      { name: "하남교산", lat: 37.52, lon: 127.22, desc: "하남" },
      { name: "광명시흥", lat: 37.42, lon: 126.85, desc: "광명·시흥" }
    ]}
  ],
  source: { text: "국토교통부 신도시 현황, 언론 보도 종합" }, note: "기호 위치는 대략적인 위치"
});

KMap.points(document.getElementById("map-policy"), {
  title: "균형 발전 정책이 이루어지는 곳",
  regionHighlight: { keys: ["광주", "전남"], label: "전남광주통합특별시(2026.7)" },
  layers: [
    { key: "innov", label: "혁신도시", color: "#1f6f78", shape: "circle", items: [
      { name: "부산 혁신도시", label: "부산", lat: 35.14, lon: 129.07, desc: "문현 금융단지 등 · 한국자산관리공사, 한국주택금융공사 등 금융·해양 기관" },
      { name: "대구 혁신도시", label: "대구", lat: 35.88, lon: 128.73, desc: "동구 신서동 · 한국가스공사, 한국부동산원 등" },
      { name: "울산 혁신도시", label: "울산", lat: 35.555, lon: 129.32, desc: "중구 우정동 · 한국석유공사, 근로복지공단 등 에너지·노동 기관" },
      { name: "광주전남 공동 혁신도시", label: "나주", lat: 35.02, lon: 126.79, side: "l", desc: "나주 빛가람동 · 한국전력공사 등 에너지 기관 · 인구 3만 명이 넘는 규모로 조성(학습지 50쪽 예시)" },
      { name: "강원 혁신도시", label: "원주", lat: 37.33, lon: 127.98, desc: "원주 반곡동 · 국민건강보험공단, 건강보험심사평가원 등 의료·건강 기관" },
      { name: "충북 혁신도시", label: "진천·음성", lat: 36.90, lon: 127.53, desc: "진천·음성 · 한국가스안전공사, 한국교육개발원 등" },
      { name: "전북 혁신도시", label: "전주·완주", lat: 35.84, lon: 127.06, desc: "전주·완주 · 국민연금공단, 농촌진흥청 등 농업·금융 기관" },
      { name: "경북 혁신도시", label: "김천", lat: 36.11, lon: 128.18, side: "l", desc: "김천 율곡동 · 한국도로공사, 한국교통안전공단 등 교통 기관" },
      { name: "경남 혁신도시", label: "진주", lat: 35.17, lon: 128.13, side: "l", desc: "진주 충무공동 · 한국토지주택공사(LH) 등 주택·산업 기관" },
      { name: "제주 혁신도시", label: "서귀포", lat: 33.25, lon: 126.51, desc: "서귀포 · 국토교통인재개발원, 국립기상과학원 등" }
    ]},
    { key: "corp", label: "기업도시", color: "#b45309", shape: "square", items: [
      { name: "원주 기업도시", label: "원주(기업)", lat: 37.39, lon: 127.86, dy: -14, side: "l", desc: "지식 기반형" },
      { name: "충주 기업도시", label: "충주", lat: 36.99, lon: 127.80, side: "l", desc: "지식 기반형" },
      { name: "태안 기업도시", label: "태안", lat: 36.62, lon: 126.35, desc: "관광 레저형" },
      { name: "영암·해남 기업도시(솔라시도)", label: "영암·해남", lat: 34.68, lon: 126.46, side: "l", desc: "관광 레저형 (솔라시도)" }
    ]},
    { key: "admin", label: "행정중심복합도시·부처 이전", color: "#6d28d9", shape: "star", size: 10, items: [
      { name: "세종특별자치시 (행정중심복합도시)", label: "세종", lat: 36.50, lon: 127.26, side: "l", desc: "중앙 행정 기관 이전으로 조성. 2026년 9월 인구 39만 명, 고령 인구 비율 12.9%로 전국 최저" },
      { name: "해양수산부 부산 이전", label: "해수부(2025.12)", lat: 35.115, lon: 129.04, dy: 22, side: "l", desc: "2025년 12월 세종에서 부산 동구 임시 청사로 이전. 신청사는 2030년까지 건립 예정" }
    ]}
  ],
  source: { text: "국토교통부 혁신도시·기업도시 지정 현황, 언론 보도 종합" }, note: "기호 위치는 대략적인 위치"
});
