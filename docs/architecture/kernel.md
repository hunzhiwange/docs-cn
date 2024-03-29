# 内核

::: tip Testing Is Documentation
[tests/Kernel/KernelTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Kernel/KernelTest.php)
:::

QueryPHP 流程为入口接受 HTTP 请求，经过内核 kernel 传入请求，经过路由解析调用控制器执行业务，最后返回响应结果。

入口文件 `www/index.php`

``` php
<?php

declare(strict_types=1);

use App\Infra\Exceptions\Runtime;
use App\Kernel;
use Leevel\Di\Container;
use Leevel\Di\IContainer;
use Leevel\Http\Request;
use Leevel\Kernel\App;
use Leevel\Kernel\Exceptions\IRuntime;
use Leevel\Kernel\IApp;
use Leevel\Kernel\IKernel;

// 加载 Composer
require_once __DIR__.'/../vendor/autoload.php';

// 创建应用
// 注册应用基础服务
$container = Container::singletons();
$container->singleton(IContainer::class, $container);

// 应用路径
$path = str_starts_with(__DIR__, 'phar://') ?
     Phar::running() :
     realpath(__DIR__.'/..');
$container->singleton('app', $app = new App($container, $path));

// PHAR 缓存路径不能是 phar 内部路径，因为 phar 内部路径是只读的
if (str_starts_with(__DIR__, 'phar://')) {
    $app->setStoragePath(substr(dirname(Phar::running()), 7).\DIRECTORY_SEPARATOR.'storage');
}

$container->alias('app', [IApp::class, App::class]);
$container->singleton(IKernel::class, Kernel::class);
$container->singleton(IRuntime::class, Runtime::class);

// 执行应用
// 根据内核调度请求返回响应
/** @var IKernel $kernel */
$kernel = $container->make(IKernel::class);
$response = $kernel->handle($request = Request::createFromGlobals());
$response->send();
$kernel->terminate($request, $response);

```

内核通过 \Leevel\Kernel\Kernel 的 handle 方法来实现请求。

**handle 原型**

``` php
# Leevel\Kernel\Kernel::handle
/**
 * {@inheritDoc}
 */
public function handle(Request $request): Response;
```

**Uses**

``` php
<?php

use Leevel\Di\Container;
use Leevel\Di\IContainer;
use Leevel\Http\JsonResponse;
use Leevel\Http\Request;
use Leevel\Kernel\App as Apps;
use Leevel\Kernel\Exceptions\HttpException;
use Leevel\Kernel\Exceptions\IRuntime;
use Leevel\Kernel\Exceptions\Runtime;
use Leevel\Kernel\IApp;
use Leevel\Kernel\IKernel;
use Leevel\Kernel\Kernel;
use Leevel\Kernel\Utils\Api;
use Leevel\Log\ILog;
use Leevel\Option\IOption;
use Leevel\Router\IRouter;
use Symfony\Component\HttpFoundation\Response;
```

## 基本使用

**fixture 定义**

**Tests\Kernel\Kernel1**

``` php
namespace Tests\Kernel;

class Kernel1 extends Kernel
{
    protected array $bootstraps = [
        DemoBootstrapForKernel::class,
    ];
}
```

**Tests\Kernel\DemoBootstrapForKernel**

``` php
namespace Tests\Kernel;

class DemoBootstrapForKernel
{
    public function handle(IApp $app): void
    {
        $GLOBALS['DemoBootstrapForKernel'] = true;
    }
}
```

``` php
public function testBaseUse(bool $debug): void
{
    $app = new AppKernel($container = new Container(), '');
    $container->instance('app', $app);

    $request = $this->createMock(Request::class);
    $response = $this->createMock(Response::class);

    $router = $this->createRouter($response);
    $this->createOption($container, $debug);
    $this->createLog($container);
    $this->createRuntime($container);

    $kernel = new Kernel1($app, $router);
    $this->assertInstanceof(IKernel::class, $kernel);
    $this->assertInstanceof(IApp::class, $kernel->getApp());
    $this->assertInstanceof(Response::class, $resultResponse = $kernel->handle($request));
    $kernel->terminate($request, $resultResponse);
    static::assertTrue($GLOBALS['DemoBootstrapForKernel']);
    unset($GLOBALS['DemoBootstrapForKernel']);
}
```

## JSON 响应例子

``` php
public function testWithResponseIsJson(): void
{
    $app = new AppKernel($container = new Container(), '');
    $container->instance('app', $app);

    $request = $this->createMock(Request::class);
    $response = new JsonResponse(['foo' => 'bar']);

    $router = $this->createRouter($response);
    $this->createOption($container, true);
    $this->createLog($container);
    $this->createRuntime($container);

    $kernel = new Kernel1($app, $router);
    $this->assertInstanceof(IKernel::class, $kernel);
    $this->assertInstanceof(IApp::class, $kernel->getApp());

    $this->assertInstanceof(Response::class, $resultResponse = $kernel->handle($request));
    static::assertSame('{"foo":"bar"}', $resultResponse->getContent());
}
```

## 异常处理

路由抛出异常，返回异常响应。

``` php
# Tests\Kernel\KernelTest::createRouterWithException
protected function createRouterWithException(): IRouter
{
    $request = $this->createMock(Request::class);
    $router = $this->createMock(IRouter::class);
    $router->method('dispatch')->will(static::throwException(new \Exception('hello foo bar.')));

    return $router;
}
```

``` php
public function testRouterWillThrowException(): void
{
    $app = new AppKernel($container = new Container(), '');
    $container->instance('app', $app);

    $request = $this->createMock(Request::class);

    $router = $this->createRouterWithException();
    $this->createOption($container, true);
    $this->createLog($container);
    $this->createRuntimeWithRender($container);

    $kernel = new Kernel1($app, $router);
    $this->assertInstanceof(IKernel::class, $kernel);
    $this->assertInstanceof(IApp::class, $kernel->getApp());

    $this->assertInstanceof(Response::class, $resultResponse = $kernel->handle($request));
    static::assertStringContainsString('hello foo bar.', $resultResponse->getContent());
    static::assertStringContainsString('Exception: hello foo bar. in file', $resultResponse->getContent());
    static::assertStringContainsString('Exception->()', $resultResponse->getContent());
}
```

## 错误处理

路由出现错误，返回错误响应。

``` php
# Tests\Kernel\KernelTest::createRouterWithError
protected function createRouterWithError(): IRouter
{
    $request = $this->createMock(Request::class);
    $router = $this->createMock(IRouter::class);
    $router->method('dispatch')->will(static::throwException(new \Error('hello bar foo.')));

    return $router;
}
```

``` php
public function testRouterWillThrowError(): void
{
    $app = new AppKernel($container = new Container(), '');
    $container->instance('app', $app);

    $request = $this->createMock(Request::class);

    $router = $this->createRouterWithError();
    $this->createOption($container, true);
    $this->createLog($container);
    $this->createRuntimeWithRender($container);

    $kernel = new Kernel1($app, $router);
    $this->assertInstanceof(IKernel::class, $kernel);
    $this->assertInstanceof(IApp::class, $kernel->getApp());

    $this->assertInstanceof(Response::class, $resultResponse = $kernel->handle($request));

    static::assertStringContainsString('ErrorException: hello bar foo', $resultResponse->getContent());
    static::assertStringContainsString('ErrorException->()', $resultResponse->getContent());
}
```