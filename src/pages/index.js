import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import * as style from '../style';
import Layout from '../components/Layout';
import Basic from '../components/section/Basic';
import Hero from '../components/section/Hero';
import Modal from '../components/widget/Modal';
import ButtonMain from '../components/project/ButtonMain';

export default ({ location, data }) => {
    const { splash, introduction } = data;
    return (
        <Layout template="home" location={location}>
            {splash && (
                <Hero
                    opacity={style.HERO_OPACITY}
                    tint={style.HERO_TINT}
                    color={style.HERO_COLOR}
                    id={splash.slug}
                    height={splash.height}
                    source={splash.image.fluid}
                    alternate={splash.title}
                    scroll={splash.scroll}
                >
                    <div className="row">
                        <div className="col-lg-8">
                            <header className="node-xs-30 node-lg-50" dangerouslySetInnerHTML={{ __html: splash.body.childMarkdownRemark.html }} />
                            <footer className="node-xs-30 node-lg-50 d-flex">
                                <ButtonMain size="xl" label={splash.action} />
                                <Modal kind="link" size="xl" icon="play" label={splash.trigger} video={splash.video} />
                            </footer>
                        </div>
                    </div>
                </Hero>
            )}
            {introduction && (
                <Basic id={introduction.slug} space="space-xs-80 space-lg-130">
                    <div className="row align-items-center gutter-80">
                        <div className="col-lg">
                            <Img className="cheat-left" fluid={introduction.image.fluid} alt={introduction.title} />
                        </div>
                        <div className="col-lg">
                            <header
                                className="copy node-xs-30 node-lg-50"
                                dangerouslySetInnerHTML={{ __html: introduction.body.childMarkdownRemark.html }}
                            />
                        </div>
                    </div>
                </Basic>
            )}
        </Layout>
    );
};

export const query = graphql`
    query pageHome {
        splash: contentfulHero(slug: { eq: "splash" }) {
            ...contentSplash
        }
        introduction: contentfulGeneral(slug: { eq: "introduction" }) {
            ...contentGeneral
        }
    }
`;
