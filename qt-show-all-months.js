getQtGroups = function(sectionData = churchData.qt) {
  const groups = {};
  sectionData.items.forEach((item, index) => {
    const month = Number(item.date.slice(5, 7));
    if (!groups[month]) groups[month] = [];
    groups[month].push({ item, index });
  });
  return groups;
};

churchData.qt.subtitle = '5–9월 큐티 일정';
churchData.qt.description = '';
churchData.qt.theme = '';
