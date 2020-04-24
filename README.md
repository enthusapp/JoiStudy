# JoiStudy
Study Joi

https://hapi.dev/module/joi/ @v17.1.1

### Joi 를 이용하여 항상 유효한(valid) 값을 얻기
##### Joi default 값 설정
입력값이 없거나, 입력값이 유효 설정 범위를 벗어날 경우에 default 값을 반환
```JS
any.default(10).failover(10)
```

##### 소숫점 자리수 조정하기
소수점 아래 두번째 자리까지 반올림 하는 경우
```JS
const method = (value) => {
  return Math.round(value * 100) / 100;
};

const schema = Joi.number().custom(method, 'custom validation');
console.log(schema.validate(0.013)); // 0.01
console.log(schema.validate(0.015)); // 0.02
```

##### 불변성 차이
```JS
const testObj = { a: 1 };
const schema = Joi.object();
const tObj = schema.validate(testObj);
tObj.value.a = 3;
console.log(testObj); // { a: 3 }

const testObj = { a: 1 };
const schema = Joi.object({
  a: Joi.number(),
});
const tObj = schema.validate(testObj);
tObj.value.a = 3;
console.log(testObj); // { a: 1 }
```

### Joi 를 이용하여 html input form 을 만들기
현재까지의 결론 html input form(ex-dat.GUI) 을 위한 별도의 객체를 만든뒤에 그 객체를 이용하여 Joi schema 를 만드는 것이 더 편리

##### Joi schema 속성의 min, max 값을 확인하기
> joi.min.js 에는 반드시 필요하지 않은 함수가 제거되어 있다.
> web client 에서 사용할때는 `describe` 함수가 없기 때문에 schema 내부 변수를 참조해야 한다.
```JS
any.describe().keys.key.rules.filter(e => e.name === 'min')
```

##### custom 정보 저장 ex) html 의 data-set 속성
* [extensions](https://hapi.dev/module/joi/api/?v=17.1.1#extensions) 낮이도가 높고 사용방법에 대해서 문서화가 덜되어 있음
* [custom method](https://hapi.dev/module/joi/api/?v=17.1.1#anycustommethod-description)
  * 기본 값을 수정하는 방식이라 원래의 기능에서 벗어나게 되고 호환성 문제가 발생함
  * 기본 값 반환하는 schema 와 custom 정보를 등록하는 별도의 method 를 추가한 schema 를 사용하는 방법 있음
  * method 를 추가할 때는 `any.concat(any2)` 사용
  * method 를 추가해도 validation 한 입력값이 없으면 동작되지 않음
* [messages](https://hapi.dev/module/joi/api/?v=17.1.1#anymessagesmessages)
  * error 발생시에 적합한 사용 예제를 표시
  * select input 의 option 으로 사용하는 것은 원래의 목적을 벗어나는것?
  * dat.GUI 의 select format 으로 사용하려면 key 와 value 의 변경 필요

##### Joi condition 속성
* `any.validate()` 의 실행 이전에는 schema 정보를 읽고 condition 속성을 이용할 수 없음

### Joi & GraphQL
https://medium.com/@samueljoli/joi2gql-easily-convert-joi-schemas-into-graphql-data-types-c10b8dffb9cd

https://github.com/muraljs/joiql

https://github.com/xogroup/joi2gql
