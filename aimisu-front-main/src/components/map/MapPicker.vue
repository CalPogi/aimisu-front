<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700"> Event Location (pick on map) </label>
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search location..."
      class="w-full px-3 py-2 border rounded focus:ring"
      @input="searchLocation"
    />
    <div v-if="results.length" class="border rounded max-h-40 overflow-auto z-50 bg-white">
      <button
        v-for="res in results"
        :key="res.id"
        @click="selectResult(res)"
        class="w-full px-3 py-2 text-left hover:bg-gray-100"
      >
        {{ res.place_name }}
      </button>
    </div>
    <div ref="mapDiv" class="w-full h-64 rounded-lg border"></div>
    <div v-if="pickedLocation" class="text-sm bg-gray-50 p-2 mt-2 rounded">
      📍 {{ pickedLocation.name }}
      <br />
      Lat: {{ pickedLocation.coordinates[1] }}, Lng: {{ pickedLocation.coordinates[0] }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const props = defineProps({
  modelValue: { type: Object, default: null },
})
const emit = defineEmits(['update:modelValue'])

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

const mapDiv = ref(null)
const searchQuery = ref('')
const results = ref([])
const pickedLocation = ref(props.modelValue || null)

let map = null
let marker = null

onMounted(() => {
  map = new mapboxgl.Map({
    container: mapDiv.value,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: pickedLocation.value?.coordinates || [121.693, 16.722],
    zoom: 12,
  })

  map.addControl(new mapboxgl.NavigationControl())

  // Add initial marker if value exists
  if (pickedLocation.value?.coordinates) {
    setMarker(pickedLocation.value.coordinates, pickedLocation.value.name)
  }

  map.on('click', async (e) => {
    const coords = [e.lngLat.lng, e.lngLat.lat]
    const name = await getAddress(coords)
    updateLocation(coords, name)
  })
})

function setMarker(coords, name) {
  if (marker) marker.remove()
  marker = new mapboxgl.Marker()
    .setLngLat(coords)
    .setPopup(new mapboxgl.Popup().setHTML(`<strong>${name}</strong>`))
    .addTo(map)
}

function updateLocation(coords, name) {
  pickedLocation.value = { coordinates: coords, name }
  setMarker(coords, name)
  emit('update:modelValue', pickedLocation.value)
}

function selectResult(result) {
  const coords = result.center
  updateLocation(coords, result.place_name)
  map.flyTo({ center: coords, zoom: 15 })
  searchQuery.value = ''
  results.value = []
}

function searchLocation() {
  if (searchQuery.value.length < 3) {
    results.value = []
    return
  }
  fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery.value)}.json?access_token=${mapboxgl.accessToken}&country=PH&limit=5`,
  )
    .then((res) => res.json())
    .then((data) => {
      results.value = data.features || []
    })
}

async function getAddress(coords) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords[0]},${coords[1]}.json?access_token=${mapboxgl.accessToken}`
  const response = await fetch(url)
  const data = await response.json()
  return data.features[0]?.place_name || 'Selected location'
}
</script>
