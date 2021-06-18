<template>
  <div>
    <button v-if="!showQrcode" class="big-button m-4" @click="showQrcode = true">{{ title }}</button>
    <div v-if="showQrcode" class="flex flex-col justify-center items-center">
      <h3 class="text-3xl">{{ title }}</h3>
      <p>{{ cryptoType }}</p>
      <VueQrcode class="m-4" :value="qrcodeAddress" :options="{ size: 250 }"></VueQrcode>
      <div class="m-4 text-center font-black text-xl"> {{ address }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import VueQrcode from '@xkeshi/vue-qrcode';

@Component({components: {VueQrcode}})
export default class Cryptos extends Vue {
  qrcodeAddress: string = '';
  showQrcode: boolean = false;
  @Prop({type: String, default: 'Buy me a coffee!'}) readonly title: string | undefined;
  @Prop({type: String, default: 'Bitcoin'}) readonly cryptoType: string | undefined;
  @Prop({required: true, type: String}) readonly address: string | undefined;

  @Watch('$store.state.postId')
  hideQR(){
    this.showQrcode = false;
  }

  beforeMount() {
    this.qrcodeAddress = `bitcoin:${this.address}`;
  }
}
</script>

<style scoped>

</style>
