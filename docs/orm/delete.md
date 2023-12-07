# 删除实体

::: tip Testing Is Documentation
[tests/Database/Ddd/Delete/DeleteTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Ddd/Delete/DeleteTest.php)
:::

将实体从数据库中删除。

**Uses**

``` php
<?php

use Leevel\Database\Ddd\Entity;
use Leevel\Kernel\Utils\Api;
use Tests\Database\DatabaseTestCase as TestCase;
use Tests\Database\Ddd\Entity\CompositeId;
use Tests\Database\Ddd\Entity\DemoEntity;
use Tests\Database\Ddd\Entity\EntityWithoutPrimaryKey;
use Tests\Database\Ddd\Entity\Relation\Post;
use Tests\Database\Ddd\Entity\Relation\PostContent;
use Tests\Database\Ddd\Entity\SoftDeleteNotFoundDeleteAtField;
```

## delete 删除一个实体

**完整例子**

``` php
$entity = new DemoEntity(['id' => 5]);
$entity->delete()->flush();
```

调用 `delete` 方法并没有立刻真正持久化到数据库，这一个步骤计算好了待删除的数据。

**完整模型**

``` php
namespace Tests\Database\Ddd\Entity;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\Struct;

class DemoEntity extends Entity
{
    public const TABLE = 'test';

    public const ID = 'id';

    public const AUTO = 'id';

    #[Struct([
        self::READONLY => true,
    ])]
    protected ?int $id = null;

    #[Struct([
    ])]
    protected ?string $name = null;
}
```

``` php
public function testBaseUse(): void
{
    $entity = new DemoEntity(['id' => 5, 'name' => 'foo']);

    $this->assertInstanceof(Entity::class, $entity);
    static::assertSame('foo', $entity->name);
    static::assertSame(['id', 'name'], $entity->changed());
    static::assertNull($entity->flushData());

    $entity->delete();

    $data = <<<'eot'
        [
            {
                "id": 5
            }
        ]
        eot;

    static::assertSame(
        $data,
        $this->varJson(
            $entity->flushData()
        )
    );

    $entity->flush();
}
```

::: tip
通过 delete 方法删除一个实体，并通过 flush 将实体持久化到数据库。
:::

## softDelete 软删除一个实体

**完整模型**

``` php
namespace Tests\Database\Ddd\Entity\Relation;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\EntityCollection as Collection;
use Leevel\Database\Ddd\Relation\Relation;
use Leevel\Database\Ddd\Struct;

class Post extends Entity
{
    public const TABLE = 'post';

    public const ID = 'id';

    public const AUTO = 'id';

    public const DELETE_AT = 'delete_at';

    #[Struct([
        self::READONLY => true,
    ])]
    protected ?int $id = null;

    #[Struct([
    ])]
    protected ?string $title = null;

    #[Struct([
    ])]
    protected ?int $userId = null;

    #[Struct([
    ])]
    protected ?string $summary = null;

    #[Struct([
    ])]
    protected ?string $createAt = null;

    #[Struct([
        self::CREATE_FILL => 0,
    ])]
    protected ?int $deleteAt = null;

    #[Struct([
        self::BELONGS_TO => User::class,
        self::SOURCE_KEY => 'user_id',
        self::TARGET_KEY => 'id',
    ])]
    protected ?User $user = null;

    #[Struct([
        self::HAS_MANY => Comment::class,
        self::SOURCE_KEY => 'id',
        self::TARGET_KEY => 'post_id',
        self::RELATION_SCOPE => 'comment',
    ])]
    protected ?Collection $comment = null;

    #[Struct([
        self::HAS_ONE => PostContent::class,
        self::SOURCE_KEY => 'id',
        self::TARGET_KEY => 'post_id',
    ])]
    protected ?PostContent $postContent = null;

    #[Struct([
        self::BELONGS_TO => User::class,
        self::TARGET_KEY => 'id',
    ])]
    protected ?int $userNotDefinedSourceKey = null;

    #[Struct([
        self::BELONGS_TO => User::class,
        self::SOURCE_KEY => 'id',
    ])]
    protected ?int $userNotDefinedTargetKey = null;

    #[Struct([
        self::HAS_MANY => Comment::class,
        self::TARGET_KEY => 'post_id',
        self::RELATION_SCOPE => 'comment',
    ])]
    protected ?int $commentNotDefinedSourceKey = null;

    #[Struct([
        self::HAS_MANY => Comment::class,
        self::SOURCE_KEY => 'id',
        self::RELATION_SCOPE => 'comment',
    ])]
    protected ?int $commentNotDefinedTargetKey = null;

    #[Struct([
        self::HAS_ONE => PostContent::class,
        self::TARGET_KEY => 'post_id',
    ])]
    protected ?int $postContentNotDefinedSourceKey = null;

    #[Struct([
        self::HAS_ONE => PostContent::class,
        self::SOURCE_KEY => 'id',
    ])]
    protected ?int $postContentNotDefinedTargetKey = null;

    protected function relationScopeComment(Relation $relation): void
    {
        $relation->where('id', '>', 4);
    }
}
```

``` php
public function testSoftDelete(): void
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

    static::assertSame(
        2,
        $connect
            ->table('post')
            ->insert([
                'title' => 'hello world',
                'user_id' => 1,
                'summary' => 'post summary',
                'delete_at' => 0,
            ])
    );

    $post = Post::select()->findEntity(1);

    $this->assertInstanceof(Post::class, $post);
    static::assertSame(1, $post->userId);
    static::assertSame('hello world', $post->title);
    static::assertSame('post summary', $post->summary);
    static::assertSame(0, $post->delete_at);

    static::assertFalse($post->softDeleted());
    $post->softDelete()->flush();
    static::assertTrue($post->softDeleted());

    $post1 = Post::withSoftDeleted()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    static::assertSame(1, $post1->userId);
    static::assertSame('hello world', $post1->title);
    static::assertSame('post summary', $post1->summary);
    static::assertSame(date('Y-m'), date('Y-m', $post1->delete_at));

    $post2 = Post::select()->findEntity(2);
    $this->assertInstanceof(Post::class, $post2);
    static::assertSame(1, $post2->userId);
    static::assertSame('hello world', $post2->title);
    static::assertSame('post summary', $post2->summary);
    static::assertSame(0, $post2->delete_at);

    $post1 = Post::select()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    static::assertNull($post1->userId);
    static::assertNull($post1->title);
    static::assertNull($post1->summary);
    static::assertNull($post1->delete_at);
}
```

## softDestroy 根据主键 ID 软删除实体

``` php
public function testSoftDestroy(): void
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

    static::assertSame(
        2,
        $connect
            ->table('post')
            ->insert([
                'title' => 'hello world',
                'user_id' => 1,
                'summary' => 'post summary',
                'delete_at' => 0,
            ])
    );

    $post = Post::select()->findEntity(1);

    $this->assertInstanceof(Post::class, $post);
    static::assertSame(1, $post->userId);
    static::assertSame('hello world', $post->title);
    static::assertSame('post summary', $post->summary);
    static::assertSame(0, $post->delete_at);

    static::assertFalse($post->softDeleted());
    static::assertSame(1, Post::softDestroy([1]));
    static::assertFalse($post->softDeleted());

    $post1 = Post::withSoftDeleted()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    static::assertSame(1, $post1->userId);
    static::assertSame('hello world', $post1->title);
    static::assertSame('post summary', $post1->summary);
    static::assertSame(date('Y-m'), date('Y-m', $post1->delete_at));

    $post2 = Post::select()->findEntity(2);
    $this->assertInstanceof(Post::class, $post2);
    static::assertSame(1, $post2->userId);
    static::assertSame('hello world', $post2->title);
    static::assertSame('post summary', $post2->summary);
    static::assertSame(0, $post2->delete_at);

    $post1 = Post::select()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    static::assertNull($post1->userId);
    static::assertNull($post1->title);
    static::assertNull($post1->summary);
    static::assertNull($post1->delete_at);
}
```

## destroy 根据主键 ID 删除实体

``` php
public function testDestroy(): void
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

    static::assertSame(
        2,
        $connect
            ->table('post')
            ->insert([
                'title' => 'hello world',
                'user_id' => 1,
                'summary' => 'post summary',
                'delete_at' => 0,
            ])
    );

    $post = Post::select()->findEntity(1);

    $this->assertInstanceof(Post::class, $post);
    static::assertSame(1, $post->userId);
    static::assertSame('hello world', $post->title);
    static::assertSame('post summary', $post->summary);
    static::assertSame(0, $post->delete_at);

    Post::destroy([1]);

    $post1 = Post::withSoftDeleted()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    static::assertSame(1, $post1->userId);
    static::assertSame('hello world', $post1->title);
    static::assertSame('post summary', $post1->summary);
    static::assertSame(date('Y-m'), date('Y-m', $post1->delete_at));

    $post2 = Post::select()->findEntity(2);
    $this->assertInstanceof(Post::class, $post2);
    static::assertSame(1, $post2->userId);
    static::assertSame('hello world', $post2->title);
    static::assertSame('post summary', $post2->summary);
    static::assertSame(0, $post2->delete_at);

    $post1 = Post::select()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    static::assertNull($post1->userId);
    static::assertNull($post1->title);
    static::assertNull($post1->summary);
    static::assertNull($post1->delete_at);
}
```

## forceDestroy 根据主键 ID 强制删除实体

``` php
public function testForceDestroy(): void
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

    static::assertSame(
        2,
        $connect
            ->table('post')
            ->insert([
                'title' => 'hello world',
                'user_id' => 1,
                'summary' => 'post summary',
                'delete_at' => 0,
            ])
    );

    $post = Post::select()->findEntity(1);

    $this->assertInstanceof(Post::class, $post);
    static::assertSame(1, $post->userId);
    static::assertSame('hello world', $post->title);
    static::assertSame('post summary', $post->summary);
    static::assertSame(0, $post->delete_at);

    Post::forceDestroy([1]);

    $post1 = Post::withSoftDeleted()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    static::assertNull($post1->userId);
    static::assertNull($post1->title);
    static::assertNull($post1->summary);
    static::assertNull($post1->delete_at);

    $post2 = Post::select()->findEntity(2);
    $this->assertInstanceof(Post::class, $post2);
    static::assertSame(1, $post2->userId);
    static::assertSame('hello world', $post2->title);
    static::assertSame('post summary', $post2->summary);
    static::assertSame(0, $post2->delete_at);

    $post1 = Post::select()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    static::assertNull($post1->userId);
    static::assertNull($post1->title);
    static::assertNull($post1->summary);
    static::assertNull($post1->delete_at);
}
```

## softRestore 恢复软删除的实体

``` php
public function testSoftRestore(): void
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

    static::assertSame(
        2,
        $connect
            ->table('post')
            ->insert([
                'title' => 'hello world',
                'user_id' => 1,
                'summary' => 'post summary',
                'delete_at' => 0,
            ])
    );

    $post = Post::select()->findEntity(1);

    $this->assertInstanceof(Post::class, $post);
    static::assertSame(1, $post->userId);
    static::assertSame('hello world', $post->title);
    static::assertSame('post summary', $post->summary);
    static::assertSame(0, $post->delete_at);

    static::assertFalse($post->softDeleted());
    $post->softDelete()->flush();
    static::assertTrue($post->softDeleted());

    $post1 = Post::select()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    static::assertNull($post1->userId);
    static::assertNull($post1->title);
    static::assertNull($post1->summary);
    static::assertNull($post1->delete_at);

    $post1 = Post::withSoftDeleted()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    static::assertSame(1, $post1->userId);
    static::assertSame('hello world', $post1->title);
    static::assertSame('post summary', $post1->summary);
    static::assertSame(date('Y-m'), date('Y-m', $post1->delete_at));

    $post2 = Post::select()->findEntity(2);
    $this->assertInstanceof(Post::class, $post2);
    static::assertSame(1, $post2->userId);
    static::assertSame('hello world', $post2->title);
    static::assertSame('post summary', $post2->summary);
    static::assertSame(0, $post2->delete_at);

    $newPost = Post::withSoftDeleted()->findEntity(1);
    static::assertTrue($newPost->softDeleted());
    $newPost->softRestore()->flush();
    static::assertFalse($newPost->softDeleted());

    $restorePost1 = Post::select()->findEntity(1);
    static::assertSame(0, $restorePost1->delete_at);

    $post1 = Post::withSoftDeleted()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    static::assertSame(1, $post1->userId);
    static::assertSame('hello world', $post1->title);
    static::assertSame('post summary', $post1->summary);
    static::assertSame(0, $post1->delete_at);
}
```

## delete 删除实体

``` php
public function testDelete(): void
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

    static::assertSame(
        2,
        $connect
            ->table('post')
            ->insert([
                'title' => 'hello world',
                'user_id' => 1,
                'summary' => 'post summary',
                'delete_at' => 0,
            ])
    );

    $post = Post::select()->findEntity(1);

    $this->assertInstanceof(Post::class, $post);
    static::assertSame(1, $post->userId);
    static::assertSame('hello world', $post->title);
    static::assertSame('post summary', $post->summary);
    static::assertSame(0, $post->delete_at);

    static::assertFalse($post->softDeleted());
    $post->delete()->flush();
    $sql1 = 'SQL: [98] UPDATE `post` SET `post`.`delete_at` = :named_param_delete_at WHERE `post`.`id` = :post_id LIMIT 1 | Params:  2 | Key: Name: [22] :named_param_delete_at | paramno=0 | name=[22] ":named_param_delete_at" | is_param=1 | param_type=1 | Key: Name: [8] :post_id | paramno=1 | name=[8] ":post_id" | is_param=1 | param_type=1 (UPDATE `post` SET `post`.`delete_at` = ';
    $sql2 = ' WHERE `post`.`id` = 1 LIMIT 1)';
    $time = time();
    static::assertTrue(str_contains(Post::select()->getLastSql(), $sql1));
    static::assertTrue(str_contains(Post::select()->getLastSql(), $sql2));
    static::assertTrue($post->softDeleted());

    $post1 = Post::withSoftDeleted()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    static::assertSame(1, $post1->userId);
    static::assertSame('hello world', $post1->title);
    static::assertSame('post summary', $post1->summary);
    static::assertSame(date('Y-m'), date('Y-m', $post1->delete_at));

    $post2 = Post::select()->findEntity(2);
    $this->assertInstanceof(Post::class, $post2);
    static::assertSame(1, $post2->userId);
    static::assertSame('hello world', $post2->title);
    static::assertSame('post summary', $post2->summary);
    static::assertSame(0, $post2->delete_at);

    $post1 = Post::select()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    static::assertNull($post1->userId);
    static::assertNull($post1->title);
    static::assertNull($post1->summary);
    static::assertNull($post1->delete_at);
}
```

## delete.condition 删除实体配合设置扩展查询条件

``` php
public function testDeleteWithCondition(): void
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

    static::assertSame(
        2,
        $connect
            ->table('post')
            ->insert([
                'title' => 'hello world',
                'user_id' => 1,
                'summary' => 'post summary',
                'delete_at' => 0,
            ])
    );

    $post = Post::select()->findEntity(1);

    $this->assertInstanceof(Post::class, $post);
    static::assertSame(1, $post->userId);
    static::assertSame('hello world', $post->title);
    static::assertSame('post summary', $post->summary);
    static::assertSame(0, $post->delete_at);

    static::assertFalse($post->softDeleted());
    $post->condition(['user_id' => 99999])->delete()->flush();
    $sql1 = 'SQL: [135] UPDATE `post` SET `post`.`delete_at` = :named_param_delete_at WHERE `post`.`user_id` = :post_user_id AND `post`.`id` = :post_id LIMIT 1 | Params:  3 | Key: Name: [22] :named_param_delete_at | paramno=0 | name=[22] ":named_param_delete_at" | is_param=1 | param_type=1 | Key: Name: [13] :post_user_id | paramno=1 | name=[13] ":post_user_id" | is_param=1 | param_type=1 | Key: Name: [8] :post_id | paramno=2 | name=[8] ":post_id" | is_param=1 | param_type=1 (UPDATE `post` SET `post`.`delete_at` = ';
    $sql2 = ' WHERE `post`.`user_id` = 99999 AND `post`.`id` = 1 LIMIT 1)';
    $time = time();
    static::assertTrue(str_contains(Post::select()->getLastSql(), $sql1));
    static::assertTrue(str_contains(Post::select()->getLastSql(), $sql2));
    static::assertTrue($post->softDeleted());

    $post1 = Post::withSoftDeleted()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    static::assertSame(1, $post1->userId);
    static::assertSame('hello world', $post1->title);
    static::assertSame('post summary', $post1->summary);
    static::assertSame(0, $post1->delete_at);

    $post2 = Post::select()->findEntity(2);
    $this->assertInstanceof(Post::class, $post2);
    static::assertSame(1, $post2->userId);
    static::assertSame('hello world', $post2->title);
    static::assertSame('post summary', $post2->summary);
    static::assertSame(0, $post2->delete_at);

    $post1 = Post::select()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    static::assertSame(1, $post1->userId);
    static::assertSame('hello world', $post1->title);
    static::assertSame('post summary', $post1->summary);
    static::assertSame(0, $post1->delete_at);
}
```

## delete 复合主键删除实体

``` php
public function testDeleteForCompositeId(): void
{
    $connect = $this->createDatabaseConnect();

    static::assertSame(
        1,
        $connect
            ->table('composite_id')
            ->insert([
                'id1' => 1,
                'id2' => 2,
                'name' => 'hello liu',
            ])
    );

    $entity = CompositeId::select()->where(['id1' => 1, 'id2' => 2])->findOne();

    $this->assertInstanceof(CompositeId::class, $entity);
    static::assertSame(1, $entity->id1);
    static::assertSame(2, $entity->id2);
    static::assertSame('hello liu', $entity->name);

    $entity->delete()->flush();

    $entity = CompositeId::select()->where(['id1' => 1, 'id2' => 2])->findOne();

    $this->assertInstanceof(CompositeId::class, $entity);
    static::assertNull($entity->id1);
    static::assertNull($entity->id2);
    static::assertNull($entity->name);
}
```

## forceDelete 强制删除实体

``` php
public function testForceDelete(): void
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

    static::assertSame(
        2,
        $connect
            ->table('post')
            ->insert([
                'title' => 'hello world',
                'user_id' => 1,
                'summary' => 'post summary',
                'delete_at' => 0,
            ])
    );

    $post = Post::select()->findEntity(1);

    $this->assertInstanceof(Post::class, $post);
    static::assertSame(1, $post->userId);
    static::assertSame('hello world', $post->title);
    static::assertSame('post summary', $post->summary);
    static::assertSame(0, $post->delete_at);

    static::assertFalse($post->softDeleted());
    $post->forceDelete()->flush();
    static::assertSame('SQL: [55] DELETE FROM `post` WHERE `post`.`id` = :post_id LIMIT 1 | Params:  1 | Key: Name: [8] :post_id | paramno=0 | name=[8] ":post_id" | is_param=1 | param_type=1 (DELETE FROM `post` WHERE `post`.`id` = 1 LIMIT 1)', Post::select()->getLastSql());
    static::assertFalse($post->softDeleted());

    $post1 = Post::withSoftDeleted()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    static::assertNull($post1->userId);
    static::assertNull($post1->title);
    static::assertNull($post1->summary);
    static::assertNull($post1->delete_at);

    $post2 = Post::select()->findEntity(2);
    $this->assertInstanceof(Post::class, $post2);
    static::assertSame(1, $post2->userId);
    static::assertSame('hello world', $post2->title);
    static::assertSame('post summary', $post2->summary);
    static::assertSame(0, $post2->delete_at);

    $post1 = Post::select()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    static::assertNull($post1->userId);
    static::assertNull($post1->title);
    static::assertNull($post1->summary);
    static::assertNull($post1->delete_at);
}
```

## forceDelete.condition 强制删除实体配合设置扩展查询条件

``` php
public function testForceDeleteWithCondition(): void
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

    static::assertSame(
        2,
        $connect
            ->table('post')
            ->insert([
                'title' => 'hello world',
                'user_id' => 1,
                'summary' => 'post summary',
                'delete_at' => 0,
            ])
    );

    $post = Post::select()->findEntity(1);

    $this->assertInstanceof(Post::class, $post);
    static::assertSame(1, $post->userId);
    static::assertSame('hello world', $post->title);
    static::assertSame('post summary', $post->summary);
    static::assertSame(0, $post->delete_at);

    static::assertFalse($post->softDeleted());
    $post->condition(['user_id' => 99999])->forceDelete()->flush();
    static::assertSame('SQL: [92] DELETE FROM `post` WHERE `post`.`user_id` = :post_user_id AND `post`.`id` = :post_id LIMIT 1 | Params:  2 | Key: Name: [13] :post_user_id | paramno=0 | name=[13] ":post_user_id" | is_param=1 | param_type=1 | Key: Name: [8] :post_id | paramno=1 | name=[8] ":post_id" | is_param=1 | param_type=1 (DELETE FROM `post` WHERE `post`.`user_id` = 99999 AND `post`.`id` = 1 LIMIT 1)', Post::select()->getLastSql());
    static::assertFalse($post->softDeleted());

    $post1 = Post::withSoftDeleted()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    static::assertSame(1, $post1->userId);
    static::assertSame('hello world', $post1->title);
    static::assertSame('post summary', $post1->summary);
    static::assertSame(0, $post1->delete_at);

    $post2 = Post::select()->findEntity(2);
    $this->assertInstanceof(Post::class, $post2);
    static::assertSame(1, $post2->userId);
    static::assertSame('hello world', $post2->title);
    static::assertSame('post summary', $post2->summary);
    static::assertSame(0, $post2->delete_at);

    $post1 = Post::select()->findEntity(1);
    $this->assertInstanceof(Post::class, $post1);
    static::assertSame(1, $post1->userId);
    static::assertSame('hello world', $post1->title);
    static::assertSame('post summary', $post1->summary);
    static::assertSame(0, $post1->delete_at);
}
```