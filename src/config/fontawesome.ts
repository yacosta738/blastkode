import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {config, library} from '@fortawesome/fontawesome-svg-core';
import {faCodepen, faConnectdevelop, faFacebook, faGithub, faInstagram, faLinkedin, faTwitter, faVuejs} from '@fortawesome/free-brands-svg-icons';
import {faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons/faExternalLinkAlt.js';
import {faFolder} from '@fortawesome/free-solid-svg-icons/faFolder.js';
import {faFolderOpen} from '@fortawesome/free-solid-svg-icons/faFolderOpen.js';
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons/faCalendarAlt.js';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons/faChevronRight.js';
import {faTags} from '@fortawesome/free-solid-svg-icons/faTags.js';
import {faAddressCard} from '@fortawesome/free-solid-svg-icons/faAddressCard.js';
import {faNewspaper} from '@fortawesome/free-solid-svg-icons/faNewspaper.js';
import {faLaptopCode} from '@fortawesome/free-solid-svg-icons/faLaptopCode.js';
import {faCode} from '@fortawesome/free-solid-svg-icons/faCode.js';
import {faGraduationCap} from '@fortawesome/free-solid-svg-icons/faGraduationCap.js';
import {faSchool} from '@fortawesome/free-solid-svg-icons/faSchool.js';
import {faGlobe} from '@fortawesome/free-solid-svg-icons/faGlobe.js';
import {faAt} from '@fortawesome/free-solid-svg-icons/faAt.js';
import {faPhone} from '@fortawesome/free-solid-svg-icons/faPhone.js';
import {faMapMarker} from '@fortawesome/free-solid-svg-icons/faMapMarker.js';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;
library.add(faGithub, faTwitter, faInstagram, faLinkedin, faCodepen, faExternalLinkAlt, faFolder, faVuejs, faCalendarAlt, faChevronRight, faTags,
    faFolderOpen, faAddressCard,faNewspaper, faConnectdevelop,faLaptopCode,faCode, faGraduationCap, faSchool, faFacebook,faGlobe,faAt,faPhone,faMapMarker);

export default function initFontawesome(Vue){
    // Set font-awesome as a global component
    Vue.component('font-awesome', FontAwesomeIcon);
}
