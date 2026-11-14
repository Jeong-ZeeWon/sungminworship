// 노션 원자료 기준: 한 주간 예배 담당자
// GitHub Actions가 매주 토요일 09:30(KST)에 자동 갱신합니다.

if (typeof churchData !== 'undefined') {
  churchData.leaders = {
  "title": "한 주간 예배 담당자",
  "subtitle": "이번 주 예배 담당자",
  "icon": "👥",
  "color": "ldr",
  "description": "이번 주 새벽·수요·금요·주일 예배 담당자",
  "week": "11/16 — 11/21",
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
      "윤수신",
      "윤수신",
      "찬양/윤수신",
      "찬양/박정인",
      "박정인",
      "박정인"
    ],
    "caption": [
      "노태규",
      "노태규",
      "노태규",
      "최명환",
      "최명환",
      "최명환"
    ],
    "accomp": [
      "김진희",
      "민주희",
      "김진희",
      "민주희",
      "최우진",
      "최우진"
    ]
  },
  "wednesday": {
    "date": "11/18(수)",
    "preacher": "정지원",
    "worship": "박정인1",
    "sound": "노태규4",
    "pd": "윤수신"
  },
  "friday": {
    "date": "11/20(금)",
    "worship": "윤수신",
    "pd": "박정인",
    "caption": "박정인",
    "prayer": [
      "박정인",
      "·",
      "최명환",
      "·",
      "노태규"
    ]
  },
  "sunday": {
    "date": "11/22(일)",
    "firstHost": "노태규",
    "secondHost": "최명환",
    "thirdHost": "박정인",
    "firstPd": "박정인",
    "firstCaption": "윤수신",
    "secondPd": "박정인"
  }
};
}
