# 验证器.是否不为 null

::: tip Testing Is Documentation
[tests/Validate/Validator/NotNullTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/NotNullTest.php)
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
# Tests\Validate\Validator\NotNullTest::baseUseProvider
public static function baseUseProvider(): array
{
    return [
        [' '],
        ['not numeric'],
        [new \stdClass()],
        [['foo', 'bar']],
        [[1, 2]],
        ['this is a string'],
        ['foo'],
        ['bar'],
        ['hello'],
        ['world'],
        [true],
        [1],
        [[[], []]],
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
            'name' => 'not_null',
        ]
    );

    static::assertTrue($validate->success());
}
```

## 未验证通过的数据

以下是未通过的校验数据示例。

``` php
# Tests\Validate\Validator\NotNullTest::badProvider
public static function badProvider(): array
{
    $val = null;

    return [
        [null],
        [$val],
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
            'name' => 'not_null',
        ]
    );

    static::assertFalse($validate->success());
}
```