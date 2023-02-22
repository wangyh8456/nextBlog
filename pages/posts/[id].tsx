import React from 'react';
import Layout from '../../components/Layout';
import useSwr from 'swr';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import {getAllPostIds,getPostData} from '../../lib/post';
import {Post} from '../../Types';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import type {Info} from '../../Types';

const fetcher = (url: string) => fetch(url,{method:'POST',body:JSON.stringify({name:'Jack',age:'15'})}).then((res) => res.json());

type IdProps={
  postData:Post,
  [propName: string]: any;
}

const Post:React.FC<IdProps>=({postData})=>{
  const {query}=useRouter();
  const { data, error, isLoading } = useSwr<Info>(`/api/hello/${query.id}`, fetcher)
  return (
    <Layout home={false}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div className={utilStyles.lightText}>
          {data?.content}
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const allPostsData=await getPostData(params?.id);
  return {
    props:{
      postData:allPostsData
    }
  }
}

export const getStaticPaths:GetStaticPaths=async ()=>{
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export default Post;