<script setup>
import SearchForm from "../components/SearchForm.vue";
import axios from "axios";
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const isLoading = ref(true);
const weatherData = computed(() => store.state.weatherData);

const getWeather = async (latitude, longitude) => {
  await store.dispatch("fetchCurrentLocationWeatherData", { latitude, longitude });
};

// const getWeather = async (latitude, longitude) => {
//   const apiKey = import.meta.env.VUE_APP_API_KEY;
//   console.log(import.meta.env)
//   console.log(apiKey)
//   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

//   try {
//     const response = await axios.get(url);
//     weatherData.value = response.data;
//   } catch (error) {
//     console.log(error);
//   }

//   isLoading.value = false;
// };

const searchForLocation = async (term) => {
  store.commit("addSearchToHistory", term);
  await store.dispatch("fetchWeatherData", term);
};
const formattedDateTime = computed(() => store.getters['formattedDateTime'])

store.dispatch('updateNow')

onMounted(() => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position)
      const { latitude, longitude } = position.coords;
      getWeather(latitude, longitude);
    },
    (error) => {
      console.log(error);
      isLoading.value = false;
    }
  );
});
</script>
<template>
  <div class="weather-container">
    <div class="currentLocation">
      <h3>Weather-wiz</h3>
      <!-- {{ weatherData }} -->
      <div v-if="isLoading">Loading...</div>
      <div class="info" v-if="weatherData">
        <h2 class="temp">{{ weatherData.main.temp }}°</h2>
        <div>
          <h2 class="country">{{ weatherData.name }}</h2>
          <h4 class="date-info">{{formattedDateTime}}</h4>
        </div>
        <div class="weather-box">
          <div>
            <i
              class="fas fa-sun"
              v-if="weatherData.weather[0].main === 'Clear'"
            ></i>
            <i
              class="fas fa-cloud"
              v-if="weatherData.weather[0].main === 'Clouds'"
            ></i>
            <i
              class="fas fa-cloud-rain"
              v-if="weatherData.weather[0].main === 'Rain'"
            ></i>
          </div>
          <h6 class="condition">{{ weatherData.weather[0].main }}</h6>
        </div>
      </div>
    </div>
    <div class="search-section">
      <search-form />
      <div class="compartment">
        <div>
          <p>Your Previous Searches</p>
          <p v-if="$store.state.searchHistory.length < 1">No searches yet</p>
          <button
            v-for="(search, index) in $store.state.searchHistory"
            :key="index"
            @click="searchForLocation(search)"
            class="searched-item"
          >
            {{ search }}
          </button>
        </div>
      </div>
      <hr />
      <div class="compartment" v-if="weatherData">
        <h3>Weather Details</h3>
        <div class="weather-details">
          <h4>Humidity</h4>
          <h4>{{ weatherData.main.humidity }}%</h4>
        </div>
        <div class="weather-details">
          <h4>Temperature</h4>
          <h4>{{ weatherData.main.temp }}°C</h4>
        </div>
        <div class="weather-details">
          <h4>Wind Speed</h4>
          <h4>{{ weatherData.wind.speed }} m/s</h4>
        </div>
      </div>
      <router-link to="/saved-locations" class="btn home-btn"
        >View Saved Locations</router-link
      >
    </div>
  </div>
</template>

<style scoped>
.weather-container {
  min-height: 100vh;
  display: flex;
  background: url(../assets/img/cloudy.jpg);
  background-size: cover;
  background-position: center;
}

.currentLocation {
  width: 65%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 60px 100px;
  color: #fff;
}

.currentLocation .info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.currentLocation .info .temp {
  font-size: 100px;
  margin-bottom: 0;
}

.currentLocation .info .condition {
  font-size: 24px;
}

.search-section {
  width: 35%;
  padding: 60px 10px 30px 30px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  color: #fff;
}

.compartment {
  margin: 30px 0;
}
.compartment h3 {
  margin-bottom: 15px;
}

.weather-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.weather-details h4 {
  font-size: 20px;
}

.searched-item {
  padding: 5px;
  margin-bottom: 5px;
  width: 100%;
  cursor: pointer;
  background: transparent;
  border: none;
  text-align: left;
  font-size: 20px;
  color: #fff;
}

@media (max-width: 426px) {
  .weather-container {
    flex-direction: column;
  }

  .currentLocation, .search-section {
    width: 100%;
  }

  .currentLocation {
    padding: 20px;
  }

  .currentLocation .info {
    flex-direction: column;
  }

  .currentLocation .info .temp {
    font-size: 70px;
  }

  .info {
    text-align: center;
  }
}
</style>