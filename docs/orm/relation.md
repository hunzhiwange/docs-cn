# 关联

::: tip Testing Is Documentation
[tests/Database/Ddd/Relation/RelationTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Ddd/Relation/RelationTest.php)
:::

将相关实体连接起来，可以更加方便地操作数据。

**关联支持类型**

|  关联类型   | 说明  |
|  ----  | ----  |
| belongsTo  | 从属关联 |
| hasOne  | 一对一关联 |
| hasMany  | 一对多关联 |
| manyMany  | 多对多关联 |

**Uses**

``` php
<?php

use Leevel\Database\Ddd\Relation\HasOne;
use Leevel\Database\Ddd\Relation\Relation;
use Leevel\Kernel\Utils\Api;
use Tests\Database\DatabaseTestCase as TestCase;
use Tests\Database\Ddd\Entity\Relation\Post;
use Tests\Database\Ddd\Entity\Relation\PostContent;
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

**Tests\Database\Ddd\Entity\Relation\PostContent**

``` php
namespace Tests\Database\Ddd\Entity\Relation;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\Struct;

class PostContent extends Entity
{
    public const TABLE = 'post_content';

    public const ID = null;

    public const AUTO = null;

    #[Struct([
        self::READONLY => true,
    ])]
    protected ?int $postId = null;

    #[Struct([
    ])]
    protected ?string $content = null;
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
            ])
    );

    static::assertSame(
        1,
        $connect
            ->table('post_content')
            ->insert([
                'post_id' => 1,
                'content' => 'I am content with big data.',
            ])
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

    $postContent = $post->postContent;

    $this->assertInstanceof(PostContent::class, $postContent);
    static::assertSame(1, $postContent->post_id);
    static::assertSame(1, $postContent->postId);
    static::assertSame(1, $postContent['post_id']);
    static::assertSame(1, $postContent['postId']);
    static::assertSame(1, $postContent->getPostId());
    static::assertSame('I am content with big data.', $postContent->content);
    static::assertSame('I am content with big data.', $postContent['content']);
    static::assertSame('I am content with big data.', $postContent->getContent());
}
```