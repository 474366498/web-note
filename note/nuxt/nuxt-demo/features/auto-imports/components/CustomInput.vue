

<script setup lang="ts">
defineProps(['modelValue']) 
defineEmits(['update:modelValue'])
</script>


<template>
  <input :value="modelVale" type="text" @input="$emit('update:modelValue',$event.target.value)" />
</template>
<style>
input{
  border:1px solid pink;
}
input:focus{
  outline: none;
  border-color:red;
}
</style>