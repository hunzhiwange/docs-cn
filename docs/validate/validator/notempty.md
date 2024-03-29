# 验证器.值是否不为空

::: tip Testing Is Documentation
[tests/Validate/Validator/NotEmptyTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/NotEmptyTest.php)
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
# Tests\Validate\Validator\NotEmptyTest::baseUseProvider
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
            'name' => 'not_empty',
        ]
    );

    static::assertTrue($validate->success());
}
```

## 未验证通过的数据

以下是未通过的校验数据示例。

``` php
# Tests\Validate\Validator\NotEmptyTest::badProvider
public static function badProvider(): array
{
    $val = null;

    return [
        [''],
        [0],
        [0.0],
        ['0'],
        [null],
        [false],
        [[]],
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
            'name' => 'not_empty',
        ]
    );

    static::assertFalse($validate->success());
}
```