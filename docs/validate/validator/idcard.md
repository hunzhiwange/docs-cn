# 验证器.是否为大陆身份证

::: tip Testing Is Documentation
[tests/Validate/Validator/IdCardTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Validate/Validator/IdCardTest.php)
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
# Tests\Validate\Validator\IdCardTest::baseUseProvider
public static function baseUseProvider(): array
{
    return [
        ['45032444440627183x'],
        ['999503197505028819'],
        ['888825199105138665'],
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
            'name' => 'id_card',
        ]
    );

    static::assertTrue($validate->success());
}
```

## 未验证通过的数据

以下是未通过的校验数据示例。

``` php
# Tests\Validate\Validator\IdCardTest::badProvider
public static function badProvider(): array
{
    return [
        ['9995031975011115028819'],
        [' '],
        ['not numeric'],
        [new \stdClass()],
        [['foo', 'bar']],
        [[1, 2]],
        ['this is a string'],
        [true],
        [[[], []]],
        ['not/numeric'],
        ['not?numeric'],
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
            'name' => 'id_card',
        ]
    );

    static::assertFalse($validate->success());
}
```