# 字符串集合 collection

::: tip Testing Is Documentation
[tests/Support/TypedStringArrayTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Support/TypedStringArrayTest.php)
:::

**Uses**

``` php
<?php

use Leevel\Support\TypedStringArray;
```

## 基本使用

``` php
public function testBaseUse(): void
{
    $data = [
        'h', 'l', 'w', 'd',
    ];

    $collection = new TypedStringArray($data);
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