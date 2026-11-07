// 노션 원자료 기준: 한 주간 예배 담당자
// GitHub Actions가 매주 토요일 09:30(KST)에 자동 갱신합니다.

if (typeof churchData !== 'undefined') {
  churchData.leaders = {
  "title": "한 주간 예배 담당자",
  "subtitle": "이번 주 예배 담당자",
  "icon": "👥",
  "color": "ldr",
  "description": "이번 주 새벽·수요·금요·주일 예배 담당자",
  "week": "11/9 — 11/14",
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
      "정지원",
      "정지원",
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
      "민주희",
      "김진희",
      "민주희",
      "최우진"
    ]
  },
  "wednesday": {
    "date": "11/11(수)",
    "preacher": "목사님",
    "worship": "정지원",
    "sound": "담당자",
    "pd": "담당지"
  },
  "friday": {
    "date": "11/13(금)",
    "worship": "정지원",
    "pd": "노태규",
    "caption": "윤수신",
    "prayer": [
      "정지원",
      "·",
      "윤수신",
      "·",
      "김은형"
    ]
  },
  "sunday": {
    "date": "11/15(일)",
    "firstHost": "노태규",
    "secondHost": "박정인",
    "thirdHost": "최명환",
    "firstPd": "윤수신",
    "firstCaption": "박정인",
    "secondPd": "최명환"
  }
};
}
