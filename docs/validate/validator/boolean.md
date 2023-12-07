# 验证器.验证是否为布尔值

::: tip Testing Is Documentation
[tests/Validate/Validator/BooleanTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/BooleanTest.php)
:::

**Uses**

``` php
<?php

use Leevel\Kernel\Utils\Api;
use Leevel\Validate\Validator;
```

## 验证通过的数据

以下是通过的校验数据示例。

``` php
# Tests\Validate\Validator\BooleanTest::baseUseProvider
public static function baseUseProvider(): array
{
    return [
        [true],
        [false],
        [0],
        [1],
        ['0'],
        ['1'],
        ['t'],
        ['f'],
    ];
}
```

上面的数据是测试的数据提供者。

``` php
public function testBaseUse($value): void
{
    $validate = new Validator(
        [
            'name' => $value,
        ],
        [
            'name' => 'boolean',
        ]
    );

    static::assertTrue($validate->success());
}
```

## 未验证通过的数据

以下是未通过的校验数据示例。

``` php
# Tests\Validate\Validator\BooleanTest::badProvider
public static function badProvider(): array
{
    return [
        [new \stdClass()],
        [['foo', 'bar']],
        [[1, 2]],
        ['this is a string'],
        [0.52148389816284],
        ['0.0'],
        ['-0.0'],
        ['foo'],
        ['bar'],
        ['hello'],
        ['world'],
    ];
}
```

上面的数据是测试的数据提供者。

``` php
public function testBad($value): void
{
    $validate = new Validator(
        [
            'name' => $value,
        ],
        [
            'name' => 'boolean',
        ]
    );

    static::assertFalse($validate->success());
}
```