// 노션 원자료 기준: 한 주간 예배 담당자
// GitHub Actions가 매주 토요일 09:30(KST)에 자동 갱신합니다.

if (typeof churchData !== 'undefined') {
  churchData.leaders = {
  "title": "한 주간 예배 담당자",
  "subtitle": "이번 주 예배 담당자",
  "icon": "👥",
  "color": "ldr",
  "description": "이번 주 새벽·수요·금요·주일 예배 담당자",
  "week": "10/19 — 10/24",
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
      "찬양/정지원",
      "찬양/노태규",
      "노태규",
      "노태규"
    ],
    "caption": [
      "윤수신",
      "윤수신",
      "윤수신",
      "박정인",
      "박정인",
      "박정인"
    ],
    "accomp": [
      "김진희",
      "최우진",
      "사모님",
      "김진희",
      "사모님",
      "최우진"
    ]
  },
  "wednesday": {
    "date": "10/21(수)",
    "preacher": "최명환",
    "worship": "노태규",
    "sound": "박정인",
    "pd": "정지원"
  },
  "friday": {
    "date": "10/23(금)",
    "worship": "정지원",
    "pd": "윤수신",
    "caption": "노태규",
    "prayer": [
      "박정인",
      "윤수신",
      "김은형"
    ]
  },
  "sunday": {
    "date": "10/25(일)",
    "firstHost": "노태규",
    "secondHost": "최명환",
    "thirdHost": "박정인",
    "firstPd": "최명환",
    "firstCaption": "윤수신",
    "secondPd": "박정인"
  }
};
}
