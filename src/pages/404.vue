<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <h1 class="text-4xl font-bold mb-16">Page Not Found (404)</h1>
      <g-image class="w-1/2" src="../../static/oops.png" alt="404 page not found"/>
      <p>Don't know how you ended up here, but the page doesn't exist. Or well, <em>this</em> page
        exists, but it's a <em>page not found</em> page...you get the point.</p>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Page Not Found',
    htmlAttrs: {
      lang: this.$i18n.locale
    }
  }
}
</script>

