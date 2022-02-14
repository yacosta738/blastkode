<template>
  <div class="inline-flex align-middle w-full">
    <button class="language-button flex justify-center items-center"
            type="button" @click="toggleDropdown()" ref="btnDropdownRef">
      <ClientOnly>
        <country-flag :country="countryFlag($i18n.locale)" size="small"/>
      </ClientOnly>
    </button>
    <div v-bind:class="{'hidden': !dropdownPopoverShow, 'block': dropdownPopoverShow}" class="menu-language"
         v-closable="{ exclude:['btnDropdownRef'], handler: 'onClose'  }" ref="popoverDropdownRef">
      <div class="flex flex-col justify-center items-center">
        <div class="m-1 cursor-pointer flex justify-around items-start" v-for="locale in localeList" :key="locale"
             @click="localeChanged(locale)">
          <ClientOnly>
            <country-flag :country="countryFlag(locale)" size="small"/>
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
const flag = (locale: string): string => {
  switch (locale) {
    case 'en':
      return 'gb';
    case 'es':
      return 'es';
    default:
      return 'gb';
  }
};
import {Component} from "vue-property-decorator";
import LanguageMixin from "~/mixins/language.mixins";
import {mixins} from 'vue-class-component';
import {createPopper} from "@popperjs/core";
import CountryFlag from 'vue-country-flag';

@Component({components: {CountryFlag}})
export default class LocaleSwitcher extends mixins(LanguageMixin) {
  dropdownPopoverShow: boolean = false;

  countryFlag(locale: string) {
    return flag(locale);
  }

  toggleDropdown() {
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
      const btn = (this.$refs.btnDropdownRef as HTMLElement);
      const dropdown = (this.$refs.popoverDropdownRef as HTMLElement);
      createPopper(btn, dropdown, {
        placement: "bottom-start"
      });
    }
  }

  onClose() {
    this.dropdownPopoverShow = false;
  }

  localeChanged(locale: string) {
    this.loadLanguageAsync(locale).then(this.toggleDropdown).catch(() => {
      console.log('Async language fetch failed');
    });
  }
}
</script>
<style lang="scss">
.language-button {
  @apply bg-transparent text-green-500 text-sm cursor-pointer border-b border-transparent  hover:border-green-500 hover:bg-green-900 select-none;
}

.menu-language {
  z-index: 200;
  min-width: 2rem;
  @apply bg-lightest-navy text-base float-left py-2 list-none text-left rounded shadow-lg mt-1;
}
</style>
