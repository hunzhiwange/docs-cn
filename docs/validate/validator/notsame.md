# 验证器.两个值是否完全相同

::: tip Testing Is Documentation
[tests/Validate/Validator/NotSameTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/NotSameTest.php)
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
# Tests\Validate\Validator\NotSameTest::baseUseProvider
public static function baseUseProvider(): array
{
    return [
        [3, 3],
        [1.5, '1.5'],
        [1, true],
        [2, 3],
        [1.1, '1.5'],
        [1.5, '2'],
        [1.5, '3'],
        [1.5, '4'],
        [1.5, '4.5'],
        ['a', 'b'],
        ['a', 'c'],
        ['bar', 'foo'],
    ];
}
```

上面的数据是测试的数据提供者。

``` php
public function testBaseUse($value, $param): void
{
    $validate = new Validator(
        [
            'name' => $value,
        ],
        [
            'name' => 'not_same:'.$param,
        ]
    );

    static::assertTrue($validate->success());
}
```

## 未验证通过的数据

以下是未通过的校验数据示例。

``` php
# Tests\Validate\Validator\NotSameTest::badProvider
public static function badProvider(): array
{
    return [
        ['', false],
        ['1', '1'],
        ['23', '23'],
    ];
}
```

上面的数据是测试的数据提供者。

``` php
public function testBad($value, $param): void
{
    $validate = new Validator(
        [
            'name' => $value,
        ],
        [
            'name' => 'not_same:'.$param,
        ]
    );

    static::assertFalse($validate->success());
}
```

## not_same 参数缺失

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
            'name' => 'not_same',
        ]
    );

    $validate->success();
}
```