# MapStringMixed 映射

::: tip Testing Is Documentation
[tests/Support/MapStringMixedTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Support/MapStringMixedTest.php)
:::

**Uses**

``` php
<?php

use Leevel\Kernel\Utils\Api;
use Leevel\Support\MapStringMixed;
```

## 基本使用

``` php
public function testBaseUse(): void
{
    $data = [
        'h' => 'hello',
        'w' => 'world',
    ];

    $collection = new MapStringMixed($data);
    static::assertSame($collection['h'], 'hello');
    static::assertSame($collection['w'], 'world');
    static::assertTrue(isset($collection['h']));
    static::assertTrue(isset($collection['w']));
}
```