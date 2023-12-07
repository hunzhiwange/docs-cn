# Query lang.comment

::: tip Testing Is Documentation
[tests/Database/Query/CommentTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Query/CommentTest.php)
:::

**Uses**

``` php
<?php

use Leevel\Kernel\Utils\Api;
use Tests\Database\DatabaseTestCase as TestCase;
```

## comment 基础用法

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

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
                ->comment('FORCE_MASTER')
                ->where('id', '=', 5)
                ->findAll(),
            $connect
        )
    );
}
```