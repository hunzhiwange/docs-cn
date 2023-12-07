# 验证器.值是否为电话号码

::: tip Testing Is Documentation
[tests/Validate/Validator/TelephoneTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/TelephoneTest.php)
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
# Tests\Validate\Validator\TelephoneTest::baseUseProvider
public static function baseUseProvider(): array
{
    return [
        ['028-8301444'],
        ['0818-8301111'],
        ['0818-83011113'],
        ['08188301111'],
        ['081883011113'],
        ['0818-830111355'],
        ['1733332444'],
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
            'name' => 'telephone',
        ]
    );

    static::assertTrue($validate->success());
}
```

## 未验证通过的数据

以下是未通过的校验数据示例。

``` php
# Tests\Validate\Validator\TelephoneTest::badProvider
public static function badProvider(): array
{
    return [
        ['130222000333311'],
        ['1533333333332222'],
        ['181222100003333'],
        ['143311222333444'],
        ['17333322222444'],
        [' '],
        [new \stdClass()],
        [['foo', 'bar']],
        [[1, 2]],
        [true],
        [[[], []]],
        ['02228-8301444'],
        ['08128-8301111'],
        ['173111223332444'],
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
            'name' => 'telephone',
        ]
    );

    static::assertFalse($validate->success());
}
```