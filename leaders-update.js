// 노션 원자료 기준: 한 주간 예배 담당자
// GitHub Actions가 매주 토요일 09:30(KST)에 자동 갱신합니다.

if (typeof churchData !== 'undefined') {
  churchData.leaders = {
  "title": "한 주간 예배 담당자",
  "subtitle": "이번 주 예배 담당자",
  "icon": "👥",
  "color": "ldr",
  "description": "이번 주 새벽·수요·금요·주일 예배 담당자",
  "week": "9/14 — 9/19",
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
      "박정인",
      "박정인",
      "찬양/박정인",
      "찬양/최명환",
      "최명환",
      "최명환"
    ],
    "caption": [
      "노태규",
      "노태규",
      "노태규",
      "윤수신",
      "윤수신",
      "윤수신"
    ],
    "accomp": [
      "미정",
      "미정",
      "미정",
      "미정",
      "미정",
      "미정"
    ]
  },
  "wednesday": {
    "date": "9/16(수)",
    "preacher": "박정인",
    "worship": "노태규",
    "sound": "윤수신",
    "pd": "최명환"
  },
  "friday": {
    "date": "9/18(금)",
    "worship": "윤수신",
    "pd": "노태규",
    "caption": "박정인",
    "prayer": [
      "박정인",
      "노태규",
      "정지원"
    ]
  },
  "sunday": {
    "date": "9/20(일)",
    "firstHost": "노태규",
    "secondHost": "박정인",
    "thirdHost": "최명환",
    "firstPd": "최명환",
    "firstCaption": "윤수신",
    "secondPd": ""
  }
};
}
