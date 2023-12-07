# 验证器.验证是否都是小写

::: tip Testing Is Documentation
[tests/Validate/Validator/AlphaLowerTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/AlphaLowerTest.php)
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
# Tests\Validate\Validator\AlphaLowerTest::baseUseProvider
public static function baseUseProvider(): array
{
    return [
        ['abc'],
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
            'name' => 'alpha_lower',
        ]
    );

    static::assertTrue($validate->success());
}
```

## 未验证通过的数据

以下是未通过的校验数据示例。

``` php
# Tests\Validate\Validator\AlphaLowerTest::badProvider
public static function badProvider(): array
{
    return [
        [' '],
        ['ABC'],
        ['aBc'],
        ['not numeric'],
        [new \stdClass()],
        [['foo', 'bar']],
        [[1, 2]],
        ['this is a string'],
        [true],
        [1],
        [[[], []]],
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
            'name' => 'alpha_lower',
        ]
    );

    static::assertFalse($validate->success());
}
```