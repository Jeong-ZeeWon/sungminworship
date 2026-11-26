// 노션 원자료 기준: 한 주간 예배 담당자
// GitHub Actions가 매주 토요일 09:30(KST)에 자동 갱신합니다.

if (typeof churchData !== 'undefined') {
  churchData.leaders = {
  "title": "한 주간 예배 담당자",
  "subtitle": "이번 주 예배 담당자",
  "icon": "👥",
  "color": "ldr",
  "description": "이번 주 새벽·수요·금요·주일 예배 담당자",
  "week": "11/23 — 11/28",
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
      "",
      "",
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
      "민주희",
      "최우진",
      "김진희",
      "김진희",
      "민주희",
      "최우진"
    ]
  },
  "wednesday": {
    "date": "11/25(수)",
    "preacher": "정지원",
    "worship": "노태규",
    "sound": "윤수신",
    "pd": "박정인"
  },
  "friday": {
    "date": "11/27(금)",
    "worship": "정지원",
    "pd": "노태규",
    "caption": "윤수신",
    "prayer": [
      "최명환",
      "·",
      "윤수신",
      "·",
      "김은형"
    ]
  },
  "sunday": {
    "date": "11/29(일)",
    "firstHost": "윤수신",
    "secondHost": "정지원",
    "thirdHost": "박정인",
    "firstPd": "최명환",
    "firstCaption": "노태규",
    "secondPd": "박정인"
  }
};
}
