# 验证器.验证是否为有效的域名

::: tip Testing Is Documentation
[tests/Validate/Validator/CheckdnsrrTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/CheckdnsrrTest.php)
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
# Tests\Validate\Validator\CheckdnsrrTest::baseUseProvider
public static function baseUseProvider(): array
{
    return [
        ['github.com'],
        ['alibaba.com'],
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
            'name' => 'checkdnsrr',
        ]
    );

    static::assertTrue($validate->success());
}
```

## 未验证通过的数据

以下是未通过的校验数据示例。

``` php
# Tests\Validate\Validator\CheckdnsrrTest::badProvider
public static function badProvider(): array
{
    return [
        ['notfoundwocha666666666666.com'],
        ['1234567890111'],
        ['106.11.208.151'],
        [['hello:array']],
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
            'name' => 'checkdnsrr',
        ]
    );

    static::assertFalse($validate->success());
}
```