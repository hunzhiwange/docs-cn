# 验证器.不能为空

::: tip Testing Is Documentation
[tests/Validate/Validator/RequiredTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/RequiredTest.php)
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
# Tests\Validate\Validator\RequiredTest::baseUseProvider
public static function baseUseProvider(): array
{
    return [
        ['foo'],
        ['bar'],
        ['0'],
        ['0000'],
        [0],
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
            'name' => 'required',
        ]
    );

    static::assertTrue($validate->success());
}
```

## 未验证通过的数据

以下是未通过的校验数据示例。

``` php
# Tests\Validate\Validator\RequiredTest::badProvider
public static function badProvider(): array
{
    return [
        [null],
        [''],
        [' '],
        ['    '],
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
            'name' => 'required',
        ]
    );

    static::assertFalse($validate->success());
}
```