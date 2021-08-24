<template>
  <h1>Gif details: {{ this.gfyid }}</h1>
  <div v-if="this.gfyid">
    <div v-if="this.selectedGif" class="gif">
      <img v-if="selectedGif.gifUrl" class="image" :src="selectedGif.gifUrl" />
      <img v-if="selectedGif.gif100px" class="image" :src="selectedGif.gif100px" />
      <div>
        <p v-if="selectedGif.title" class="name">Title: {{ selectedGif.title }}</p>
        <p v-if="selectedGif.gfyName" class="info">Name: {{ selectedGif.gfyName }}</p>
        <p v-if="selectedGif.username" class="info">Author: {{ selectedGif.username }}</p>
        <p v-if="selectedGif.createDate" class="info">Date: {{ (new Date(selectedGif.createDate * 1000)).toDateString() }}</p>
        <p v-if="selectedGif.views" class="info">Views: {{ selectedGif.views }}</p>
        <p v-if="selectedGif.gifSize" class="info">GIF Size: {{ Math.round(selectedGif.gifSize / 1024) }}kB</p>
        <p v-if="selectedGif.tags" class="info">Tags: {{ selectedGif.tags.join(', ') }}</p>
      </div>
    </div>
    <div v-else class="loading">Loading...</div>
  </div>
  <div v-else class="loading">404. Not found</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapMutations } from 'vuex'

export default defineComponent({
  name: 'Details',
  props: ['id'],
  mounted() {
    if (!this.selectedGif) {
      fetch(`https://api.gfycat.com/v1/gfycats/${this.gfyid}`)
        .then(res => res.json())
        .then(data => {
          const gif = data.gfyItem
          this.setDetailsById({
            id: this.gfyid,
            gif,
          })
        })
        .catch(err => console.log(err.message))
    }
  },
  computed: {
    gfyid(): string {
      return this.$route.params.id as string
    },
    selectedGif(): any[] {
      return this.detailsById[this.gfyid]
    },
    ...mapState([
      'detailsById',
    ]),
  },
  methods: {
    ...mapMutations([
      'setDetailsById',
    ]),
  },
})
</script>
