# 오늘의 숭식

숭실대학교 학식을 1일 1회 최신화 하여 보여주는 페이지입니다.

바로가기: https://vbalien.github.io/ssu-today-meals/

## Vanilla JS

본 코드는 크롤러와 CI/CD를 제외하고 라이브러리를 사용하지 않은 순수 자바스크립트 프로젝트입니다.

## 구현체

### Hash router

간단한 해시 라우터를 구현: `helper/router/`

### State management

간단한 상태관리를 구현: `helper/store/`

## API

### 학식 metadata

URL: `https://vbalien.github.io/ssu-today-meals/data/metadata.json`

학식의 메타 정보를 가져오는 API입니다.

#### Success Response

- **places** : 식당의 정보 배열 `Array`

  - **id**: 식당 고유 ID `number`
  - **name**: 식당 이름 `string`

- **lastUpdated** : 최근 갱신된 날짜정보(epoch milliseconds) `number`

**Content example**

```json
{
  "places": [
    {
      "id": 1,
      "name": "학생식당"
    },
    {
      "id": 2,
      "name": "숭실도담"
    },
    {
      "id": 7,
      "name": "FACULTY LOUNGE"
    },
    {
      "id": 4,
      "name": "스넥코너"
    },
    {
      "id": 5,
      "name": "푸드코트"
    },
    {
      "id": 6,
      "name": "더 키친"
    }
  ],
  "lastUpdated": 1612480235363
}
```

### 학식 메뉴

URL: `https://vbalien.github.io/ssu-today-meals/data/:id.json`

- **id** : 식당의 고유 ID

학식의 메타 정보를 가져오는 API입니다.

#### Success Response

- **name** : 식당의 명칭 `string`
- **menus** : 식당의 메뉴정보 배열 `Array`
  - **kind**: 메뉴의 종류 `string`
  - **foods**: 메뉴의 내용 HTML `string`
  - **price**: 메뉴의 가격(원) `number | undefined`
  - **image**: 메뉴의 사진 URL `string | undefined`

**Content example**

```json
{
  "name": "숭실도담",
  "menus": [
    {
      "kind": "점심 1코너",
      "foods": "<div><strong><font color=\"#ff0066\">&lt;건강한 식단&gt;</font></strong></div><div><strong><font color=\"#ff6666\">알배기배추</font>에 <font color=\"#ff9933\">마늘향 가득한</font></strong></div><div><strong><font color=\"#ff9933\">보쌈 한 쌈</font>은 맛이 없을 수 없는 조합!</strong></div><div><strong><font color=\"#ff00cc\">#마늘보쌈</font></strong></div><div><strong>시골밥상 구수한 맛 그대로</strong></div><div><strong><font color=\"#ff0099\">냄새없는&nbsp;#묵은지 우리콩 청국장찌개</font></strong></div><div><br></div><div><strong>마늘보쌈</strong></div><div><strong>*김치청국장찌개</strong></div><div>Garlic Bossam</div><div>*Kimchi Cheonggukjang Stew</div><div><br></div><div>알배기배추+오이맛고추 * 쌈장<br>수제봄동겉절이<br></div>",
      "price": 5000,
      "image": "https://soongguri.com/menu/menu_file/20210205_2_2.jpg"
    },
    {
      "kind": "석식 1코너",
      "foods": "<div><strong><font color=\"#ff6633\">&lt;웰빙 식단&gt;</font></strong></div><div><strong><font color=\"#ff9933\">슈퍼푸드 연어</font>와 </strong></div><div><strong><font color=\"#ff9966\">숲속의 버터&nbsp;고단백 아보카도</font>가 만난</strong></div><div><strong><font color=\"#009900\">#아보카도 <font color=\"#ff0033\">연어</font>덮밥</font></strong></div><div><strong><font color=\"#ff9999\">몸에 붓기를 빼주는 단호박</font>으로 만든</strong></div><div><strong><font color=\"#999900\"><font color=\"#009900\">#단호박튀김</font></font></strong></div><div><br></div><div><strong>아보카도연어덮밥</strong></div><div><strong>*단호박튀김</strong></div><div><font face=\"Thread-00001da0-Id-000002ff\">Avocado Salmon Rice</font></div><div><font face=\"Times New Roman\">*Fried Sweet Pumpkin</font></div><div><font face=\"Times New Roman\"><br></font></div><div><font face=\"Times New Roman\"><font color=\"#006600\"><strong>냉이</strong></font>된장국<br><strong>겨울 동치미</strong><br></font></div><div><strong><font face=\"Thread-00001da0-Id-000002ef\"><br></font></strong></div>",
      "price": 5000,
      "image": "https://soongguri.com/menu/menu_file/20210205_2_6.jpg"
    }
  ]
}
```
