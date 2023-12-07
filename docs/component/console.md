# 命令行脚本

::: tip Testing Is Documentation
[tests/Console/CommandTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Console/CommandTest.php)
:::

QueryPHP 内置控制台命名，底层采用 `Symfony/console` 开发，用法与 Symfony 一致，对基础命令进行了简单的封装。
几个简单的封装来自 `Laravel`，是对 Symfony 的基础命令做了一些常用功能的包装，可以完全满足常用开发需求。

Console 组件是 Symfony 里面的一个控制台命令组件，可以轻松地编写出运行在 CLI 上面的命名。

**Uses**

``` php
<?php

use Leevel\Kernel\Utils\Api;
use Tests\Console\Command\CallOtherCommand;
use Tests\Console\Command\DemoCommand;
use Tests\Console\Load1\Test1;
```

## 基本使用方法

**fixture 定义**

**Tests\Console\Load1\Test1**

``` php
namespace Tests\Console\Load1;

use Leevel\Console\Command;

class Test1 extends Command
{
    protected string $name = 'load1:test1';

    protected string $description = 'load1 test1 for command';

    public function handle(): int
    {
        $this->info('load1 test1');

        return 0;
    }
}
```

**Tests\Console\Command\CallOtherCommand**

``` php
namespace Tests\Console\Command;

use Leevel\Console\Command;

class CallOtherCommand extends Command
{
    protected string $name = 'call:other';

    protected string $description = 'call other command for test.';

    public function handle(): int
    {
        $this->info('call other command test.');

        $this->info('argument is '.json_encode($this->getArgument()));

        $this->info('option is '.json_encode($this->getOption()));

        $this->table([
            'Item',
            'Value',
        ], [
            ['hello', 'world'],
            ['foo', 'bar'],
        ]);

        $this->info($this->time('test time'));

        $this->question('a question');

        $this->error('a error message');

        $this->error('a error message');

        $this->call('load1:test1');

        return 0;
    }
}
```

``` php
public function testBaseUse(): void
{
    $result = $this->runCommand(new CallOtherCommand(), [
        'command' => 'call:other',
    ], function ($container, $application): void {
        $application->normalizeCommands([Test1::class]);
    });

    $result = $this->normalizeContent($result);

    static::assertStringContainsString($this->normalizeContent('call other command test.'), $result);
    static::assertStringContainsString($this->normalizeContent('load1 test1'), $result);

    // argument and option
    static::assertStringContainsString($this->normalizeContent('argument is {"command":"call:other"}'), $result);
    static::assertStringContainsString($this->normalizeContent('option is {"env":null,"help":false'), $result);

    // table
    static::assertStringContainsString($this->normalizeContent('| Item  | Value |'), $result);
    static::assertStringContainsString($this->normalizeContent('| hello | world |'), $result);
    static::assertStringContainsString($this->normalizeContent('| foo   | bar   |'), $result);

    // time
    static::assertStringContainsString($this->normalizeContent(']test time'), $result);

    // question
    static::assertStringContainsString($this->normalizeContent('a question'), $result);

    // error
    static::assertStringContainsString($this->normalizeContent('a error message'), $result);
}
```