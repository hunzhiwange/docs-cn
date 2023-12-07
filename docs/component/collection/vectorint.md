# VectorInt 动态数组

::: tip Testing Is Documentation
[tests/Support/VectorIntTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Support/VectorIntTest.php)
:::

**Uses**

``` php
<?php

use Leevel\Kernel\Utils\Api;
use Leevel\Support\VectorInt;
```

## 基本使用

``` php
public function testBaseUse(): void
{
    $data = [
        1, 2, 3, 4,
    ];

    $collection = new VectorInt($data);
    static::assertSame($collection[0], 1);
    static::assertSame($collection[1], 2);
    static::assertSame($collection[2], 3);
    static::assertSame($collection[3], 4);
    static::assertTrue(isset($collection[0]));
    static::assertTrue(isset($collection[1]));
    static::assertTrue(isset($collection[2]));
    static::assertTrue(isset($collection[3]));
}
```

## 从 HTTP 请求创建整数索引数组

``` php
public function testFromRequest(): void
{
    $collection = VectorInt::fromRequest([
        1, 2, 3, 4,
    ]);
    static::assertSame($collection[0], 1);
    static::assertSame($collection[1], 2);
    static::assertSame($collection[2], 3);
    static::assertSame($collection[3], 4);
    static::assertTrue(isset($collection[0]));
    static::assertTrue(isset($collection[1]));
    static::assertTrue(isset($collection[2]));
    static::assertTrue(isset($collection[3]));

    $collection = VectorInt::fromRequest('1,2,3,4');
    static::assertSame($collection[0], 1);
    static::assertSame($collection[1], 2);
    static::assertSame($collection[2], 3);
    static::assertSame($collection[3], 4);
    static::assertTrue(isset($collection[0]));
    static::assertTrue(isset($collection[1]));
    static::assertTrue(isset($collection[2]));
    static::assertTrue(isset($collection[3]));
}
```