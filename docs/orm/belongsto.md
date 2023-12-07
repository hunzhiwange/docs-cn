# belongsTo 从属关联

::: tip Testing Is Documentation
[tests/Database/Ddd/Relation/BelongsToTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Ddd/Relation/BelongsToTest.php)
:::

从属关联也是一对一的关联的一种，比如一篇文章属于某个用户发表。

**从属关联支持类型关联项**

|  关联项   | 说明  |    例子   |
|  ----  | ----  | ----  |
| \Leevel\Database\Ddd\Entity::BELONGS_TO  | 从属关联实体 |  \Tests\Database\Ddd\Entity\Relation\User::class  |
| \Leevel\Database\Ddd\Entity::SOURCE_KEY  | 关联查询源键字段 | user_id |
| \Leevel\Database\Ddd\Entity::TARGET_KEY  | 关联目标键字段 | id |
| \Leevel\Database\Ddd\Entity::RELATION_SCOPE  | 关联查询作用域 | foo |

**Uses**

``` php
<?php

use Leevel\Database\Ddd\EntityCollection as Collection;
use Leevel\Database\Ddd\Relation\BelongsTo;
use Leevel\Database\Ddd\Relation\Relation;
use Leevel\Database\Ddd\Select;
use Leevel\Kernel\Utils\Api;
use Tests\Database\DatabaseTestCase as TestCase;
use Tests\Database\Ddd\Entity\Relation\Post;
use Tests\Database\Ddd\Entity\Relation\User;
```

## 基本使用方法

**fixture 定义**

**Tests\Database\Ddd\Entity\Relation\Post**

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

**Tests\Database\Ddd\Entity\Relation\User**

``` php
namespace Tests\Database\Ddd\Entity\Relation;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\EntityCollection as Collection;
use Leevel\Database\Ddd\Relation\ManyMany;
use Leevel\Database\Ddd\Struct;

class User extends Entity
{
    public const TABLE = 'user';

    public const ID = 'id';

    public const AUTO = 'id';

    #[Struct([
    ])]
    protected ?int $id = null;

    #[Struct([
    ])]
    protected ?string $name = null;

    #[Struct([
    ])]
    protected ?string $createAt = null;

    #[Struct([
        self::MANY_MANY => Role::class,
        self::MIDDLE_ENTITY => UserRole::class,
        self::SOURCE_KEY => 'id',
        self::TARGET_KEY => 'id',
        self::MIDDLE_SOURCE_KEY => 'user_id',
        self::MIDDLE_TARGET_KEY => 'role_id',
    ])]
    protected ?Collection $role = null;

    #[Struct([
        self::MANY_MANY => RoleSoftDeleted::class,
        self::MIDDLE_ENTITY => UserRoleSoftDeleted::class,
        self::SOURCE_KEY => 'id',
        self::TARGET_KEY => 'id',
        self::MIDDLE_SOURCE_KEY => 'user_id',
        self::MIDDLE_TARGET_KEY => 'role_id',
    ])]
    protected ?Collection $roleSoftDeleted = null;

    #[Struct([
        self::MANY_MANY => RoleSoftDeleted::class,
        self::MIDDLE_ENTITY => UserRoleSoftDeleted::class,
        self::SOURCE_KEY => 'id',
        self::TARGET_KEY => 'id',
        self::MIDDLE_SOURCE_KEY => 'user_id',
        self::MIDDLE_TARGET_KEY => 'role_id',
        self::RELATION_SCOPE => 'withSoftDeleted',
    ])]
    protected ?Collection $roleMiddleWithSoftDeleted = null;

    #[Struct([
        self::MANY_MANY => RoleSoftDeleted::class,
        self::MIDDLE_ENTITY => UserRoleSoftDeleted::class,
        self::SOURCE_KEY => 'id',
        self::TARGET_KEY => 'id',
        self::MIDDLE_SOURCE_KEY => 'user_id',
        self::MIDDLE_TARGET_KEY => 'role_id',
        self::RELATION_SCOPE => 'onlySoftDeleted',
    ])]
    protected ?Collection $roleMiddleOnlySoftDeleted = null;

    #[Struct([
        self::MANY_MANY => RoleSoftDeleted::class,
        self::MIDDLE_ENTITY => UserRoleSoftDeleted::class,
        self::SOURCE_KEY => 'id',
        self::TARGET_KEY => 'id',
        self::MIDDLE_SOURCE_KEY => 'user_id',
        self::MIDDLE_TARGET_KEY => 'role_id',
        self::RELATION_SCOPE => 'notFound',
    ])]
    protected ?Collection $roleRelationScopeNotFound = null;

    #[Struct([
        self::MANY_MANY => RoleSoftDeleted::class,
        self::MIDDLE_ENTITY => UserRoleSoftDeleted::class,
        self::SOURCE_KEY => 'id',
        self::TARGET_KEY => 'id',
        self::MIDDLE_SOURCE_KEY => 'user_id',
        self::MIDDLE_TARGET_KEY => 'role_id',
        self::RELATION_SCOPE => 'foundButPrivate',
    ])]
    protected ?Collection $roleRelationScopeFoundButPrivate = null;

    #[Struct([
        self::MANY_MANY => Role::class,
        self::SOURCE_KEY => 'id',
        self::TARGET_KEY => 'id',
        self::MIDDLE_SOURCE_KEY => 'user_id',
        self::MIDDLE_TARGET_KEY => 'role_id',
    ])]
    protected ?Collection $roleNotDefinedMiddleEntity = null;

    #[Struct([
        self::MANY_MANY => Role::class,
        self::MIDDLE_ENTITY => UserRole::class,
        self::TARGET_KEY => 'id',
        self::MIDDLE_SOURCE_KEY => 'user_id',
        self::MIDDLE_TARGET_KEY => 'role_id',
    ])]
    protected ?Collection $roleNotDefinedSourceKey = null;

    #[Struct([
        self::MANY_MANY => Role::class,
        self::MIDDLE_ENTITY => UserRole::class,
        self::SOURCE_KEY => 'id',
        self::MIDDLE_SOURCE_KEY => 'user_id',
        self::MIDDLE_TARGET_KEY => 'role_id',
    ])]
    protected ?Collection $roleNotDefinedTargetKey = null;

    #[Struct([
        self::MANY_MANY => Role::class,
        self::MIDDLE_ENTITY => UserRole::class,
        self::SOURCE_KEY => 'id',
        self::TARGET_KEY => 'id',
        self::MIDDLE_TARGET_KEY => 'role_id',
    ])]
    protected ?Collection $roleNotDefinedMiddleSourceKey = null;

    #[Struct([
        self::MANY_MANY => Role::class,
        self::MIDDLE_ENTITY => UserRole::class,
        self::SOURCE_KEY => 'id',
        self::TARGET_KEY => 'id',
        self::MIDDLE_SOURCE_KEY => 'user_id',
    ])]
    protected ?Collection $roleNotDefinedMiddleTargetKey = null;

    #[Struct([
        self::MANY_MANY => Role::class,
        self::MIDDLE_ENTITY => UserRole::class,
        self::SOURCE_KEY => 'id',
        self::TARGET_KEY => 'id',
        self::MIDDLE_SOURCE_KEY => 'user_id',
        self::MIDDLE_TARGET_KEY => 'role_id',
        self::RELATION_SCOPE => 'middleField',
    ])]
    protected ?Collection $roleMiddleField = null;

    #[Struct([
        self::MANY_MANY => RoleSoftDeleted::class,
        self::MIDDLE_ENTITY => UserRoleSoftDeleted::class,
        self::SOURCE_KEY => 'id',
        self::TARGET_KEY => 'id',
        self::MIDDLE_SOURCE_KEY => 'user_id',
        self::MIDDLE_TARGET_KEY => 'role_id',
        self::RELATION_SCOPE => 'middleOnlySoftDeletedAndMiddleFieldAndOtherTableCondition',
    ])]
    protected ?Collection $roleMiddleOnlySoftDeletedAndMiddleFieldAndOtherTableCondition = null;

    protected function relationScopeWithSoftDeleted(ManyMany $relation): void
    {
        $relation->middleWithSoftDeleted();
    }

    protected function relationScopeOnlySoftDeleted(ManyMany $relation): void
    {
        $relation->middleOnlySoftDeleted();
    }

    protected function relationScopeMiddleField(ManyMany $relation): void
    {
        $relation->middleField(['create_at', 'middle_id' => 'id']);
    }

    protected function relationScopeMiddleOnlySoftDeletedAndMiddleFieldAndOtherTableCondition(ManyMany $relation): void
    {
        $relation
            ->middleOnlySoftDeleted()
            ->middleField(['create_at', 'middle_id' => 'id'])
            ->setColumns('id,name')
            ->where('id', '>', 3)
        ;
    }

    /** @phpstan-ignore-next-line */
    private function relationScopeFoundButPrivate(ManyMany $relation): void
    {
    }
}
```

``` php
public function testBaseUse(): void
{
    $post = Post::select()->where('id', 1)->findOne();

    $this->assertInstanceof(Post::class, $post);
    static::assertNull($post->id);

    $connect = $this->createDatabaseConnect();

    static::assertSame(
        1,
        $connect
            ->table('post')
            ->insert([
                'title' => 'hello world',
                'user_id' => 1,
                'summary' => 'Say hello to the world.',
                'delete_at' => 0,
            ]),
    );

    static::assertSame(
        1,
        $connect
            ->table('user')
            ->insert([
                'name' => 'niu',
            ]),
    );

    $post = Post::select()->where('id', 1)->findOne();

    static::assertSame(1, $post->id);
    static::assertSame(1, $post['id']);
    static::assertSame(1, $post->getId());
    static::assertSame(1, $post->user_id);
    static::assertSame(1, $post->userId);
    static::assertSame(1, $post['user_id']);
    static::assertSame(1, $post->getUserId());
    static::assertSame('hello world', $post->title);
    static::assertSame('hello world', $post['title']);
    static::assertSame('hello world', $post->getTitle());
    static::assertSame('Say hello to the world.', $post->summary);
    static::assertSame('Say hello to the world.', $post['summary']);
    static::assertSame('Say hello to the world.', $post->getSummary());

    $user = $post->user;

    $this->assertInstanceof(User::class, $user);
    static::assertSame(1, $user->id);
    static::assertSame(1, $user['id']);
    static::assertSame(1, $user->getId());
    static::assertSame('niu', $user->name);
    static::assertSame('niu', $user['name']);
    static::assertSame('niu', $user->getName());
}
```

## eager 预加载关联

``` php
public function testEager(): void
{
    $posts = Post::select()->limit(5)->findAll();

    $this->assertInstanceof(Collection::class, $posts);
    static::assertCount(0, $posts);

    $connect = $this->createDatabaseConnect();

    for ($i = 0; $i <= 5; ++$i) {
        static::assertSame(
            $i + 1,
            $connect
                ->table('post')
                ->insert([
                    'title' => 'hello world',
                    'user_id' => 1,
                    'summary' => 'Say hello to the world.',
                    'delete_at' => 0,
                ]),
        );
    }

    static::assertSame(
        1,
        $connect
            ->table('user')
            ->insert([
                'name' => 'niu',
            ]),
    );

    $posts = Post::eager(['user'])
        ->limit(5)
        ->findAll()
    ;

    $this->assertInstanceof(Collection::class, $posts);
    static::assertCount(5, $posts);

    foreach ($posts as $value) {
        $user = $value->user;

        $this->assertInstanceof(User::class, $user);
        static::assertSame(1, $user->id);
        static::assertSame('niu', $user->name);
    }
}
```

## eager 预加载关联支持查询条件过滤

``` php
public function testEagerWithCondition(): void
{
    $posts = Post::select()->limit(5)->findAll();

    $this->assertInstanceof(Collection::class, $posts);
    static::assertCount(0, $posts);

    $connect = $this->createDatabaseConnect();

    for ($i = 0; $i <= 5; ++$i) {
        static::assertSame(
            $i + 1,
            $connect
                ->table('post')
                ->insert([
                    'title' => 'hello world',
                    'user_id' => 1,
                    'summary' => 'Say hello to the world.',
                    'delete_at' => 0,
                ]),
        );
    }

    static::assertSame(
        1,
        $connect
            ->table('user')
            ->insert([
                'name' => 'niu',
            ]),
    );

    $posts = Post::eager(['user' => function (Relation $select): void {
        $select->where('id', '>', 99999);
    }])
        ->limit(5)
        ->findAll()
    ;

    $this->assertInstanceof(Collection::class, $posts);
    static::assertCount(5, $posts);

    foreach ($posts as $value) {
        $user = $value->user;
        $this->assertInstanceof(User::class, $user);
        static::assertNotSame(1, $user->id);
        static::assertNotSame('niu', $user->name);
        static::assertNull($user->id);
        static::assertNull($user->name);
    }
}
```

## relation 读取关联

``` php
public function testRelationAsMethod(): void
{
    $connect = $this->createDatabaseConnect();

    static::assertSame(
        1,
        $connect
            ->table('post')
            ->insert([
                'title' => 'hello world',
                'user_id' => 1,
                'summary' => 'Say hello to the world.',
                'delete_at' => 0,
            ]),
    );

    static::assertSame(
        1,
        $connect
            ->table('user')
            ->insert([
                'name' => 'niu',
            ]),
    );

    $userRelation = Post::make()->relation('user');

    $this->assertInstanceof(BelongsTo::class, $userRelation);
    static::assertSame('user_id', $userRelation->getSourceKey());
    static::assertSame('id', $userRelation->getTargetKey());
    $this->assertInstanceof(Post::class, $userRelation->getSourceEntity());
    $this->assertInstanceof(User::class, $userRelation->getTargetEntity());
    $this->assertInstanceof(Select::class, $userRelation->getSelect());
}
```

## relation 关联模型数据不存在返回空实体

``` php
public function testRelationDataWasNotFound(): void
{
    $post = Post::select()->where('id', 1)->findOne();

    $this->assertInstanceof(Post::class, $post);
    static::assertNull($post->id);

    $connect = $this->createDatabaseConnect();

    static::assertSame(
        1,
        $connect
            ->table('post')
            ->insert([
                'title' => 'hello world',
                'user_id' => 99999,
                'summary' => 'Say hello to the world.',
                'delete_at' => 0,
            ]),
    );

    $post = Post::select()->where('id', 1)->findOne();

    static::assertSame(1, $post->id);
    static::assertSame(1, $post['id']);
    static::assertSame(1, $post->getId());
    static::assertSame(99999, $post->user_id);
    static::assertSame(99999, $post->userId);
    static::assertSame(99999, $post['user_id']);
    static::assertSame(99999, $post->getUserId());
    static::assertSame('hello world', $post->title);
    static::assertSame('hello world', $post['title']);
    static::assertSame('hello world', $post->getTitle());
    static::assertSame('Say hello to the world.', $post->summary);
    static::assertSame('Say hello to the world.', $post['summary']);
    static::assertSame('Say hello to the world.', $post->getSummary());

    $user = $post->user;

    $this->assertInstanceof(User::class, $user);
    static::assertNull($user->id);
    static::assertNull($user['id']);
    static::assertNull($user->getId());
    static::assertNull($user->name);
    static::assertNull($user['name']);
    static::assertNull($user->getName());
}
```