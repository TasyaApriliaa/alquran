<script>
import { ref } from "vue";
import axios from "axios";

export default {
  data() {
    return {
      cari: '1',
      surah: ref([]),
      judul: ref([]),
      name: [],
      terjemahan: ref([]),
      audio: ref([])
    }
  },

  watch: {
    cari() {
      this.getSurah()
      this.getJudul()
      this.getTerjemahan()
      this.getAudio()

    }
  },

  mounted() {
    this.getSurah()
    this.getJudul()
    this.getTerjemahan()
    this.getAudio()
  },

  methods: {
    getSurah() {
      axios.get('https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=' + this.cari )
        .then(response => {
          this.surah = response.data.verses
        })
        .catch(error => {
          console.log(error)
        })
    },

    getJudul() {
      axios.get('https://api.quran.com/api/v4/chapters/' + this.cari + '?language=id')
        .then(response => {
          this.judul = response.data.chapter
          this.name = this.judul.translated_name
        })
        .catch(error => {
          console.log(error)
        })
    },
    getTerjemahan() {
      axios.get('https://api.quran.com/api/v4/quran/translations/134?chapter_number=' + this.cari )
        .then(response => {
          this.terjemahan = response.data.translations
        })
        .catch(error => {
          console.log(error)
        })
    },
    getAudio() {
      axios.get('https://api.quran.com/api/v4/chapter_recitations/2/' + this.cari )
        .then(response => {
          this.audio = response.data.audio_file
        })
        .catch(error => {
          console.log(error)
        })
    }

  }
}
</script>

<template>
  <div class="text-center mt-5">
    <h2>Masukkan Nomor Surah Yang Akan Dicari!</h2>
    <input v-model="cari" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
    <div class="mt-5">
      <h1>{{ judul.name_complex }}</h1>
      <br>
      <h3>({{ name.name }})</h3>
      <br>
      <h5>Tempat Diturunkannya: {{ judul.revelation_place }}</h5>
      <h5 class="mt-4">Terdiri Dari: {{judul.verses_count}} ayat</h5>
      <div v-if="audio" class="text-center">
        <audio v-bind:src="audio.audio_url" controls></audio>
      </div>
    </div>
    <div v-for="(ayat,i) in surah" :key="i" class="card">
      <h5 class="card-title text-lg-end mt-5">{{ ayat.text_uthmani }}{{ayat.verse_key}}</h5>
        <p class="card-text text-lg-start mt-3" v-html="terjemahan[i].text"></p>
    </div>

  </div>
</template>
<style>
h1{
  color: #b04c6a;
}

audio{
  margin-top: 80px;
  margin-bottom: 50px;
}
</style>