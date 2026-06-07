// Notion source refresh: Sunday titles, Wednesday leaders, and QT month range.

if (typeof churchData !== 'undefined') {
  const sundayUpdates = [
    { date:'2026-06-07', week:52, passage:'요한복음 10:7-13', title:'생명의 문' },
    { date:'2026-06-14', week:53, passage:'요한복음 10:14-21', title:'알고 부르시는 목자' },
    { date:'2026-06-21', week:54, passage:'요한복음 10:22-26', title:'들리지 않는 음성' },
    { date:'2026-08-09', week:61, passage:'요한복음 11:28-37', title:'눈물의 하나님' },
    { date:'2026-08-16', week:62, passage:'요한복음 11:38-44', title:'무덤을 부르다' },
    { date:'2026-08-23', week:63, passage:'요한복음 11:45-57', title:'죽음을 결의하다' },
    { date:'2026-08-30', week:64, passage:'요한복음 12:1-8', title:'향유를 깨뜨리다' },
    { date:'2026-09-06', week:65, passage:'요한복음 12:9-19', title:'왕이 지나가다' },
    { date:'2026-09-13', week:66, passage:'요한복음 12:20-26', title:'밀알의 길' },
    { date:'2026-09-20', week:67, passage:'요한복음 12:27-36', title:'빛을 따르는 길' },
    { date:'2026-09-27', week:68, passage:'요한복음 12:37-43', title:'닫힌 마음' },
    { date:'2026-10-04', week:69, passage:'요한복음 12:44-50', title:'마지막 부르심' }
  ];

  sundayUpdates.forEach(update => {
    const existing = churchData.sunday.items.find(item => item.date === update.date);
    if (existing) Object.assign(existing, update);
    else churchData.sunday.items.push(update);
  });
  churchData.sunday.items.sort((a, b) => a.date.localeCompare(b.date));

  const wednesdayUpdates = [
    { date:'2026-06-10', lec:14, subject:'요한계시록 1', preacher:'노태규', worship:'박정인', sound:'윤수신', pd:'최명환' },
    { date:'2026-06-17', lec:15, subject:'요한계시록 2', preacher:'윤수신', worship:'정지원', sound:'박정인', pd:'최명환' }
  ];

  wednesdayUpdates.forEach(update => {
    const existing = churchData.wednesday.items.find(item => item.date === update.date);
    if (existing) Object.assign(existing, update);
    else churchData.wednesday.items.push(update);
  });
  churchData.wednesday.items.sort((a, b) => a.date.localeCompare(b.date));

  churchData.qt.items = churchData.qt.items.filter(item => !item.date.startsWith('2026-05-'));
  if (churchData.qt.months) delete churchData.qt.months[5];
  churchData.qt.subtitle = '6–9월 큐티 일정';
  churchData.qt.description = '';
  churchData.qt.theme = '';
}
