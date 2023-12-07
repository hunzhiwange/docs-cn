# 仓储

::: tip Testing Is Documentation
[tests/Database/Ddd/RepositoryTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Ddd/RepositoryTest.php)
:::

仓储层可以看作是对实体的一种包装，通过构造器注入的实体。

**Uses**

``` php
<?php

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\EntityCollection as Collection;
use Leevel\Database\Ddd\ISpecification;
use Leevel\Database\Ddd\Repository;
use Leevel\Database\Ddd\Select;
use Leevel\Database\Ddd\Specification;
use Leevel\Database\Page;
use Leevel\Kernel\Utils\Api;
use Leevel\Page\Page as BasePage;
use Tests\Database\DatabaseTestCase as TestCase;
use Tests\Database\Ddd\Entity\DemoUnique;
use Tests\Database\Ddd\Entity\Relation\Post;
```

## 基本使用方法

``` php
public function testBase(): void
{
    $connect = $this->createDatabaseConnect();

    static::assertSame(
        1,
        $connect
            ->table('post')
            ->insert([
                'title' => 'hello world',
                'user_id' => 1,
                'summary' => 'post summary',
                'delete_at' => 0,
            ])
    );

    $repository = new Repository(new Post());

    $newPost = $repository->findEntity(1);

    $this->assertInstanceof(Post::class, $newPost);
    static::assertSame(1, $newPost->id);
    static::assertSame(1, $newPost->userId);
    static::assertSame('hello world', $newPost->title);
    static::assertSame('post summary', $newPost->summary);
    $this->assertInstanceof(Post::class, $repository->entity());
}
```

## findEntity 通过主键查找实体

``` php
public function testFindEntity(): void
{
    $connect = $this->createDatabaseConnect();

    static::assertSame(
        1,
        $connect
            ->table('post')
            ->insert([
                'title' => 'hello world',
                'user_id' => 1,
                'summary' => 'post summary',
                'delete_at' => 0,
            ])
    );

    $repository = new Repository(new Post());

    $newPost = $repository->findEntity(1);

    $this->assertInstanceof(Post::class, $newPost);
    static::assertSame(1, $newPost->id);
    static::assertSame(1, $newPost->userId);
    static::assertSame('hello world', $newPost->title);
    static::assertSame('post summary', $newPost->summary);
}
```

## findOrFail 通过主键查找实体，未找到则抛出异常

``` php
public function testFindOrFail(): void
{
    $connect = $this->createDatabaseConnect();

    static::assertSame(
        1,
        $connect
            ->table('post')
            ->insert([
                'title' => 'hello world',
                'user_id' => 1,
                'summary' => 'post summary',
                'delete_at' => 0,
            ])
    );

    $repository = new Repository(new Post());

    $newPost = $repository->findOrFail(1);

    $this->assertInstanceof(Post::class, $newPost);
    static::assertSame(1, $newPost->id);
    static::assertSame(1, $newPost->userId);
    static::assertSame('hello world', $newPost->title);
    static::assertSame('post summary', $newPost->summary);
}
```

## findOrFail 通过主键查找实体，未找到则抛出异常例子

``` php
public function testFindOrFailNotFound(): void
{
    $this->expectException(\Leevel\Database\Ddd\EntityNotFoundException::class);
    $this->expectExceptionMessage(
        'Entity `Tests\\Database\\Ddd\\Entity\\Relation\\Post` was not found.'
    );

    $repository = new Repository(new Post());

    $newPost = $repository->findOrFail(1);
}
```

## 规约闭包查询

``` php
public function testSpecWithClosure(): void
{
    $connect = $this->createDatabaseConnect();

    for ($i = 0; $i < 10; ++$i) {
        $connect
            ->table('post')
            ->insert([
                'title' => 'hello world',
                'user_id' => 1,
                'summary' => 'post summary',
                'delete_at' => 0,
            ])
        ;
    }

    $request = ['foo' => 'bar', 'hello' => 'world'];

    $repository = new Repository(new Post());

    $spec = new Specification(function (Entity $entity) use ($request) {
        return 'bar' === $request['foo'];
    }, function (Select $select, Entity $entity): void {
        $select->where('id', '>', 3);
    });

    $andSpec = $spec->and(new Specification(function (Entity $entity) use ($request) {
        return 'world' === $request['hello'];
    }, function (Select $select, Entity $entity): void {
        $select->where('id', '<', 8);
    }));

    $this->assertInstanceof(ISpecification::class, $andSpec);
    $this->assertInstanceof(Specification::class, $andSpec);

    $select = $repository->condition($andSpec);
    $result = $select->findAll();

    $sql = <<<'eot'
        SQL: [126] SELECT `post`.* FROM `post` WHERE `post`.`delete_at` = :post_delete_at AND `post`.`id` > :post_id AND `post`.`id` < :post_id_1 | Params:  3 | Key: Name: [15] :post_delete_at | paramno=0 | name=[15] ":post_delete_at" | is_param=1 | param_type=1 | Key: Name: [8] :post_id | paramno=1 | name=[8] ":post_id" | is_param=1 | param_type=1 | Key: Name: [10] :post_id_1 | paramno=2 | name=[10] ":post_id_1" | is_param=1 | param_type=1 (SELECT `post`.* FROM `post` WHERE `post`.`delete_at` = 0 AND `post`.`id` > 3 AND `post`.`id` < 8)
        eot;
    static::assertSame(
        $sql,
        $select->getLastSql(),
    );

    $this->assertInstanceof(Select::class, $select);
    $this->assertInstanceof(Collection::class, $result);
    static::assertCount(4, $result);
}
```

## from 转换为标准规约查询

**fixture 定义**

**Tests\Database\Ddd\Demo1Specification**

``` php
namespace Tests\Database\Ddd;

class Demo1Specification extends Specification
{
    private $request;

    public function __construct(array $request)
    {
        $this->request = $request;
    }

    public function isSatisfiedBy(Entity $entity): bool
    {
        return 'bar' === $this->request['foo'];
    }

    public function handle(Select $select, Entity $entity): void
    {
        $select->where('id', '>', 3);
    }
}
```

**Tests\Database\Ddd\Demo2Specification**

``` php
namespace Tests\Database\Ddd;

class Demo2Specification extends Specification
{
    private $request;

    public function __construct(array $request)
    {
        $this->request = $request;
    }

    public function isSatisfiedBy(Entity $entity): bool
    {
        return 'world' === $this->request['hello'];
    }

    public function handle(Select $select, Entity $entity): void
    {
        $select->where('id', '<', 8);
    }
}
```

``` php
public function testSpecWithClass(): void
{
    $connect = $this->createDatabaseConnect();

    for ($i = 0; $i < 10; ++$i) {
        $connect
            ->table('post')
            ->insert([
                'title' => 'hello world',
                'user_id' => 1,
                'summary' => 'post summary',
                'delete_at' => 0,
            ])
        ;
    }

    $request = ['foo' => 'bar', 'hello' => 'world'];

    $repository = new Repository(new Post());
    $spec = Specification::from(new Demo1Specification($request));
    $spec->and(new Demo2Specification($request));

    $this->assertInstanceof(ISpecification::class, $spec);
    $this->assertInstanceof(Specification::class, $spec);

    $select = $repository->condition($spec);
    $result = $select->findAll();

    $sql = <<<'eot'
        SQL: [126] SELECT `post`.* FROM `post` WHERE `post`.`delete_at` = :post_delete_at AND `post`.`id` > :post_id AND `post`.`id` < :post_id_1 | Params:  3 | Key: Name: [15] :post_delete_at | paramno=0 | name=[15] ":post_delete_at" | is_param=1 | param_type=1 | Key: Name: [8] :post_id | paramno=1 | name=[8] ":post_id" | is_param=1 | param_type=1 | Key: Name: [10] :post_id_1 | paramno=2 | name=[10] ":post_id_1" | is_param=1 | param_type=1 (SELECT `post`.* FROM `post` WHERE `post`.`delete_at` = 0 AND `post`.`id` > 3 AND `post`.`id` < 8)
        eot;
    static::assertSame(
        $sql,
        $select->getLastSql(),
    );

    $this->assertInstanceof(Select::class, $select);
    $this->assertInstanceof(Collection::class, $result);
    static::assertCount(4, $result);
}
```

## not 规约反操作

``` php
public function testFindAllBySpecWithClosureForNot(): void
{
    $connect = $this->createDatabaseConnect();

    for ($i = 0; $i < 10; ++$i) {
        $connect
            ->table('post')
            ->insert([
                'title' => 'hello world',
                'user_id' => 1,
                'summary' => 'post summary',
                'delete_at' => 0,
            ])
        ;
    }

    $request = ['foo' => 'bar', 'hello' => 'world'];

    $repository = new Repository(new Post());

    $spec = new Specification(function (Entity $entity) use ($request) {
        return 'bar' === $request['foo'];
    }, function (Select $select, Entity $entity): void {
        $select->where('id', '>', 3);
    });

    $notSpec = $spec->not();

    $this->assertInstanceof(ISpecification::class, $notSpec);
    $this->assertInstanceof(Specification::class, $notSpec);

    $result = $repository->findAll($notSpec);

    $sql = <<<'eot'
        SQL: [70] SELECT `post`.* FROM `post` WHERE `post`.`delete_at` = :post_delete_at | Params:  1 | Key: Name: [15] :post_delete_at | paramno=0 | name=[15] ":post_delete_at" | is_param=1 | param_type=1 (SELECT `post`.* FROM `post` WHERE `post`.`delete_at` = 0)
        eot;
    static::assertSame(
        $sql,
        $repository->getLastSql(),
    );

    $this->assertInstanceof(Collection::class, $result);
    static::assertCount(10, $result);
}
```

## or 规约或操作

``` php
public function testSpecWithOrFirstIsNo(): void
{
    $connect = $this->createDatabaseConnect();

    for ($i = 0; $i < 10; ++$i) {
        $connect
            ->table('post')
            ->insert([
                'title' => 'hello world',
                'user_id' => 1,
                'summary' => 'post summary',
                'delete_at' => 0,
            ])
        ;
    }

    $request = ['foo' => 'bar', 'hello' => 'world'];

    $repository = new Repository(new Post());

    $spec = new Specification(function (Entity $entity) use ($request) {
        return 'bar_no' === $request['foo'];
    }, function (Select $select, Entity $entity): void {
        $select->where('id', '>', 3);
    });

    $orSpec = $spec->or(new Specification(function (Entity $entity) use ($request) {
        return 'world' === $request['hello'];
    }, function (Select $select, Entity $entity): void {
        $select->where('id', '<', 8);
    }));

    $this->assertInstanceof(ISpecification::class, $orSpec);
    $this->assertInstanceof(Specification::class, $orSpec);

    $select = $repository->condition($orSpec);
    $result = $select->findAll();

    $sql = <<<'eot'
        SQL: [97] SELECT `post`.* FROM `post` WHERE `post`.`delete_at` = :post_delete_at AND `post`.`id` < :post_id | Params:  2 | Key: Name: [15] :post_delete_at | paramno=0 | name=[15] ":post_delete_at" | is_param=1 | param_type=1 | Key: Name: [8] :post_id | paramno=1 | name=[8] ":post_id" | is_param=1 | param_type=1 (SELECT `post`.* FROM `post` WHERE `post`.`delete_at` = 0 AND `post`.`id` < 8)
        eot;
    static::assertSame(
        $sql,
        $select->getLastSql(),
    );

    $this->assertInstanceof(Select::class, $select);
    $this->assertInstanceof(Collection::class, $result);
    static::assertCount(7, $result);
}
```

## make 创建规约表达式

``` php
public function testSpecMake(): void
{
    $connect = $this->createDatabaseConnect();

    for ($i = 0; $i < 10; ++$i) {
        $connect
            ->table('post')
            ->insert([
                'title' => 'hello world',
                'user_id' => 1,
                'summary' => 'post summary',
                'delete_at' => 0,
            ])
        ;
    }

    $request = ['foo' => 'bar', 'hello' => 'world'];

    $repository = new Repository(new Post());

    $spec = Specification::make(function (Entity $entity) use ($request) {
        return 'bar' === $request['foo'];
    }, function (Select $select, Entity $entity): void {
        $select->where('id', '>', 4);
    });

    $select = $repository->condition($spec);
    $result = $select->findAll();

    $this->assertInstanceof(Select::class, $select);
    $this->assertInstanceof(Collection::class, $result);
    static::assertCount(6, $result);
}
```

## and 规约与操作

``` php
public function testFindCountWithAndFirstIsYes(): void
{
    $connect = $this->createDatabaseConnect();

    for ($i = 0; $i < 10; ++$i) {
        $connect
            ->table('post')
            ->insert([
                'title' => 'hello world',
                'user_id' => 1,
                'summary' => 'post summary',
                'delete_at' => 0,
            ])
        ;
    }

    $request = ['foo' => 'bar', 'hello' => 'world'];

    $repository = new Repository(new Post());

    $specExpr = new Specification(function (Entity $entity) use ($request) {
        return 'bar' === $request['foo'];
    }, function (Select $select, Entity $entity): void {
        $select->where('id', '>', 3);
    });

    $specExpr->and(new Specification(function (Entity $entity) use ($request) {
        return 'world' === $request['hello'];
    }, function (Select $select, Entity $entity): void {
        $select->where('id', '<', 6);
    }));

    $this->assertInstanceof(ISpecification::class, $specExpr);
    $this->assertInstanceof(Specification::class, $specExpr);

    $result = $repository->findCount($specExpr);

    static::assertSame(2, $result);
}
```

## __call 魔术方法访问实体查询

``` php
public function testCall(): void
{
    $connect = $this->createDatabaseConnect();

    static::assertSame(
        1,
        $connect
            ->table('post')
            ->insert([
                'title' => 'hello world',
                'user_id' => 1,
                'summary' => 'post summary',
                'delete_at' => 0,
            ])
    );

    $repository = new Repository(new Post());

    $newPost = $repository
        ->where('id', 5)
        ->findEntity(1)
    ;

    $this->assertInstanceof(Post::class, $newPost);
    static::assertNull($newPost->id);
    static::assertNull($newPost->userId);
    static::assertNull($newPost->title);
    static::assertNull($newPost->summary);
}
```

## createEntity 新增实体

``` php
public function testCreateTwice(): void
{
    $repository = new Repository(new Post());

    $repository->createEntity($post = new Post([
        'id' => 5,
        'title' => 'foo',
        'user_id' => 0,
    ]));

    static::assertSame('SQL: [129] INSERT INTO `post` (`post`.`id`,`post`.`title`,`post`.`user_id`) VALUES (:named_param_id,:named_param_title,:named_param_user_id) | Params:  3 | Key: Name: [15] :named_param_id | paramno=0 | name=[15] ":named_param_id" | is_param=1 | param_type=1 | Key: Name: [18] :named_param_title | paramno=1 | name=[18] ":named_param_title" | is_param=1 | param_type=2 | Key: Name: [20] :named_param_user_id | paramno=2 | name=[20] ":named_param_user_id" | is_param=1 | param_type=1 (INSERT INTO `post` (`post`.`id`,`post`.`title`,`post`.`user_id`) VALUES (5,\'foo\',0))', $repository->getLastSql());

    static::assertSame(5, $post->id);
    static::assertSame('foo', $post->title);
    static::assertSame(0, $post->userId);
    static::assertSame([], $post->changed());
    $repository->createEntity($post);
    static::assertSame('SQL: [31] INSERT INTO `post` () VALUES () | Params:  0 (INSERT INTO `post` () VALUES ())', $repository->getLastSql());

    $newPost = $repository->findEntity(5);

    $this->assertInstanceof(Post::class, $newPost);
    static::assertSame(5, $newPost->id);
    static::assertSame('foo', $newPost->title);

    $newPost = $repository->findEntity(6);

    $this->assertInstanceof(Post::class, $newPost);
    static::assertSame(6, $newPost->id);
    static::assertSame('', $newPost->title);
}
```

## updateEntity 更新实体

``` php
public function testUpdateTwiceAndDoNothing(): void
{
    $connect = $this->createDatabaseConnect();

    static::assertSame(
        1,
        $connect
            ->table('post')
            ->insert([
                'title' => 'hello world',
                'user_id' => 1,
                'summary' => 'post summary',
                'delete_at' => 0,
            ])
    );

    $repository = new Repository(new Post());
    static::assertSame(1, $repository->updateEntity($post = new Post(['id' => 1, 'title' => 'new title'])));

    static::assertSame('SQL: [90] UPDATE `post` SET `post`.`title` = :named_param_title WHERE `post`.`id` = :post_id LIMIT 1 | Params:  2 | Key: Name: [18] :named_param_title | paramno=0 | name=[18] ":named_param_title" | is_param=1 | param_type=2 | Key: Name: [8] :post_id | paramno=1 | name=[8] ":post_id" | is_param=1 | param_type=1 (UPDATE `post` SET `post`.`title` = \'new title\' WHERE `post`.`id` = 1 LIMIT 1)', $repository->getLastSql());
    static::assertSame([], $post->changed());
    static::assertNull($repository->updateEntity($post));
}
```

## replaceEntity 替换实体

``` php
public function testReplaceTwiceAndFindExistData(): void
{
    $connect = $this->createDatabaseConnect();

    static::assertSame(
        1,
        $connect
            ->table('post')
            ->insert([
                'title' => 'hello world',
                'user_id' => 1,
                'summary' => 'post summary',
                'delete_at' => 0,
            ])
    );

    $repository = new Repository(new Post());
    $affectedRow = $repository->replaceEntity($post = new Post([
        'id' => 1,
        'title' => 'new title',
        'user_id' => 1,
    ]));
    static::assertSame('SQL: [130] UPDATE `post` SET `post`.`title` = :named_param_title,`post`.`user_id` = :named_param_user_id WHERE `post`.`id` = :post_id LIMIT 1 | Params:  3 | Key: Name: [18] :named_param_title | paramno=0 | name=[18] ":named_param_title" | is_param=1 | param_type=2 | Key: Name: [20] :named_param_user_id | paramno=1 | name=[20] ":named_param_user_id" | is_param=1 | param_type=1 | Key: Name: [8] :post_id | paramno=2 | name=[8] ":post_id" | is_param=1 | param_type=1 (UPDATE `post` SET `post`.`title` = \'new title\',`post`.`user_id` = 1 WHERE `post`.`id` = 1 LIMIT 1)', $repository->getLastSql());

    static::assertSame(1, $affectedRow);
    static::assertSame([], $post->changed());

    $repository->replaceEntity($post); // 新增一条数据.
    static::assertSame('SQL: [31] INSERT INTO `post` () VALUES () | Params:  0 (INSERT INTO `post` () VALUES ())', $repository->getLastSql());

    $updatedPost = $repository->findEntity(1);
    static::assertSame(1, $updatedPost->id);
    static::assertSame('new title', $updatedPost->title);
    static::assertSame(1, $updatedPost->userId);
    static::assertSame('post summary', $updatedPost->summary);

    $newPost2 = $repository->findEntity(2);

    $this->assertInstanceof(Post::class, $newPost2);
    static::assertSame(2, $newPost2->id);
    static::assertSame('', $newPost2->title);
    static::assertSame('', $newPost2->summary);
}
```

## deleteEntity 响应删除

``` php
public function testSoftDeleteTwice(): void
{
    $connect = $this->createDatabaseConnect();

    static::assertSame(
        1,
        $connect
            ->table('post')
            ->insert([
                'title' => 'hello world',
                'user_id' => 1,
                'summary' => 'post summary',
                'delete_at' => 0,
            ])
    );

    $repository = new Repository(new Post());

    $repository->deleteEntity($post = new Post(['id' => 1, 'title' => 'new title']));
    $sql = 'SQL: [98] UPDATE `post` SET `post`.`delete_at` = :named_param_delete_at WHERE `post`.`id` = :post_id LIMIT 1 | Params:  2 | Key: Name: [22] :named_param_delete_at | paramno=0 | name=[22] ":named_param_delete_at" | is_param=1 | param_type=1 | Key: Name: [8] :post_id | paramno=1 | name=[8] ":post_id" | is_param=1 | param_type=1 (UPDATE `post` SET `post`.`delete_at` = %d WHERE `post`.`id` = 1 LIMIT 1)';
    static::assertTrue(\in_array($repository->getLastSql(), [
        sprintf($sql, time() - 1),
        sprintf($sql, time()),
        sprintf($sql, time() + 1),
    ], true));

    $repository->deleteEntity($post); // 将会更新 `delete_at` 字段.
    $sql = 'SQL: [98] UPDATE `post` SET `post`.`delete_at` = :named_param_delete_at WHERE `post`.`id` = :post_id LIMIT 1 | Params:  2 | Key: Name: [22] :named_param_delete_at | paramno=0 | name=[22] ":named_param_delete_at" | is_param=1 | param_type=1 | Key: Name: [8] :post_id | paramno=1 | name=[8] ":post_id" | is_param=1 | param_type=1 (UPDATE `post` SET `post`.`delete_at` = %d WHERE `post`.`id` = 1 LIMIT 1)';
    static::assertTrue(\in_array($repository->getLastSql(), [
        sprintf($sql, time() - 1),
        sprintf($sql, time()),
        sprintf($sql, time() + 1),
    ], true));

    $newPost = $repository->findEntity(1);

    $this->assertInstanceof(Post::class, $newPost);
    static::assertNull($newPost->id);
    static::assertNull($newPost->userId);
    static::assertNull($newPost->title);
    static::assertNull($newPost->summary);
}
```

## forceDeleteEntity 强制删除实体

``` php
public function testForceDeleteTwice(): void
{
    $connect = $this->createDatabaseConnect();

    static::assertSame(
        1,
        $connect
            ->table('post')
            ->insert([
                'title' => 'hello world',
                'user_id' => 1,
                'summary' => 'post summary',
                'delete_at' => 0,
            ])
    );

    $repository = new Repository(new Post());

    $repository->forceDeleteEntity($post = new Post(['id' => 1, 'title' => 'new title']));
    static::assertSame('SQL: [55] DELETE FROM `post` WHERE `post`.`id` = :post_id LIMIT 1 | Params:  1 | Key: Name: [8] :post_id | paramno=0 | name=[8] ":post_id" | is_param=1 | param_type=1 (DELETE FROM `post` WHERE `post`.`id` = 1 LIMIT 1)', $repository->getLastSql());
    $repository->forceDeleteEntity($post); // 会执行 SQL，因为已经删除，没有任何影响.
    static::assertSame('SQL: [55] DELETE FROM `post` WHERE `post`.`id` = :post_id LIMIT 1 | Params:  1 | Key: Name: [8] :post_id | paramno=0 | name=[8] ":post_id" | is_param=1 | param_type=1 (DELETE FROM `post` WHERE `post`.`id` = 1 LIMIT 1)', $repository->getLastSql());
    $newPost = $repository->findEntity(1);

    $this->assertInstanceof(Post::class, $newPost);
    static::assertNull($newPost->id);
    static::assertNull($newPost->userId);
    static::assertNull($newPost->title);
    static::assertNull($newPost->summary);
}
```

## condition 条件查询器支持闭包

``` php
public function testConditionIsClosure(): void
{
    $connect = $this->createDatabaseConnect();

    for ($i = 0; $i < 10; ++$i) {
        $connect
            ->table('post')
            ->insert([
                'title' => 'hello world',
                'user_id' => 1,
                'summary' => 'post summary',
                'delete_at' => 0,
            ])
        ;
    }

    $request = ['foo' => 'no-bar', 'hello' => 'no-world'];

    $repository = new Repository(new Post());

    $condition = function (Select $select, Entity $entity): void {
        $select->where('id', '<', 8);
    };

    $select = $repository->condition($condition);
    $result = $select->findAll();

    $this->assertInstanceof(Select::class, $select);
    $this->assertInstanceof(Collection::class, $result);
    static::assertCount(7, $result);
}
```

## findPage 分页查询

``` php
public function testFindPage(): void
{
    $connect = $this->createDatabaseConnect();

    for ($i = 0; $i < 10; ++$i) {
        $connect
            ->table('post')
            ->insert([
                'title' => 'hello world',
                'user_id' => 1,
                'summary' => 'post summary',
                'delete_at' => 0,
            ])
        ;
    }

    $repository = new Repository(new Post());

    $page = $repository->findPage(1, 10);
    $result = $page->getData();

    $this->assertInstanceof(BasePage::class, $page);
    $this->assertInstanceof(Page::class, $page);
    $this->assertInstanceof(Collection::class, $result);
    static::assertCount(10, $result);
}
```

## findPage 分页查询支持条件过滤

``` php
public function testFindPageWithCondition(): void
{
    $connect = $this->createDatabaseConnect();

    for ($i = 0; $i < 10; ++$i) {
        $connect
            ->table('post')
            ->insert([
                'title' => 'hello world',
                'user_id' => 1,
                'summary' => 'post summary',
                'delete_at' => 0,
            ])
        ;
    }

    $request = ['foo' => 'no-bar', 'hello' => 'no-world'];

    $repository = new Repository(new Post());

    $condition = function (Select $select, Entity $entity): void {
        $select->where('id', '<', 8);
    };

    $page = $repository->findPage(1, 10, $condition);
    $result = $page->getData();

    $this->assertInstanceof(BasePage::class, $page);
    $this->assertInstanceof(Page::class, $page);
    $this->assertInstanceof(Collection::class, $result);
    static::assertCount(7, $result);
}
```

## findPageMacro 创建一个无限数据的分页查询

``` php
public function testFindPageMacro(): void
{
    $connect = $this->createDatabaseConnect();

    for ($i = 0; $i < 10; ++$i) {
        $connect
            ->table('post')
            ->insert([
                'title' => 'hello world',
                'user_id' => 1,
                'summary' => 'post summary',
                'delete_at' => 0,
            ])
        ;
    }

    $repository = new Repository(new Post());

    $page = $repository->findPageMacro(1, 10);
    $result = $page->getData();

    $this->assertInstanceof(BasePage::class, $page);
    $this->assertInstanceof(Page::class, $page);
    $this->assertInstanceof(Collection::class, $result);
    static::assertCount(10, $result);
}
```

## findPageMacro 创建一个无限数据的分页查询支持条件过滤

``` php
public function testFindPageMacroWithCondition(): void
{
    $connect = $this->createDatabaseConnect();

    for ($i = 0; $i < 10; ++$i) {
        $connect
            ->table('post')
            ->insert([
                'title' => 'hello world',
                'user_id' => 1,
                'summary' => 'post summary',
                'delete_at' => 0,
            ])
        ;
    }

    $request = ['foo' => 'no-bar', 'hello' => 'no-world'];

    $repository = new Repository(new Post());

    $condition = function (Select $select, Entity $entity): void {
        $select->where('id', '<', 8);
    };

    $page = $repository->findPageMacro(1, 10, $condition);
    $result = $page->getData();

    $this->assertInstanceof(BasePage::class, $page);
    $this->assertInstanceof(Page::class, $page);
    $this->assertInstanceof(Collection::class, $result);
    static::assertCount(7, $result);
}
```

## findPagePrevNext 创建一个只有上下页的分页查询

``` php
public function testFindPagePrevNext(): void
{
    $connect = $this->createDatabaseConnect();

    for ($i = 0; $i < 10; ++$i) {
        $connect
            ->table('post')
            ->insert([
                'title' => 'hello world',
                'user_id' => 1,
                'summary' => 'post summary',
                'delete_at' => 0,
            ])
        ;
    }

    $repository = new Repository(new Post());

    $page = $repository->findPagePrevNext(1, 10);
    $result = $page->getData();

    $this->assertInstanceof(BasePage::class, $page);
    $this->assertInstanceof(Page::class, $page);
    $this->assertInstanceof(Collection::class, $result);
    static::assertCount(10, $result);
}
```

## findPagePrevNext 创建一个只有上下页的分页查询支持条件过滤

``` php
public function testFindPagePrevNextWithCondition(): void
{
    $connect = $this->createDatabaseConnect();

    for ($i = 0; $i < 10; ++$i) {
        $connect
            ->table('post')
            ->insert([
                'title' => 'hello world',
                'user_id' => 1,
                'summary' => 'post summary',
                'delete_at' => 0,
            ])
        ;
    }

    $request = ['foo' => 'no-bar', 'hello' => 'no-world'];

    $repository = new Repository(new Post());

    $condition = function (Select $select, Entity $entity): void {
        $select->where('id', '<', 8);
    };

    $page = $repository->findPagePrevNext(1, 10, $condition);
    $result = $page->getData();

    $this->assertInstanceof(BasePage::class, $page);
    $this->assertInstanceof(Page::class, $page);
    $this->assertInstanceof(Collection::class, $result);
    static::assertCount(7, $result);
}
```

## findList 返回一列数据

``` php
public function testFindList(): void
{
    $connect = $this->createDatabaseConnect();

    for ($i = 0; $i < 10; ++$i) {
        $connect
            ->table('post')
            ->insert([
                'title' => 'hello world'.$i,
                'user_id' => 1,
                'summary' => 'post summary',
                'delete_at' => 0,
            ])
        ;
    }

    $repository = new Repository(new Post());

    $result = $repository->findList(null, 'summary', 'title');

    static::assertIsArray($result);

    $data = <<<'eot'
        {
            "hello world0": "post summary",
            "hello world1": "post summary",
            "hello world2": "post summary",
            "hello world3": "post summary",
            "hello world4": "post summary",
            "hello world5": "post summary",
            "hello world6": "post summary",
            "hello world7": "post summary",
            "hello world8": "post summary",
            "hello world9": "post summary"
        }
        eot;

    static::assertSame(
        $data,
        $this->varJson(
            $result
        )
    );
}
```

## findList 返回一列数据支持条件过滤

``` php
public function testFindListWithCondition(): void
{
    $connect = $this->createDatabaseConnect();

    for ($i = 0; $i < 10; ++$i) {
        $connect
            ->table('post')
            ->insert([
                'title' => 'hello world'.$i,
                'user_id' => 1,
                'summary' => 'post summary',
                'delete_at' => 0,
            ])
        ;
    }

    $repository = new Repository(new Post());

    $result = $repository->findList(function (Select $select): void {
        $select->where('id', '>', 5);
    }, ['summary', 'title']);

    static::assertIsArray($result);

    $data = <<<'eot'
        {
            "hello world5": "post summary",
            "hello world6": "post summary",
            "hello world7": "post summary",
            "hello world8": "post summary",
            "hello world9": "post summary"
        }
        eot;

    static::assertSame(
        $data,
        $this->varJson(
            $result
        )
    );
}
```