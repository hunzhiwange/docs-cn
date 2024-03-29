# 验证器.是否整型数字

::: tip Testing Is Documentation
[tests/Validate/Validator/IntegerTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/IntegerTest.php)
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
# Tests\Validate\Validator\IntegerTest::baseUseProvider
public static function baseUseProvider(): array
{
    return [
        [true],
        [1],
        ['10002'],
        [' 1 '],
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
            'name' => 'integer',
        ]
    );

    static::assertTrue($validate->success());
}
```

## 未验证通过的数据

以下是未通过的校验数据示例。

``` php
# Tests\Validate\Validator\IntegerTest::badProvider
public static function badProvider(): array
{
    return [
        [false],
        [1.1],
        ['0.0'],
        ['-0.0'],
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
            'name' => 'integer',
        ]
    );

    static::assertFalse($validate->success());
}
```