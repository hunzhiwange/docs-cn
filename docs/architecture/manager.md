# Manager

::: tip Testing Is Documentation
[tests/Support/ManagerTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Support/ManagerTest.php)
:::

QueryPHP 为驱动类组件统一抽象了一个基础管理类 `\Leevel\Manager\Manager`，驱动类组件可以轻松接入。

系统一些关键服务，比如说日志、邮件、数据库等驱动类组件均接入了统一的抽象层。

**Uses**

``` php
<?php

use Leevel\Di\Container;
use Leevel\Di\IContainer;
use Leevel\Kernel\Utils\Api;
use Leevel\Option\Option;
use Leevel\Support\Manager;
```

## 基础使用方法

**fixture 定义**

**Tests\Manager\Test1**

``` php
namespace Tests\Support;

class Test1 extends Manager
{
    protected function getOptionNamespace(): string
    {
        return 'test1';
    }

    protected function makeConnectFoo(): Foo
    {
        return new Foo($this->normalizeConnectOption('foo'));
    }

    protected function makeConnectBar($options = []): Bar
    {
        return new Bar($this->normalizeConnectOption('bar'));
    }

    protected function getConnectOption(string $connect): array
    {
        return $this->filterNullOfOption(parent::getConnectOption($connect));
    }
}
```

**Tests\Manager\IConnect**

``` php
namespace Tests\Support;

interface IConnect
{
    public function option(): array;

    public function foo(): string;

    public function bar(string $arg1): string;
}
```

**Tests\Manager\Foo**

``` php
namespace Tests\Support;

class Foo implements IConnect
{
    protected $option = [];

    public function __construct(array $option)
    {
        $this->option = $option;
    }

    public function option(): array
    {
        return $this->option;
    }

    public function foo(): string
    {
        return 'hello foo';
    }

    public function bar(string $arg1): string
    {
        return 'hello foo '.$arg1;
    }
}
```

**Tests\Manager\Bar**

``` php
namespace Tests\Support;

class Bar implements IConnect
{
    protected $option = [];

    public function __construct(array $option)
    {
        $this->option = $option;
    }

    public function option(): array
    {
        return $this->option;
    }

    public function foo(): string
    {
        return 'hello bar';
    }

    public function bar(string $arg1): string
    {
        return 'hello bar '.$arg1;
    }
}
```

可以通过 `connect` 方法连接并返回连接对象，然后可以执行相应的操作。

``` php
public function testBaseUse(): void
{
    $manager = $this->createManager();

    $foo = $manager->connect('foo');
    $bar = $manager->connect('bar');

    static::assertSame([
        'driver' => 'foo',
        'option1' => 'world',
    ], $foo->option());

    static::assertSame('hello foo', $foo->foo());
    static::assertSame('hello foo bar', $foo->bar('bar'));
    static::assertSame('hello foo 1', $foo->bar('1'));
    static::assertSame('hello foo 2', $foo->bar('2'));

    static::assertSame([
        'driver' => 'bar',
        'option1' => 'foo',
        'option2' => 'bar',
    ], $bar->option());
    static::assertSame('hello bar', $bar->foo());
    static::assertSame('hello bar bar', $bar->bar('bar'));
    static::assertSame('hello bar 1', $bar->bar('1'));
    static::assertSame('hello bar 2', $bar->bar('2'));
}
```

## extend 扩展自定义连接

**fixture 定义**

**Tests\Manager\FooExtend**

``` php
namespace Tests\Support;

class FooExtend implements IConnect
{
    protected $option = [];

    public function __construct(array $option)
    {
        $this->option = $option;
    }

    public function option(): array
    {
        return $this->option;
    }

    public function foo(): string
    {
        return 'hello extend foo';
    }

    public function bar(string $arg1): string
    {
        return 'hello extend foo '.$arg1;
    }
}
```

``` php
public function testExtend(): void
{
    $manager = $this->createManager();

    $foo = $manager->connect('foo');
    static::assertSame('hello foo', $foo->foo());
    static::assertSame('hello foo bar', $foo->bar('bar'));

    $manager->extend('foo', function (Manager $manager): FooExtend {
        return new FooExtend($manager->normalizeConnectOption('foo'));
    });

    $manager->disconnect('foo');
    $foo = $manager->connect('foo');
    static::assertSame('hello extend foo', $foo->foo());
    static::assertSame('hello extend foo bar', $foo->bar('bar'));
}
```

::: tip
如果驱动存在则会替换，否则新增驱动。
:::

## connect 连接并返回连接对象支持缓存

``` php
public function testConnectCache(): void
{
    $manager = $this->createManager();

    $foo = $manager->connect('foo');
    $bar = $manager->connect('bar');
    $foo2 = $manager->connect('foo');
    $bar2 = $manager->connect('bar');

    static::assertSame($foo, $foo2);
    static::assertSame($bar, $bar2);
}
```

## reconnect 重新连接

``` php
public function testReconnect(): void
{
    $manager = $this->createManager();

    $foo = $manager->connect('foo');
    $bar = $manager->connect('bar');
    $foo2 = $manager->reconnect('foo');
    $bar2 = $manager->reconnect('bar');

    static::assertFalse($foo === $foo2);
    static::assertFalse($bar === $bar2);
}
```

## disconnect 删除连接

``` php
public function testDisconnect(): void
{
    $manager = $this->createManager();

    $foo = $manager->connect('foo');
    $bar = $manager->connect('bar');

    $manager->disconnect('foo');
    $manager->disconnect('bar');

    $foo2 = $manager->connect('foo');
    $bar2 = $manager->connect('bar');

    static::assertFalse($foo === $foo2);
    static::assertFalse($bar === $bar2);
}
```

## manager 默认连接调用

``` php
public function testCallWithDefaultDriver(): void
{
    $manager = $this->createManager();

    static::assertSame('hello foo', $manager->foo());
    static::assertSame('hello foo bar', $manager->bar('bar'));
    static::assertSame('hello foo 1', $manager->bar('1'));
    static::assertSame('hello foo 2', $manager->bar('2'));
}
```

## getConnects 取回所有连接

``` php
public function testGetConnects(): void
{
    $manager = $this->createManager();
    static::assertCount(0, $manager->getConnects());

    $manager->connect('foo');
    $manager->connect('bar');
    static::assertCount(2, $manager->getConnects());

    $manager->disconnect('foo');
    static::assertCount(1, $manager->getConnects());

    $manager->disconnect('bar');
    static::assertCount(0, $manager->getConnects());
}
```

## setDefaultConnect 设置默认驱动

``` php
public function testSetDefaultDriver(): void
{
    $manager = $this->createManager();

    static::assertSame('hello foo', $manager->foo());
    static::assertSame('hello foo bar', $manager->bar('bar'));
    static::assertSame('hello foo 1', $manager->bar('1'));
    static::assertSame('hello foo 2', $manager->bar('2'));

    $manager->disconnect();
    $manager->setDefaultConnect('bar');

    static::assertSame('hello bar', $manager->foo());
    static::assertSame('hello bar bar', $manager->bar('bar'));
    static::assertSame('hello bar 1', $manager->bar('1'));
    static::assertSame('hello bar 2', $manager->bar('2'));
}
```