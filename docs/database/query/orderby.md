# Query lang.orderBy

::: tip Testing Is Documentation
[tests/Database/Query/OrderByTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Query/OrderByTest.php)
:::

**Uses**

``` php
<?php

use Leevel\Database\Condition;
use Leevel\Kernel\Utils\Api;
use Tests\Database\DatabaseTestCase as TestCase;
```

## orderBy 排序基础用法

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.`tid` AS `id`,`test_query`.`tname` AS `value` FROM `test_query` ORDER BY `test_query`.`id` DESC,`test_query`.`name` ASC",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query', 'tid as id,tname as value')
                ->orderBy('id DESC')
                ->orderBy('name')
                ->findAll(),
            $connect
        )
    );
}
```

## orderBy 指定表排序

``` php
public function testWithTable(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.`tid` AS `id`,`test_query`.`tname` AS `value` FROM `test_query` ORDER BY `test_query`.`id` DESC",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query', 'tid as id,tname as value')
                ->orderBy('test_query.id DESC')
                ->findAll(),
            $connect,
            1
        )
    );
}
```

## orderBy 表达式排序

``` php
public function testWithExpression(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT SUM(`test_query`.`num`),`test_query`.`tid` AS `id`,`test_query`.`tname` AS `value`,`test_query`.`num` FROM `test_query` GROUP BY `test_query`.`tid` ORDER BY SUM(`test_query`.`num`) ASC",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query', Condition::raw('SUM([num])').',tid as id,tname as value,num')
                ->orderBy(Condition::raw('SUM([num]) ASC'))
                ->groupBy('tid')
                ->findAll(),
            $connect,
            2
        )
    );
}
```

## orderBy 表达式和普通排序混合

``` php
public function testWithExpressionAndNormal(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.`tid` AS `id`,`test_query`.`tname` AS `value` FROM `test_query` ORDER BY `test_query`.`title` ASC,`test_query`.`id` ASC,concat('1234',`test_query`.`id`,'ttt') DESC",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query', 'tid as id,tname as value')
                ->orderBy('title,id,'.Condition::raw("concat('1234',[id],'ttt') desc"))
                ->findAll(),
            $connect,
            4
        )
    );
}
```

## orderBy 排序支持数组

``` php
public function testWithArray(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.`tid` AS `id`,`test_query`.`tname` AS `value` FROM `test_query` ORDER BY `test_query`.`title` ASC,`test_query`.`id` ASC,`test_query`.`ttt` ASC,`test_query`.`value` DESC",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query', 'tid as id,tname as value')
                ->orderBy(['title,id,ttt', 'value desc'])
                ->findAll(),
            $connect,
            5
        )
    );
}
```

## orderBy 排序数组支持自定义升降

``` php
public function testWithArrayAndSetType(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.`tid` AS `id`,`test_query`.`tname` AS `value` FROM `test_query` ORDER BY `test_query`.`title` DESC,`test_query`.`id` DESC,`test_query`.`ttt` ASC,`test_query`.`value` DESC",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query', 'tid as id,tname as value')
                ->orderBy(['title,id,ttt asc', 'value'], 'desc')
                ->findAll(),
            $connect,
            6
        )
    );
}
```

## latest 快捷降序

``` php
public function testLatest(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` ORDER BY `test_query`.`create_at` DESC",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->latest()
                ->findAll(),
            $connect
        )
    );
}
```

## latest 快捷降序支持自定义字段

``` php
public function testLatestWithCustomField(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` ORDER BY `test_query`.`foo` DESC",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->latest('foo')
                ->findAll(),
            $connect,
            1
        )
    );
}
```

## oldest 快捷升序

``` php
public function testOldest(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` ORDER BY `test_query`.`create_at` ASC",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->oldest()
                ->findAll(),
            $connect,
            2
        )
    );
}
```

## oldest 快捷升序支持自定义字段

``` php
public function testOldestWithCustomField(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` ORDER BY `test_query`.`bar` ASC",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->oldest('bar')
                ->findAll(),
            $connect,
            3
        )
    );
}
```

## orderBy 表达式排序默认为升序

``` php
public function testOrderByExpressionNotSetWithDefaultAsc(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` ORDER BY foo ASC",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->orderBy(Condition::raw('foo'))
                ->findAll(),
            $connect
        )
    );
}
```