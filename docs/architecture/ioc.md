# IOC 容器

::: tip Testing Is Documentation
[tests/Di/ContainerTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Di/ContainerTest.php)
:::

IOC 容器是整个框架最核心的部分，负责服务的管理和解耦。

目前系统所有的关键服务都接入了 IOC 容器，包括控制器、Console 命令行。

**Uses**

``` php
<?php

use Leevel\Di\Container;
use Leevel\Kernel\Utils\Api;
```

## 闭包绑定

闭包属于惰性，真正使用的时候才会执行。

我们可以通过 `bind` 来绑定一个闭包，通过 `make` 来运行服务，第二次运行如果是单例则直接使用生成后的结果，否则会每次执行闭包的代码。

通常来说，系统大部分服务都是单例来提升性能和共享。

``` php
public function testBindClosure(): void
{
    $container = new Container();

    $container->bind('foo', function () {
        return 'bar';
    });

    static::assertSame('bar', $container->make('foo'));
}
```

## 闭包绑定单例

``` php
public function testSingletonClosure(): void
{
    $container = new Container();
    $singleton = new \stdClass();
    $container->singleton('singleton', function () use ($singleton) {
        return $singleton;
    });

    static::assertSame($singleton, $container->make('singleton'));
    static::assertSame($singleton, $container->make('singleton'));
}
```

## 类直接生成本身

一个独立的类可以直接生成，而不需要提前注册到容器中。

**fixture 定义**

**Tests\Di\Fixtures\Test1**

``` php
namespace Tests\Di\Fixtures;

class Test1
{
}
```

``` php
public function testClass(): void
{
    $container = new Container();

    static::assertInstanceOf(Test1::class, $container->make(Test1::class));
}
```

## 类单例

类也可以注册为单例。

``` php
public function testSingletonClass(): void
{
    $container = new Container();
    $container->singleton(Test1::class);

    static::assertSame($container->make(Test1::class), $container->make(Test1::class));
}
```

## 接口绑定

可以为接口绑定实现。

**fixture 定义**

**Tests\Di\Fixtures\ITest2**

``` php
namespace Tests\Di\Fixtures;

interface ITest2
{
}
```

**Tests\Di\Fixtures\Test2**

``` php
namespace Tests\Di\Fixtures;

class Test2 implements ITest2
{
}
```

``` php
public function testInterface(): void
{
    $container = new Container();
    $container->bind(ITest2::class, Test2::class);

    static::assertInstanceOf(ITest2::class, $container->make(ITest2::class));
    static::assertInstanceOf(ITest2::class, $container->make(Test2::class));
}
```

## 接口绑定接口作为构造器参数

接口可以作为控制器参数来做依赖注入。

**fixture 定义**

**Tests\Di\Fixtures\Test3**

``` php
namespace Tests\Di\Fixtures;

class Test3 implements ITest3
{
    public $arg1;

    public function __construct(ITest2 $arg1)
    {
        $this->arg1 = $arg1;
    }
}
```

通过 `Test3` 的构造函数注入 `ITest2` 的实现 `Test2`，通过 IOC 容器可以实现代码解耦。

``` php
public function testInterface2(): void
{
    $container = new Container();
    $container->bind(ITest2::class, Test2::class);

    static::assertInstanceOf(ITest2::class, $test2 = $container->make(Test3::class)->arg1);
    static::assertInstanceOf(Test2::class, $test2);
}
```

## 绑定闭包第一个参数为 IOC 容器本身

``` php
public function testContainerAsFirstArgs(): void
{
    $container = new Container();
    $container->bind('test', function ($container) {
        return $container;
    });

    static::assertSame($container, $container->make('test'));
}
```

## 数组访问 ArrayAccess 支持

``` php
public function testArrayAccess(): void
{
    $container = new Container();
    $container['foo'] = function () {
        return 'bar';
    };

    static::assertTrue(isset($container['foo']));
    static::assertSame('bar', $container['foo']);
    unset($container['foo']);
    static::assertFalse(isset($container['foo']));
}
```

## alias 设置别名

``` php
public function testAliases(): void
{
    $container = new Container();
    $container['foo'] = 'bar';
    $container->alias('foo', 'foo2');
    $container->alias('foo', ['foo3', 'foo4']);
    $container->alias(['foo' => ['foo5', 'foo6']]);
    $container->alias(['foo' => 'foo7']);

    static::assertNull($container->make('foo', throw: false));
    static::assertNull($container->make('foo2', throw: false));
    static::assertNull($container->make('foo3', throw: false));
    static::assertNull($container->make('foo4', throw: false));
    static::assertNull($container->make('foo5', throw: false));
    static::assertNull($container->make('foo6', throw: false));
    static::assertNull($container->make('foo7', throw: false));
}
```

## make 创建容器服务并返回支持参数

``` php
public function testMakeWithArgs(): void
{
    $container = new Container();
    $container['foo'] = function ($container, $arg1, $arg2) {
        return [
            $arg1,
            $arg2,
        ];
    };

    static::assertSame([1, 2], $container->make('foo', [1, 2, 3]));
}
```

## get 创建容器服务并返回

``` php
public function testGet(): void
{
    $container = new Container();
    $container['foo'] = function ($container) {
        return [1, 2];
    };

    static::assertSame([1, 2], $container->make('foo'));
}
```

## bind 注册到容器支持覆盖

``` php
public function testOverridden(): void
{
    $container = new Container();
    $container['foo'] = fn () => 'bar';
    static::assertSame('bar', $container['foo']);

    $container['foo'] = fn () => 'bar2';
    static::assertSame('bar2', $container['foo']);
}
```

## instance 注册为实例

``` php
public function testInstance(): void
{
    $container = new Container();
    $instance = new \stdClass();
    $container->instance('foo', $instance);

    static::assertSame($instance, $container->make('foo'));
}
```

## 默认参数支持

**fixture 定义**

**Tests\Di\Fixtures\Test5**

``` php
namespace Tests\Di\Fixtures;

class Test5 implements ITest3
{
    public $arg1;

    public $arg2;

    public function __construct(Test3 $arg1, $arg2 = 'hello default')
    {
        $this->arg1 = $arg1;
        $this->arg2 = $arg2;
    }
}
```

**Tests\Di\Fixtures\ITest3**

``` php
namespace Tests\Di\Fixtures;

interface ITest3
{
}
```

``` php
public function testDefaultArgs(): void
{
    $container = new Container();
    $container->bind(ITest2::class, Test2::class);
    $container->bind('foo', Test5::class);
    $test5 = $container->make('foo');

    static::assertInstanceOf(ITest3::class, $test5);
    static::assertSame('hello default', $test5->arg2);
}
```

## 必填参数校验

**fixture 定义**

**Tests\Di\Fixtures\Test6**

``` php
namespace Tests\Di\Fixtures;

class Test6
{
    public $arg1;

    public $arg2;

    public $arg3;

    public function __construct($arg1, $arg2, $arg3)
    {
        $this->arg1 = $arg1;
        $this->arg2 = $arg2;
        $this->arg3 = $arg3;
    }
}
```

``` php
public function testArgsRequiredContainerInvalidArgumentException(): void
{
    $this->expectException(\Leevel\Di\ContainerInvalidArgumentException::class);
    $this->expectExceptionMessage(
        'There are 3 required args,but 0 given.'
    );

    $container = new Container();
    $container->make(Test6::class, []);
}
```

## 接口必须绑定服务

``` php
public function testInterfaceContainerInvalidArgumentException(): void
{
    $this->expectException(\Leevel\Di\ContainerInvalidArgumentException::class);
    $this->expectExceptionMessage(
        'Interface Tests\\Di\\Fixtures\\ITest2 cannot be normalize because not binded.'
    );

    $container = new Container();
    $container->make(ITest2::class, []);
}
```

## call 回调自动依赖注入

**fixture 定义**

**Tests\Di\Fixtures\Test7**

``` php
namespace Tests\Di\Fixtures;

class Test7
{
}
```

**Tests\Di\Fixtures\Test8**

``` php
namespace Tests\Di\Fixtures;

class Test8 implements ITest8
{
    public function func1()
    {
        return \func_get_args();
    }

    public function func2($arg1 = 'hello')
    {
        return \func_get_args();
    }

    public static function staticFunc3()
    {
        return \func_get_args();
    }

    public function handle()
    {
        return ['call handle'];
    }
}
```

``` php
public function testCall(): void
{
    $container = new Container();
    $result = $container->call(function (Test7 $arg1, array $arg2 = []) {
        return \func_get_args();
    });

    static::assertInstanceOf(Test7::class, $result[0]);
    static::assertSame([], $result[1]);

    $result = $container->call(function (Test7 $arg1, array $arg2 = [], $arg3 = null) {
        return \func_get_args();
    }, ['arg3' => 'hello']);

    static::assertInstanceOf(Test7::class, $result[0]);
    static::assertSame([], $result[1]);
    static::assertSame('hello', $result[2]);

    $test7 = new Test7();
    $result = $container->call(function (Test7 $arg1, $arg2 = 'hello') {
        return \func_get_args();
    }, [Test7::class => $test7, 'arg2' => 'hello world']);

    static::assertSame($test7, $result[0]);
    static::assertSame('hello world', $result[1]);

    $test8 = new Test8();
    $result = $container->call(function ($arg1, $arg2, $arg3, ?ITest8 $arg4 = null, ?Test8 $arg5 = null) {
        return \func_get_args();
    }, ['arg1' => 'foo', 'arg3' => 'world2', Test8::class => $test8]);

    static::assertSame('foo', $result[0]);
    static::assertNull($result[1]);
    static::assertSame('world2', $result[2]);
    static::assertNull($result[3]);
    static::assertSame($result[4], $test8);
}
```

## call 回调自动依赖注入支持字符串或者数组类回调

``` php
public function testCallWithArrayOrString(): void
{
    $container = new Container();

    $result = $container->call([Test8::class, 'func1'], ['foo', 'bar']);
    static::assertSame(['foo', 'bar'], $result);

    $result = $container->call(Test8::class.'@func1', ['foo', 'bar']);
    static::assertSame(['foo', 'bar'], $result);

    $result = $container->call([Test8::class], ['foo', 'bar']);
    static::assertSame(['call handle'], $result);

    $result = $container->call(Test8::class.'@', ['foo', 'bar']);
    static::assertSame(['call handle'], $result);

    $result = $container->call(Test8::class.'@func2');
    static::assertSame('hello', $result[0]);

    $result = $container->call(Test8::class.'@func2', ['world', 'foo', 'bar']);
    static::assertSame('world', $result[0]);
    static::assertSame('foo', $result[1]);
    static::assertSame('bar', $result[2]);

    $result = $container->call(Test8::class.'@func2', ['world', 'arg1' => 'foo', 'bar']);
    static::assertSame('foo', $result[0]);
    static::assertSame('world', $result[1]);
    static::assertSame('bar', $result[2]);
}
```

## call 回调自动依赖注入支持实例和方法数组回调

``` php
public function testCallWithCallableArray(): void
{
    $container = new Container();
    $test8 = new Test8();
    $result = $container->call([$test8, 'func1'], ['foo', 'bar']);

    static::assertSame(['foo', 'bar'], $result);
}
```

## call 回调自动依赖注入支持静态回调

``` php
public function testCallStatic(): void
{
    $container = new Container();

    $result = $container->call(Test8::class.'::staticFunc3', ['hello', 'world']);
    static::assertSame(['hello', 'world'], $result);
}
```

## remove 删除服务和实例

``` php
public function testRemove(): void
{
    $container = new Container();

    $test8 = new Test8();
    $container->instance(Test8::class, $test8);
    static::assertTrue($container->exists(Test8::class));

    $container->remove(Test8::class);
    static::assertFalse($container->exists(Test8::class));
}
```

## exists 或者 has 服务或者实例是否存在

``` php
public function testExistsOrHas(): void
{
    $container = new Container();

    $test8 = new Test8();
    $container->instance(Test8::class, $test8);
    static::assertTrue($container->exists(Test8::class));
    static::assertTrue($container->has(Test8::class));

    $container->remove(Test8::class);
    static::assertFalse($container->exists(Test8::class));
    static::assertFalse($container->has(Test8::class));
}
```

## 实例数组访问 ArrayAccess.offsetUnset 支持

``` php
public function testUnsetInstances(): void
{
    $container = new Container();

    $container->instance('foo', 'bar');
    $container->alias('foo', 'foo2');
    $container->alias('foo', 'foo3');

    static::assertTrue(isset($container['foo']));
    static::assertTrue(isset($container['foo2']));
    static::assertTrue(isset($container['foo3']));

    unset($container['foo']);

    static::assertFalse(isset($container['foo']));
    static::assertFalse(isset($container['foo2']));
    static::assertFalse(isset($container['foo3']));
}
```

## 类依赖注入构造器必须为 public

**fixture 定义**

**Tests\Di\Fixtures\Test9**

``` php
namespace Tests\Di\Fixtures;

class Test9
{
    protected function __construct()
    {
    }

    public function hello()
    {
        return 'world9';
    }
}
```

``` php
public function testNotInstantiable(): void
{
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage(
        'Class Tests\\Di\\Fixtures\\Test9 is not instantiable.'
    );

    $container = new Container();
    static::assertSame('world9', $container->make(Test9::class)->hello());
}
```

## bind 注册到容器可以支持各种数据

``` php
public function testMakeServiceBool(): void
{
    $container = new Container();

    $container->bind('foo', false);
    static::assertFalse($container->make('foo'));
}
```

## bind 注册到容器支持传递数组来设置别名

``` php
public function testBindArrayAsAlias(): void
{
    $container = new Container();
    $container->bind(['foo' => 'bar'], false);

    static::assertFalse($container->make('foo'));
    static::assertFalse($container->make('bar'));
}
```

## 依赖注入的方法中类参数不存在例子

**fixture 定义**

**Tests\Di\Fixtures\Test10**

``` php
namespace Tests\Di\Fixtures;

class Test10
{
    public function hello(TestNotFound $test)
    {
        return 'test10';
    }
}
```

``` php
public function testParseReflectionException(): void
{
    $this->expectException(\Leevel\Di\ServiceNotFoundException::class);
    $this->expectExceptionMessage(
        'Service Tests\\Di\\Fixtures\\TestNotFound was not found.'
    );

    $container = new Container();
    $container->call([new Test10(), 'hello']);
}
```

## instance 注册为实例支持传递数组来设置别名

``` php
public function testInstanceWithArray(): void
{
    $container = new Container();
    $instance = new \stdClass();
    $container->instance(['foo' => 'bar'], $instance);

    static::assertSame($instance, $container->make('foo'));
    static::assertSame($instance, $container->make('bar'));
}
```

## instance 注册为实例未传递第二个参数会注册自身

比如说系统中中间件注册。

``` php
# Leevel\Session\Provider\Register::middleware
/**
 * 注册 middleware 服务.
 */
protected function middleware(): void;
```

``` php
public function testInstanceItSelf(): void
{
    $container = new Container();
    $container->instance('foo');
    static::assertSame('foo', $container->make('foo'));

    $container->instance('Leevel\\Foo\\Middleware\\Bar');
    static::assertSame('Leevel\\Foo\\Middleware\\Bar', $container->make('Leevel\\Foo\\Middleware\\Bar'));
}
```

## 参数为类实例例子

**fixture 定义**

**Tests\Di\Fixtures\Test20**

``` php
namespace Tests\Di\Fixtures;

class Test20
{
    public function handle(Test21 $arg1, Test22 $arg2)
    {
        return ['test21' => $arg1->prop, 'test22' => $arg2->prop];
    }
}
```

**Tests\Di\Fixtures\Test21**

``` php
namespace Tests\Di\Fixtures;

class Test21
{
    public $prop;

    public function __construct(?string $prop = null)
    {
        $this->prop = $prop;
    }
}
```

**Tests\Di\Fixtures\Test22**

``` php
namespace Tests\Di\Fixtures;

class Test22
{
    public $prop;

    public function __construct(?string $prop = null)
    {
        $this->prop = $prop;
    }
}
```

``` php
public function testCallWithClassArgsAndItInstance(): void
{
    $container = new Container();
    $obj = new Test20();
    $args = [new Test21('hello'), new Test22('world')];
    $result = $container->call([$obj, 'handle'], $args);

    static::assertSame(['test21' => 'hello', 'test22' => 'world'], $result);
}
```

## 参数为类实例例子和其它参数混合

**fixture 定义**

**Tests\Di\Fixtures\Test23**

``` php
namespace Tests\Di\Fixtures;

class Test23
{
    public function handle(Test24 $arg1, Test25 $arg2, string $arg3)
    {
        return ['test24' => $arg1->prop, 'test25' => $arg2->prop, 'three' => $arg3];
    }
}
```

**Tests\Di\Fixtures\Test24**

``` php
namespace Tests\Di\Fixtures;

class Test24
{
    public $prop;

    public function __construct(?string $prop = null)
    {
        $this->prop = $prop;
    }
}
```

**Tests\Di\Fixtures\Test25**

``` php
namespace Tests\Di\Fixtures;

class Test25
{
    public $prop;

    public function __construct(?string $prop = null)
    {
        $this->prop = $prop;
    }
}
```

``` php
public function testCallWithClassArgsAndItInstanceAndMore(): void
{
    $container = new Container();
    $obj = new Test23();
    $args = [new Test24('hello'), new Test25('world'), 'more'];
    $result = $container->call([$obj, 'handle'], $args);

    static::assertSame(['test24' => 'hello', 'test25' => 'world', 'three' => 'more'], $result);
}
```

## make 创建容器服务并返回支持类名生成服务

**fixture 定义**

**Tests\Di\Fixtures\Test28**

``` php
namespace Tests\Di\Fixtures;

class Test28
{
    private $test;

    public function __construct(Test27 $test)
    {
        $this->test = $test;
    }

    public function hello()
    {
        return $this->test->hello();
    }
}
```

``` php
public function testClassArgsASingleClass(): void
{
    $container = new Container();
    $test = $container->make(Test28::class);
    static::assertSame('world', $test->hello());
}
```

## 魔术方法 __get 支持

``` php
public function testMagicGet(): void
{
    $container = new Container();
    $container->instance('foo', 'bar');

    static::assertSame('bar', $container->foo);
}
```

## 魔术方法 __set 支持

``` php
public function testMagicSet(): void
{
    $container = new Container();
    $container->foo = function (): string {
        return 'bar';
    };

    static::assertSame('bar', $container->foo);
}
```

## clear 清理容器

``` php
public function testClear(): void
{
    $container = new Container();
    $container->instance('foo', 'bar');

    static::assertSame('bar', $container->make('foo'));
    static::assertNull($container->make('notfound', throw: false));

    $container->clear();
    static::assertNull($container->make('foo', throw: false));
}
```

## IOC 容器禁止克隆

``` php
public function testClone(): void
{
    $this->expectException(\RuntimeException::class);
    $this->expectExceptionMessage(
        'IOC container disallowed clone.'
    );

    $container = new Container();
    $container2 = clone $container;
}
```

## makeProvider 创建服务提供者

**fixture 定义**

**Tests\Di\Fixtures\ProviderTest1**

``` php
namespace Tests\Di\Fixtures;

use Leevel\Di\IContainer;
use Leevel\Di\Provider;

class ProviderTest1 extends Provider
{
    public function __construct(IContainer $container)
    {
        $_SERVER['testMakeProvider'] = 1;
    }

    public function register(): void
    {
    }
}
```

``` php
public function testMakeProvider(): void
{
    $container = new Container();
    $container->makeProvider(ProviderTest1::class);

    static::assertSame(1, $_SERVER['testMakeProvider']);
    unset($_SERVER['testMakeProvider']);
}
```

## callProviderBootstrap 执行服务提供者 bootstrap

**fixture 定义**

**Tests\Di\Fixtures\ProviderTest2**

``` php
namespace Tests\Di\Fixtures;

use Leevel\Di\IContainer;
use Leevel\Di\Provider;

class ProviderTest2 extends Provider
{
    public function __construct(IContainer $container)
    {
    }

    public function bootstrap(): void
    {
        $_SERVER['testCallProviderBootstrap'] = 1;
    }

    public function register(): void
    {
    }
}
```

``` php
public function testCallProviderBootstrap(): void
{
    $container = new Container();
    $container->callProviderBootstrap(new ProviderTest1($container));

    static::assertSame(1, $_SERVER['testMakeProvider']);
    unset($_SERVER['testMakeProvider']);

    $container->callProviderBootstrap(new ProviderTest2($container));
    static::assertSame(1, $_SERVER['testCallProviderBootstrap']);
    unset($_SERVER['testCallProviderBootstrap']);
}
```

## registerProviders 注册服务提供者

``` php
public function testRegisterProviders(): void
{
    $container = new Container();

    static::assertFalse($container->isBootstrap());
    $container->registerProviders([], [], []);
    static::assertTrue($container->isBootstrap());

    // do nothing
    $container->registerProviders([], [], []);
}
```

## registerProviders 注册服务提供者支持延迟写入

**fixture 定义**

**Tests\Di\Fixtures\DeferredProvider**

``` php
namespace Tests\Di\Fixtures;

use Leevel\Di\IContainer;
use Leevel\Di\Provider;

class DeferredProvider extends Provider
{
    public function __construct(IContainer $container)
    {
        $_SERVER['testDeferredProvider'] = 1;
    }

    public function register(): void
    {
    }
}
```

``` php
public function testDeferredProvider(): void
{
    $deferredProviders = [
        'test_deferred' => 'Tests\\Di\\Fixtures\\DeferredProvider',
    ];

    $deferredAlias = [
        'Tests\\Di\\Fixtures\\DeferredProvider' => [
            'test_deferred' => 'bar',
        ],
    ];

    $container = new Container();

    static::assertFalse($container->isBootstrap());
    $container->registerProviders([], $deferredProviders, $deferredAlias);
    static::assertTrue($container->isBootstrap());
    static::assertNull($container->make('bar', throw: false));
    static::assertNull($container->make('test_deferred', throw: false));
    static::assertSame(1, $_SERVER['testDeferredProvider']);

    unset($_SERVER['testDeferredProvider']);
}
```