import{_ as x,r as o,b as c,o as n,c as i,w as j,v as k,a as t,t as r,e as l,F as f,d as b}from"./index.11d245af.js";const S={data(){return{cari:"",surah:o([]),judul:o([]),name:[],terjemahan:o([]),audio:o([])}},watch:{cari(){this.getSurah(),this.getJudul(),this.getTerjemahan(),this.getAudio()}},mounted(){this.getSurah(),this.getJudul(),this.getTerjemahan(),this.getAudio()},methods:{getSurah(){c.get("https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number="+this.cari).then(e=>{this.surah=e.data.verses}).catch(e=>{console.log(e)})},getJudul(){c.get("https://api.quran.com/api/v4/chapters/"+this.cari+"?language=id").then(e=>{this.judul=e.data.chapter,this.name=this.judul.translated_name}).catch(e=>{console.log(e)})},getTerjemahan(){c.get("https://api.quran.com/api/v4/quran/translations/134?chapter_number="+this.cari).then(e=>{this.terjemahan=e.data.translations}).catch(e=>{console.log(e)})},getAudio(){c.get("https://api.quran.com/api/v4/chapter_recitations/2/"+this.cari).then(e=>{this.audio=e.data.audio_file}).catch(e=>{console.log(e)})}}},T={class:"text-lg-center mt-5"},q=t("h1",{class:"text-lg-center"},"Masukkan nomor surah!",-1),w={key:0},V={class:"mt-5"},M=t("br",null,null,-1),y=t("br",null,null,-1),A=t("br",null,null,-1),B={key:0,class:"text-lg-center mt-4"},D=["src"],J={class:"card-body"},L={class:"card-title text-end mt-3"},F=["innerHTML"];function H(e,u,N,C,s,E){var h,d,_,m,p;return n(),i("div",T,[q,j(t("input",{"onUpdate:modelValue":u[0]||(u[0]=a=>s.cari=a),class:"form-control me-2",type:"search",placeholder:"Search","aria-label":"Search"},null,512),[[k,s.cari]]),s.cari?(n(),i("div",w,[t("div",V,[t("h1",null,r((h=s.judul)==null?void 0:h.name_complex),1),M,t("h2",null,"("+r((d=s.name)==null?void 0:d.name)+")",1),y,t("h4",null,"Tempat Diturunkannya: "+r((_=s.judul)==null?void 0:_.revelation_place),1),A,t("h4",null,"Terdiri dari "+r((m=s.judul)==null?void 0:m.verses_count)+" ayat",1),s.audio?(n(),i("p",B,[t("audio",{src:(p=s.audio)==null?void 0:p.audio_url,controls:""},null,8,D)])):l("",!0)])])):l("",!0),s.cari?(n(!0),i(f,{key:1},b(s.surah,(a,g)=>{var v;return n(),i("div",{key:g,class:"card"},[t("div",J,[t("h5",L,r(a==null?void 0:a.text_uthmani)+r(a==null?void 0:a.verse_key),1),t("p",{class:"card-title text-start mt-3",innerHTML:(v=s.terjemahan[g])==null?void 0:v.text},null,8,F)])])}),128)):l("",!0)])}var z=x(S,[["render",H]]);export{z as default};
