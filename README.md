# 성민교회 앱 v2

성민교회 예배 일정, 큐티 본문, 한 주간 담당자를 보여주는 정적 웹앱입니다.

## 파일 구조

- `index.html` — 화면 뼈대
- `styles.css` — 디자인
- `app.js` — 화면 렌더링과 이동 기능
- `data.js` — 주일/수요/금요/큐티/담당자 데이터

## 수정 원칙

앞으로 예배 일정이나 담당자만 바꿀 때는 Notion 원본을 고치면 됩니다. `data.js`는 초기 스냅샷이고, 매주 자동 생성되는 두 파일이 그 위에 최신 내용을 덮어씁니다.

- `leaders-update.js` — 「한 주간 예배 담당자」 (새벽·수요·금요·주일 담당자 표)
- `schedules-auto.js` — 주일·수요·금요·큐티 일정 (`scripts/update-schedules.mjs`가 생성)

두 파일 모두 GitHub Actions(`.github/workflows/update-weekly-leaders.yml`)가 금요일 밤·토요일 아침(KST)에 다시 만들고 커밋합니다. 손으로 고쳐도 다음 실행에서 덮어써지므로, 내용 수정은 Notion에서 해 주세요.

### 원본 Notion 페이지

| 앱 화면 | Notion 페이지 | 페이지 ID |
| --- | --- | --- |
| 주일예배 | 주일예배 | `2df5e604d8c6816481c6f31a7070a2d4` |
| 수요예배 | 수요예배 담당자 | `2e15e604d8c6802f8284dd7ccc553b4f` |
| 금요성령집회 | 금요성령집회 | `2e35e604d8c681df8d57cdbab62ed6ec` |
| 큐티 본문 | 매일의 향기 | `2df5e604d8c68153b64dc76accb69102` |
| 한 주간 예배 담당자 | 한 주간 예배 담당자 | `35b5e604d8c680aea0c4d47fc08c83f7` |

일정 동기화가 예상과 다르게 나오면 로컬에서 원본 표 구조를 먼저 확인하세요.

```bash
NOTION_TOKEN=... node scripts/update-schedules.mjs --inspect
```

표의 머리글(예: `날짜`, `1부 사회`, `찬양`, `기도용사`, `본문`)을 보고 열 위치를 스스로 찾고, 머리글이 없는 표는 기존 열 순서로 읽습니다. 어떤 표를 어떻게 읽었는지 위 명령이 그대로 보여 줍니다.

## GitHub Pages

저장소 Settings → Pages에서 `Deploy from a branch`, `main`, `/root`로 설정하면 배포됩니다.