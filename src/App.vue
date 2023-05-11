<script setup>
import "@fortawesome/fontawesome-free/css/all.css";
import AlertModal from "./components/AlertModal.vue";
</script>

<template>
  <div>
    <router-view />
    <alert-modal/>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Jost', sans-serif;
}

.flex {
  display: flex;
}

.justify-between {
  justify-content: space-between;
}

.justify-center {
  justify-content: center;
}

.items-center {
  align-items: center;
}

.sun {
  color: #ffb347;
}

.rain {
  color: #363636;
}

.cloud {
  color: #fff;
}

.text-center {
  text-align: center;
}

.btn {
  padding: 10px 25px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.primary-btn {
  background: #0077be;
  color: #fff;
  font-size: 18px;
}

.sec-btn {
  border: 2px solid #0077be;
  color: #0077be;
  background: #fff;
  text-decoration: none;
  font-size: 18px;
}

.back-home {
  margin-bottom: 30px;
}

.round-btn {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #000;
}
</style>
