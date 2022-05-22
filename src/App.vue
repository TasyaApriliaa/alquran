<script>
import { RouterView } from 'vue-router'
import { ref } from "vue";
import axios from "axios";
import FooterItem from "./components/FooterItem.vue";

export default {
  data()
  {
    return {
      error: false,
      loading: true,
      juzs: ref([]),
      surahs: ref([])
    }
  },

  components: {
    FooterItem,
    RouterView
  },

  mounted() {
    this.getJuz()
    this.getSurah()
  },

  methods: {
    getJuz() {
      axios.get('https://api.quran.com/api/v4/juzs')
        .then(response => {
          this.juzs = response.data.juzs
        })
        .catch(error => {
          console.log(error)
          this.error = true
        })
        .finally(() => this.loading = false)
    },

    getSurah() {
      axios.get('https://api.quran.com/api/v4/chapters')
        .then(response => {
          this.surahs = response.data.chapters
        })
        .catch(error => {
          console.log(error)
          this.error = true
        })
        .finally(() => this.loading = false)
    },
  }
}
</script>

<template>
  <section v-if="error">
    <div class="container">
      <h1 class="text-center">KODINGAN ERROR!</h1>
    </div>
  </section>

  <section v-else>
    <div v-if="loading" class="container">
      <h1 class="text-center">Loading...</h1>
    </div>

    <div v-else class="container">
      <ul class="nav nav-pills justify-content-center mt-4">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"
             aria-expanded="false" style="color: black">Juz</a>
          <ul class="dropdown-menu">
            <li v-for="juz in juzs" :key="juz.id">
              <router-link :to="{ name: 'juzs', params: { id: juz.id } }" class="dropdown-item">{{ juz.juz_number }}
              </router-link>
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'surah' }" class="nav-link" style="color: black">Surah</router-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"
             aria-expanded="false" style="color: black">Info Surah</a>
          <ul class="dropdown-menu">
            <li v-for="surah in surahs" :key="surah.id">
              <router-link :to="{ name: 'infosurahs', params: { id: surah.id } }" class="dropdown-item">
                {{surah.name_complex}}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
      <RouterView />
    </div>
  </section>
  <FooterItem/>
</template>

<style>
.container {
  margin-bottom: 200%;
}
.nav {
  background: linear-gradient(45deg, #f3afc4, #efc5ac);
  animation: hue-rotate 1s linear infinite alternate;
}

@keyframes hue-rotate {
  to{filter: hue-rotate(90deg);}
}

.nav-item {
  background-image: linear-gradient(transparent 0%, transparent 90%, #dcaa8d 90%, rgba(139, 77, 14, 0.5) 100%);
  background-repeat: no-repeat;
  background-size: 0% 100%;
  background-position-x: right;
  transition: background-size 300ms;
}

.nav-item:hover{
  background-size: 100% 100%;
  background-position-x: left;
}
</style>
