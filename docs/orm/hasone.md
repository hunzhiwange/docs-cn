# hasOne 一对一关联

::: tip Testing Is Documentation
[tests/Database/Ddd/Relation/HasOneTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Ddd/Relation/HasOneTest.php)
:::

一对一的关联是一种常用的关联，比如一篇文章与文章内容属于一对一的关系。

**一对一关联支持类型关联项**

|  关联项   | 说明  |    例子   |
|  ----  | ----  | ----  |
| \Leevel\Database\Ddd\Entity::HAS_ONE  | 一对一关联实体 |  \Tests\Database\Ddd\Entity\Relation\PostContent::class  |
| \Leevel\Database\Ddd\Entity::SOURCE_KEY  | 关联查询源键字段 | id |
| \Leevel\Database\Ddd\Entity::TARGET_KEY  | 关联目标键字段 | post_id |
| \Leevel\Database\Ddd\Entity::RELATION_SCOPE  | 关联查询作用域 | foo |

**Uses**

``` php
<?php

use Leevel\Database\Ddd\EntityCollection as Collection;
use Leevel\Database\Ddd\Relation\HasOne;
use Leevel\Database\Ddd\Relation\Relation;
use Leevel\Database\Ddd\Select;
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

## eager 预加载关联

``` php
public function testEager(): void
{
    $post = Post::select()->where('id', 1)->findOne();

    $this->assertInstanceof(Post::class, $post);
    static::assertNull($post->id);

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

        static::assertSame(
            1,
            $connect
                ->table('post_content')
                ->insert([
                    'post_id' => $i + 1,
                    'content' => 'I am content with big data.',
                ])
        );
    }

    $posts = Post::eager(['post_content'])->findAll();

    $this->assertInstanceof(Collection::class, $posts);
    static::assertCount(6, $posts);

    foreach ($posts as $value) {
        $postContent = $value->postContent;

        $this->assertInstanceof(PostContent::class, $postContent);
        static::assertSame($value->id, $postContent->postId);
        static::assertSame('I am content with big data.', $postContent->content);
    }
}
```

## eager 预加载关联支持查询条件过滤

``` php
public function testEagerWithCondition(): void
{
    $post = Post::select()->where('id', 1)->findOne();

    $this->assertInstanceof(Post::class, $post);
    static::assertNull($post->id);

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

        static::assertSame(
            1,
            $connect
                ->table('post_content')
                ->insert([
                    'post_id' => $i + 1,
                    'content' => 'I am content with big data.',
                ])
        );
    }

    $posts = Post::eager(['post_content' => function (Relation $select): void {
        $select->where('post_id', '>', 99999);
    }])->findAll();

    $this->assertInstanceof(Collection::class, $posts);
    static::assertCount(6, $posts);

    foreach ($posts as $value) {
        $postContent = $value->postContent;
        $this->assertInstanceof(PostContent::class, $postContent);
        static::assertNotSame($value->id, $postContent->postId);
        static::assertNotSame('I am content with big data.', $postContent->content);
        static::assertNull($postContent->postId);
        static::assertNull($postContent->content);
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

    $postContentRelation = Post::make()->relation('postContent');

    $this->assertInstanceof(HasOne::class, $postContentRelation);
    static::assertSame('id', $postContentRelation->getSourceKey());
    static::assertSame('post_id', $postContentRelation->getTargetKey());
    $this->assertInstanceof(Post::class, $postContentRelation->getSourceEntity());
    $this->assertInstanceof(PostContent::class, $postContentRelation->getTargetEntity());
    $this->assertInstanceof(Select::class, $postContentRelation->getSelect());
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
                'post_id' => 5,
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
    static::assertNull($postContent->post_id);
    static::assertNull($postContent->postId);
    static::assertNull($postContent['post_id']);
    static::assertNull($postContent['postId']);
    static::assertNull($postContent->getPostId());
    static::assertNull($postContent->content);
    static::assertNull($postContent['content']);
    static::assertNull($postContent->getContent());
}
```