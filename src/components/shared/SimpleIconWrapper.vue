<template>
  <component :is="iconComponent" v-bind="{ size: size, 'fill': 'currentColor' }"/>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
//@ts-ignore
import {
  AngularIcon,
  DartIcon,
  FlaskIcon,
  FlutterIcon,
  GraphQlIcon,
  GridsomeIcon,
  IntelliJIdeaIcon,
  JavaIcon,
  JavaScriptIcon,
  KotlinIcon,
  LumenIcon,
  Neo4jIcon,
  NetlifyIcon,
  PhpIcon,
  PostgreSqlIcon,
  PythonIcon,
  ScalaIcon,
  SpringIcon,
  TypeScriptIcon,
  VisualStudioCodeIcon, VueJsIcon, NodeJsIcon, HugoIcon,GoIcon, JekyllIcon, RubyIcon, SassIcon
} from "vue-simple-icons";

@Component({
  components: {
    GraphQlIcon,
    NetlifyIcon,
    GridsomeIcon,
    FlutterIcon,
    DartIcon,
    IntelliJIdeaIcon,
    TypeScriptIcon,
    AngularIcon,
    LumenIcon,
    PostgreSqlIcon,
    PhpIcon,
    VisualStudioCodeIcon,
    FlaskIcon,
    PythonIcon,
    JavaIcon,
    KotlinIcon,
    SpringIcon,
    Neo4jIcon,
    JavaScriptIcon,
    ScalaIcon, VueJsIcon, NodeJsIcon, HugoIcon,GoIcon, JekyllIcon, RubyIcon, SassIcon
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
