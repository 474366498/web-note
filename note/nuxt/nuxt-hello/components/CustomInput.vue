

<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input type="text" v-bind:value="modelValue" @input="$emit('update:modelValue',$event.target.value)" />
</template>

<style>
  input {
    border:1px solid pink;
    color:black;
  }
  input:focus {
    outline: none;
    border-color:red;
  }
</style>