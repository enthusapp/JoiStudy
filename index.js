const Joi = require('@hapi/joi');

const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    repeat_password: Joi.ref('password'),

    access_token: [
        Joi.string(),
        Joi.number()
    ],

    birth_year: Joi.number().integer().min(1900).max(2013).default(2000).failover(2001),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})
    .with('username', 'birth_year')
    .xor('password', 'access_token')
    .with('password', 'repeat_password');


console.log(schema.describe().keys.username.rules);
console.log(schema.validate({ username: 'abc', password: '1234', repeat_password: '1234', birth_year: 2020 }));

const method2 = (value) => {
  let newValue = value * 100;
  return Math.round(newValue) / 100;
};

const schema3 = Joi.number().custom(method2, 'custom validation');
console.log(schema3.validate(0.013));
console.log(schema3.validate(0.015));

const method = (value, helpers) => {
    return { value, customData: { arrow1: 'desc1', arrow2: 'desc2' } };
};

const schema2 = Joi.object().custom(method, 'custom validation');
schema2.messages({ op1: 'op111', op2: 'op222' });
console.log(schema2.describe());
console.log(schema2.validate({}));

const testString = 'op1';
const schema4 = Joi.string().allow('op1', 'op2').only().failover('op1').messages({ op1: 'op111', op2: 'op222' });
console.log(schema4.describe());
console.log(schema4.validate(testString));
console.log(testString === schema4.validate(testString).value);

const testObj = { a: 1 };
const schema5 = Joi.object({
  a: Joi.number(),
});
const tObj2 = schema5.validate(testObj);
console.log(tObj2.value);
tObj2.value.a = 3;
console.log(testObj);
console.log(tObj2.value);

const method3 = value => {
  console.log(value);
  return { value, test: '1'};
};

const schema6 = Joi.number().custom(method2, 'custom validation');
const schema7 = Joi.any().custom(method3, 'custom validation');
console.log(schema6.concat(schema7).validate(0.013));

const s8 = Joi.object({ a: schema7 });
console.log(s8.validate({ a: 1 }));

const s10 = Joi.object({
  a: Joi.string(),
  b: Joi.string().when('a', { is: '123', then: Joi.any().strip() }),
});

console.log(s10.validate({ a: '123', b: '32' }));
