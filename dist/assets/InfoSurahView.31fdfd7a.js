import{_ as o,r as s,b as r,o as i,c as n,a,t as h,F as c,e as l}from"./index.6aed61fc.js";const u={data(){return{error:!1,loading:!0,info:"",surah:s([]),infosurah:s([])}},watch:{$route(){this.getSurah(),this.getInfoSurah()}},mounted(){this.getSurah(),this.getInfoSurah()},methods:{getSurah(){r.get("https://api.quran.com/api/v4/chapters/"+this.$route.params.id).then(t=>{this.surah=t.data.chapter}).catch(t=>{console.log(t),this.error=!0}).finally(()=>this.loading=!1)},getInfoSurah(){r.get("https://api.quran.com/api/v4/chapters/"+this.$route.params.id+"/info?language=id").then(t=>{this.infosurah=t.data.chapter_info,this.info=this.infosurah.text}).catch(t=>{console.log(t),this.error=!0}).finally(()=>this.loading=!1)}}},f={class:"text-center mt-5 mb-5"},p=a("img",{src:l,alt:"logo",width:"550"},null,-1),d={class:"text-start"},_=["innerHTML"];function g(t,m,S,x,e,v){return i(),n(c,null,[a("div",f,[p,a("h1",null,"--- Surah "+h(e.surah.name_complex)+" ---",1)]),a("div",d,[a("div",{innerHTML:e.info},null,8,_)])],64)}var I=o(u,[["render",g]]);export{I as default};
