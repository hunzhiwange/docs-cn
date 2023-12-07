# 批量写入数据.insertAll

::: tip Testing Is Documentation
[tests/Database/Create/InsertAllTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Create/InsertAllTest.php)
:::

**Uses**

``` php
<?php

use Leevel\Database\Condition;
use Leevel\Kernel\Utils\Api;
use Tests\Database\DatabaseTestCase as TestCase;
```

## insertAll 基本用法

写入成功后，返回 `lastInsertId`。

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "INSERT INTO `test_query` (`test_query`.`name`,`test_query`.`value`) VALUES (:named_param_name,:named_param_value),(:named_param_name_1,:named_param_value_1),(:named_param_name_2,:named_param_value_2),(:named_param_name_3,:named_param_value_3)",
            {
                "named_param_name": [
                    "小鸭子1"
                ],
                "named_param_value": [
                    "呱呱呱1"
                ],
                "named_param_name_1": [
                    "小鸭子2"
                ],
                "named_param_value_1": [
                    "呱呱呱2"
                ],
                "named_param_name_2": [
                    "小鸭子3"
                ],
                "named_param_value_2": [
                    "呱呱呱3"
                ],
                "named_param_name_3": [
                    "小鸭子4"
                ],
                "named_param_value_3": [
                    "呱呱呱4"
                ]
            },
            false
        ]
        eot;

    $data = [
        ['name' => '小鸭子1', 'value' => '呱呱呱1'],
        ['name' => '小鸭子2', 'value' => '呱呱呱2'],
        ['name' => '小鸭子3', 'value' => '呱呱呱3'],
        ['name' => '小鸭子4', 'value' => '呱呱呱4'],
    ];

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->insertAll($data),
            $connect
        )
    );
}
```

## insertAll 支持自定义 KEY

写入成功后，返回 `lastInsertId`。

``` php
public function testCustomerKey(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "INSERT INTO `test_query` (`test_query`.`name`,`test_query`.`value`) VALUES (:named_param_name_hello,:named_param_value_hello),(:named_param_name_hello1,:named_param_value_hello1),(:named_param_name_hello2,:named_param_value_hello2),(:named_param_name_hello3,:named_param_value_hello3)",
            {
                "named_param_name_hello": [
                    "小鸭子1"
                ],
                "named_param_value_hello": [
                    "呱呱呱1"
                ],
                "named_param_name_hello1": [
                    "小鸭子2"
                ],
                "named_param_value_hello1": [
                    "呱呱呱2"
                ],
                "named_param_name_hello2": [
                    "小鸭子3"
                ],
                "named_param_value_hello2": [
                    "呱呱呱3"
                ],
                "named_param_name_hello3": [
                    "小鸭子4"
                ],
                "named_param_value_hello3": [
                    "呱呱呱4"
                ]
            },
            false
        ]
        eot;

    $data = [
        'hello' => ['name' => '小鸭子1', 'value' => '呱呱呱1'],
        'hello1' => ['name' => '小鸭子2', 'value' => '呱呱呱2'],
        'hello2' => ['name' => '小鸭子3', 'value' => '呱呱呱3'],
        'hello3' => ['name' => '小鸭子4', 'value' => '呱呱呱4'],
    ];

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->insertAll($data),
            $connect
        )
    );
}
```

## insertAll 支持自动根据 KEY 调整顺序

写入成功后，返回 `lastInsertId`。

``` php
public function testKeySort(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "INSERT INTO `test_query` (`test_query`.`name`,`test_query`.`value`) VALUES (:named_param_name_hello,:named_param_value_hello),(:named_param_name_hello1,:named_param_value_hello1),(:named_param_name_hello2,:named_param_value_hello2),(:named_param_name_hello3,:named_param_value_hello3)",
            {
                "named_param_name_hello": [
                    "小鸭子1"
                ],
                "named_param_value_hello": [
                    "呱呱呱1"
                ],
                "named_param_name_hello1": [
                    "小鸭子2"
                ],
                "named_param_value_hello1": [
                    "呱呱呱2"
                ],
                "named_param_name_hello2": [
                    "小鸭子3"
                ],
                "named_param_value_hello2": [
                    "呱呱呱3"
                ],
                "named_param_name_hello3": [
                    "小鸭子4"
                ],
                "named_param_value_hello3": [
                    "呱呱呱4"
                ]
            },
            false
        ]
        eot;

    $data = [
        'hello' => ['value' => '呱呱呱1', 'name' => '小鸭子1'],
        'hello1' => ['name' => '小鸭子2', 'value' => '呱呱呱2'],
        'hello2' => ['value' => '呱呱呱3', 'name' => '小鸭子3'],
        'hello3' => ['name' => '小鸭子4', 'value' => '呱呱呱4'],
    ];

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->insertAll($data),
            $connect
        )
    );
}
```

## insertAll 绑定参数

``` php
public function testBind(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "INSERT INTO `test_query` (`test_query`.`name`,`test_query`.`value`) VALUES (:named_param_name,:named_param_value),(:named_param_name_1,:positional_param_0_1),(:named_param_name_2,:named_param_value_2),(:named_param_name_3,:positional_param_1_3)",
            {
                "named_param_name": [
                    "小鸭子1"
                ],
                "named_param_value": [
                    "呱呱呱1"
                ],
                "named_param_name_1": [
                    "小鸭子2"
                ],
                "positional_param_0_1": [
                    "吃肉1"
                ],
                "named_param_name_2": [
                    "小鸭子3"
                ],
                "named_param_value_2": [
                    "呱呱呱3"
                ],
                "named_param_name_3": [
                    "小鸭子4"
                ],
                "positional_param_1_3": [
                    "吃肉2"
                ]
            },
            false
        ]
        eot;

    $data = [
        ['name' => '小鸭子1', 'value' => '呱呱呱1'],
        ['name' => '小鸭子2', 'value' => Condition::raw('?')],
        ['name' => '小鸭子3', 'value' => '呱呱呱3'],
        ['name' => '小鸭子4', 'value' => Condition::raw('?')],
    ];

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->insertAll($data, ['吃肉1', '吃肉2']),
            $connect
        )
    );

    $sql = <<<'eot'
        [
            "INSERT INTO `test_query` (`test_query`.`name`,`test_query`.`value`) VALUES (:named_param_name,:named_param_value),(:named_param_name_1,:hello),(:named_param_name_2,:named_param_value_2),(:named_param_name_3,:world)",
            {
                "named_param_name": [
                    "小鸭子1"
                ],
                "named_param_value": [
                    "呱呱呱1"
                ],
                "named_param_name_1": [
                    "小鸭子2"
                ],
                "named_param_name_2": [
                    "小鸭子3"
                ],
                "named_param_value_2": [
                    "呱呱呱3"
                ],
                "named_param_name_3": [
                    "小鸭子4"
                ],
                "hello": "hello 吃肉",
                "world": "world 喝汤"
            },
            false
        ]
        eot;

    $data = [
        ['name' => '小鸭子1', 'value' => '呱呱呱1'],
        ['name' => '小鸭子2', 'value' => Condition::raw(':hello')],
        ['name' => '小鸭子3', 'value' => '呱呱呱3'],
        ['name' => '小鸭子4', 'value' => Condition::raw(':world')],
    ];

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->insertAll($data, ['hello' => 'hello 吃肉', 'world' => 'world 喝汤']),
            $connect,
            1
        )
    );
}
```

## bind.insertAll 绑定参数批量写入数据

``` php
public function testWithBindFunction(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "INSERT INTO `test_query` (`test_query`.`name`,`test_query`.`value`) VALUES (:named_param_name,:named_param_value),(:named_param_name_1,:positional_param_0_1),(:named_param_name_2,:named_param_value_2),(:named_param_name_3,:positional_param_1_3)",
            {
                "named_param_name": [
                    "小鸭子1"
                ],
                "named_param_value": [
                    "呱呱呱1"
                ],
                "named_param_name_1": [
                    "小鸭子2"
                ],
                "positional_param_0_1": [
                    "吃鱼"
                ],
                "named_param_name_2": [
                    "小鸭子3"
                ],
                "named_param_value_2": [
                    "呱呱呱3"
                ],
                "named_param_name_3": [
                    "小鸭子4"
                ],
                "positional_param_1_3": [
                    "吃肉"
                ]
            },
            false
        ]
        eot;

    $data = [
        ['name' => '小鸭子1', 'value' => '呱呱呱1'],
        ['name' => '小鸭子2', 'value' => Condition::raw('?')],
        ['name' => '小鸭子3', 'value' => '呱呱呱3'],
        ['name' => '小鸭子4', 'value' => Condition::raw('?')],
    ];

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->bind(['吃鱼', '吃肉'])
                ->insertAll($data),
            $connect
        )
    );
}
```

## insertAll 支持 replace 用法

``` php
public function testReplace(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "REPLACE INTO `test_query` (`test_query`.`name`,`test_query`.`value`) VALUES (:named_param_name,:named_param_value),(:named_param_name_1,:positional_param_0_1),(:named_param_name_2,:named_param_value_2),(:named_param_name_3,:positional_param_1_3)",
            {
                "named_param_name": [
                    "小鸭子1"
                ],
                "named_param_value": [
                    "呱呱呱1"
                ],
                "named_param_name_1": [
                    "小鸭子2"
                ],
                "positional_param_0_1": [
                    "吃鱼"
                ],
                "named_param_name_2": [
                    "小鸭子3"
                ],
                "named_param_value_2": [
                    "呱呱呱3"
                ],
                "named_param_name_3": [
                    "小鸭子4"
                ],
                "positional_param_1_3": [
                    "吃肉"
                ]
            },
            false
        ]
        eot;

    $data = [
        ['name' => '小鸭子1', 'value' => '呱呱呱1'],
        ['name' => '小鸭子2', 'value' => Condition::raw('?')],
        ['name' => '小鸭子3', 'value' => '呱呱呱3'],
        ['name' => '小鸭子4', 'value' => Condition::raw('?')],
    ];

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->bind(['吃鱼', '吃肉'])
                ->insertAll($data, [], true),
            $connect
        )
    );
}
```

## insertAll 空数据批量写入示例

``` php
public function testInsertWithEmptyData(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "INSERT INTO `test_query` () VALUES (),(),(),()",
            [],
            false
        ]
        eot;

    $data = [
        [],
        [],
        [],
        [],
    ];

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test_query')
                ->insertAll($data),
            $connect
        )
    );
}
```

## insertAll.replace 空数据写入示例

``` php
public function testReplaceWithEmptyData(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "REPLACE INTO `test_query` () VALUES (),(),(),()",
            [],
            false
        ]
        eot;

    $data = [
        [],
        [],
        [],
        [],
    ];

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test_query')
                ->insertAll($data, [], true),
            $connect
        )
    );
}
```

## insertAll 支持 ON DUPLICATE KEY UPDATE 用法

``` php
public function testInsertAllSupportDuplicateKeyUpdate(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "INSERT INTO `test_query` (`test_query`.`name`,`test_query`.`value`) VALUES (:named_param_name,:named_param_value),(:named_param_name_1,:positional_param_0_1),(:named_param_name_2,:named_param_value_2),(:named_param_name_3,:positional_param_1_3) ON DUPLICATE KEY UPDATE `test_query`.`name` = VALUES(`test_query`.`name`),`test_query`.`value` = VALUES(`test_query`.`value`)",
            {
                "named_param_name": [
                    "小鸭子1"
                ],
                "named_param_value": [
                    "呱呱呱1"
                ],
                "named_param_name_1": [
                    "小鸭子2"
                ],
                "positional_param_0_1": [
                    "吃鱼"
                ],
                "named_param_name_2": [
                    "小鸭子3"
                ],
                "named_param_value_2": [
                    "呱呱呱3"
                ],
                "named_param_name_3": [
                    "小鸭子4"
                ],
                "positional_param_1_3": [
                    "吃肉"
                ]
            },
            false
        ]
        eot;

    $data = [
        ['name' => '小鸭子1', 'value' => '呱呱呱1'],
        ['name' => '小鸭子2', 'value' => Condition::raw('?')],
        ['name' => '小鸭子3', 'value' => '呱呱呱3'],
        ['name' => '小鸭子4', 'value' => Condition::raw('?')],
    ];

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->bind(['吃鱼', '吃肉'])
                ->insertAll($data, [], ['name', 'value']),
            $connect
        )
    );
}
```

## insertAll 支持 ON DUPLICATE KEY UPDATE 表达式用法

``` php
public function testInsertAllSupportDuplicateKeyUpdate2(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "INSERT INTO `test_query` (`test_query`.`name`,`test_query`.`value`) VALUES (:named_param_name,:named_param_value),(:named_param_name_1,:positional_param_0_1),(:named_param_name_2,:named_param_value_2),(:named_param_name_3,:positional_param_1_3) ON DUPLICATE KEY UPDATE `test_query`.`name` = (CONCAT(VALUES(`test_query`.`name`), 'lianjie', VALUES(`test_query`.`value`))),`test_query`.`value` = :value",
            {
                "value": [
                    5
                ],
                "named_param_name": [
                    "小鸭子1"
                ],
                "named_param_value": [
                    "呱呱呱1"
                ],
                "named_param_name_1": [
                    "小鸭子2"
                ],
                "positional_param_0_1": [
                    "吃鱼"
                ],
                "named_param_name_2": [
                    "小鸭子3"
                ],
                "named_param_value_2": [
                    "呱呱呱3"
                ],
                "named_param_name_3": [
                    "小鸭子4"
                ],
                "positional_param_1_3": [
                    "吃肉"
                ]
            },
            false
        ]
        eot;

    $data = [
        ['name' => '小鸭子1', 'value' => '呱呱呱1'],
        ['name' => '小鸭子2', 'value' => Condition::raw('?')],
        ['name' => '小鸭子3', 'value' => '呱呱呱3'],
        ['name' => '小鸭子4', 'value' => Condition::raw('?')],
    ];

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->bind(['吃鱼', '吃肉'])
                ->insertAll($data, [], [
                    'name' => Condition::raw("CONCAT(VALUES([name]), 'lianjie', VALUES([value]))"),
                    'value' => 5,
                ]),
            $connect
        )
    );
}
```