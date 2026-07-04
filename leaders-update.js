// 노션 원자료 기준: 한 주간 예배 담당자
// GitHub Actions가 매주 토요일 09:30(KST)에 자동 갱신합니다.

if (typeof churchData !== 'undefined') {
  churchData.leaders = {
  "title": "한 주간 예배 담당자",
  "subtitle": "이번 주 예배 담당자",
  "icon": "👥",
  "color": "ldr",
  "description": "이번 주 새벽·수요·금요·주일·열방 예배 담당자",
  "week": "7/6 — 7/11",
  "dawn": {
    "days": [
      "월",
      "화",
      "수",
      "목",
      "금",
      "토"
    ],
    "preacher": [
      "정지원",
      "정지원",
      "노태규",
      "노태규",
      "윤수신",
      "윤수신"
    ],
    "caption": [
      "박정인",
      "박정인",
      "박정인",
      "최명환",
      "최명환",
      "최명환"
    ],
    "accomp": [
      "",
      "",
      "",
      "",
      "",
      ""
    ]
  },
  "wednesday": {
    "date": "7/8(수)",
    "preacher": "최명환",
    "worship": "윤수신",
    "sound": "노태규",
    "pd": "정지원"
  },
  "friday": {
    "date": "7/10(금)",
    "worship": "정지원",
    "pd": "최명환",
    "caption": "노태규",
    "prayer": [
      "최명환",
      "노태규",
      "윤수신"
    ]
  },
  "sunday": {
    "date": "7/12(일)",
    "firstHost": "노태규",
    "secondHost": "박정인",
    "thirdHost": "최명환",
    "firstPd": "윤수신",
    "firstCaption": "최명환",
    "secondPd": "정지원"
  },
  "nations": {
    "date": "7/12(일)",
    "host": "최명환",
    "worship": "정지원",
    "video": "노태규",
    "caption": "박정인",
    "special": "여전도회",
    "prayer": "최성선 명예권사"
  }
};
}
