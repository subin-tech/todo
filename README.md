# Todo App

HTML/CSS/JavaScript로 만든 간단한 Todo 앱입니다. 별도의 서버나 빌드 도구 없이 브라우저에서 바로 실행되며, 데이터는 브라우저의 `localStorage`에 저장되어 새로고침해도 유지됩니다.

## 기능

1. Todo 추가 — 입력창에 텍스트를 입력하고 Enter 또는 "추가" 버튼 클릭
2. Todo 삭제 — 각 항목의 ✕ 버튼 클릭
3. Todo 완료/미완료 전환 — 체크박스 클릭
4. Todo 목록 표시 — 전체 / 진행중 / 완료 필터 지원
5. 데이터 영속화 — `localStorage`를 이용해 새로고침/재접속 시에도 데이터 유지

부가 기능으로 남은 할 일 개수 표시와 완료 항목 일괄 삭제 버튼도 포함되어 있습니다.

## 실행 방법

별도 설치 과정 없이 `index.html` 파일을 브라우저로 열면 바로 실행됩니다.

- 파일 탐색기에서 `index.html`을 더블클릭
- 또는 VS Code의 Live Server 확장 등을 사용해 로컬 서버로 열기

## 파일 구성

```
todo/
├── index.html   # 마크업 구조
├── style.css    # 스타일
├── app.js       # Todo 로직 (추가/삭제/토글/렌더링/영속화)
└── README.md    # 안내 문서
```

## 데이터 구조

각 Todo 항목은 다음과 같은 형태로 `localStorage`에 JSON 문자열로 저장됩니다.

```json
{
  "id": "고유 문자열 ID",
  "text": "할 일 내용",
  "completed": false,
  "createdAt": "ISO 8601 날짜 문자열"
}
```

저장 키: `todo-app__todos`
