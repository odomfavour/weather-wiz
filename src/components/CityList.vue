<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import router from "../router";

const store = useStore();

// Fetch saved location on component mount
store.dispatch("fetchSavedLocation");
const savedLocations = ref(JSON.parse(localStorage.getItem("savedLocations")));
const removeLocation = (location) => {
  savedLocations.value = savedLocations.value.filter(
    (item) => item.id !== location.id
  );
  localStorage.setItem("savedLocations", JSON.stringify(savedLocations.value));
};

const displayWeatherData = (location) => {
  store.commit("SET_WEATHER_DATA", location);
  router.push({ name: "result" });
};
</script>

<template>
  <!-- <div v-if="weatherData">{{ weatherData}}{{ weatherData.sys }}</div> -->
  <div class="saved-location-section">
    <div class="container">
      <!-- {{store.state.weatherData.name }}{{store.state.weatherData.sys.country }} -->
      <div class="back-home">
        <router-link to="/" class="btn round-btn"
          ><i class="fa-solid fa-arrow-left"></i
        ></router-link>
      </div>
      <header>
        <div>
          <h3>Saved Locations</h3>
          <p>Find your saved locations here</p>
        </div>
      </header>
      <div class="locations-container">
        <div
          class="location-card"
          v-for="location in savedLocations"
          :key="location.id"
        >
          <div @click="displayWeatherData(location)">
            {{ location.name }}, {{ location.sys.country }}
          </div>
          <button @click="removeLocation(location)" class="delete-btn">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.saved-location-section {
  min-height: 100vh;
  background: linear-gradient(45deg, #000000c7, #000000c9),
    url(/favorite.jpg) no-repeat;
  background-position: top center;
  background-size: cover;
}

.container {
  width: 80%;
  margin: 0 auto;
}

.back-home {
  padding-top: 40px;
}
.saved-location-section header {
  padding: 20px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.saved-location-section h3 {
  margin-bottom: 20px;
  font-size: 40px;
  font-weight: bold;
}

.saved-location-section h3,
.saved-location-section p {
  text-align: center;
}
.locations-container {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
  padding-bottom: 30px;
}
.location-card {
  padding: 10px 20px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  border-radius: 10px;
  width: 20%;
  cursor: pointer;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.delete-btn {
  background: #ccc;
  color: red;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  font-size: 20px;
}
@media (max-width: 769px) {
  .container {
    width: 90%;
  }
  .location-card {
    width: 32%;
  }

  .locations-container {
    gap: 10px;
  }
}

@media (max-width: 426px) {
  .saved-location-section header {
    flex-direction: column;
  }

  .location-card {
    width: 100%;
  }

  .saved-location-section h3 {
    font-size: 30px;
  }
}
</style>
