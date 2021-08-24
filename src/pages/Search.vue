<template>
  <h1>Search gifs by: {{ this.searchTerm }}</h1>
  <div class="search">
    <input class="input" v-model="localSearchTerm" v-on:keyup="pressButton">
    <button
      class="search-button"
      :disabled="!localSearchTerm"
      :class="{ disabled: !localSearchTerm }"
      v-on:click="doSearch"
    >
      Search
    </button>
  </div>
  <div v-if="isSearchDone">
    <div v-for="gif in foundGifs" :key="gif.gfyId" class="gif">
      <img v-if="gif.gif100px" class="image" :src="gif.gif100px" />
      <div>
        <p class="name">Tag: {{ gif.tag }}</p>
        <p v-if="gif.title" class="info">Title: {{ gif.title }}</p>
        <p v-if="gif.userName" class="info">Author: {{ gif.userName }}</p>
        <p v-if="gif.createDate" class="info">Date: {{ (new Date(gif.createDate * 1000)).toDateString() }}</p>
        <p v-if="gif.views" class="info">Views: {{ gif.views }}</p>
        <p v-if="gif.gifSize" class="info">GIF Size: {{ Math.round(gif.gifSize / 1024) }}kB</p>
        <button class="button" v-on:click="toDetails(gif.gfyId)">
          Details
        </button>
      </div>
    </div>
  </div>
  <div v-if="isFetching" class="loading">Loading...</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapMutations } from 'vuex'
import router from '../router'

export default defineComponent({
  name: 'Search',
  data() {
    return {
      isFetching: false,
      localSearchTerm: '',
    }
  },
  methods: {
    setIsFetching(value: boolean) {
      this.isFetching = value
    },
    pressButton(e: any) {
      if (e.keyCode === 13) {
        this.doSearch()
      }    
    },
    doSearch() {
      if (this.localSearchTerm) {
        this.setSearchTerm(this.localSearchTerm)
        this.setIsFetching(true)
        fetch(`https://api.gfycat.com/v1/gfycats/search?search_text=${this.searchTerm}`)
          .then(res => res.json())
          .then(data => {
            const gifs = data.gfycats
            this.setFoundGifs(gifs)
            this.setIsSearchDone(true)
          })
          .catch(err => console.log(err.message))
          .finally(() => {
            this.setIsFetching(false)
          })
      }
    },
    toDetails(id: string) {
      router.push({ path: `/details/${id}` })
    },
    ...mapMutations([
      'setFoundGifs',
      'setIsSearchDone',
      'setSearchTerm',
    ]),
  },
  computed: {
    ...mapState([
      'foundGifs',
      'isSearchDone',
      'searchTerm',
    ]),
  },
})
</script>

<style>
.search {
  margin-bottom: 10px;
}
.input {
  padding: 5px;
  margin: 0 10px 10px 0;
  color: #000;
}
.search-button {
  padding: 5px;
}
</style>
