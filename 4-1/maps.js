KMap.points(document.getElementById("map-heritage"), {
  title: "우리나라의 세계 자연유산",
  layers: [
    { key: "jeju", label: "제주 화산섬과 용암동굴 (2007)", color: "#b91c1c", shape: "triangle", size: 10, items: [
      { name: "한라산 천연보호구역", label: "한라산", lat: 33.362, lon: 126.53, side: "l", year: "2007", desc: "화산 활동으로 생긴 방패 모양의 화산체(순상 화산). 산정부에 화구호 백록담" },
      { name: "성산일출봉 응회구", label: "성산일출봉", lat: 33.459, lon: 126.94, year: "2007", desc: "얕은 바다에서 수중 폭발로 만들어진 분화구. 수성 화산 분출 과정을 보여 줌" },
      { name: "거문오름 용암동굴계", label: "거문오름 용암동굴계", lat: 33.52, lon: 126.74, dy: -16, year: "2007", desc: "거문오름에서 흘러내린 용암이 만든 동굴 무리. 벵뒤굴·만장굴·김녕굴·용천동굴·당처물동굴 등" }
    ]},
    { key: "tidal1", label: "한국의 갯벌 1단계 (2021)", color: "#1f6f78", shape: "circle", items: [
      { name: "서천 갯벌", label: "서천", lat: 36.03, lon: 126.6, year: "2021", desc: "충남 서천 · 금강 하구 일대" },
      { name: "고창 갯벌", label: "고창", lat: 35.55, lon: 126.56, side: "l", year: "2021", desc: "전북 고창 · 곰소만 일대" },
      { name: "신안 갯벌", label: "신안", lat: 34.96, lon: 126.12, side: "l", year: "2021", desc: "전남 신안 · 다도해 섬 사이에 펼쳐진 넓은 갯벌" },
      { name: "보성-순천 갯벌", label: "보성-순천", lat: 34.85, lon: 127.46, dy: -16, year: "2021", desc: "전남 보성 벌교·순천만 · 흑두루미 등 철새 도래지" }
    ]},
    { key: "tidal2", label: "한국의 갯벌 2단계 (2026 추가)", color: "#d97706", shape: "circle", items: [
      { name: "서산 갯벌", label: "서산 (가로림만)", lat: 36.92, lon: 126.42, year: "2026", desc: "충남 서산 가로림만 · 2026년 7월 확대 등재" },
      { name: "무안 갯벌", label: "무안", lat: 35.06, lon: 126.36, year: "2026", desc: "전남 무안 함해만 일대 · 2026년 7월 확대 등재" },
      { name: "고흥 갯벌", label: "고흥", lat: 34.68, lon: 127.32, side: "l", dy: 8, year: "2026", desc: "전남 고흥 · 2026년 7월 확대 등재" },
      { name: "여수 갯벌", label: "여수", lat: 34.78, lon: 127.62, dy: 14, year: "2026", desc: "전남 여수 여자만 일대 · 2026년 7월 확대 등재" }
    ]}
  ],
  source: { text: "국가유산청 세계유산 현황, 경향신문(2026.7.25)", url: "https://www.khan.co.kr/article/202607251229001/" }
});

KMap.points(document.getElementById("map-candidate"), {
  title: "후보지와 보호 지역",
  layers: [
    { key: "tent", label: "세계유산 잠정 목록 (자연)", color: "#7c3aed", shape: "diamond", items: [
      { name: "설악산 천연보호구역", label: "설악산", lat: 38.12, lon: 128.46, desc: "강원 인제·고성·속초·양양 · 화강암 석산 경관" },
      { name: "창녕 우포늪", label: "우포늪", lat: 35.555, lon: 128.42, desc: "경남 창녕 · 국내 최대 자연 내륙 습지" },
      { name: "남해안 공룡 화석지 (해남)", label: "해남", lat: 34.62, lon: 126.46, side: "l", desc: "해남 우항리 · 공룡·익룡 발자국" },
      { name: "남해안 공룡 화석지 (보성)", label: "보성", lat: 34.73, lon: 127.12, side: "l", desc: "보성 비봉리 · 공룡알 화석" },
      { name: "남해안 공룡 화석지 (화순)", label: "화순", lat: 35.02, lon: 127.03, side: "l", dy: 8, desc: "화순 서유리 · 공룡 발자국" },
      { name: "남해안 공룡 화석지 (여수)", label: "여수 사도", lat: 34.58, lon: 127.79, desc: "여수 사도·추도 · 공룡 발자국" },
      { name: "남해안 공룡 화석지 (고성)", label: "경남 고성", lat: 34.93, lon: 128.29, desc: "경남 고성 덕명리(상족암) · 공룡 발자국" }
    ]},
    { key: "geo", label: "유네스코 세계지질공원", color: "#b45309", shape: "square", items: [
      { name: "제주도", label: "제주도", lat: 33.42, lon: 126.25, side: "l", year: "2010", desc: "섬 전체 · 우리나라 첫 세계지질공원" },
      { name: "청송", label: "청송", lat: 36.43, lon: 129.06, side: "l", year: "2017", desc: "중생대 백악기 경상 분지 · 주왕산 기암 단애" },
      { name: "무등산권", label: "무등산권", lat: 35.13, lon: 127.0, year: "2018", desc: "백악기 말 화산 활동 · 주상 절리대(입석대·서석대·광석대)" },
      { name: "한탄강", label: "한탄강", lat: 38.03, lon: 127.2, dy: 16, year: "2020", desc: "강을 따라 형성된 국내 유일 지질공원 · 용암 대지와 현무암 협곡" },
      { name: "전북 서해안권", label: "전북 서해안권", lat: 35.64, lon: 126.48, side: "l", year: "2023", desc: "고창·부안 · 국내 첫 해안형 세계지질공원" },
      { name: "단양", label: "단양", lat: 36.98, lon: 128.37, year: "2025", desc: "고생대 석회암 · 카르스트 지형(석회동굴, 돌리네)" },
      { name: "경북 동해안", label: "경북 동해안", lat: 36.35, lon: 129.38, year: "2025", desc: "포항·경주·영덕·울진 · 국내 최대(2,694㎢), 신생대 화석 산지" }
    ]},
    { key: "np", label: "국립공원 (학습지 57쪽)", color: "#15803d", shape: "triangle", items: [
      { name: "지리산 국립공원", label: "지리산", lat: 35.336, lon: 127.73, year: "1967", desc: "우리나라 첫 국립공원 · 경남·전남·전북에 걸친 가장 넓은 산악형 국립공원" },
      { name: "북한산 국립공원", label: "북한산", lat: 37.66, lon: 126.98, side: "l", year: "1983", desc: "서울·경기 · 화강암 봉우리, 도심 속 국립공원" },
      { name: "한려해상 국립공원", label: "한려해상", lat: 34.76, lon: 128.4, dy: 16, year: "1968", desc: "여수~통영 한려수도 · 최초의 해상 국립공원" }
    ]},
    { key: "etc", label: "그 밖의 보호 지역", color: "#0369a1", shape: "circle", items: [
      { name: "독도 천연보호구역", label: "독도", lat: 37.24, lon: 131.865, side: "l", year: "1982", desc: "천연기념물 · 땅채송화·섬기린초, 철새의 피난처" },
      { name: "강원 생태평화 생물권보전지역", label: "강원 생태평화", lat: 38.22, lon: 127.95, dy: 18, desc: "비무장 지대 인근 · 유네스코 생물권보전지역" },
      { name: "연천 임진강 생물권보전지역", label: "연천 임진강", lat: 38.06, lon: 127.0, side: "l", dy: -16, desc: "비무장 지대 인근 · 유네스코 생물권보전지역" },
      { name: "금강산 (북한)", label: "금강산(북한)", lat: 38.65, lon: 128.08, year: "2025 세계유산", desc: "2025년 7월 세계유산(문화 경관) 등재 · 화강암 돌산의 기암괴석. 북한의 세 번째 세계유산" }
    ]}
  ],
  source: { text: "국가유산청·국립공원공단·환경부 지질공원 현황" }
});
