import { Component, Vue } from "vue-property-decorator";
import { handleExternalLinks } from "./utilities";
@Component
export default class ConfigurationMixin extends Vue {
  mounted(): void {
    handleExternalLinks();
  }
}
