# 查询多条数据.findAll

::: tip Testing Is Documentation
[tests/Database/Read/FindAllTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Read/FindAllTest.php)
:::

**Uses**

``` php
<?php

use Leevel\Kernel\Utils\Api;
use Tests\Database\DatabaseTestCase as TestCase;
```

## findAll 查询多条数据

``` php
public function testBaseUse(): void
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
                ->findAll(),
            $connect
        )
    );
}
```

## findArray 以数组返回所有记录

``` php
public function testFindArray(): void
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
                ->findArray(),
            $connect
        )
    );
}
```

## findCollection 以集合返回所有记录

``` php
public function testFindCollection(): void
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
                ->findCollection(),
            $connect
        )
    );
}
```

## all.find 查询多条数据

``` php
public function testAllFind(): void
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
                ->all()
                ->find(),
            $connect
        )
    );
}
```