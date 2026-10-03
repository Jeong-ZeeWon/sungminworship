// 노션 원자료 기준: 한 주간 예배 담당자
// GitHub Actions가 매주 토요일 09:30(KST)에 자동 갱신합니다.

if (typeof churchData !== 'undefined') {
  churchData.leaders = {
  "title": "한 주간 예배 담당자",
  "subtitle": "이번 주 예배 담당자",
  "icon": "👥",
  "color": "ldr",
  "description": "이번 주 새벽·수요·금요·주일 예배 담당자",
  "week": "10/5 — 10/10",
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
      "정지원",
      "정지원",
      "윤수신",
      "윤수신"
    ],
    "caption": [
      "최명환",
      "최명환",
      "최명환",
      "박정인",
      "박정인",
      "박정인"
    ],
    "accomp": [
      "김진희",
      "최우진",
      "박윤정",
      "김진희",
      "김진희",
      "최우진"
    ]
  },
  "wednesday": {
    "date": "10/7(수)",
    "preacher": "최명환",
    "worship": "박정인",
    "sound": "노태규",
    "pd": "윤수신"
  },
  "friday": {
    "date": "10/9(금)",
    "worship": "정지원",
    "pd": "박정인",
    "caption": "윤수신",
    "prayer": [
      "민꿈",
      "교역자"
    ]
  },
  "sunday": {
    "date": "10/11(일)",
    "firstHost": "최명환",
    "secondHost": "정지원",
    "thirdHost": "박정인",
    "firstPd": "",
    "firstCaption": "",
    "secondPd": ""
  }
};
}
