<script lang="ts">
export default defineComponent({
  name: 'TimePanel',
})
</script>

<script setup lang="ts">

const emit = defineEmits(['updateTime'])

interface Props {
  value: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: '00:00'
})

let timeArray = ref([] as string[])

for (let i = 0; i < 24; i++) {
  const hour = i < 10 ? `0${i}` : i;
  timeArray.value.push(`${hour}:00`);
  timeArray.value.push(`${hour}:30`);
}

const updateTime = (e: any) => {
  console.dir(e)
  emit('updateTime', e.target.textContent)
}



</script>

<template>
  <div class="time-panel flex flex-col items-center justify-start">
    <p
      v-for="(time,idx) in timeArray"
      :key="idx"
      @click="updateTime"
      class="cursor-pointer px-2"
      :class="time===value? 'active' : ''"
    >
      {{ time }}
    </p>   
  </div>
</template>

<style lang="scss" scoped>
.time-panel {
  overflow-y: scroll;
  height: 100%;
  font-size: 12px;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.time-panel::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.time-panel {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.active {
  background-color: #d0021b;
  color: white;
}
</style>