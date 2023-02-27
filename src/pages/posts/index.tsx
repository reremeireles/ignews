import { GetStaticProps } from 'next';
import Head from 'next/head';
import { asText } from '@prismicio/helpers';
import Link from 'next/link';

import { getPrismicClient } from '../../services/prismic';

import styles from './styles.module.scss';


type Post = {
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string;
};

interface PostsProps {
    posts: Post[]
}

export default function Posts({ posts }: PostsProps) {
    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    { posts.map(post => (
                        <Link key={post.slug} href={`/posts/preview/${post.slug}`}>
                        <a>
                            <time>{post.updatedAt}</time>
                            <strong>{post.title}</strong>
                            <p>{post.excerpt}</p>
                        </a>
                    </Link>
                    )) }
                </div>
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()

    const response = await prismic.getAllByType(
        "post",
        {
            pageSize: 100,
            fetch: ['post.title', 'post.content'],
        }
    )

    const posts = response.map(post => {
        return {
            slug: post.uid,
            title: asText(post.data.title),
            // @ts-ignore
            excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-br', {
                day: '2-digit',
                month: 'long',
                year:'numeric'
            })
        }
    });

    return {
        props: {
            posts
        }
    }
}
