// 노션 원자료 기준: 한 주간 예배 담당자
// GitHub Actions가 매주 토요일 09:30(KST)에 자동 갱신합니다.

if (typeof churchData !== 'undefined') {
  churchData.leaders = {
  "title": "한 주간 예배 담당자",
  "subtitle": "이번 주 예배 담당자",
  "icon": "👥",
  "color": "ldr",
  "description": "이번 주 새벽·수요·금요 예배 담당자",
  "week": "5/25 — 5/30",
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
      "노태규",
      "노태규",
      "목사님",
      "목사님",
      "박정인",
      "박정인"
    ],
    "caption": [
      "윤수신",
      "윤수신",
      "윤수신",
      "정지원",
      "정지원",
      "정지원"
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
    "date": "5/27(수)",
    "preacher": "윤수신",
    "worship": "노태규",
    "sound": "정지원",
    "pd": "박정인"
  },
  "friday": {
    "date": "5/29(금)",
    "worship": "정지원",
    "pd": "윤수신",
    "caption": "박정인",
    "prayer": [
      "박정인",
      "윤수신",
      "김은형"
    ]
  }
};
}
