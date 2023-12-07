# 验证器.验证是否都是大写

::: tip Testing Is Documentation
[tests/Validate/Validator/UpperTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/UpperTest.php)
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
# Tests\Validate\Validator\UpperTest::baseUseProvider
public static function baseUseProvider(): array
{
    return [
        ['ABC'],
        ['CDE'],
        ['HELLO'],
        ['FOO'],
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
            'name' => 'upper',
        ]
    );

    static::assertTrue($validate->success());
}
```

## 未验证通过的数据

以下是未通过的校验数据示例。

``` php
# Tests\Validate\Validator\UpperTest::badProvider
public static function badProvider(): array
{
    return [
        ['not numeric'],
        [[]],
        [new \stdClass()],
        [['foo', 'bar']],
        [[1, 2]],
        ['Foo'],
        ['hEllo'],
        [null],
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
            'name' => 'upper',
        ]
    );

    static::assertFalse($validate->success());
}
```