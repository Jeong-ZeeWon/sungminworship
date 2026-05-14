const churchData = {
  playlist: 'https://youtube.com/playlist?list=PLmXEdNkaWmwEIH03MrFTQ9pFxGIUc8KZO&si=HzMeIKLfmYwRHnQN',

  sunday: {
    title: '주일예배',
    subtitle: '요한복음 강해',
    icon: '☀️',
    color: 'sun',
    description: '요한복음 강해 · 매주 주일 1부 11시 · 2부 2시 · 3부 4시',
    theme: '📖 현재 시리즈: <strong>요한복음 강해</strong><br>빛, 생명, 부활 — 예수님이 누구신지 함께 발견해가는 여정',
    items: [
      { date:'2026-05-17', week:49, passage:'요한복음 9:24-34', title:'나는 보았다', staff:{'1부 사회':'노태규','2부 사회':'박정인','3부 사회':'최명환','1부 PD':'윤수신','1부 자막':'최명환','2부 PD':'정지원'} },
      { date:'2026-05-24', week:50, passage:'요한복음 9:35-41', title:'보게 된 자, 보지 못하는 자', staff:{'1부 사회':'노태규','2부 사회':'최명환','3부 사회':'박정인','1부 PD':'최명환','1부 자막':'박정인','2부 PD':'정지원'} },
      { date:'2026-05-31', week:51, passage:'요한복음 10:1-6', title:'목자와 양' },
      { date:'2026-06-07', week:52, passage:'요한복음 10:7-13', title:'양의 문', staff:{'1부 사회':'박정인','2부 사회':'정지원','3부 사회':'최명환','1부 PD':'노태규','1부 자막':'윤수신','2부 PD':'박정인'} },
      { date:'2026-06-14', week:53, passage:'요한복음 10:14-21', title:'양을 아는 목자', staff:{'1부 사회':'윤수신','2부 사회':'정지원','3부 사회':'박정인','1부 PD':'박정인','1부 자막':'노태규','2부 PD':'최명환'} },
      { date:'2026-06-21', week:54, passage:'요한복음 10:22-26', title:'그를 알지 못하다', staff:{'1부 사회':'노태규','2부 사회':'박정인','3부 사회':'최명환','1부 PD':'윤수신','1부 자막':'최명환','2부 PD':'정지원'} },
      { date:'2026-06-28', week:55, passage:'요한복음 10:27-30', title:'그의 손 안에', staff:{'1부 사회':'노태규','2부 사회':'최명환','3부 사회':'박정인','1부 PD':'최명환','1부 자막':'박정인','2부 PD':'정지원'} },
      { date:'2026-07-05', week:56, passage:'요한복음 10:31-39', title:'돌을 들다', staff:{'1부 사회':'윤수신','2부 사회':'정지원','3부 사회':'최명환','1부 PD':'박정인','1부 자막':'노태규','2부 PD':'최명환'} },
      { date:'2026-07-12', week:57, passage:'요한복음 10:40-42', title:'요단 건너편', staff:{'1부 사회':'최명환','2부 사회':'정지원','3부 사회':'박정인','1부 PD':'노태규','1부 자막':'윤수신','2부 PD':'박정인'} }
    ]
  },

  wednesday: {
    title: '수요예배',
    subtitle: 'SBA 성서학 과정3',
    icon: '🕊',
    color: 'wed',
    description: 'SBA 성서학 강의 일정과 담당자',
    theme: '🕊 <strong>SBA 성서학 과정3</strong><br>신약 서신과 요한계시록을 따라가는 말씀의 여정',
    items: [
      { date:'2026-05-13', lec:10, subject:'히브리서 · 야고보서', preacher:'노태규', worship:'최명환', sound:'윤수신', pd:'박정인' },
      { date:'2026-05-20', lec:11, subject:'베드로전서', preacher:'윤수신', worship:'정지원', sound:'노태규', pd:'최명환' },
      { date:'2026-05-27', lec:12, subject:'베드로후서 · 유다서', preacher:'윤수신', worship:'노태규', sound:'정지원', pd:'박정인' },
      { date:'2026-06-03', lec:13, subject:'요한일 · 이 · 삼서', preacher:'노태규', worship:'윤수신', sound:'최명환', pd:'정지원' },
      { date:'2026-06-10', lec:14, subject:'요한계시록 1', preacher:'이해영 담임목사', worship:'윤수신', sound:'박정인', pd:'노태규' },
      { date:'2026-06-17', lec:15, subject:'요한계시록 2', preacher:'이해영 담임목사', worship:'박정인', sound:'윤수신', pd:'최명환' }
    ]
  },

  friday: {
    title: '금요성령집회',
    subtitle: '사무엘상 강해',
    icon: '🔥',
    color: 'fri',
    description: '본문, 제목, 찬양·PD·기도용사 담당자',
    theme: '🔥 5월: <strong>회개, 부흥, 그리고 정착</strong><br>6월: 인간의 선택과 하나님의 준비',
    items: [
      { date:'2026-05-15', title:'세상에 답이었던 교회와 성도', passage:'행 3:1-10', preacher:'이은호 목사(얼바인샤이닝휄로우십교회)', worship:'윤수신', pd:'정지원', caption:'박정인', prayer:['박정인','정지원','김은형'] },
      { date:'2026-05-22', title:'에벤에셀, 부흥과 그 이후의 삶', passage:'삼상 7:12-17', worship:'정지원', pd:'노태규', caption:'윤수신', prayer:['최명환','노태규','윤수신'] },
      { date:'2026-05-29', title:'부흥 이후의 위기', passage:'삼상 8:1-9', worship:'정지원', pd:'윤수신', caption:'박정인', prayer:['박정인','윤수신','김은형'] },
      { date:'2026-06-05', title:'우리에게 왕을 주소서', passage:'삼상 8:10-18', worship:'윤수신', pd:'박정인', caption:'정지원', prayer:['민꿈','교역자'] },
      { date:'2026-06-12', title:'그들이 듣지 아니하고', passage:'삼상 8:19-22', worship:'정지원', pd:'윤수신', caption:'노태규', prayer:['최명환','노태규','윤수신'] },
      { date:'2026-06-19', title:'찾으러 갔다가 부름받다', passage:'삼상 9:1-14', worship:'윤수신', pd:'정지원', caption:'박정인', prayer:['박정인','정지원','김은형'] },
      { date:'2026-06-26', title:'하나님은 이미 준비하고 계셨다', passage:'삼상 9:15-21', worship:'정지원', pd:'노태규', caption:'윤수신', prayer:['최명환','노태규','윤수신'] },
      { date:'2026-07-03', title:'만남, 하나님의 뜻이 시작되는 순간', passage:'삼상 9:22-27', worship:'미정', pd:'미정', caption:'미정', prayer:['미정'] }
    ]
  },

  qt: {
    title: '큐티 본문',
    subtitle: '5 · 6 · 7월 큐티 일정',
    icon: '📖',
    color: 'qt',
    description: '매일 큐티 본문과 제목',
    theme: '📖 <strong>고린도전서</strong>와 예언서, 시편을 따라가는 매일 말씀 묵상',
    items: [
      { date:'2026-05-11', passage:'고전 1:18~25', title:'십자가의 그리스도 하나님의 구원 능력' },
      { date:'2026-05-12', passage:'고전 1:26~31', title:'부족한 자를 택하신 주님만 자랑하십시오' },
      { date:'2026-05-13', passage:'고전 2:1~9', title:'성령의 능력으로 전하는 하나님의 지혜' },
      { date:'2026-05-14', passage:'고전 2:10~16', title:'성령의 교훈을 받는 성령의 사람' },
      { date:'2026-05-15', passage:'고전 3:1~15', title:'교회의 기초 예수 그리스도' },
      { date:'2026-05-16', passage:'고전 3:16~23', title:'성령의 사람은 사람을 자랑하지 않습니다' },
      { date:'2026-05-17', passage:'고전 4:1~8', title:'' },
      { date:'2026-05-18', passage:'고전 4:9~21', title:'희생과 사랑으로 섬기는 영적 아버지' },
      { date:'2026-05-19', passage:'고전 5:1~13', title:'정결한 공동체를 위한 단호한 결단' },
      { date:'2026-05-20', passage:'고전 6:1~11', title:'성도 간의 문제는 교회 안에서 해결하십시오' },
      { date:'2026-05-21', passage:'고전 6:12~20', title:'정결한 몸으로 하나님께 영광 돌리십시오' },
      { date:'2026-05-22', passage:'고전 7:1~16', title:'거룩함과 헌신을 단련하는 결혼' },
      { date:'2026-05-23', passage:'고전 7:17~24', title:'변화된 정체성이 겉모습보다 중요합니다' },
      { date:'2026-05-24', passage:'고전 7:25~40', title:'' },
      { date:'2026-05-25', passage:'고전 8:1~13', title:'연약한 자를 위해 절제하는 사랑' },
      { date:'2026-05-26', passage:'고전 9:1~10', title:'복음을 위한 권리 포기와 헌신' },
      { date:'2026-05-27', passage:'고전 9:11~18', title:'자기 자랑이 없는 겸손한 사역자' },
      { date:'2026-05-28', passage:'고전 9:19~27', title:'주님의 길을 따르는 복음의 종' },
      { date:'2026-05-29', passage:'고전 10:1~13', title:'영적 자만을 버리고 교훈을 얻으십시오' },
      { date:'2026-05-30', passage:'고전 10:14~22', title:'귀신과의 교제에 참여하는 일을 피하십시오' },
      { date:'2026-05-31', passage:'고전 10:23~33', title:'' },
      { date:'2026-06-01', passage:'고전 11:1~16', title:'' },
      { date:'2026-06-02', passage:'고전 11:17~26', title:'' },
      { date:'2026-06-03', passage:'고전 11:27~34', title:'' },
      { date:'2026-06-04', passage:'고전 12:1~11', title:'' },
      { date:'2026-06-05', passage:'고전 12:12~20', title:'' },
      { date:'2026-06-06', passage:'고전 12:21~31', title:'' },
      { date:'2026-06-07', passage:'고전 13:1~7', title:'' },
      { date:'2026-06-08', passage:'고전 13:8~13', title:'' },
      { date:'2026-06-09', passage:'고전 14:1~12', title:'' },
      { date:'2026-06-10', passage:'고전 14:13~25', title:'' },
      { date:'2026-06-11', passage:'고전 14:26~40', title:'' },
      { date:'2026-06-12', passage:'고전 15:1~11', title:'' },
      { date:'2026-06-13', passage:'고전 15:12~19', title:'' },
      { date:'2026-06-14', passage:'고전 15:20~28', title:'' },
      { date:'2026-06-15', passage:'고전 15:29~34', title:'' },
      { date:'2026-06-16', passage:'고전 15:35~49', title:'' },
      { date:'2026-06-17', passage:'고전 15:50~58', title:'' },
      { date:'2026-06-18', passage:'고전 16:1~12', title:'' },
      { date:'2026-06-19', passage:'고전 16:13~24', title:'' },
      { date:'2026-06-20', passage:'욘 1:1~10', title:'' },
      { date:'2026-06-21', passage:'욘 1:11~16', title:'' },
      { date:'2026-06-22', passage:'욘 1:17~2:10', title:'' },
      { date:'2026-06-23', passage:'욘 3:1~10', title:'' },
      { date:'2026-06-24', passage:'욘 4:1~11', title:'' },
      { date:'2026-06-25', passage:'나 1:1~8', title:'' },
      { date:'2026-06-26', passage:'나 1:9~15', title:'' },
      { date:'2026-06-27', passage:'나 2:1~7', title:'' },
      { date:'2026-06-28', passage:'나 2:8~13', title:'' },
      { date:'2026-06-29', passage:'나 3:1~11', title:'' },
      { date:'2026-06-30', passage:'나 3:12~19', title:'' }
    ]
  },

  leaders: {
    title: '한 주간 예배 담당자',
    subtitle: '이번 주 예배 담당자',
    icon: '👥',
    color: 'ldr',
    description: '이번 주 새벽·수요·금요 예배 담당자',
    week: '5/11 — 5/16',
    dawn: {
      days: ['월','화','수','목','금','토'],
      preacher: ['윤수신','윤수신','목사님','목사님','박정인','박정인'],
      caption: ['최명환','최명환','최명환','노태규','노태규','노태규'],
      accomp: ['김진희','최우진','사모님','김진희','사모님','최우진']
    },
    wednesday: { date:'5/13(수)', preacher:'노태규', worship:'최명환', sound:'윤수신', pd:'박정인' },
    friday: { date:'5/15(금)', preacher:'이은호 목사', worship:'윤수신', pd:'정지원', caption:'박정인', prayer:['박정인','정지원','김은형'] }
  }
};
