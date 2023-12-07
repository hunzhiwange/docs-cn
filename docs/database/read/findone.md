# 查询单条数据.findOne

::: tip Testing Is Documentation
[tests/Database/Read/FindOneTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Read/FindOneTest.php)
:::

**Uses**

``` php
<?php

use Leevel\Kernel\Utils\Api;
use Tests\Database\DatabaseTestCase as TestCase;
```

## findOne 查询单条数据

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT `test`.* FROM `test` LIMIT 1",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test')
                ->findOne(),
            $connect
        )
    );
}
```

## one.find 查询单条数据

``` php
public function testOneFind(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT `test`.* FROM `test` LIMIT 1",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test')
                ->one()
                ->find(),
            $connect
        )
    );
}
```