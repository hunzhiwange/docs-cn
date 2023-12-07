# 验证器.是否为英文字母

::: tip Testing Is Documentation
[tests/Validate/Validator/AlphaTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/AlphaTest.php)
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
# Tests\Validate\Validator\AlphaTest::baseUseProvider
public static function baseUseProvider(): array
{
    return [
        ['abc'],
        ['ABC'],
        ['Abc'],
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
            'name' => 'alpha',
        ]
    );

    static::assertTrue($validate->success());
}
```

## 未验证通过的数据

以下是未通过的校验数据示例。

``` php
# Tests\Validate\Validator\AlphaTest::badProvider
public static function badProvider(): array
{
    return [
        [' '],
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
            'name' => 'alpha',
        ]
    );

    static::assertFalse($validate->success());
}
```