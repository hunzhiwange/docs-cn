# Query lang.middleware

::: tip Testing Is Documentation
[tests/Database/Query/MiddlewareTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Query/MiddlewareTest.php)
:::

**Uses**

``` php
<?php

use Leevel\Database\Condition;
use Leevel\Di\Container;
use Leevel\Kernel\Utils\Api;
use Tests\Database\DatabaseTestCase as TestCase;
use Tests\Database\Query\Database\Demo;
use Tests\Database\Query\Database\ForceMaster;
```

## middleware 基础用法

**fixture 定义**

``` php
namespace Tests\Database\Query\Database;

use Leevel\Database\Condition;

class ForceMaster
{
    public function terminate(\Closure $next, Condition $condition, array $middlewaresOptions, array $makeSql): array
    {
        $makeSql = array_merge(['force_master' => '/*FORCE_MASTER*/'], $makeSql);

        return $next($condition, $middlewaresOptions, $makeSql);
    }
}
```

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();
    Condition::withContainer(new Container());

    $sql = <<<'eot'
        [
            "\/*FORCE_MASTER*\/ SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` = :test_query_id",
            {
                "test_query_id": [
                    5
                ]
            },
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->middlewares(ForceMaster::class)
                ->where('id', '=', 5)
                ->findAll(),
            $connect
        )
    );
}
```

## middleware 支持参数传递

**fixture 定义**

``` php
namespace Tests\Database\Query\Database;

use Leevel\Database\Condition;

class Demo
{
    public function handle(\Closure $next, Condition $condition, array $middlewaresOptions): array
    {
        $condition->where('id', '>', 5);
        $condition->where('id', '<=', 90);
        $middlewaresOptions['hello_comment'] = 'hello comment';

        return $next($condition, $middlewaresOptions);
    }

    public function terminate(\Closure $next, Condition $condition, array $middlewaresOptions, array $makeSql): array
    {
        $makeSql = array_merge(['force_master' => '/*'.$middlewaresOptions['hello_comment'].'*/'], $makeSql);

        return $next($condition, $middlewaresOptions, $makeSql);
    }
}
```

``` php
public function testBaseUseWithArgs(): void
{
    $connect = $this->createDatabaseConnectMock();
    Condition::withContainer(new Container());

    $sql = <<<'eot'
        [
            "\/*hello comment*\/ SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` > :test_query_id AND `test_query`.`id` <= :test_query_id_1 AND `test_query`.`id` = :test_query_id_2",
            {
                "test_query_id": [
                    5
                ],
                "test_query_id_1": [
                    90
                ],
                "test_query_id_2": [
                    5
                ]
            },
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->middlewares(Demo::class)
                ->where('id', '=', 5)
                ->findAll(),
            $connect
        )
    );
}
```