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
// 생성: 2026-11-26T15:22:37.985Z · 주일 13 · 수요 25 · 금요 29 · 큐티 89
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
  }
]);

  mergeByDate(churchData.qt && churchData.qt.items, [
  {
    "date": "2026-11-01",
    "passage": "몬 1:1~14"
  },
  {
    "date": "2026-11-02",
    "passage": "몬 1:15~25",
    "title": "복음 안에서는 모두가 사랑받는 형제입니다"
  },
  {
    "date": "2026-11-03",
    "passage": "암 1:1~8",
    "title": "사자처럼 부르짖는 심판의 예고"
  },
  {
    "date": "2026-11-04",
    "passage": "암 1:9~15",
    "title": "긍휼을 저버린 죄에 임하는 심판"
  },
  {
    "date": "2026-11-05",
    "passage": "암 2:1~8",
    "title": "율법을 업신여긴 죄에 임하는 심판"
  },
  {
    "date": "2026-11-06",
    "passage": "암 2:9~16",
    "title": "은혜를 망각하면 복과 멀어집니다"
  },
  {
    "date": "2026-11-07",
    "passage": "암 3:1~8",
    "title": "죄악에 임하는 필연적인 심판"
  },
  {
    "date": "2026-11-08",
    "passage": "암 3:9~15"
  },
  {
    "date": "2026-11-09",
    "passage": "암 4:1~13",
    "title": "기회를 주시는 사랑 완고한 불순종"
  },
  {
    "date": "2026-11-10",
    "passage": "암 5:1~6",
    "title": "하나님을 찾는 것이 살길입니다"
  },
  {
    "date": "2026-11-11",
    "passage": "암 5:7~17",
    "title": "정의를 외면하면 심판의 하나님을 만납니다"
  },
  {
    "date": "2026-11-12",
    "passage": "암 5:18~27",
    "title": "정의와 공의가 강물처럼 흐르는 삶"
  },
  {
    "date": "2026-11-13",
    "passage": "암 6:1~7",
    "title": "안락함에 빠져 백성의 고통을 외면하는 죄"
  },
  {
    "date": "2026-11-14",
    "passage": "암 6:8~14",
    "title": "정의를 독으로 바꾸는 자들에게 임하는 심판"
  },
  {
    "date": "2026-11-15",
    "passage": "암 7:1~9"
  },
  {
    "date": "2026-11-16",
    "passage": "암 7:10~17",
    "title": "참된 왕의 경고를 막는 자에게 임하는 심판"
  },
  {
    "date": "2026-11-17",
    "passage": "암 8:1~10",
    "title": "죄악의 끝은 애곡입니다"
  },
  {
    "date": "2026-11-18",
    "passage": "암 8:11~9:6",
    "title": "말씀의 기근 하나님의 침묵"
  },
  {
    "date": "2026-11-19",
    "passage": "암 9:7~15",
    "title": "회복의 주권자가 이루실 온전한 회복"
  },
  {
    "date": "2026-11-20",
    "passage": "고후 1:1~7",
    "title": "환난보다 큰 하나님의 위로"
  },
  {
    "date": "2026-11-21",
    "passage": "고후 1:8~14",
    "title": "절망의 자리에서 의지할 하나님"
  },
  {
    "date": "2026-11-22",
    "passage": "고후 1:15~24"
  },
  {
    "date": "2026-11-23",
    "passage": "고후 2:1~11",
    "title": "눈물로 쓰는 사랑의 권면"
  },
  {
    "date": "2026-11-24",
    "passage": "고후 2:12~17",
    "title": "그리스도의 향기를 나타내는 삶"
  },
  {
    "date": "2026-11-25",
    "passage": "고후 3:1~11",
    "title": "성령께서 쓰시는 살아있는 편지"
  },
  {
    "date": "2026-11-26",
    "passage": "고후 3:12~18",
    "title": "주님께로 돌아가면 수건이 벗겨집니다"
  },
  {
    "date": "2026-11-27",
    "passage": "고후 4:1~10",
    "title": "질그릇 안에 담긴 하늘의 보배"
  },
  {
    "date": "2026-11-28",
    "passage": "고후 4:11~18",
    "title": "환난 너머에 있는 영원한 영광"
  },
  {
    "date": "2026-11-29",
    "passage": "고후 5:1~10"
  },
  {
    "date": "2026-11-30",
    "passage": "고후 5:11~21",
    "title": "그리스도의 권면, ”하나님과 화목하라”"
  },
  {
    "date": "2026-12-01",
    "passage": "고후 6:1~13",
    "title": "은혜받은 자답게 마음을 넓히십시오"
  },
  {
    "date": "2026-12-02",
    "passage": "고후 6:14~7:1",
    "title": "하나님의 성전다운 구별된 삶"
  },
  {
    "date": "2026-12-03",
    "passage": "고후 7:2~16",
    "title": "회개로 이어지는 근심은 기쁨이 됩니다"
  },
  {
    "date": "2026-12-04",
    "passage": "고후 8:1~8",
    "title": "나눔으로 증명되는 사랑의 진실함"
  },
  {
    "date": "2026-12-05",
    "passage": "고후 8:9~15",
    "title": "은혜를 아는 사람은 기꺼이 나눕니다"
  },
  {
    "date": "2026-12-06",
    "passage": "고후 8:16~24"
  },
  {
    "date": "2026-12-07",
    "passage": "고후 9:1~7",
    "title": "준비된 헌금 기쁨의 헌신"
  },
  {
    "date": "2026-12-08",
    "passage": "고후 9:8~15",
    "title": "넘치는 은혜는 넉넉한 나눔으로 흘러갑니다"
  },
  {
    "date": "2026-12-09",
    "passage": "고후 10:1~11",
    "title": "주님의 능력으로 성도를 세우는 사역자"
  },
  {
    "date": "2026-12-10",
    "passage": "고후 10:12~18",
    "title": "주님께 인정받는 참된 사역자"
  },
  {
    "date": "2026-12-11",
    "passage": "고후 11:1~10",
    "title": "값없이 전한 복음에 담긴 사랑"
  },
  {
    "date": "2026-12-12",
    "passage": "고후 11:11~21",
    "title": "잘못된 분별을 일깨우는 열심"
  },
  {
    "date": "2026-12-13",
    "passage": "고후 11:22~33"
  },
  {
    "date": "2026-12-14",
    "passage": "고후 12:1~10",
    "title": "약함 위에 머무는 그리스도의 능력"
  },
  {
    "date": "2026-12-15",
    "passage": "고후 12:11~21",
    "title": "영혼들을 위한 헌신적 섬김"
  },
  {
    "date": "2026-12-16",
    "passage": "고후 13:1~13",
    "title": "믿음 안에 있는지 자신을 살피십시오"
  },
  {
    "date": "2026-12-17",
    "passage": "미 1:1~7",
    "title": "하나님의 강림과 임박한 심판"
  },
  {
    "date": "2026-12-18",
    "passage": "미 1:8~16",
    "title": "피할 수 없는 심판 애통하는 마음"
  },
  {
    "date": "2026-12-19",
    "passage": "미 2:1~13",
    "title": "탐욕의 심판과 남은 자의 회복"
  },
  {
    "date": "2026-12-20",
    "passage": "미 3:1~12"
  },
  {
    "date": "2026-12-21",
    "passage": "미 4:1~5",
    "title": "하나님이 친히 이루시는 평화"
  },
  {
    "date": "2026-12-22",
    "passage": "미 4:6~5:1",
    "title": "심판에 담긴 하나님의 계획"
  },
  {
    "date": "2026-12-26",
    "passage": "미 5:2~15",
    "title": "평강을 주시는 영원한 통치자"
  },
  {
    "date": "2026-12-27",
    "passage": "미 6:1~8"
  },
  {
    "date": "2026-12-28",
    "passage": "미 6:9~16",
    "title": "거짓된 삶에 임하는 심판"
  },
  {
    "date": "2026-12-29",
    "passage": "미 7:1~6",
    "title": "정의가 사라진 시대의 참상"
  },
  {
    "date": "2026-12-30",
    "passage": "미 7:7~13",
    "title": "공의로운 회복 역전의 은혜"
  },
  {
    "date": "2026-12-31",
    "passage": "미 7:14~20",
    "title": "죄악을 영원히 기억하지 않으시는 하나님"
  },
  {
    "date": "2027-01-01",
    "passage": "눅 1:1~7"
  },
  {
    "date": "2027-01-02",
    "passage": "눅 1:8~25"
  },
  {
    "date": "2027-01-03",
    "passage": "눅 1:26~38"
  },
  {
    "date": "2027-01-04",
    "passage": "눅 1:39~56"
  },
  {
    "date": "2027-01-05",
    "passage": "눅 1:57~66"
  },
  {
    "date": "2027-01-06",
    "passage": "눅 1:67~80"
  },
  {
    "date": "2027-01-07",
    "passage": "눅 2:1~7"
  },
  {
    "date": "2027-01-08",
    "passage": "눅 2:8~20"
  },
  {
    "date": "2027-01-09",
    "passage": "눅 2:21~40"
  },
  {
    "date": "2027-01-10",
    "passage": "눅 2:41~52"
  },
  {
    "date": "2027-01-11",
    "passage": "눅 3:1~6"
  },
  {
    "date": "2027-01-12",
    "passage": "눅 3:7~20"
  },
  {
    "date": "2027-01-13",
    "passage": "눅 3:21~38"
  },
  {
    "date": "2027-01-14",
    "passage": "눅 4:1~15"
  },
  {
    "date": "2027-01-15",
    "passage": "눅 4:16~30"
  },
  {
    "date": "2027-01-16",
    "passage": "눅 4:31~44"
  },
  {
    "date": "2027-01-17",
    "passage": "눅 5:1~11"
  },
  {
    "date": "2027-01-18",
    "passage": "눅 5:12~26"
  },
  {
    "date": "2027-01-19",
    "passage": "눅 5:27~39"
  },
  {
    "date": "2027-01-20",
    "passage": "눅 6:1~11"
  },
  {
    "date": "2027-01-21",
    "passage": "눅 6:12~26"
  },
  {
    "date": "2027-01-22",
    "passage": "눅 6:27~38"
  },
  {
    "date": "2027-01-23",
    "passage": "눅 6:39~49"
  },
  {
    "date": "2027-01-24",
    "passage": "눅 7:1~10"
  },
  {
    "date": "2027-01-25",
    "passage": "눅 7:11~17"
  },
  {
    "date": "2027-01-26",
    "passage": "눅 7:18~35"
  },
  {
    "date": "2027-01-27",
    "passage": "눅 7:36~50"
  },
  {
    "date": "2027-01-28",
    "passage": "눅 8:1~18"
  },
  {
    "date": "2027-01-29",
    "passage": "눅 8:19~25"
  },
  {
    "date": "2027-01-30",
    "passage": "눅 8:26~39"
  },
  {
    "date": "2027-01-31",
    "passage": "눅 8:40~56"
  }
]);

  if (churchData.qt && churchData.qt.items && churchData.qt.items.length) {
  churchData.qt.months = Object.assign({}, churchData.qt.months || {}, {
    "1": "누가복음 1~8장",
    "11": "빌레몬서, 아모스, 고린도후서 1~5장",
    "12": "고린도후서 6~13장, 미가, 성탄절 QT"
  });
    // 배지 문구는 앞으로 남은 일정 기준으로 계산합니다. (지난 본문이 범위를 넓히지 않도록)
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    var now = new Date();
    var todayStr = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate());
    var upcoming = churchData.qt.items.filter(function (item) { return item.date >= todayStr; });
    var basis = upcoming.length ? upcoming : churchData.qt.items;
    basis.sort(function (a, b) { return a.date.localeCompare(b.date); });
    var first = Number(basis[0].date.slice(5, 7));
    var last = Number(basis[basis.length - 1].date.slice(5, 7));
    churchData.qt.subtitle = first === last ? first + '월 큐티 일정' : first + '–' + last + '월 큐티 일정';
  }
})();
