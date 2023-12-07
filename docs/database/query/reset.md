# Query lang.reset

::: tip Testing Is Documentation
[tests/Database/Query/ResetTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Query/ResetTest.php)
:::

**Uses**

``` php
<?php

use Leevel\Kernel\Utils\Api;
use Tests\Database\DatabaseTestCase as TestCase;
```

## 重置所有

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query_subsql`.* FROM `test_query_subsql` WHERE `test_query_subsql`.`new` = :test_query_subsql_new",
            {
                "test_query_subsql_new": [
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
                ->where('id', '=', 5)
                ->where('name', 'like', 'me')
                ->reset()
                ->table('test_query_subsql')
                ->where('new', '=', 'world')
                ->findAll(),
            $connect
        )
    );
}
```

## 重置某一项

``` php
public function testResetItem(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.`name`,`test_query`.`id` FROM `test_query` WHERE `test_query`.`new` LIKE :test_query_new",
            {
                "test_query_new": [
                    "new"
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
                ->where('id', '=', 5)
                ->where('name', 'like', 'me')
                ->setColumns('name,id')
                ->reset('where')
                ->where('new', 'like', 'new')
                ->findAll(),
            $connect,
            1
        )
    );
}
```