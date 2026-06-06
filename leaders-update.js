// 노션 원자료 기준: 한 주간 예배 담당자
// GitHub Actions가 매주 토요일 09:30(KST)에 자동 갱신합니다.

if (typeof churchData !== 'undefined') {
  churchData.leaders = {
  "title": "한 주간 예배 담당자",
  "subtitle": "이번 주 예배 담당자",
  "icon": "👥",
  "color": "ldr",
  "description": "이번 주 새벽·수요·금요 예배 담당자",
  "week": "6/8 — 6/13",
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
      "목사님",
      "목사님",
      "박정인",
      "박정인"
    ],
    "caption": [
      "최명환",
      "최명환",
      "최명환",
      "노태규",
      "노태규",
      "노태규"
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
    "date": "6/10(수)",
    "preacher": "노태규",
    "worship": "박정인",
    "sound": "윤수신",
    "pd": "최명환"
  },
  "friday": {
    "date": "6/12(금)",
    "worship": "정지원",
    "pd": "최명환",
    "caption": "노태규",
    "prayer": [
      "최명환",
      "노태규",
      "윤수신"
    ]
  }
};
}
