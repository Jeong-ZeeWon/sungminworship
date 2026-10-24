// 노션 원자료 기준: 한 주간 예배 담당자
// GitHub Actions가 매주 토요일 09:30(KST)에 자동 갱신합니다.

if (typeof churchData !== 'undefined') {
  churchData.leaders = {
  "title": "한 주간 예배 담당자",
  "subtitle": "이번 주 예배 담당자",
  "icon": "👥",
  "color": "ldr",
  "description": "이번 주 새벽·수요·금요·주일 예배 담당자",
  "week": "10/26 — 10/31",
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
      "백폴린 전도사",
      "문영환 선교사",
      "찬양/윤수신",
      "박정인",
      "박정인"
    ],
    "caption": [
      "최명환",
      "박태준",
      "박태준",
      "정지원",
      "정지원",
      "정지원"
    ],
    "accomp": [
      "최우진",
      "김진희",
      "김진희",
      "박윤정",
      "사모님",
      "최우진"
    ]
  },
  "wednesday": {
    "date": "10/28(수)",
    "preacher": "강중현",
    "worship": "김은형",
    "sound": "전영찬",
    "pd": "전영찬"
  },
  "friday": {
    "date": "10/30(금)",
    "worship": "윤수신",
    "pd": "노태규",
    "caption": "박정인",
    "prayer": [
      "노태규",
      "정지원",
      "윤수신"
    ]
  },
  "sunday": {
    "date": "11/1(일)",
    "firstHost": "박정인",
    "secondHost": "정지원",
    "thirdHost": "최명환",
    "firstPd": "최명환",
    "firstCaption": "노태규",
    "secondPd": "최명환"
  }
};
}
