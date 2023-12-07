# 删除数据.delete

::: tip Testing Is Documentation
[tests/Database/Delete/DeleteTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Delete/DeleteTest.php)
:::

**Uses**

``` php
<?php

use Leevel\Database\Condition;
use Leevel\Kernel\Utils\Api;
use Tests\Database\DatabaseTestCase as TestCase;
```

## delete 基本用法

删除成功后，返回影响行数。

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "DELETE FROM `test_query` WHERE `test_query`.`id` = :test_query_id ORDER BY `test_query`.`id` DESC LIMIT 1",
            {
                "test_query_id": [
                    1
                ]
            },
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test_query')
                ->where('id', 1)
                ->limit(1)
                ->orderBy('id desc')
                ->delete(),
            $connect
        )
    );
}
```

## delete 不带条件的删除

删除成功后，返回影响行数。

``` php
public function testWithoutCondition(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "DELETE FROM `test_query`",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test_query')
                ->delete(),
            $connect
        )
    );
}
```

## delete.join 连表删除

``` php
public function testJoin(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'

"DELETE t FROM `test_query` `t` INNER JOIN `test_query_subsql` `h` ON `h`.`name` = `t`.`name` WHERE `t`.`id` = :sub1_t_id",
{
    "sub1_t_id": [
        1
    ]
},
false



    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test_query as t')
                ->innerJoin(['h' => 'test_query_subsql'], [], 'name', '=', Condition::raw('[t.name]'))
                ->where('id', 1)
                ->limit(1)
                ->orderBy('id desc')
                ->delete(),
            $connect
        )
    );
}
```