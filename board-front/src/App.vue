<script setup>
import { computed } from 'vue';
import { useRouter } from "vue-router";
import HelloWorld from './components/HelloWorld.vue'

const router = useRouter()
const layout = computed(() => {

let layout = router.currentRoute.value.meta.layout
  if(layout === undefined){
    layout = "layoutContents"
  }
  console.log("-=-------------------------");
  console.log("layout: %s", router.currentRoute.value.meta.layout);

  return layout
})
</script>

<template>
  <div>
    test
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
