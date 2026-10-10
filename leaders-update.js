// 노션 원자료 기준: 한 주간 예배 담당자
// GitHub Actions가 매주 토요일 09:30(KST)에 자동 갱신합니다.

if (typeof churchData !== 'undefined') {
  churchData.leaders = {
  "title": "한 주간 예배 담당자",
  "subtitle": "이번 주 예배 담당자",
  "icon": "👥",
  "color": "ldr",
  "description": "이번 주 새벽·수요·금요·주일 예배 담당자",
  "week": "10/12 — 10/17",
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
      "최명환",
      "최명환",
      "찬양/최명환",
      "찬양/박정인",
      "박정인",
      "박정인"
    ],
    "caption": [
      "정지원",
      "정지원",
      "정지원",
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
    "date": "10/14(수)",
    "preacher": "최명환",
    "worship": "윤수신",
    "sound": "정지원",
    "pd": "박정인"
  },
  "friday": {
    "date": "10/16(금)",
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
    "date": "10/18(일)",
    "firstHost": "노태규",
    "secondHost": "박정인",
    "thirdHost": "최명환",
    "firstPd": "윤수신",
    "firstCaption": "최명환",
    "secondPd": "최명환"
  }
};
}
