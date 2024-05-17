<template>
  <section class="layout-default h-screen text-white bg-slate-900 flex flex-col"> 
    <AppHeader />
    <section class="flex-1">
      <div> layout default </div>
      <slot />  
    </section>
    <BaseComponent /> 
    <div> layout footer</div>
  </section>
</template>