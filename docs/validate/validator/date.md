# 验证器.是否为日期

::: tip Testing Is Documentation
[tests/Validate/Validator/DateTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/DateTest.php)
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
# Tests\Validate\Validator\DateTest::baseUseProvider
public static function baseUseProvider(): array
{
    return [
        [new \DateTime()],
        [new \DateTime('2014-05-04')],
        ['2018-08-12'],
        ['2018-08'],
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
            'name' => 'date',
        ]
    );

    static::assertTrue($validate->success());
}
```

## 未验证通过的数据

以下是未通过的校验数据示例。

``` php
# Tests\Validate\Validator\DateTest::badProvider
public static function badProvider(): array
{
    return [
        ['2018'],
        ['2018-44-22'],
        ['2018-12-42'],
        [''],
        [[1, 2]],
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
            'name' => 'date',
        ]
    );

    static::assertFalse($validate->success());
}
```