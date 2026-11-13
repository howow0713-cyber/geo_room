KMap.points(document.getElementById("map-quake"), {
  title: "규모 5.0 이상 국내 주요 지진",
  lines: [{ name: "양산 단층(개략)", color: "#b91c1c", dashed: true, label: [35.55, 128.88], coords: [[[36.45, 129.38], [36.1, 129.3], [35.85, 129.22], [35.55, 129.1], [35.34, 129.03], [35.18, 128.98]]] }],
  layers: [
    { key: "eq", label: "규모 5.0 이상 지진", color: "#b91c1c", shape: "star", size: 11, items: [
      { name: "2016 경주 지진 (규모 5.8)", label: "경주 5.8 (2016)", lat: 35.77, lon: 129.19, side: "l", dy: 6, year: "2016.9.12", desc: "관측 이래 국내 최대 지진. 양산 단층 부근에서 발생" },
      { name: "2017 포항 지진 (규모 5.4)", label: "포항 5.4 (2017)", lat: 36.11, lon: 129.37, year: "2017.11.15", desc: "피해액은 역대 최대. 수능이 일주일 미뤄졌다." },
      { name: "2004 울진 해역 지진 (규모 5.2)", label: "울진 해역 5.2 (2004)", lat: 36.8, lon: 130.2, side: "l", year: "2004.5.29", desc: "울진 동쪽 바다" },
      { name: "1978 속리산 지진 (규모 5.2)", label: "속리산 5.2 (1978)", lat: 36.6, lon: 127.9, year: "1978.9.16", desc: "충북 · 계기 관측 초기의 큰 지진" },
      { name: "1978 홍성 지진 (규모 5.0)", label: "홍성 5.0 (1978)", lat: 36.6, lon: 126.7, side: "l", year: "1978.10.7", desc: "충남 · 건물 피해가 발생해 지진 대비의 계기가 됨" }
    ]}
  ],
  source: { text: "기상청 국내 지진 목록 종합" }, note: "위치·단층선은 대략적"
});

KMap.points(document.getElementById("map-recent"), {
  title: "최근 큰 자연재해가 난 곳 (2022~2025)",
  layers: [
    { key: "rain", label: "호우·산사태", color: "#2563eb", shape: "circle", items: [
      { name: "2025.7 산청 극한 호우", label: "산청 호우 (2025.7)", lat: 35.42, lon: 127.87, side: "l", dy: -8, desc: "시간당 100mm 안팎, 누적 600mm가 넘는 비. 산사태와 하천 범람으로 인명 피해" },
      { name: "2023.7 오송 지하차도 침수", label: "오송 (2023.7)", lat: 36.62, lon: 127.33, side: "l", desc: "충북 청주 · 제방이 무너져 지하차도가 잠김" },
      { name: "2023.7 예천 산사태", label: "예천 산사태 (2023.7)", lat: 36.65, lon: 128.45, desc: "경북 · 집중 호우로 산사태" }
    ]},
    { key: "typhoon", label: "태풍", color: "#7c3aed", shape: "diamond", items: [
      { name: "2022.9 태풍 힌남노", label: "힌남노 · 포항 (2022.9)", lat: 36.0, lon: 129.36, desc: "포항 냉천 범람, 제철소·아파트 지하 주차장 침수" }
    ]},
    { key: "fire", label: "가뭄·산불", color: "#b45309", shape: "triangle", items: [
      { name: "2025.3 경북 산불", label: "경북 산불 (2025.3)", lat: 36.4, lon: 128.75, desc: "의성에서 시작해 안동·청송·영양·영덕으로 번짐. 산림 피해 9만 9천여 ha로 역대 최대, 5개 시군 특별재난지역" },
      { name: "2025.8 강릉 가뭄", label: "강릉 가뭄 (2025.8)", lat: 37.75, lon: 128.88, side: "l", desc: "오봉저수지 저수율 15% 아래 · 자연재해로는 처음 '재난 사태' 선포" }
    ]},
    { key: "snow", label: "대설", color: "#0891b2", shape: "square", items: [
      { name: "2024.11 수도권 폭설", label: "수도권 폭설 (2024.11)", lat: 37.3, lon: 127.0, side: "l", desc: "서울 11월 적설 117년 만의 최고(18.0cm). 경기 남부 축사·비닐하우스 붕괴" }
    ]}
  ],
  source: { text: "행정안전부·산림청·기상청 발표와 언론 보도 종합" }, note: "기호 위치는 대략적인 위치"
});
