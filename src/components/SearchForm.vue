<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const searchTerm = ref("");
const store = useStore();

const search = async () => {
  if (searchTerm.value) {
    store.commit("addSearchToHistory", searchTerm.value);
    await store.dispatch("fetchWeatherData", searchTerm.value);
  }
};
</script>

<template>
  <div class="search-box">
    <form @submit.prevent="search">
      <div class="input-stretch">
        <input
          v-model.trim="searchTerm"
          type="text"
          placeholder="Search for a city"
        />
        <button type="submit">Search</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.search-box {
  width: 100%;
}
.search-box input {
  width: 100%;
  padding: 15px 80px 15px 15px;
  border-radius: 6px;
  outline: none;
  border: none;
  font-size: 16px;
}

.search-box button {
  background: #0077be;
  border-radius: 6px;
  border: none;
  color: #fff;
  padding: 10px;
  cursor: pointer;
  position: absolute;
  right: 5px;
  top: 6px;
}

.search-box .input-stretch {
  display: flex;
  position: relative;
}
</style>