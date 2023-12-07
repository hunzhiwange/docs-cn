# 运行命令代码

::: tip Testing Is Documentation
[tests/Console/RunCommandTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Console/RunCommandTest.php)
:::

有时候我们需要在非命令行调用命令，比如在控制器等地方直接运行命令行代码，系统对这种场景进行了简单封装。

**Uses**

``` php
<?php

use Leevel\Console\Application;
use Leevel\Console\RunCommand;
use Leevel\Di\Container;
use Leevel\Kernel\Utils\Api;
use Tests\Console\Command\CallOtherCommand;
use Tests\Console\Load1\Test1;
```

## 运行命令代码基本使用方法

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
    $application = new Application(new Container(), '1.0');
    $runCommand = new RunCommand($application);

    $runCommand->normalizeCommand(Test1::class);
    $result = $runCommand->handle(new CallOtherCommand(), [
        'command' => 'call:other',
    ]);

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

::: tip
normalizeCommand 格式化命令，主要用于一个命令可能会调用其它命令，需要预先加载。
:::