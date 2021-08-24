<template>
  <h1>List of populated gifs</h1>
  <div v-if="isFetched">
    <div class="pagenavigation">
      <button
        v-for="i in pageKeys"
        :key="i"
        class="button"
        :class="{ selected: selectedPageNumber === i }"
        :disabled="selectedPageNumber === i"
        v-on:click="setSelected(i)"
      >
        {{ i }}
      </button>
    </div>
    <div v-for="gif in selectedPage" :key="gif.tag" class="gif">
      <img v-if="gif.gfycats[0].gif100px" class="image" :src="gif.gfycats[0].gif100px" />
      <div>
        <p class="name">Tag: {{ gif.tag }}</p>
        <div v-if="gif.gfycats[0]">
          <p v-if="gif.gfycats[0].title" class="info">Title: {{ gif.gfycats[0].title }}</p>
          <p v-if="gif.gfycats[0].userName" class="info">Author: {{ gif.gfycats[0].userName }}</p>
          <p v-if="gif.gfycats[0].createDate" class="info">Date: {{ (new Date(gif.gfycats[0].createDate * 1000)).toDateString() }}</p>
          <p v-if="gif.gfycats[0].views" class="info">Views: {{ gif.gfycats[0].views }}</p>
          <p v-if="gif.gfycats[0].gifSize" class="info">GIF Size: {{ Math.round(gif.gfycats[0].gifSize / 1024) }}kB</p>
        </div>
        <button class="button" v-on:click="toDetails(gif.gfycats[0].gfyId)">Details</button>
      </div>
    </div>
  </div>
  <div v-else class="loading">Loading...</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapMutations } from 'vuex'
import router from '../router'

const GIFS_IN_LIST = 10;

export default defineComponent({
  name: 'List',
  data() {
    return {
      pages: [] as any[],
      pagesCount: 0,
    }
  },
  mounted() {
    if (this.isFetched) {
      this.initialize(this.gifs)
    } else {
      fetch('https://api.gfycat.com/v1/reactions/populated')
        .then(res => res.json())
        .then(data => {
          const gifs = data.tags
          this.initialize(gifs)
          this.setIsFetched(true)
          this.setGifs(gifs)
          this.setSelectedPageNumber(0)
        })
        .catch(err => console.log(err.message))
    }
  },
  methods: {
    initialize(gifs: any[]) {
      const pagesCount = Math.ceil(gifs.length / GIFS_IN_LIST)
      const pages = []

      for (let page = 0; page < pagesCount; page++) {
        pages.push(gifs.slice(page * GIFS_IN_LIST, (page + 1) * GIFS_IN_LIST))
      }

      this.pages = pages
      this.pagesCount = pagesCount
    },
    setSelected(i: number) {
      this.setSelectedPageNumber(i);
    },
    toDetails(id: string) {
      router.push({ path: `/details/${id}` })
    },
    ...mapMutations([
      'setGifs',
      'setIsFetched',
      'setSelectedPageNumber',
    ]),
  },
  computed: {
    selectedPage(): any[] {
      return this.pages[this.selectedPageNumber]
    },
    pageKeys(): number[] {
      return [...Array(this.pagesCount).keys()]
    },
    ...mapState([
      'gifs',
      'isFetched',
      'selectedPageNumber',
    ])
  },
})
</script>

<style>
.pagenavigation {
  margin-bottom: 10px;
}
button.selected {
  color: #00f;
  font-weight: 700;
  cursor: default;
}
</style>
