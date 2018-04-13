import SimpleHeader from '../components/simple-header';
import { List } from '../components/list';

export const config = {
  collection: {
    component: SimpleHeader,
    levelConfiguration: {
      modifier: "special-report",
      contentType: "list",
    },
    special_report: {
      component: List,
      levelConfiguration: {
        modifier: "special-report",
        contentType: "list",
      },
      article: {
        component: SimpleHeader,
        levelConfiguration: {
          modifier: "special-report",
          contentType: "list",
        }
      }
    }
  }
}
