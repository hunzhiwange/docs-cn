# VectorString 动态数组

::: tip Testing Is Documentation
[tests/Support/VectorStringTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Support/VectorStringTest.php)
:::

**Uses**

``` php
<?php

use Leevel\Kernel\Utils\Api;
use Leevel\Support\VectorString;
```

## 基本使用

``` php
public function testBaseUse(): void
{
    $data = [
        'h', 'l', 'w', 'd',
    ];

    $collection = new VectorString($data);
    static::assertSame($collection[0], 'h');
    static::assertSame($collection[1], 'l');
    static::assertSame($collection[2], 'w');
    static::assertSame($collection[3], 'd');
    static::assertTrue(isset($collection[0]));
    static::assertTrue(isset($collection[1]));
    static::assertTrue(isset($collection[2]));
    static::assertTrue(isset($collection[3]));
}
```