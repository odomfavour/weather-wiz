<script setup>
import "@fortawesome/fontawesome-free/css/all.css";
</script>

<template>
  <div>
    <router-view />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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
  background: goldenrod;
  color: #fff;
}

.home-btn {
  background: rgb(108, 82, 15);
  color: #fff;
  text-decoration: none;
}
</style>
