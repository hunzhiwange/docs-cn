# 字符串

::: tip Testing Is Documentation
[tests/Support/StrTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Support/StrTest.php)
:::

这里为系统提供的字符串使用的功能文档说明。

**Uses**

``` php
<?php

use Leevel\Kernel\Utils\Api;
use Leevel\Support\Str;
```

## 随机字母数字

``` php
public function testBaseUse(): void
{
    static::assertSame('', Str::randAlphaNum(0));

    static::assertTrue(
        1 === preg_match('/^[A-Za-z0-9]+$/', Str::randAlphaNum(4))
    );

    static::assertTrue(
        1 === preg_match('/^[A-Za-z0-9]+$/', Str::randAlphaNum(4, 'AB4cdef'))
    );

    static::assertTrue(
        4 === \strlen(Str::randAlphaNum(4))
    );
}
```

## 随机小写字母和数字

利用本方法可以生成随机数小写字母。

``` php
public function testRandAlphaNumLowercase(): void
{
    static::assertSame('', Str::randAlphaNumLowercase(0));

    static::assertTrue(
        1 === preg_match('/^[a-z0-9]+$/', Str::randAlphaNumLowercase(4))
    );

    static::assertTrue(
        1 === preg_match('/^[a-z0-9]+$/', Str::randAlphaNumLowercase(4, 'cdefghigk2450'))
    );

    static::assertTrue(
        4 === \strlen(Str::randAlphaNumLowercase(4))
    );
}
```

::: tip
支持位数和指定字符范围
:::

## 随机大写字母和数字

利用本方法可以生成随机数大写字母。

``` php
public function testRandAlphaNumUppercase(): void
{
    static::assertSame('', Str::randAlphaNumUppercase(0));

    static::assertTrue(
        1 === preg_match('/^[A-Z0-9]+$/', Str::randAlphaNumUppercase(4))
    );

    static::assertTrue(
        1 === preg_match('/^[A-Z0-9]+$/', Str::randAlphaNumUppercase(4, 'ABCDEFG1245'))
    );

    static::assertTrue(
        4 === \strlen(Str::randAlphaNumUppercase(4))
    );
}
```

::: tip
支持位数和指定字符范围
:::

## 随机字母

利用本方法可以生成随机字母。

``` php
public function testRandAlpha(): void
{
    static::assertSame('', Str::randAlpha(0));

    static::assertTrue(
        1 === preg_match('/^[A-Za-z]+$/', Str::randAlpha(4))
    );

    static::assertTrue(
        1 === preg_match('/^[A-Za-z]+$/', Str::randAlpha(4, 'ABCDEFGefijk'))
    );

    static::assertTrue(
        4 === \strlen(Str::randAlpha(4))
    );
}
```

::: tip
支持位数和指定字符范围
:::

## 随机小写字母

``` php
public function testRandAlphaLowercase(): void
{
    static::assertSame('', Str::randAlphaLowercase(0));

    static::assertTrue(
        1 === preg_match('/^[a-z]+$/', Str::randAlphaLowercase(4))
    );

    static::assertTrue(
        1 === preg_match('/^[a-z]+$/', Str::randAlphaLowercase(4, 'cdefghigk'))
    );

    static::assertTrue(
        4 === \strlen(Str::randAlphaLowercase(4))
    );
}
```

## 随机大写字母

``` php
public function testRandAlphaUppercase(): void
{
    static::assertSame('', Str::randAlphaUppercase(0));

    static::assertTrue(
        1 === preg_match('/^[A-Z]+$/', Str::randAlphaUppercase(4))
    );

    static::assertTrue(
        1 === preg_match('/^[A-Z]+$/', Str::randAlphaUppercase(4, 'ABCDEFG'))
    );

    static::assertTrue(
        4 === \strlen(Str::randAlphaUppercase(4))
    );
}
```

## 随机数字

``` php
public function testRandNum(): void
{
    static::assertSame('', Str::randNum(0));

    static::assertTrue(
        1 === preg_match('/^[0-9]+$/', Str::randNum(4))
    );

    static::assertTrue(
        1 === preg_match('/^[0-9]+$/', Str::randNum(4, '012456'))
    );

    static::assertTrue(
        4 === \strlen(Str::randNum(4))
    );
}
```

## 随机字中文

``` php
public function testRandChinese(): void
{
    static::assertSame('', Str::randChinese(0));

    static::assertTrue(
        1 === preg_match('/^[\x{4e00}-\x{9fa5}]+$/u', Str::randChinese(4))
    );

    static::assertTrue(
        1 === preg_match('/^[\x{4e00}-\x{9fa5}]+$/u', Str::randChinese(4, '我是一个中国人'))
    );

    static::assertTrue(
        12 === \strlen(Str::randChinese(4))
    );
}
```

## 随机字符串

``` php
public function testRandStr(): void
{
    static::assertSame('', Str::randStr(0, ''));
    static::assertSame('', Str::randStr(5, ''));

    static::assertTrue(
        4 === \strlen(Str::randStr(4, 'helloworld'))
    );
}
```

## 日期格式化

``` php
public function testFormatDate(): void
{
    $time = time();

    static::assertSame(date('Y-m-d H:i', $time + 600), Str::formatDate($time + 600));
    static::assertSame(date('Y-m-d', $time + 600), Str::formatDate($time + 600, [], 'Y-m-d'));

    static::assertSame(date('Y-m-d', $time - 1286400), Str::formatDate($time - 1286400, [], 'Y-m-d'));

    static::assertSame('1 hours ago', Str::formatDate($time - 5040));
    static::assertSame('1 小时之前', Str::formatDate($time - 5040, ['hours' => '小时之前']));

    static::assertSame('4 minutes ago', Str::formatDate($time - 240));
    static::assertSame('4 分钟之前', Str::formatDate($time - 240, ['minutes' => '分钟之前']));

    static::assertTrue(\in_array(Str::formatDate($time - 40), ['40 seconds ago', '41 seconds ago', '42 seconds ago'], true));
    static::assertTrue(\in_array(Str::formatDate($time - 40, ['seconds' => '秒之前']), ['40 秒之前', '41 秒之前', '42 秒之前'], true));
}
```

## 文件大小格式化

``` php
public function testFormatBytes(): void
{
    static::assertSame('2.4G', Str::formatBytes(2573741824));
    static::assertSame('2.4', Str::formatBytes(2573741824, false));

    static::assertSame('4.81M', Str::formatBytes(5048576));
    static::assertSame('4.81', Str::formatBytes(5048576, false));

    static::assertSame('2.95K', Str::formatBytes(3024));
    static::assertSame('2.95', Str::formatBytes(3024, false));

    static::assertSame('100B', Str::formatBytes(100));
    static::assertSame('100', Str::formatBytes(100, false));
}
```

## 下划线转驼峰

``` php
public function testCamelize(): void
{
    static::assertSame('helloWorld', Str::camelize('helloWorld'));
    static::assertSame('helloWorld', Str::camelize('helloWorld', '-'));
    static::assertSame('helloWorld', Str::camelize('hello_world'));
    static::assertSame('helloWorld', Str::camelize('hello-world', '-'));
    static::assertSame('he3lloWorld', Str::camelize('he3llo_world'));
    static::assertSame('hello3World', Str::camelize('hello3_world'));
}
```

## 驼峰转下划线

``` php
public function testUnCamelize(): void
{
    static::assertSame('hello_world', Str::unCamelize('hello_world'));
    static::assertSame('hello-world', Str::unCamelize('hello-world', '-'));
    static::assertSame('hello_world', Str::unCamelize('helloWorld'));
    static::assertSame('hello-world', Str::unCamelize('helloWorld', '-'));
    static::assertSame('hello2_world', Str::unCamelize('hello2World'));
    static::assertSame('hel2lo_world', Str::unCamelize('hel2loWorld'));
}
```