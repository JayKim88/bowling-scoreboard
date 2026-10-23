# 볼링 스코어보드

볼링 한 게임의 점수를 기록하는 스코어보드. 투구마다 쓰러뜨린 핀 수를 누르면
전광판에 기호와 누적 점수가 표시됨.

작업 순서와 진행 상황은 [CHECKLIST.md](./CHECKLIST.md) 참고.

## 실행

```bash
npm install
npm run dev
```

## 스택

Vue 3 (Composition API) + TypeScript + Vite.

상태 관리 라이브러리는 쓰지 않음. 공유할 상태가 하나뿐임.
