// 노션 원자료 기준: 한 주간 예배 담당자
// GitHub Actions가 매주 토요일 09:30(KST)에 자동 갱신합니다.

if (typeof churchData !== 'undefined') {
  churchData.leaders = {
  "title": "한 주간 예배 담당자",
  "subtitle": "이번 주 예배 담당자",
  "icon": "👥",
  "color": "ldr",
  "description": "이번 주 새벽·수요·금요·주일 예배 담당자",
  "week": "11/2 — 11/7",
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
      "초하루",
      "특별새벽기도",
      "특별새벽기도",
      "특별새벽기도",
      "특별새벽기도",
      "특별새벽기도"
    ],
    "caption": [
      "초하루",
      "특별새벽기도",
      "특별새벽기도",
      "특별새벽기도",
      "특별새벽기도",
      "특별새벽기도"
    ],
    "accomp": [
      "초하루",
      "최우진",
      "민주희",
      "김진희",
      "민주희",
      "최우진"
    ]
  },
  "wednesday": {
    "date": "11/4(수)",
    "preacher": "정지원",
    "worship": "윤수신",
    "sound": "최명환",
    "pd": "노태규"
  },
  "friday": {
    "date": "11/6(금)",
    "worship": "윤수신",
    "pd": "박정인",
    "caption": "노태규",
    "prayer": [
      "민꿈",
      "교역자"
    ]
  },
  "sunday": {
    "date": "11/8(일)",
    "firstHost": "윤수신",
    "secondHost": "정지원",
    "thirdHost": "박정인",
    "firstPd": "노태규",
    "firstCaption": "최명환",
    "secondPd": "최명환"
  }
};
}
