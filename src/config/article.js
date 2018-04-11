// import { TestListRedux } from '../test-components/test-list';
// import { TestListItemRedux } from '../test-components/item';
// import MainContent from '../test-components/main-content';
// import Image from '../test-components/image';
// import Description from '../test-components/description';
// import FlyTitleAndTitle from '../test-components/flytitle-and-title';
// import Content from '../test-components/content';
import SimpleHeader from '../components/simple-header';
// import { StoryCollectionRedux } from '../../components/story-collection';
// import { TeaserRedux } from '../../components/teaser';

export const articleConfig = {
  // article: {
  //   levelConfiguration: {
  //     modifier: "special-report",
  //     contentType: "blog-post",
  //   },
  //   component: [
  //     FlyTitleAndTitle,
  //     Description,
  //     {
  //       component: Image,
  //       customProps: {
  //         key: "blog-image",
  //         classNameImage: "blog-post__image-block",
  //         className: "blog-post__image",
  //         liquid: true,
  //         sizes: "(min-width: 600px) 640px, calc(100vw - 20px)",
  //       }
  //     },
  //     Content,
  //   ],
  //   // special_report: {
  //   //   component: TestListRedux,
  //   //   article: {
  //   //     component: TestListItemRedux,
  //   //   }
  //   // },
  //   taxonomy: {
  //     component: StoryCollectionRedux,
  //     levelConfiguration: {
  //       className: "main-content__story-collection blog-post__story-collection",
  //       // blog: storyCollection
  //       // latestVideos: latestVideos
  //       i13nProps: {
  //         placement: 'body',
  //         parentPageType: 'blog-post',
  //       },
  //       mode: "hero",
  //       hideTitle: true,
  //     }
  //   },
  //   // story_collection: {
  //   //   component: TestListRedux,
  //   // },
  //   article:  {
  //     component: TeaserRedux,
  //     levelConfiguration: {
  //       className: "stco__teaser-link--rest-story",
  //       classNameModifier: "--wrapped",
  //     }
  //   },
  // },
  collection: {
  //   mj0cfs4hjapgdedr69mk9mei10v8us99: {
  //     component: SimpleHeader,
  //     levelConfiguration: {
  //       modifier: "special-report",
  //       contentType: "list",
  //     },
  //     special_report: {
  //       // gf2dhg2kdnf0jvirj40hira32f0gvu00: {
  //       //   levelConfiguration: {
  //       //     modifier: "special-report",
  //       //     color: "blue",
  //       //   },
  //       //   component: TestListRedux,
  //       // },
  //       // gf4s0jl055ln7elmpo2j8oif3cfrr95j: {
  //       //   levelConfiguration: {
  //       //     modifier: "special-report",
  //       //     color: "red",
  //       //   },
  //       //   component: TestListRedux,
  //       // },
  //       levelConfiguration: {
  //         modifier: "article",
  //         contentType: "list",
  //       },
  //       component: TestListRedux,
  //       article: {
  //         component: TestListItemRedux,
  //         mj0cfs4hjapgdedr69mk9mei10v8us99: {
  //           component: TestListItemRedux,
  //           levelConfiguration: {
  //             color: "white",
  //           }
  //         }
  //       }
  //     }
  //   },
    component: SimpleHeader,
    levelConfiguration: {
      modifier: "special-report",
      contentType: "list",
    },
    special_report: {
      component: SimpleHeader,
      levelConfiguration: {
        modifier: "special-report",
        contentType: "list",
      }
    }
  //   special_report: {
  //     gf2dhg2kdnf0jvirj40hira32f0gvu00: {
  //       levelConfiguration: {
  //         modifier: "special-report",
  //       },
  //       component: TestListRedux,
  //     },
  //     levelConfiguration: {
  //       modifier: "special-report",
  //     },
  //     component: TestListRedux,
  //     article: {
  //       component: TestListItemRedux,
  //     }
  //   }
  }
}
