import {ref, onMounted, onUnmounted} from "vue";
function useMousePosition() {
  const x = ref(0);
  const y = ref(0);

  function updateMousePosition(event: MouseEvent) {
    x.value = event.clientX;
    y.value = event.clientY;
  }

  onMounted(() => {
    window.addEventListener("click", updateMousePosition);
  });

  onUnmounted(() => {
    window.removeEventListener("click", updateMousePosition);
  });
  return {x, y};
}

export default useMousePosition;