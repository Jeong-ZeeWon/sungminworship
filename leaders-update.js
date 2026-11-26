// 노션 원자료 기준: 한 주간 예배 담당자
// GitHub Actions가 매주 토요일 09:30(KST)에 자동 갱신합니다.

if (typeof churchData !== 'undefined') {
  churchData.leaders = {
  "title": "한 주간 예배 담당자",
  "subtitle": "이번 주 예배 담당자",
  "icon": "👥",
  "color": "ldr",
  "description": "이번 주 새벽·수요·금요·주일 예배 담당자",
  "week": "11/23 — 11/28",
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
      "",
      "",
      "최명환",
      "최명환"
    ],
    "caption": [
      "노태규",
      "노태규",
      "노태규",
      "윤수신",
      "윤수신",
      "윤수신"
    ],
    "accomp": [
      "민주희",
      "최우진",
      "김진희",
      "김진희",
      "민주희",
      "최우진"
    ]
  },
  "wednesday": {
    "date": "11/25(수)",
    "preacher": "정지원",
    "worship": "노태규",
    "sound": "윤수신",
    "pd": "박정인"
  },
  "friday": {
    "date": "11/27(금)",
    "worship": "정지원",
    "pd": "노태규",
    "caption": "윤수신",
    "prayer": [
      "최명환",
      "·",
      "윤수신",
      "·",
      "김은형"
    ]
  },
  "sunday": {
    "date": "11/29(일)",
    "firstHost": "윤수신",
    "secondHost": "정지원",
    "thirdHost": "박정인",
    "firstPd": "최명환",
    "firstCaption": "노태규",
    "secondPd": "박정인"
  }
};
}

// ⚠️ 자동 생성 파일입니다. 직접 고치지 마세요. (수정은 scripts/update-schedules.mjs 또는 Notion 원본에서)
// 원본: 교회 Notion 「주일예배」 「수요예배 담당자」 「금요성령집회」 「매일의 향기」
// 생성: 2026-11-26T15:09:54.432Z · 주일 23 · 수요 37 · 금요 37 · 큐티 0
// GitHub Actions(.github/workflows/update-weekly-leaders.yml)가 매주 금요일 밤·토요일 아침에 다시 만듭니다.
// data.js의 스냅샷 위에 최신 일정만 덮어쓰고, 노션이 준 값이 없는 항목은 기존 값을 그대로 둡니다.

(function () {
  if (typeof churchData === 'undefined') return;

  function mergeByDate(list, incoming) {
    if (!Array.isArray(list) || !Array.isArray(incoming) || !incoming.length) return;
    incoming.forEach(function (item) {
      var found = list.find(function (existing) { return existing.date === item.date; });
      if (!found) {
        list.push(item);
        return;
      }
      Object.keys(item).forEach(function (key) {
        var value = item[key];
        if (value === undefined || value === null) return;
        if (typeof value === 'string' && !value.trim()) return;
        if (Array.isArray(value) && !value.length) return;
        if (key === 'staff') {
          found.staff = Object.assign({}, found.staff || {}, value);
          return;
        }
        found[key] = value;
      });
    });
    list.sort(function (a, b) { return a.date.localeCompare(b.date); });
  }

  mergeByDate(churchData.sunday && churchData.sunday.items, [
  {
    "date": "2026-08-02",
    "staff": {
      "1부 사회": "노태규",
      "2부 사회": "최명환",
      "3부 사회": "최명환",
      "1부 PD": "최명환",
      "1부 자막": "윤수신",
      "2부 PD": "최정호(김대호)"
    }
  },
  {
    "date": "2026-10-04",
    "staff": {
      "1부 사회": "윤수신",
      "2부 사회": "정지원",
      "3부 사회": "최명환",
      "1부 PD": "박정인",
      "1부 자막": "노태규",
      "2부 PD": "박정인"
    }
  },
  {
    "date": "2026-10-11",
    "staff": {
      "1부 사회": "최명환",
      "2부 사회": "정지원",
      "3부 사회": "박정인",
      "1부 PD": "노태규",
      "1부 자막": "박정인",
      "2부 PD": "최명환"
    }
  },
  {
    "date": "2026-10-18",
    "staff": {
      "1부 사회": "노태규",
      "2부 사회": "박정인",
      "3부 사회": "최명환",
      "1부 PD": "윤수신",
      "1부 자막": "최명환",
      "2부 PD": "최명환"
    }
  },
  {
    "date": "2026-10-25",
    "staff": {
      "1부 사회": "노태규",
      "2부 사회": "최명환",
      "3부 사회": "박정인",
      "1부 PD": "최명환",
      "1부 자막": "윤수신",
      "2부 PD": "박정인"
    }
  },
  {
    "date": "2026-11-01",
    "staff": {
      "1부 사회": "박정인",
      "2부 사회": "정지원",
      "3부 사회": "최명환",
      "1부 PD": "최명환",
      "1부 자막": "노태규",
      "2부 PD": "박정인"
    }
  },
  {
    "date": "2026-11-08",
    "staff": {
      "1부 사회": "윤수신",
      "2부 사회": "정지원",
      "3부 사회": "박정인",
      "1부 PD": "최명환",
      "1부 자막": "노태규",
      "2부 PD": "최명환"
    }
  },
  {
    "date": "2026-11-15",
    "staff": {
      "1부 사회": "노태규",
      "2부 사회": "최명환",
      "3부 사회": "박정인",
      "1부 PD": "윤수신",
      "1부 자막": "박정인",
      "2부 PD": "박정인"
    }
  },
  {
    "date": "2026-11-22",
    "staff": {
      "1부 사회": "노태규",
      "2부 사회": "박정인",
      "3부 사회": "최명환",
      "1부 PD": "박정인",
      "1부 자막": "윤수신",
      "2부 PD": "최명환"
    }
  },
  {
    "date": "2026-11-29",
    "staff": {
      "1부 사회": "윤수신",
      "2부 사회": "정지원",
      "3부 사회": "박정인",
      "1부 PD": "최명환",
      "1부 자막": "노태규",
      "2부 PD": "박정인"
    }
  },
  {
    "date": "2026-12-06",
    "staff": {
      "1부 사회": "최명환",
      "2부 사회": "정지원",
      "3부 사회": "최명환",
      "1부 PD": "박정인",
      "1부 자막": "박정인",
      "2부 PD": "최명환"
    }
  },
  {
    "date": "2026-12-13",
    "staff": {
      "1부 사회": "노태규",
      "2부 사회": "최명환",
      "3부 사회": "박정인",
      "1부 PD": "윤수신",
      "1부 자막": "최명환",
      "2부 PD": "박정인"
    }
  },
  {
    "date": "2026-12-20",
    "staff": {
      "1부 사회": "노태규",
      "2부 사회": "박정인",
      "3부 사회": "최명환",
      "1부 PD": "박정인",
      "1부 자막": "윤수신",
      "2부 PD": "최명환"
    }
  },
  {
    "date": "2027-03-22",
    "staff": {
      "1부 사회": "노태규",
      "2부 사회": "박정인",
      "3부 사회": "최명환",
      "1부 PD": "박정인",
      "1부 자막": "최명환",
      "2부 PD": "정지원"
    }
  },
  {
    "date": "2027-03-29",
    "staff": {
      "1부 사회": "노태규",
      "2부 사회": "최명환",
      "3부 사회": "박정인",
      "1부 PD": "윤수신",
      "1부 자막": "박정인",
      "2부 PD": "정지원"
    }
  },
  {
    "date": "2027-04-05",
    "staff": {
      "1부 사회": "박정인",
      "2부 사회": "정지원",
      "3부 사회": "최명환",
      "1부 PD": "노태규",
      "1부 자막": "윤수신",
      "2부 PD": "박정인"
    }
  },
  {
    "date": "2027-04-12",
    "staff": {
      "1부 사회": "윤수신",
      "2부 사회": "정지원",
      "3부 사회": "박정인",
      "1부 PD": "박정인",
      "1부 자막": "노태규",
      "2부 PD": "최명환"
    }
  },
  {
    "date": "2027-04-19",
    "staff": {
      "1부 사회": "노태규",
      "2부 사회": "박정인",
      "3부 사회": "최명환",
      "1부 PD": "윤수신",
      "1부 자막": "최명환",
      "2부 PD": "정지원"
    }
  },
  {
    "date": "2027-04-26",
    "staff": {
      "1부 사회": "노태규",
      "2부 사회": "최명환",
      "3부 사회": "박정인",
      "1부 PD": "최명환",
      "1부 자막": "박정인",
      "2부 PD": "정지원"
    }
  },
  {
    "date": "2027-05-03",
    "staff": {
      "1부 사회": "윤수신",
      "2부 사회": "정지원",
      "3부 사회": "최명환",
      "1부 PD": "박정인",
      "1부 자막": "노태규",
      "2부 PD": "최명환"
    }
  },
  {
    "date": "2027-05-10",
    "staff": {
      "1부 사회": "최명환",
      "2부 사회": "정지원",
      "3부 사회": "박정인",
      "1부 PD": "노태규",
      "1부 자막": "윤수신",
      "2부 PD": "박정인"
    }
  },
  {
    "date": "2027-05-17",
    "staff": {
      "1부 사회": "노태규",
      "2부 사회": "박정인",
      "3부 사회": "최명환",
      "1부 PD": "윤수신",
      "1부 자막": "최명환",
      "2부 PD": "정지원"
    }
  },
  {
    "date": "2027-05-24",
    "staff": {
      "1부 사회": "노태규",
      "2부 사회": "최명환",
      "3부 사회": "박정인",
      "1부 PD": "최명환",
      "1부 자막": "윤수신",
      "2부 PD": "정지원"
    }
  }
]);

  mergeByDate(churchData.wednesday && churchData.wednesday.items, [
  {
    "date": "2026-08-05",
    "preacher": "최명환",
    "worship": "윤수신",
    "sound": "김은형",
    "pd": "김은형"
  },
  {
    "date": "2026-08-12",
    "preacher": "정지원",
    "worship": "윤수신",
    "sound": "김은형",
    "pd": "김은형"
  },
  {
    "date": "2026-08-19",
    "preacher": "박정인",
    "worship": "정지원",
    "sound": "윤수신",
    "pd": "노태규"
  },
  {
    "date": "2026-08-26",
    "preacher": "노태규",
    "worship": "박정인",
    "sound": "최명환",
    "pd": "정지원"
  },
  {
    "date": "2026-09-02",
    "preacher": "담임목사님",
    "worship": "정지원",
    "sound": "최명환",
    "pd": "노태규"
  },
  {
    "date": "2026-09-09",
    "preacher": "담임목사님",
    "worship": "최명환",
    "sound": "노태규",
    "pd": "박정인"
  },
  {
    "date": "2026-09-16",
    "preacher": "박정인",
    "worship": "노태규",
    "sound": "윤수신",
    "pd": "최명환"
  },
  {
    "date": "2026-09-23",
    "preacher": "박정인",
    "worship": "정지원",
    "sound": "최명환",
    "pd": "윤수신"
  },
  {
    "date": "2026-09-30",
    "preacher": "박정인",
    "worship": "최명환",
    "sound": "정지원",
    "pd": "노태규"
  },
  {
    "date": "2026-10-07",
    "preacher": "최명환",
    "worship": "박정인",
    "sound": "노태규",
    "pd": "윤수신"
  },
  {
    "date": "2026-10-14",
    "preacher": "최명환",
    "worship": "윤수신",
    "sound": "정지원",
    "pd": "박정인"
  },
  {
    "date": "2026-10-21",
    "preacher": "최명환",
    "worship": "노태규",
    "sound": "박정인",
    "pd": "정지원"
  },
  {
    "date": "2026-10-28",
    "preacher": "강중현 목사",
    "worship": "김은형",
    "sound": "전영찬",
    "pd": "전영찬"
  },
  {
    "date": "2026-11-04",
    "preacher": "정지원",
    "worship": "윤수신",
    "sound": "최명환",
    "pd": "노태규"
  },
  {
    "date": "2026-11-11",
    "preacher": "담임목사님",
    "worship": "정지원",
    "sound": "담당자",
    "pd": "담당지"
  },
  {
    "date": "2026-11-18",
    "preacher": "정지원",
    "worship": "박정인",
    "sound": "노태규",
    "pd": "윤수신"
  },
  {
    "date": "2026-11-25",
    "preacher": "정지원",
    "worship": "노태규",
    "sound": "윤수신",
    "pd": "박정인1"
  },
  {
    "date": "2026-12-02",
    "preacher": "담임목사님",
    "worship": "정지원",
    "sound": "박정인",
    "pd": "최명환2"
  },
  {
    "date": "2026-12-09",
    "preacher": "노태규",
    "worship": "최명환",
    "sound": "정지원",
    "pd": "윤수신5"
  },
  {
    "date": "2026-12-16",
    "preacher": "노태규",
    "worship": "윤수신",
    "sound": "최명환",
    "pd": "정지원3"
  },
  {
    "date": "2026-12-23",
    "preacher": "윤수신",
    "worship": "박정인",
    "sound": "박정인",
    "pd": "노태규4"
  },
  {
    "date": "2026-12-30",
    "preacher": "윤수신",
    "worship": "최명환",
    "sound": "노태규",
    "pd": "박정인1"
  },
  {
    "date": "2027-01-06",
    "preacher": "담임목사님",
    "worship": "정지원",
    "sound": "윤수신",
    "pd": "최명환2"
  },
  {
    "date": "2027-01-13",
    "worship": "노태규",
    "sound": "최명환",
    "pd": "정지원3"
  },
  {
    "date": "2027-01-20",
    "worship": "윤수신",
    "sound": "정지원",
    "pd": "노태규4"
  },
  {
    "date": "2027-03-11",
    "lec": 1,
    "preacher": "박정인 목사",
    "worship": "최명환1-2",
    "sound": "정지원1-3",
    "pd": "노태규1-4"
  },
  {
    "date": "2027-03-18",
    "lec": 2,
    "preacher": "박정인 목사",
    "worship": "정지원1-3",
    "sound": "노태규1-4",
    "pd": "윤수신1-5"
  },
  {
    "date": "2027-03-25",
    "lec": 3,
    "preacher": "박정인 목사",
    "worship": "노태규1-4",
    "sound": "최명환1-2",
    "pd": "정지원1-3"
  },
  {
    "date": "2027-04-01",
    "lec": 4,
    "preacher": "최명환 목사",
    "worship": "윤수신1-5",
    "sound": "박정인1-1",
    "pd": "정지원2-3"
  },
  {
    "date": "2027-04-08",
    "lec": 5,
    "preacher": "최명환 목사",
    "worship": "박정인1-1",
    "sound": "정지원2-3",
    "pd": "노태규2-4"
  },
  {
    "date": "2027-04-15",
    "lec": 6,
    "preacher": "최명환 목사",
    "worship": "정지원2-3",
    "sound": "박정인2-1",
    "pd": "윤수신2-5"
  },
  {
    "date": "2027-04-22",
    "lec": 7,
    "preacher": "정지원 목사",
    "worship": "최명환2-2",
    "sound": "노태규2-4",
    "pd": "박정인1-1"
  },
  {
    "date": "2027-04-29",
    "lec": 8,
    "preacher": "정지원 목사",
    "worship": "노태규2-4",
    "sound": "윤수신1-5",
    "pd": "최명환2-2"
  },
  {
    "date": "2027-05-06",
    "lec": 9,
    "preacher": "정지원 목사",
    "worship": "박정인2-1",
    "sound": "최명환2-2",
    "pd": "윤수신2-1"
  },
  {
    "date": "2027-05-13",
    "lec": 10,
    "preacher": "노태규 목사",
    "worship": "최명환2-2",
    "sound": "윤수신3-2",
    "pd": "박정인3-5"
  },
  {
    "date": "2027-05-20",
    "lec": 11,
    "preacher": "윤수신 목사",
    "worship": "정지원3-3",
    "sound": "노태규3-4",
    "pd": "최명환2-2"
  },
  {
    "date": "2027-05-27",
    "lec": 12,
    "preacher": "윤수신 목사",
    "worship": "노태규3-4",
    "sound": "정지원3-3",
    "pd": "박정인3-1"
  }
]);

  mergeByDate(churchData.friday && churchData.friday.items, [
  {
    "date": "2026-07-31",
    "worship": "윤수신",
    "pd": "김은형",
    "caption": "노태규",
    "prayer": [
      "노태규",
      "김은형",
      "하태양"
    ]
  },
  {
    "date": "2026-08-07",
    "worship": "정지원",
    "pd": "최명환",
    "caption": "윤수신",
    "prayer": [
      "민꿈",
      "교역자"
    ]
  },
  {
    "date": "2026-08-14",
    "worship": "윤수신",
    "pd": "노태규",
    "caption": "박정인",
    "prayer": [
      "박정인",
      "노태규",
      "정지원"
    ]
  },
  {
    "date": "2026-08-21",
    "worship": "정지원",
    "pd": "박정인",
    "caption": "노태규",
    "prayer": [
      "최명환",
      "김은형",
      "하태양"
    ]
  },
  {
    "date": "2026-08-28",
    "worship": "정지원",
    "pd": "노태규",
    "caption": "박정인",
    "prayer": [
      "박정인",
      "노태규",
      "하태양"
    ]
  },
  {
    "date": "2026-09-11",
    "worship": "정지원",
    "pd": "노태규",
    "caption": "윤수신",
    "prayer": [
      "최명환",
      "윤수신",
      "김은형"
    ]
  },
  {
    "date": "2026-09-18",
    "worship": "윤수신",
    "pd": "노태규",
    "caption": "박정인",
    "prayer": [
      "박정인",
      "노태규",
      "정지원"
    ]
  },
  {
    "date": "2026-10-02",
    "worship": "윤수신",
    "pd": "최명환",
    "caption": "노태규",
    "prayer": [
      "최명환",
      "정지원",
      "김은형"
    ]
  },
  {
    "date": "2026-10-09",
    "worship": "정지원",
    "pd": "박정인",
    "caption": "윤수신",
    "prayer": [
      "민꿈",
      "교역자"
    ]
  },
  {
    "date": "2026-10-16",
    "worship": "윤수신",
    "pd": "노태규",
    "caption": "박정인",
    "prayer": [
      "박정인",
      "최명환",
      "노태규"
    ]
  },
  {
    "date": "2026-10-23",
    "worship": "정지원",
    "pd": "윤수신",
    "caption": "노태규",
    "prayer": [
      "박정인",
      "윤수신",
      "김은형"
    ]
  },
  {
    "date": "2026-10-30",
    "worship": "윤수신",
    "pd": "노태규",
    "caption": "박정인",
    "prayer": [
      "노태규",
      "정지원",
      "윤수신"
    ]
  },
  {
    "date": "2026-11-06",
    "worship": "윤수신",
    "pd": "박정인",
    "caption": "노태규",
    "prayer": [
      "민꿈",
      "교역자"
    ]
  },
  {
    "date": "2026-11-13",
    "worship": "정지원",
    "pd": "노태규",
    "caption": "윤수신",
    "prayer": [
      "정지원",
      "윤수신",
      "김은형"
    ]
  },
  {
    "date": "2026-11-20",
    "worship": "윤수신",
    "pd": "박정인",
    "caption": "노태규",
    "prayer": [
      "박정인",
      "정지원",
      "노태규"
    ]
  },
  {
    "date": "2026-11-27",
    "worship": "정지원",
    "pd": "노태규",
    "caption": "윤수신",
    "prayer": [
      "최명환",
      "윤수신",
      "김은형"
    ]
  },
  {
    "date": "2026-12-04",
    "worship": "윤수신",
    "pd": "노태규",
    "caption": "박정인",
    "prayer": [
      "민꿈",
      "교역자"
    ]
  },
  {
    "date": "2026-12-11",
    "worship": "정지원",
    "pd": "박정인",
    "caption": "윤수신",
    "prayer": [
      "최명환",
      "노태규",
      "윤수신"
    ]
  },
  {
    "date": "2026-12-18",
    "worship": "윤수신",
    "pd": "박정인",
    "caption": "노태규",
    "prayer": [
      "박정인",
      "정지원",
      "김은형"
    ]
  },
  {
    "date": "2026-12-25",
    "worship": "성탄절"
  },
  {
    "date": "2027-01-01",
    "worship": "윤수신",
    "pd": "노태규",
    "caption": "박정인",
    "prayer": [
      "민꿈",
      "교역자"
    ]
  },
  {
    "date": "2027-01-08",
    "worship": "정지원",
    "pd": "박정인",
    "caption": "윤수신",
    "prayer": [
      "최명환",
      "노태규",
      "윤수신"
    ]
  },
  {
    "date": "2027-01-15",
    "worship": "윤수신",
    "pd": "박정인",
    "caption": "노태규",
    "prayer": [
      "박정인",
      "정지원",
      "김은형"
    ]
  },
  {
    "date": "2027-01-22",
    "worship": "정지원",
    "pd": "노태규",
    "caption": "윤수신",
    "prayer": [
      "최명환",
      "노태규",
      "윤수신"
    ]
  },
  {
    "date": "2027-01-29",
    "worship": "윤수신",
    "pd": "노태규",
    "caption": "박정인",
    "prayer": [
      "박정인",
      "정지원",
      "김은형"
    ]
  },
  {
    "date": "2027-02-05",
    "worship": "윤수신",
    "pd": "박정인",
    "caption": "노태규",
    "prayer": [
      "민꿈",
      "교역자"
    ]
  },
  {
    "date": "2027-02-12",
    "worship": "정지원",
    "pd": "노태규",
    "caption": "윤수신",
    "prayer": [
      "최명환",
      "노태규",
      "윤수신"
    ]
  },
  {
    "date": "2027-02-19",
    "worship": "윤수신",
    "pd": "노태규",
    "caption": "박정인",
    "prayer": [
      "박정인",
      "정지원",
      "김은형"
    ]
  },
  {
    "date": "2027-02-26",
    "worship": "정지원",
    "pd": "윤수신",
    "caption": "노태규",
    "prayer": [
      "최명환",
      "노태규",
      "윤수신"
    ]
  },
  {
    "date": "2027-04-03",
    "worship": "정지원",
    "pd": "윤수신",
    "caption": "노태규",
    "prayer": [
      "최명환",
      "노태규",
      "윤수신"
    ]
  },
  {
    "date": "2027-04-10",
    "worship": "윤수신",
    "pd": "박정인",
    "caption": "정지원",
    "prayer": [
      "박정인",
      "정지원",
      "김은형"
    ]
  },
  {
    "date": "2027-04-17",
    "worship": "윤수신",
    "pd": "정지원",
    "caption": "박정인",
    "prayer": [
      "최명환",
      "노태규",
      "정지원"
    ]
  },
  {
    "date": "2027-04-24",
    "worship": "정지원",
    "pd": "노태규",
    "caption": "윤수신",
    "prayer": [
      "박정인",
      "윤수신",
      "김은형"
    ]
  },
  {
    "date": "2027-05-01",
    "worship": "윤수신",
    "pd": "박정인",
    "caption": "정지원",
    "prayer": [
      "민꿈",
      "교역자"
    ]
  },
  {
    "date": "2027-05-08",
    "worship": "정지원",
    "pd": "윤수신",
    "caption": "노태규",
    "prayer": [
      "최명환",
      "노태규",
      "윤수신"
    ]
  },
  {
    "date": "2027-05-15",
    "worship": "윤수신",
    "pd": "정지원",
    "caption": "박정인",
    "prayer": [
      "박정인",
      "정지원",
      "김은형"
    ]
  },
  {
    "date": "2027-05-22",
    "worship": "정지원",
    "pd": "노태규",
    "caption": "윤수신",
    "prayer": [
      "최명환",
      "노태규",
      "윤수신"
    ]
  }
]);

  mergeByDate(churchData.qt && churchData.qt.items, []);

  if (churchData.qt && churchData.qt.items && churchData.qt.items.length) {
    var months = churchData.qt.items.map(function (item) { return Number(item.date.slice(5, 7)); });
    var first = Math.min.apply(null, months);
    var last = Math.max.apply(null, months);
    churchData.qt.subtitle = first === last ? first + '월 큐티 일정' : first + '–' + last + '월 큐티 일정';
  }
})();
