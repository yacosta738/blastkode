<template>
  <component :is="iconComponent" v-bind="{ size: size, 'fill': 'currentColor' }"/>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
//@ts-ignore
import {
  AngularIcon,
  DartIcon,
  FlutterIcon,
  GraphQlIcon,
  GridsomeIcon,
  IntelliJIdeaIcon,
  LumenIcon,
  NetlifyIcon,
  PhpIcon,
  PostgreSqlIcon,
  TypeScriptIcon,
  VisualStudioCodeIcon, FlaskIcon, PythonIcon
} from "vue-simple-icons";

@Component({
  components: {
    GraphQlIcon,
    NetlifyIcon,
    GridsomeIcon,
    FlutterIcon,
    DartIcon,
    IntelliJIdeaIcon,
    TypeScriptIcon, AngularIcon, LumenIcon, PostgreSqlIcon, PhpIcon, VisualStudioCodeIcon, FlaskIcon, PythonIcon
  }
})
export default class SimpleIconWrapper extends Vue {
  @Prop({required: true, type: String}) readonly iconComponent: string | undefined;

  get size() {
    switch (this.$screen.breakpoint) {
      case 'xs':
        return '1x';
      case 'sm':
        return '1.1x';
      case 'md':
        return '1.2x';
      case 'xl':
        return '1.2x';
    }
    return '1.2x';
  }
}
</script>

<style scoped>

</style>
