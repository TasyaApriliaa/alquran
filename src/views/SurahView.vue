<script>
import { ref } from "vue";
import axios from "axios";

export default {
  data() {
    return {
      cari: "",
      surah: ref([]),
      judul: ref([]),
      name: [],
      terjemahan: ref([]),
      audio: ref([]),
    }
  },

  watch: {
    cari() {
      this.getSurah();
      this.getJudul();
      this.getTerjemahan();
      this.getAudio();
    }
  },

  mounted() {
    this.getSurah();
    this.getJudul();
    this.getTerjemahan();
    this.getAudio();
  },

  methods: {
    getSurah() {
      axios
        .get(
          "https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=" +
            this.cari
        )
        .then((response) => {
          this.surah = response.data.verses;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getJudul() {
      axios
        .get(
          "https://api.quran.com/api/v4/chapters/" + this.cari + "?language=id"
        )
        .then((response) => {
          this.judul = response.data.chapter;
          this.name = this.judul.translated_name;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getTerjemahan() {
      axios
        .get(
          "https://api.quran.com/api/v4/quran/translations/134?chapter_number=" +
            this.cari
        )
        .then((response) => {
          this.terjemahan = response.data.translations;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAudio() {
      axios
        .get("https://api.quran.com/api/v4/chapter_recitations/2/" + this.cari)
        .then((response) => {
          this.audio = response.data.audio_file;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<template>
  <div class="text-center mt-5">
    <img src="../assets/alquran.png" alt="logo" width="550">
    <h1>Masukkan nomor surah yang akan dicari!</h1>
    <input v-model="cari" class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>

    <div v-if="cari">
      <div class="mt-5 ">
        <h1>{{ judul?.name_complex }}</h1>
        <br>
        <h2>({{ name?.name }})</h2>
        <br>
        <h4>Tempat Diturunkannya: {{ judul?.revelation_place }}</h4>
        <br>
        <h4>Terdiri dari {{judul?.verses_count}} ayat</h4>
      </div>
        <p v-if="audio" class="text-lg-center mt-4">
          <audio v-bind:src="audio?.audio_url" controls></audio>
        </p>
    </div>
  </div>
    <div v-if="cari" v-for="(ayat,index) in surah" :key="index" class="card">
      <div class="card-body">
        <h5 class="card-title text-end  mt-3">{{ ayat?.text_uthmani}}{{ayat?.verse_key}}</h5>
        <p class="card-title text-start mt-3" v-html="terjemahan[index]?.text"></p>
      </div>
    </div>
</template>
<style>
h1 {
  color: #b04c6a;
}

audio {
  margin-top: 80px;
  margin-bottom: 50px;
}
</style>
