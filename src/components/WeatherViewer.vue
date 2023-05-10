<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const cityWeather = computed(() => store.state.weatherData)

const weatherState = computed(() => store.state.weatherData?.weather[0].main);

const backgroundImage = computed(() => {
  switch (weatherState.value) {
    case "Clear":
      return "./clear-sky.jpg";
    case "Clouds":
      return "./cloudy.jpg";
    case "Rain":
      return "./rainy.jpg";
    case "Snow":
      return "./snowy.jpg";
    default:
      return "./cloudy.jpg";
  }
});

const formattedDateTime = computed(() => store.getters['formattedDateTime'])

store.dispatch('updateNow')

const addLocation = (location) => {
  const savedLocations = JSON.parse(localStorage.getItem("savedLocations"));
  if (!savedLocations.some(loc => loc.id === location.id)) {
    savedLocations.push(location);
    localStorage.setItem("savedLocations", JSON.stringify(savedLocations));
  }
};

const saveLocation = () => {
  addLocation(cityWeather.value);
  alert("Saved successfully");
};

if (!localStorage.getItem("savedLocations")) {
  localStorage.setItem("savedLocations", "[]");
}
</script>

<template>
  <div
    class="result-container"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <div class="city-detail" v-if="cityWeather">
      <div class="country-header flex justify-between items-center">
        <div>
          <h2>{{cityWeather.name}}, {{cityWeather.sys.country}}</h2>
        <p>{{formattedDateTime}}</p>
        </div>
        <button class="btn primary-btn" @click="saveLocation">Save Location</button>
      </div>
      <div class="drilled-info">
        <div class="flex justify-between items-center weather-box" >
          <div class="weather-state">
            <div>
            <i
              class="fas fa-sun sun"
              v-if="cityWeather.weather[0].main === 'Clear'"
            ></i>
            <i
              class="fas fa-cloud cloud"
              v-if="cityWeather.weather[0].main === 'Clouds'"
            ></i>
            <i
              class="fas fa-cloud-rain rain"
              v-if="cityWeather.weather[0].main === 'Rain'"
            ></i>
          </div>
          </div>
          <div class="text-center">
            <h2>{{cityWeather.main.temp}}°</h2>
          <p>{{cityWeather.weather[0].main}}</p>
          </div>
        </div>
        <div class="other-box flex justify-between">
          <div class="top-section">
            <div>
              <h4>{{ cityWeather.main.temp_max }}</h4>
              <p>High</p>
            </div>
            <div>
              <h4>{{ cityWeather.wind.speed}}mph</h4>
              <p>Wind</p>
            </div>
            <div>
              <h4>{{ cityWeather.main.humidity }}%</h4>
              <p>Humidity</p>
            </div>
          </div>
          <div class="bottom-section">
            <div>
              <h4>{{ cityWeather.main.temp_min }}</h4>
              <p>Low</p>
            </div>
            <div>
              <h4>{{ cityWeather.main.pressure }}in</h4>
              <p>Pressure</p>
            </div>
            <div>
              <h4>41%</h4>
              <p>Precipitation</p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center home-btn-container">
        <router-link to="/" class="btn home-btn">Back to Home</router-link>
        <router-link to="/saved-locations" class="btn home-btn">View Saved Locations</router-link>
      </div>
    </div>
  </div>
</template>
  
 
  <style scoped>
.result-container {
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.city-detail {
  width: 60%;
  border-radius: 15px;
  padding: 60px;
  background: rgba(14, 12, 12, 0.15);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  color: #fff;

  min-height: 400px;
}

.top-section, .bottom-section, .drilled-info {
  display: flex;
}

.country-header {
  margin-bottom: 30px;
}

.country-header h2 {
  font-size: 40px;
}

.weather-state i {
  font-size: 100px;
}

.weather-box {
  min-width: 30%;
  border-right: 1px solid #ccc;
  padding: 20px;
  gap: 20px;
}

.weather-box h2 {
  font-size: 70px;
}

.top-section, .bottom-section {
  gap: 40px;
  text-align: center;
}

.top-section div, .bottom-section div {
  min-width: 10%;
  
}

.top-section h4, .bottom-section h4 {
  font-size: 20px;
}

.drilled-info {
  gap: 20px;
}

.other-box {
  width: 50%;
  flex-direction: column;
}

.home-btn-container {
  margin-top: 30px;
  gap: 10px;
}

@media (max-width: 769px) {
  .city-detail {
    width: 90%;
  }

  .weather-box h2 {
    font-size: 40px;
  }
}

@media (max-width: 426px) {

  .city-detail {
    padding: 60px 20px;
  }
  .home-btn-container {
    flex-direction: column;
    text-align: center;
  }

  .drilled-info {
    flex-direction: column;
  }

  .weather-state i {
    font-size: 70px;
  }

  .country-header {
    flex-direction: column-reverse;
    gap: 30px;
  }

  .weather-box, .other-box {
    width: 100%;
  }

  .weather-box {
    border-right: none;
  }

  .top-section {
    margin-bottom: 30px;
  }

}
</style>
  