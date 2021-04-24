<template>
  <div>
    <button @click="isOpen = true">*</button>
    <div v-if="isOpen" @click.self="isOpen = false" class="inset-0 h-screen w-full absolute flex items-center justify-center bg-modal">
      <div class="bg-white rounded shadow p-8 m-4 max-w-xs max-h-full text-center overflow-y-scroll">
        looo
        <div class="mb-4">
          <h1>Welcome!</h1>
        </div>
        <div class="mb-8">
          <p>Ready to get started? Keep scrolling to see some great components.</p>
        </div>
        <div class="flex justify-center">
          <button @click="isOpen = false" class="flex-no-shrink text-black py-2 px-4 rounded bg-teal hover:bg-teal-dark">Let's Go</button>
        </div>
      </div>
    </div>
  </div>
</template>

<static-query>
query Search {
  allPost {
    edges {
      node {
        id
        path
        title
        summary
        headings {
          depth
          value
          anchor
        }
      }
    }
  }
  allDocumentation {
    edges {
      node {
        id
        path
        title
      }
    }
  }
}
</static-query>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SearchBox extends Vue {
  isOpen = false;
}
</script>
