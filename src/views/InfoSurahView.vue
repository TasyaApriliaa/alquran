<script>
import { ref } from "vue";
import axios from "axios";

export default {
  data() {
    return {
      error: false,
      loading: true,
      info: "",
      surah: ref([]),
      infosurah: ref([]),
    }
  },

  watch: {
    $route() {
      this.getSurah();
      this.getInfoSurah();
    }
  },

  mounted() {
    this.getSurah();
    this.getInfoSurah();
  },

  methods: {
    getSurah() {
      axios
        .get("https://api.quran.com/api/v4/chapters/" + this.$route.params.id)
        .then((response) => {
          this.surah = response.data.chapter;
        })
        .catch((error) => {
          console.log(error);
          this.error = true;
        })
        .finally(() => (this.loading = false));
    },
    getInfoSurah() {
      axios
        .get(
          "https://api.quran.com/api/v4/chapters/" +
            this.$route.params.id +
            "/info?language=id"
        )
        .then((response) => {
          this.infosurah = response.data.chapter_info;
          this.info = this.infosurah.text;
        })
        .catch((error) => {
          console.log(error);
          this.error = true;
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>

<template>
  <div class="text-center mt-5 mb-5">
    <img src="../assets/alquran.png" alt="logo" width="350">
    <h1>--- Surah {{ surah.name_complex }} ---</h1>
  </div>
  <div class="text-start">
    <div v-html="info"></div>
  </div>
</template>
