<template>
  <section>
    <h1>Hi, my name is</h1>
    <h2 class="text-7xl">Yuniel Acosta.</h2>
    <h3 class="text-7xl">I build things for the web.</h3>
    <p>
      I'm a software engineer based in Boston, MA specializing in building (and occasionally
      designing) exceptional websites, applications, and everything in between.
    </p>
    <a :href="`mailto: ${email}`" class="big-button email-link">Get In Touch</a>
  </section>
</template>

<script>
const {email} = require("../../config");
export default {
  name: "Hero"
}
</script>

<style scoped>
section {
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
}

section h1 {
  margin: 0 0 30px 4px;
  color: var(--green);
  font-family: var(--font-mono);
  font-size: clamp(14px, 5vw, 16px);
  font-weight: 400;
}

@media (max-width: 480px) {
  section h1 {
    margin: 0 0 20px 2px;
  }
}

section h3 {
  margin-top: 10px;
  color: var(--slate);
  line-height: 0.9;
}

section p {
  margin: 20px 0 0;
  max-width: 500px;
}

section .email-link {
  margin-top: 50px;
}
</style>