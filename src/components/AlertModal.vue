<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const closeModal = () => {
  store.commit("SET_MODAL");
};
const isError = computed(() => store.state.isError);
const errorMsg = computed(() => store.state.errorMsg);
const alertMsg = computed(() => store.state.alertMsg);
</script>

<template>
  <div class="overlay" v-if="isError">
    <div class="overlay-inner">
      <div class="alert-box">
        <div class="header">
          <button class="cancel-btn" role="button" @click="closeModal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="content-box">
          <div v-if="errorMsg" class="error">
            <div>
              <i class="fas fa-triangle-exclamation"></i>
            </div>
            <h3>{{ errorMsg }}</h3>
          </div>
          <div v-if="alertMsg" class="success">
            <div>
              <i class="fas fa-check"></i>
            </div>
            <h3>{{ alertMsg }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  background: #000000c9;
  top: 0;
  z-index: 100;
}

.overlay-inner {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
}

.header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.cancel-btn {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ccc;
  cursor: pointer;
  padding: 10px;
  border: none;
}
.alert-box {
  width: 40%;
  background: #fff;
  border-radius: 15px;
  height: 300px;
  padding: 20px 30px;
  border: none;
}

.content-box {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.header i {
  font-size: 26px;
}
.error i {
  font-size: 100px;
  color: gold;
}
.success i {
  font-size: 100px;
  color: green;
}

@media (max-width: 769px) {
  .alert-box {
    width: 70%;
  }
}
@media (max-width: 426px) {
  .alert-box {
    width: 90%;
  }
}
</style>