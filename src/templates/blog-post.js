import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import { graphql, Link } from 'gatsby'

// Components
import Layout from '../components/layout'
import BlogMeta from '../components/blogMeta'

class BlogPostTemplate extends React.Component {
    render() {
        const post = get(this.props, 'data.contentfulBlogPost')
        const siteTitle = get(this.props, 'data.site.siteMetadata.title')

        return (
            <Layout>
                <Helmet title={`${post.title} | ${siteTitle}`} />
                <div className="wrapper">
                    <Link to={"/blog"}>Blog Index</Link>
                    <h1 className="section-headline">{post.title}</h1>
                    <p
                        style={{
                            display: 'block',
                        }}
                    >
                        {
                            post.publishDate && (
                                <BlogMeta
                                    author={post.author.name}
                                    date={post.publishDate}
                                />
                            )
                        }

                    </p>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: post.body.childMarkdownRemark.html,
                        }}
                    />
                </div>
            </Layout>

        )
    }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title,
      author {
       name
      },
      publishDate(formatString: "MMMM Do, YYYY")
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
