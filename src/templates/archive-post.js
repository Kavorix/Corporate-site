import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { slugify } from '../function';
import { logicDescription } from '../logic';
import Layout from '../components/Layout';
import Feed from '../components/section/Feed';
import Pagination from '../components/widget/Pagination';

export default ({ location, data, pageContext }) => {
    const { posts, archive } = data;
    const loopPost = posts.edges.map(({ node: post }) => {
        const date = post.published || post.createdAt;
        return (
            <article key={post.id} id={post.slug} className="post">
                <figure>
                    <Img className="image" fluid={post.image.fluid} alt={post.title} />
                    {post.type && <div className={`flag flag-${slugify(post.type)}`}>{post.type}</div>}
                </figure>
                <header>
                    <h3>
                        <Link className="stretched-link" to={`/${pageContext.archive}/${post.slug}`}>
                            {post.title}
                        </Link>
                    </h3>
                    <p className="date">{date}</p>
                </header>
                <section>
                    <p className="excerpt read-more more" dangerouslySetInnerHTML={{ __html: logicDescription(post) }} />
                </section>
            </article>
        );
    });
    return (
        <Layout template="archive archive-post" title={archive.name} description={archive.description} location={location}>
            {posts.edges.length > 0 && (
                <Feed id="posts" space="space-custom" item="post">
                    <div className="row gutter-50 gutter-lg-80">
                        <div className="col-lg-9">
                            {archive && (
                                <header className="node-xs-80">
                                    {archive.name && <h1>{archive.name}</h1>}
                                    {archive.description && <h2>{archive.description}</h2>}
                                </header>
                            )}
                            <section className="node-xs-80">{loopPost}</section>
                            {pageContext.numPages > 1 && (
                                <footer className="node-xs-80">
                                    <Pagination pageContext={pageContext} />
                                </footer>
                            )}
                        </div>
                    </div>
                </Feed>
            )}
        </Layout>
    );
};

export const query = graphql`
    query postsAll($limit: Int!, $skip: Int!) {
        posts: allContentfulPost(sort: { fields: published, order: DESC }, limit: $limit, skip: $skip) {
            edges {
                node {
                    id
                    createdAt(formatString: "MMMM D, YYYY")
                    title
                    slug
                    image {
                        ...imageArchive
                    }
                    body {
                        childMarkdownRemark {
                            excerpt
                        }
                    }
                    excerpt {
                        excerpt
                    }
                    published(formatString: "MMMM D, YYYY")
                    type
                }
            }
        }
        archive: contentfulArchive(slug: { eq: "post" }) {
            name
            description
        }
    }
`;
