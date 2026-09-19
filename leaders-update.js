// 노션 원자료 기준: 한 주간 예배 담당자
// GitHub Actions가 매주 토요일 09:30(KST)에 자동 갱신합니다.

if (typeof churchData !== 'undefined') {
  churchData.leaders = {
  "title": "한 주간 예배 담당자",
  "subtitle": "이번 주 예배 담당자",
  "icon": "👥",
  "color": "ldr",
  "description": "이번 주 새벽·수요·금요·주일 예배 담당자",
  "week": "9/21 — 9/26",
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
      "추석",
      "노태규"
    ],
    "caption": [
      "박정인",
      "박정인",
      "박정인",
      "윤수신",
      "추석",
      "윤수신"
    ],
    "accomp": [
      "김진희",
      "최우진",
      "사모님",
      "김진희",
      "추석",
      "최우진"
    ]
  },
  "wednesday": {
    "date": "9/23(수)",
    "preacher": "박정인",
    "worship": "윤수신",
    "sound": "최명환",
    "pd": "정지원"
  },
  "friday": {
    "date": "9/25(금)",
    "worship": "",
    "pd": "",
    "caption": "",
    "prayer": []
  },
  "sunday": {
    "date": "9/27(일)",
    "firstHost": "노태규",
    "secondHost": "최명환",
    "thirdHost": "박정인",
    "firstPd": "박정인",
    "firstCaption": "윤수신",
    "secondPd": ""
  }
};
}
