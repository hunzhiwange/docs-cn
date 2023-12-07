# nested 嵌套预加载关联

::: tip Testing Is Documentation
[tests/Database/Ddd/Relation/NestedTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Ddd/Relation/NestedTest.php)
:::

预加载关联可以减少查询，并且支持嵌套，通过 `.` 分隔嵌套关联。

**Uses**

``` php
<?php

use Leevel\Database\Ddd\EntityCollection as Collection;
use Leevel\Kernel\Utils\Api;
use Tests\Database\DatabaseTestCase as TestCase;
use Tests\Database\Ddd\Entity\Relation\Post;
use Tests\Database\Ddd\Entity\Relation\Role;
use Tests\Database\Ddd\Entity\Relation\User;
use Tests\Database\Ddd\Entity\Relation\UserRole;
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

**Tests\Database\Ddd\Entity\Relation\UserRole**

``` php
namespace Tests\Database\Ddd\Entity\Relation;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\Struct;

class UserRole extends Entity
{
    public const TABLE = 'user_role';

    public const ID = 'id';

    public const AUTO = 'id';

    #[Struct([
    ])]
    protected ?int $id = null;

    #[Struct([
    ])]
    protected ?int $userId = null;

    #[Struct([
    ])]
    protected ?int $roleId = null;

    #[Struct([
    ])]
    protected ?string $createAt = null;

    #[Struct([
    ])]
    protected ?int $deleteAt = null;
}
```

**Tests\Database\Ddd\Entity\Relation\Role**

``` php
namespace Tests\Database\Ddd\Entity\Relation;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\Struct;

class Role extends Entity
{
    public const TABLE = 'role';

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
}
```

``` php
public function testBase(): void
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
                ])
        );
    }

    static::assertSame(
        1,
        $connect
            ->table('user')
            ->insert([
                'name' => 'niu',
            ])
    );

    static::assertSame(
        1,
        $connect
            ->table('role')
            ->insert([
                'name' => '管理员',
            ])
    );

    static::assertSame(
        2,
        $connect
            ->table('role')
            ->insert([
                'name' => '版主',
            ])
    );

    static::assertSame(
        3,
        $connect
            ->table('role')
            ->insert([
                'name' => '会员',
            ])
    );

    static::assertSame(
        1,
        $connect
            ->table('user_role')
            ->insert([
                'user_id' => 1,
                'role_id' => 1,
            ])
    );

    static::assertSame(
        2,
        $connect
            ->table('user_role')
            ->insert([
                'user_id' => 1,
                'role_id' => 3,
            ])
    );

    $posts = Post::eager(['user.role'])
        ->limit(5)
        ->findAll()
    ;

    $this->assertInstanceof(Collection::class, $posts);
    static::assertCount(5, $posts);

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

    $role = $user->role;

    $this->assertInstanceof(Collection::class, $role);

    $user1 = $role[0];

    $this->assertInstanceof(Role::class, $user1);
    static::assertSame(1, $user1->id);
    static::assertSame(1, $user1['id']);
    static::assertSame(1, $user1->getId());
    static::assertSame('管理员', $user1->name);
    static::assertSame('管理员', $user1['name']);
    static::assertSame('管理员', $user1->getName());

    $user2 = $role[1];
    $this->assertInstanceof(Role::class, $user2);
    static::assertSame(3, $user2->id);
    static::assertSame(3, $user2['id']);
    static::assertSame(3, $user2->getId());
    static::assertSame('会员', $user2->name);
    static::assertSame('会员', $user2['name']);
    static::assertSame('会员', $user2->getName());

    static::assertCount(2, $role);
    static::assertSame(1, $role[0]['id']);
    static::assertSame('管理员', $role[0]['name']);
    static::assertSame(3, $role[1]['id']);
    static::assertSame('会员', $role[1]['name']);

    $middle = $role[0]->middle();
    $this->assertInstanceof(UserRole::class, $middle);
    static::assertSame(1, $middle->userId);
    static::assertSame(1, $middle->roleId);

    $middle = $role[1]->middle();
    $this->assertInstanceof(UserRole::class, $middle);
    static::assertSame(1, $middle->userId);
    static::assertSame(3, $middle->roleId);
}
```