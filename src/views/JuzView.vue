<script>
import { ref } from "vue";
import axios from "axios";

export default {
  data() {
    return {
      error: false,
      loading: true,
      juzke: ref([]),
      bacajuz: ref([]),
    };
  },

  watch:{
    $route(){
      this.getJuzke();
      this.getBacaJuz();
    }
  },

  mounted() {
    this.getJuzke();
    this.getBacaJuz();
  },

  methods: {
    getJuzke() {
      axios
        .get("https://api.quran.com/api/v4/juzs/" + this.$route.params.id)
        .then((response) => {
          this.juzke = response.data.juz;
        })
        .catch((error) => {
          console.log(error);
          this.error = true;
        })
        .finally(() => (this.loading = false));
    },
    getBacaJuz() {
      axios
        .get(
          "https://api.quran.com/api/v4/quran/verses/uthmani?juz_number=" +
            this.$route.params.id
        )
        .then((response) => {
          this.bacajuz = response.data.verses;
        })
        .catch((error) => {
          console.log(error);
          this.error = true;
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<template>
  <div class="text-center mt-5">
    <h1>--- Juz {{ $route.params.id }} ---</h1>
    <h4 v-for="quran in bacajuz" :key="quran.id" class="text-lg-end mt-5">
      {{ quran.text_uthmani }} {{ quran.verse_key }}
    </h4>
  </div>
</template>
