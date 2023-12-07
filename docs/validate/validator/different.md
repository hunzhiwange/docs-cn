# 验证器.两个字段是否不同

::: tip Testing Is Documentation
[tests/Validate/Validator/DifferentTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/DifferentTest.php)
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
# Tests\Validate\Validator\DifferentTest::baseUseProvider
public static function baseUseProvider(): array
{
    return [
        ['foo', 'foo2', 'name2'],
        ['bar', 'bar2', 'name2'],
        [new \stdClass(), new \stdClass(), 'name2'], // 非全等
        [new \stdClass(), '', 'name3'], // 非全等
        [['foo', 'bar'], '', 'name3'],
    ];
}
```

上面的数据是测试的数据提供者。

``` php
public function testBaseUse($value, $valueCompare, string $param): void
{
    $validate = new Validator(
        [
            'name' => $value,
            'name2' => $valueCompare,
            'name3' => new \stdClass(),
        ],
        [
            'name' => 'different:'.$param,
        ]
    );

    static::assertTrue($validate->success());
}
```

## 未验证通过的数据

以下是未通过的校验数据示例。

``` php
# Tests\Validate\Validator\DifferentTest::badProvider
public static function badProvider(): array
{
    return [
        ['foo', 'foo', 'name2'],
        ['bar', 'bar', 'name2'],
        ['test', '', 'name3'],
    ];
}
```

上面的数据是测试的数据提供者。

``` php
public function testBad($value, $valueCompare, string $param): void
{
    $validate = new Validator(
        [
            'name' => $value,
            'name2' => $valueCompare,
            'name3' => 'test',
        ],
        [
            'name' => 'different:'.$param,
        ]
    );

    static::assertFalse($validate->success());
}
```

## different 参数缺失

``` php
public function testMissParam(): void
{
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage(
        'Missing the first element of param.'
    );

    $validate = new Validator(
        [
            'name' => '',
        ],
        [
            'name' => 'different',
        ]
    );

    $validate->success();
}
```