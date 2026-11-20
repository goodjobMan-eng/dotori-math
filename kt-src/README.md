# 도토리 숲 수학 퀴즈 — 지식추적 작업본 (하네스 안내)

이 폴더만 있으면 새 세션에서도 이어서 작업할 수 있다. 저장소: `goodjobMan-eng/dotori-math` (GitHub Pages, 단일 `index.html`).

## 폴더
- `kt_src.zip` 안: `build.py`, `src/`, `server/`, 테스트(`t*.js`, `x*.js`), `push.sh`
- `build.py` — 원본 `index.html`(커밋 ed336e7 기준, `/tmp/dotori-math/index.html`)에 `src/`를 붙여 `out/index.html`을 만든다. `python3 build.py`
- `src/bank2.js` 진단 문항 · `mis.js` 오개념 코드 표 · `tags3.js` 문항 태그와 4~5지선다 문항 · `cpiece.js` 개념 조각 63개, 코드→조각 무게, 강의 연결 · `core2.js` 숙달 갱신, 오개념 판정, 정보량 출제, 수준 찾기, 내 친구, 교사 화면 · `modes.js` 화면과 오늘의 문제 · `facts.js` 1~2학년 기록 · `assets2.js` 그림
- `server/` — 공개 데이터 수집(worker.js, export_public.py). 아직 배포 전
- `push.sh "메시지"` — 저장소 클론(`/home/claude/dotori-math`)에 복사·커밋·푸시. 다른 세션 변경이 있으면 멈춘다
- `index.html` — 가장 최근 빌드(브라우저로 바로 열어 볼 수 있음)
- `진행기록.md` — 회차별로 한 일, 남은 일

## 작업 순서
1. `src/` 수정 → `python3 build.py`
2. 고친 부분 테스트만 그때그때(`node t23.js` 식, playwright). 묶음이 끝나면 전체: t5 t10 t11 t12 t14 t15 t16 t18 t19 t20 t21, 수준 찾기는 t23
3. 큰 묶음이 끝났을 때만 `push.sh`로 한 번에 올린다. 그 사이에는 이 폴더에 저장하고 `진행기록.md`에 적는다

## 원칙
- 최우선: 문제 하나에서 가장 많은 개념 정보를 얻고, 적은 표본으로 결손을 찾는다
- 보기는 오개념 유형 수만큼(5지선다까지). 보기마다 오개념 코드와 조각 무게
- 개인 구분은 기기 + 색깔 동물 친구. 이름·번호는 받지 않는다
- 제미나이(카본)와 주고받으며 검토하되, 문항은 전부 직접 검산한 뒤 넣는다

## 코드 쓸 때 주의
- 한 줄 코드 중간에 `//` 주석을 넣지 않는다(뒤 코드가 지워진다)
- 새 오개념 코드는 `MIS`와 `cpiece.js`의 `MISC` 두 곳에. 조각마다 단독 코드 2개 이상
