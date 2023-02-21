import Head from 'next/head';
import React from 'react';
import Layout, { siteTitle } from '../components/Layout';
import utilStyles from '../styles/utils.module.css';
import {getSortedPostsData} from '../lib/post';
import { GetStaticProps } from 'next';
import {Post} from '../Types';
import Link from 'next/link';
import Date from '../components/date';
// import {Login} from '../lib/api/index';

type IndexProps={
  allPostsData:Array<Post>,
  [propName: string]: any;
}

const Home:React.FC<IndexProps>=({allPostsData})=>{
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>a cool man</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://www.nextjs.cn/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                {title}
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const allPostsData=getSortedPostsData();
  return {
    props:{
      allPostsData
    }
  }
}

export default Home