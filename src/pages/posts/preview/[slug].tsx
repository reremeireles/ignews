/* eslint-disable react-hooks/exhaustive-deps */
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from "next";
import { getPrismicClient } from "../../../services/prismic";
import { asText, asHTML } from '@prismicio/helpers';
import Head from "next/head";
import Link from "next/link";

import styles from '../post.module.scss';
import { RichTextField } from "@prismicio/types";

interface PostPreviewProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }
}

export default function PostPreview({ post }: PostPreviewProps){
  const { data: session } = useSession() || {}
  const router = useRouter()

    useEffect(() => {
        if (session?.activeSubscription) {
            router.push(`/posts/${post.slug}`)
        }
    }, [session]);

    return (
        <>
            <Head>
                <title>{post.title} | Ignews</title>
            </Head>

            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div
                        className={`${styles.postContent} ${styles.previewContent}`}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <div className={styles.continueReading}>
                        Wanna continue reading?
                        <Link href="/">
                            <a href="">Subscribe now! 🤗</a>
                        </Link>
                    </div>
                </article>
            </main>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking' //true, false e blocking
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params;

    const prismic = getPrismicClient()

    const response = await prismic.getByUID('post', String(slug), {})

    const post = {
        slug,
        title: asText(response.data.title),
        content: asHTML(response.data.content.splice(0, 3) as RichTextField),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    };

    return {
        props: {
            post,
        },
        redirect: 60 * 30, // 30 minutes
    }
}
