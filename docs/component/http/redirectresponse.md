# Redirect Response

::: tip Testing Is Documentation
[tests/Http/RedirectResponseTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Http/RedirectResponseTest.php)
:::

QueryPHP 针对页面重定向可以直接返回一个 `\Leevel\Http\RedirectResponse` 响应对象。

**Uses**

``` php
<?php

use Leevel\Http\RedirectResponse;
use Leevel\Kernel\Utils\Api;
use Leevel\Session\ISession;
```

## with 闪存一个数据片段到 SESSION

``` php
public function testWith(): void
{
    $response = new RedirectResponse('foo.bar');
    $response->setSession($this->mokeSessionForWith());
    static::assertInstanceOf(ISession::class, $response->getSession());

    $response->with('foo', 'bar');
    static::assertSame($response->getSession()->getFlash('foo'), 'bar');
}
```

## withErrors 闪存错误信息

``` php
public function testWithError(): void
{
    $errorsDefault = [
        'name' => 'less than 6',
        'age' => 'must be 18',
    ];

    $errorsCustom = [
        'foo' => 'bar is error',
    ];
    $data = ['default' => $errorsDefault, 'custom' => $errorsCustom];
    $response = new RedirectResponse('foo.bar');
    $response->setSession($this->mokeSessionForWithError($data));
    static::assertInstanceOf(ISession::class, $response->getSession());
    $response->withErrors($errorsDefault);
    $response->withErrors($errorsCustom, 'custom');

    static::assertSame($response->getSession()->getFlash('errors'), $data);
}
```