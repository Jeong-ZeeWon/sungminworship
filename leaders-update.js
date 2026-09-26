// 노션 원자료 기준: 한 주간 예배 담당자
// GitHub Actions가 매주 토요일 09:30(KST)에 자동 갱신합니다.

if (typeof churchData !== 'undefined') {
  churchData.leaders = {
  "title": "한 주간 예배 담당자",
  "subtitle": "이번 주 예배 담당자",
  "icon": "👥",
  "color": "ldr",
  "description": "이번 주 새벽·수요·금요·주일 예배 담당자",
  "week": "9/28 — 9/3",
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
      "최명환",
      "초하루",
      "윤수신",
      "윤수신"
    ],
    "caption": [
      "박정인",
      "박정인",
      "박정인",
      "초하루",
      "정지원",
      "정지원"
    ],
    "accomp": [
      "김진희",
      "최우진",
      "사모님",
      "초하루",
      "민주희",
      "최우진"
    ]
  },
  "wednesday": {
    "date": "9/30(수)",
    "preacher": "박정인",
    "worship": "최명환",
    "sound": "정지원",
    "pd": "노태규"
  },
  "friday": {
    "date": "10/2(금)",
    "worship": "윤수신",
    "pd": "최명환",
    "caption": "노태규",
    "prayer": [
      "민꿈",
      "교역자"
    ]
  },
  "sunday": {
    "date": "10/4(일)",
    "firstHost": "윤수신",
    "secondHost": "정지원",
    "thirdHost": "최명환",
    "firstPd": "박정인",
    "firstCaption": "노태규",
    "secondPd": "박정인"
  }
};
}
