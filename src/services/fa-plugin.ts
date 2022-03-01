import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faExclamation,
  faSpinner,
  faChevronDown,
  faChevronUp,
  faShareAlt,
  faExternalLinkAlt,
  faPlus,
  faCircle,
  faPalette,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
// import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faClone,
  faCircle as farCircle,
  faSnowflake,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { App } from "vue";

export default {
  install: (app: App): void => {
    library.add(
      faExclamation,
      faSpinner,
      faChevronUp,
      faChevronDown,
      faShareAlt,
      faExternalLinkAlt,
      faPlus,
      faCircle,
      faPalette,
      faCog
    );
    // library.add(fab);
    library.add(faClone, farCircle, faSnowflake, faTrashAlt);

    app.component("font-awesome-icon", FontAwesomeIcon);
  },
};
