# 流程控制

::: tip Testing Is Documentation
[tests/Support/FlowControlTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Support/FlowControlTest.php)
:::

QueryPHP 为流程控制类统一抽象了一个基础流程控制类 `\Leevel\Support\FlowControl`，流程控制类可以轻松接入。

系统一些关键服务，比如说数据库查询条件、HTTP 响应等流程控制类均接入了统一的抽象层。

**Uses**

``` php
<?php

use Leevel\Kernel\Utils\Api;
use Leevel\Support\FlowControl;
```

## 基础使用方法

**fixture 定义**

**Tests\Flow\Test1**

``` php
namespace Tests\Support;

class FlowTest1
{
    use FlowControl;

    protected $value = [];

    public function __call(string $method, array $args): void
    {
    }

    public function value()
    {
        return implode(' ', $this->value);
    }

    public function condition1()
    {
        if ($this->checkFlowControl()) {
            return $this;
        }

        $this->value[] = 'condition1';

        return $this;
    }

    public function condition2()
    {
        if ($this->checkFlowControl()) {
            return $this;
        }

        $this->value[] = 'condition2';

        return $this;
    }

    public function condition3()
    {
        if ($this->checkFlowControl()) {
            return $this;
        }

        $this->value[] = 'condition3';

        return $this;
    }

    public function condition4()
    {
        if ($this->checkFlowControl()) {
            return $this;
        }

        $this->value[] = 'condition4';

        return $this;
    }

    public function condition5()
    {
        if ($this->checkFlowControl()) {
            return $this;
        }

        $this->value[] = 'condition5';

        return $this;
    }
}
```

``` php
public function testBaseUse(): void
{
    $test = new FlowTest1();

    static::assertSame('', $test->value());

    $condition1 = 1;

    $value = $test
        ->if($condition1)
        ->condition1()
        ->else()
        ->condition2()
        ->fi()
        ->value()
    ;

    static::assertSame('condition1', $value);
}
```

## else 条件语句

``` php
public function testElse(): void
{
    $test = new FlowTest1();

    $condition1 = 0;

    $value = $test
        ->if($condition1)
        ->condition1()
        ->else()
        ->condition2()
        ->fi()
        ->value()
    ;

    static::assertSame('condition2', $value);
}
```

## else 条件语句例子

**测试例子**

``` php
# Tests\Support\FlowControlTest::getElseData
public static function getElseData()
{
    return [
        [0, 'condition1'],
        [1, 'condition2'],
        [2, 'condition3'],
        [3, 'condition4'],
        [4, 'condition5'],
        [5, 'condition5'],
        [6, 'condition5'],
    ];
}
```

``` php
public function testElseMulti(int $condition, string $result): void
{
    $test = new FlowTest1();

    $value = $test
        ->if(0 === $condition)
        ->condition1()
        ->elif(1 === $condition)
        ->condition2()
        ->elif(2 === $condition)
        ->condition3()
        ->elif(3 === $condition)
        ->condition4()
        ->else()
        ->condition5()
        ->fi()
        ->value()
    ;

    static::assertSame($result, $value);
}
```

## elif 条件语句

``` php
public function testElseIfs(): void
{
    $test = new FlowTest1();

    $condition1 = 1;

    $value = $test
        ->if(0 === $condition1)
        ->condition1()
        ->elif(1 === $condition1)
        ->condition2()
        ->fi()
        ->value()
    ;

    static::assertSame('condition2', $value);
}
```

## 条件语句支持嵌套

``` php
public function testNested(): void
{
    $queryBuilder = new QueryBuilderFlowControl();

    $condition = 0;
    $anotherCondition = 'bar';
    $anotherConditionSub = 'bar';

    $value = $queryBuilder
        ->if(0 === $condition)
        ->where('id', 0)
        ->if('foo' === $anotherCondition)
        ->where('id', 11)
        ->elif('bar' === $anotherCondition)
        ->where('id', 22)
        ->else()
        ->where('id', 33)
        ->if('1' === $anotherConditionSub)
        ->where('id', 111)
        ->elif('2' === $anotherConditionSub)
        ->where('id', 222)
        ->else()
        ->where('id', 333)
        ->fi()
        ->fi()
        ->elif(1 === $condition)
        ->where('id', 4)
        ->else()
        ->where('id', 5)
        ->fi()
        ->getQuery()
    ;

    $data = <<<'eot'

[
    "id",
    0
],
[
    "id",
    22
]



    static::assertSame(
        $data,
        $this->varJson(
            $value
        )
    );
}
```