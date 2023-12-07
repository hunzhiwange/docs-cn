# Query lang.join

::: tip Testing Is Documentation
[tests/Database/Query/JoinTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Query/JoinTest.php)
:::

## join 函数原型

``` php
join($table, $cols, ...$cond);
```

 - 其中 $table 和 $cols 与 《查询语言.table》中的用法一致。
 - $cond 与《查询语言.where》中的用法一致。

**Uses**

``` php
<?php

use Leevel\Database\Condition;
use Leevel\Kernel\Utils\Api;
use Tests\Database\DatabaseTestCase as TestCase;
```

## join 基础用法

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.*,`test_query_subsql`.`name`,`test_query_subsql`.`value` FROM `test_query` INNER JOIN `test_query_subsql` ON `test_query_subsql`.`name` = :test_query_subsql_name",
            {
                "test_query_subsql_name": [
                    "小牛"
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
                ->join('test_query_subsql', 'name,value', 'name', '=', '小牛')
                ->findAll(),
            $connect
        )
    );
}
```

## join 附加条件

``` php
public function testWithCondition(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.*,`t`.`name` AS `nikename`,`t`.`value` AS `tt` FROM `test_query` INNER JOIN `test_query_subsql` `t` ON `t`.`name` = :t_name",
            {
                "t_name": [
                    "小牛"
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
                ->join(['t' => 'test_query_subsql'], ['name as nikename', 'tt' => 'value'], 'name', '=', '小牛')
                ->findAll(),
            $connect,
            1
        )
    );
}
```

## join 附加条件支持数组和表达式

实质上 where 支持语法特性都支持。

``` php
public function testWithConditionSupportArrayAndExpression(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.*,`test_query_subsql`.`name`,`test_query_subsql`.`value` FROM `test_query` INNER JOIN `test_query_subsql` ON `test_query_subsql`.`hello` = :test_query_subsql_hello AND `test_query_subsql`.`test` > `test_query_subsql`.`name`",
            {
                "test_query_subsql_hello": [
                    "world"
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
                ->join('test_query_subsql', 'name,value', ['hello' => 'world', ['test', '>', Condition::raw('[name]')]])
                ->findAll(),
            $connect,
            2
        )
    );
}
```

## join 附加条件支持闭包

``` php
public function testWithConditionIsClosure(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.*,`test_query_subsql`.`name`,`test_query_subsql`.`value` FROM `test_query` INNER JOIN `test_query_subsql` ON (`test_query_subsql`.`id` < :test_query_subsql_id AND `test_query_subsql`.`name` LIKE :test_query_subsql_name)",
            {
                "test_query_subsql_id": [
                    5
                ],
                "test_query_subsql_name": [
                    "hello"
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
                ->join('test_query_subsql', 'name,value', function ($select): void {
                    $select
                        ->where('id', '<', 5)
                        ->where('name', 'like', 'hello')
                    ;
                })
                ->findAll(),
            $connect,
            3
        )
    );
}
```

## innerJoin 查询

``` php
public function testInnerJoin(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.*,`t`.`name` AS `nikename`,`t`.`value` AS `tt` FROM `test_query` INNER JOIN `test_query_subsql` `t` ON `t`.`name` = :t_name",
            {
                "t_name": [
                    "小牛"
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
                ->innerJoin(['t' => 'test_query_subsql'], ['name as nikename', 'tt' => 'value'], 'name', '=', '小牛')
                ->findAll(),
            $connect
        )
    );
}
```

## leftJoin 查询

``` php
public function testLeftJoin(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.*,`t`.`name` AS `nikename`,`t`.`value` AS `tt` FROM `test_query` LEFT JOIN `test_query_subsql` `t` ON `t`.`name` = :t_name",
            {
                "t_name": [
                    "小牛"
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
                ->leftJoin(['t' => 'test_query_subsql'], ['name as nikename', 'tt' => 'value'], 'name', '=', '小牛')
                ->findAll(),
            $connect
        )
    );
}
```

## rightJoin 查询

``` php
public function testRightJoin(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.*,`t`.`name` AS `nikename`,`t`.`value` AS `tt` FROM `test_query` RIGHT JOIN `test_query_subsql` `t` ON `t`.`name` = :t_name",
            {
                "t_name": [
                    "小牛"
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
                ->rightJoin(['t' => 'test_query_subsql'], ['name as nikename', 'tt' => 'value'], 'name', '=', '小牛')
                ->findAll(),
            $connect
        )
    );
}
```

## crossJoin 查询

自然连接不用设置 on 条件。

``` php
public function testCrossJoin(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.*,`t`.`name` AS `nikename`,`t`.`value` AS `tt` FROM `test_query` CROSS JOIN `test_query_subsql` `t`",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->crossJoin(['t' => 'test_query_subsql'], ['name as nikename', 'tt' => 'value'])
                ->findAll(),
            $connect
        )
    );
}
```

## naturalJoin 查询

自然连接不用设置 on 条件。

``` php
public function testNaturalJoin(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.*,`t`.`name` AS `nikename`,`t`.`value` AS `tt` FROM `test_query` NATURAL JOIN `test_query_subsql` `t`",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->naturalJoin(['t' => 'test_query_subsql'], ['name as nikename', 'tt' => 'value'])
                ->findAll(),
            $connect
        )
    );
}
```

## join 查询支持表支持查询对象

``` php
public function testInnerJoinWithTableIsSelect(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.*,`b`.`name` AS `nikename`,`b`.`value` AS `tt` FROM `test_query` INNER JOIN (SELECT `b`.* FROM `test_query_subsql` `b`) b ON `b`.`name` = :b_name",
            {
                "b_name": [
                    "小牛"
                ]
            },
            false
        ]
        eot;

    $joinTable = $connect->table('test_query_subsql as b');

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->innerJoin($joinTable, ['name as nikename', 'tt' => 'value'], 'name', '=', '小牛')
                ->findAll(),
            $connect
        )
    );
}
```

## join 查询支持表支持查询条件对象

``` php
public function testInnerJoinWithTableIsCondition(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.*,`b`.`name` AS `nikename`,`b`.`value` AS `tt` FROM `test_query` INNER JOIN (SELECT `b`.* FROM `test_query_subsql` `b`) b ON `b`.`name` = :b_name",
            {
                "b_name": [
                    "小牛"
                ]
            },
            false
        ]
        eot;

    $joinTable = $connect
        ->table('test_query_subsql as b')
        ->databaseCondition()
    ;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->innerJoin($joinTable, ['name as nikename', 'tt' => 'value'], 'name', '=', '小牛')
                ->findAll(),
            $connect
        )
    );
}
```

## join 查询支持表支持闭包

``` php
public function testInnerJoinWithTableIsClosure(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.*,`b`.`name` AS `nikename`,`b`.`value` AS `tt` FROM `test_query` INNER JOIN (SELECT `b`.* FROM `test_query_subsql` `b`) b ON `b`.`name` = :b_name",
            {
                "b_name": [
                    "小牛"
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
                ->innerJoin(function ($select): void {
                    $select->table('test_query_subsql as b');
                }, ['name as nikename', 'tt' => 'value'], 'name', '=', '小牛')
                ->findAll(),
            $connect
        )
    );
}
```

## join 查询支持表支持数组别名

``` php
public function testInnerJoinWithTableIsArrayCondition(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.*,`foo`.`name` AS `nikename`,`foo`.`value` AS `tt` FROM `test_query` INNER JOIN (SELECT `b`.* FROM `test_query_subsql` `b`) foo ON `foo`.`name` = :foo_name",
            {
                "foo_name": [
                    "小牛"
                ]
            },
            false
        ]
        eot;

    $joinTable = $connect
        ->table('test_query_subsql as b')
        ->databaseCondition()
    ;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->innerJoin(['foo' => $joinTable], ['name as nikename', 'tt' => 'value'], 'name', '=', '小牛')
                ->findAll(),
            $connect
        )
    );
}
```

## join 查询支持表支持表达式

``` php
public function testInnerJsonWithTableNameIsExpression(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.*,`a`.`name` AS `nikename`,`a`.`value` AS `tt` FROM `test_query` INNER JOIN (SELECT * FROM test_query_subsql) a ON `a`.`name` = `test_query`.`name`",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->innerJoin('(SELECT * FROM test_query_subsql)', ['name as nikename', 'tt' => 'value'], 'name', '=', Condition::raw('[test_query.name]'))
                ->findAll(),
            $connect
        )
    );
}
```

## join 查询支持表支持表达式别名

``` php
public function testInnerJsonWithTableNameIsExpressionWithAsCustomAlias(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.*,`bar`.`name` AS `nikename`,`bar`.`value` AS `tt` FROM `test_query` INNER JOIN (SELECT * FROM test_query_subsql) bar ON `bar`.`name` = `test_query`.`name`",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->innerJoin('(SELECT * FROM test_query_subsql) as bar', ['name as nikename', 'tt' => 'value'], 'name', '=', Condition::raw('[test_query.name]'))
                ->findAll(),
            $connect
        )
    );
}
```