# hasMany 一对多关联

::: tip Testing Is Documentation
[tests/Database/Ddd/Relation/HasManyTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Ddd/Relation/HasManyTest.php)
:::

一对多的关联是一种常用的关联，比如一篇文章与文章评论属于一对多的关系。

**一对多关联支持类型关联项**

|  关联项   | 说明  |    例子   |
|  ----  | ----  | ----  |
| \Leevel\Database\Ddd\Entity::HAS_MANY  | 一对多关联实体 |  \Tests\Database\Ddd\Entity\Relation\Comment::class  |
| \Leevel\Database\Ddd\Entity::SOURCE_KEY  | 关联查询源键字段 | id |
| \Leevel\Database\Ddd\Entity::TARGET_KEY  | 关联目标键字段 | post_id |
| \Leevel\Database\Ddd\Entity::RELATION_SCOPE  | 关联查询作用域 | comment |

**Uses**

``` php
<?php

use Leevel\Database\Ddd\EntityCollection as Collection;
use Leevel\Database\Ddd\Relation\HasMany;
use Leevel\Database\Ddd\Select;
use Leevel\Kernel\Utils\Api;
use Tests\Database\DatabaseTestCase as TestCase;
use Tests\Database\Ddd\Entity\Relation\Comment;
use Tests\Database\Ddd\Entity\Relation\Post;
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

**Tests\Database\Ddd\Entity\Relation\Comment**

``` php
namespace Tests\Database\Ddd\Entity\Relation;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\Struct;

class Comment extends Entity
{
    public const TABLE = 'comment';

    public const ID = 'id';

    public const AUTO = 'id';

    #[Struct([
    ])]
    protected ?int $id = null;

    #[Struct([
    ])]
    protected ?string $title = null;

    #[Struct([
    ])]
    protected ?int $postId = null;

    #[Struct([
    ])]
    protected ?string $content = null;

    #[Struct([
    ])]
    protected ?string $createAt = null;
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

    for ($i = 0; $i < 10; ++$i) {
        $connect
            ->table('comment')
            ->insert([
                'title' => 'niu'.($i + 1),
                'post_id' => 1,
                'content' => 'Comment data.'.($i + 1),
            ])
        ;
    }

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

    $comment = $post->comment;

    $this->assertInstanceof(Collection::class, $comment);

    $n = 0;

    foreach ($comment as $k => $v) {
        $id = (int) ($n + 5);

        static::assertInstanceOf(Comment::class, $v);
        static::assertSame($n, $k);
        static::assertSame($id, (int) $v->id);
        static::assertSame($id, (int) $v['id']);
        static::assertSame($id, (int) $v->getId());
        static::assertSame('niu'.$id, $v['title']);
        static::assertSame('niu'.$id, $v->title);
        static::assertSame('niu'.$id, $v->getTitle());
        static::assertSame('Comment data.'.$id, $v['content']);
        static::assertSame('Comment data.'.$id, $v->content);
        static::assertSame('Comment data.'.$id, $v->getContent());

        ++$n;
    }

    static::assertCount(6, $comment);
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
        2,
        $connect
            ->table('post')
            ->insert([
                'title' => 'foo bar',
                'user_id' => 1,
                'summary' => 'Say foo to the bar.',
                'delete_at' => 0,
            ]),
    );

    for ($i = 0; $i < 10; ++$i) {
        $connect
            ->table('comment')
            ->insert([
                'title' => 'niu'.($i + 1),
                'post_id' => 1,
                'content' => 'Comment data.'.($i + 1),
            ])
        ;
    }

    for ($i = 0; $i < 10; ++$i) {
        $connect
            ->table('comment')
            ->insert([
                'title' => 'niu'.($i + 1),
                'post_id' => 2,
                'content' => 'Comment data.'.($i + 1),
            ])
        ;
    }

    $posts = Post::eager(['comment'])->findAll();

    $this->assertInstanceof(Collection::class, $posts);
    static::assertCount(2, $posts);

    $min = 5;

    foreach ($posts as $k => $value) {
        $comments = $value->comment;

        $this->assertInstanceof(Collection::class, $comments);
        static::assertSame(0 === $k ? 6 : 10, \count($comments));

        foreach ($comments as $comment) {
            $this->assertInstanceof(Comment::class, $comment);
            static::assertSame($min, $comment->id);
            ++$min;
        }
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
        2,
        $connect
            ->table('post')
            ->insert([
                'title' => 'foo bar',
                'user_id' => 1,
                'summary' => 'Say foo to the bar.',
                'delete_at' => 0,
            ]),
    );

    for ($i = 0; $i < 10; ++$i) {
        $connect
            ->table('comment')
            ->insert([
                'title' => 'niu'.($i + 1),
                'post_id' => 1,
                'content' => 'Comment data.'.($i + 1),
            ])
        ;
    }

    for ($i = 0; $i < 10; ++$i) {
        $connect
            ->table('comment')
            ->insert([
                'title' => 'niu'.($i + 1),
                'post_id' => 2,
                'content' => 'Comment data.'.($i + 1),
            ])
        ;
    }

    $posts = Post::eager(['comment' => function ($select): void {
        $select->where('id', '>', 99999);
    }])->findAll();

    $this->assertInstanceof(Collection::class, $posts);
    static::assertCount(2, $posts);

    foreach ($posts as $k => $value) {
        $comments = $value->comment;
        $this->assertInstanceof(Collection::class, $comments);
        static::assertCount(0, $comments);
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

    for ($i = 0; $i < 10; ++$i) {
        $connect
            ->table('comment')
            ->insert([
                'title' => 'niu'.($i + 1),
                'post_id' => 1,
                'content' => 'Comment data.'.($i + 1),
            ])
        ;
    }

    $commentRelation = Post::make()->relation('comment');

    $this->assertInstanceof(HasMany::class, $commentRelation);
    static::assertSame('id', $commentRelation->getSourceKey());
    static::assertSame('post_id', $commentRelation->getTargetKey());
    $this->assertInstanceof(Post::class, $commentRelation->getSourceEntity());
    $this->assertInstanceof(Comment::class, $commentRelation->getTargetEntity());
    $this->assertInstanceof(Select::class, $commentRelation->getSelect());
}
```

## relation 关联模型数据不存在返回空集合

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
            ]),
    );

    for ($i = 0; $i < 10; ++$i) {
        $connect
            ->table('comment')
            ->insert([
                'title' => 'niu'.($i + 1),
                'post_id' => 2,
                'content' => 'Comment data.'.($i + 1),
            ])
        ;
    }

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

    $comment = $post->comment;

    $this->assertInstanceof(Collection::class, $comment);
    static::assertCount(0, $comment);
}
```