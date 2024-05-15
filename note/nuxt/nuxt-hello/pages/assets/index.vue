<template>
    <div> 
      <h3> 资源 </h3>
      <p><code> &lt;img src="/nuxt.png" alt="nuxt.png" &gt; </code></p>
      <img src="/nuxt.png" alt="nuxt.png">
      <p><code> &lt;img src="~/assets/nuxt.png" alt="nuxt.png" /&gt; </code></p>
      <img src="~/assets/nuxt.png" alt="nuxt.png" />
    </div>
</template>

<style lang="scss">
  img {
    width:128px;
    height: auto;
  }
</style>