# 성민교회 앱 v2

성민교회 예배 일정, 큐티 본문, 한 주간 담당자를 보여주는 정적 웹앱입니다.

## 파일 구조

- `index.html` — 화면 뼈대
- `styles.css` — 디자인
- `app.js` — 화면 렌더링과 이동 기능
- `data.js` — 주일/수요/금요/큐티/담당자 데이터

## 수정 원칙

앞으로 예배 일정이나 담당자만 바꿀 때는 `data.js`만 수정하면 됩니다. `index.html` 안에 모든 데이터를 넣지 않기 때문에, 작은 일정 변경이 훨씬 안전해졌습니다.

## GitHub Pages

저장소 Settings → Pages에서 `Deploy from a branch`, `main`, `/root`로 설정하면 배포됩니다.