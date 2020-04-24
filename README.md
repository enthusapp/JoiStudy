# JoiStudy
Study Joi

https://hapi.dev/module/joi/ @v17.1.1

### Joi 를 이용하여 항상 validate 한 값을 얻기
##### Joi 를 통해서 default 값 얻기
```JS
any.default(10)
```

##### Joi condition 에 따라서 default 값 얻기
```JS
any.failover(20)
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

### Joi 를 이용하여 html input form 을 만들기
##### Joi schema 속성의 min, max 값을 확인하기
```JS
any.describe().keys.key.rules.filter(e => e.name === 'min')
```

##### custom 정보 저장 ex) html 의 data-set 속성
https://hapi.dev/module/joi/api/?v=17.1.1#extensions

https://hapi.dev/module/joi/api/?v=17.1.1#anycustommethod-description

### Joi & GraphQL
https://medium.com/@samueljoli/joi2gql-easily-convert-joi-schemas-into-graphql-data-types-c10b8dffb9cd

https://github.com/muraljs/joiql

https://github.com/xogroup/joi2gql
