# 查询数据.select

::: tip Testing Is Documentation
[tests/Database/Read/SelectTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Read/SelectTest.php)
:::

**Uses**

``` php
<?php

use Leevel\Kernel\Utils\Api;
use Tests\Database\DatabaseTestCase as TestCase;
```

## select 查询指定 SQL

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "select *from test where id = ?",
            [
                1
            ],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test')
                ->select('select *from test where id = ?', [1]),
            $connect
        )
    );
}
```

## select 直接查询

``` php
public function testSelect(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT `test`.* FROM `test`",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test')
                ->select(),
            $connect,
            1
        )
    );
}
```

## select 查询支持闭包

``` php
public function testSelectClosure(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT `test`.* FROM `test` WHERE `test`.`id` = :test_id",
            {
                "test_id": [
                    1
                ]
            },
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test')
                ->select(function ($select): void {
                    $select->where('id', 1);
                }),
            $connect,
            2
        )
    );
}
```

## select 查询支持 \Leevel\Database\Select 对象

``` php
public function testSelectObject(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT `test`.* FROM `test` WHERE `test`.`id` = :test_id",
            {
                "test_id": [
                    5
                ]
            },
            false
        ]
        eot;

    $select = $connect
        ->table('test')
        ->where('id', 5)
    ;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->select($select),
            $connect,
            3
        )
    );
}
```