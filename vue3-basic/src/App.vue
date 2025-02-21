<template>
    <div>
        <img alt="Vue logo" src="./assets/logo.png" />
        <h1>{{ count }}</h1>
        <h1>{{ double }}</h1>
        <p>{{ error1 }}</p>
        <ul>
            <li v-for="number in numbers" :key="number">{{ number }}</li>
        </ul>
        <h1>{{ person.name }}</h1>
        <h1>{{ greetings }}</h1>
        <h1>X: {{ x }} Y:{{ y }}</h1>
        <h1 v-if="loading">Loading...</h1>
        <img v-if="loaded" :src="result[0].url" />
        <h1>{{ result }}</h1>
        <Suspense>
            <template #default>
                <div>
                    <AsyncShow></AsyncShow>
                    <DogShow></DogShow>
                </div>
            </template>
            <template #fallback>
                <h1>Loading...</h1>
            </template>
        </Suspense>
        <AsyncShow></AsyncShow>
        <button @click="increase">count</button>
        <button @click="updateGreeting">change name</button>
        <button @click="openModal">Modal</button>
        <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
        <Modal :isOpen="modalIsOpen" @close-modal="onModalClose"
            >My Modal</Modal
        >
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    computed,
    reactive,
    toRefs,
    onMounted,
    onUpdated,
    onRenderTriggered,
    watch,
    onUnmounted,
    onErrorCaptured
} from "vue";
import useMousePosition from "./hooks/useMousePosition";
import useURLLoader from "./hooks/useURLLoader";
// import HelloWorld from './components/HelloWorld.vue';
import Modal from "./components/Modal.vue";
import AsyncShow from "./components/AsyncShow.vue";
import DogShow from "./components/DogShow.vue";
interface Data {
    count: number;
    increase: () => void;
    double: number;
    numbers: number[];
    person: { name?: string };
}
interface DogResult {
    message: string;
    status: string;
}
interface CatResult {
    id: string;
    url: string;
    width: number;
    height: number;
}
export default defineComponent({
    name: "App",
    components: {
        Modal,
        AsyncShow,
        DogShow,
    },
    setup() {
        // const count = ref(0);
        // const double = computed(() => count.value * 2);
        // const increase = () => {
        //     count.value++;
        // }
        const error1 = ref(null);
        onErrorCaptured((e: any) => {
          error1.value = e;
        })
        onUpdated(() => {
            console.log("onUpdated");
        });
        onRenderTriggered((event) => {
            console.log(event);
        });
        const data: Data = reactive({
            count: 0,
            increase: () => {
                data.count++;
            },
            double: computed(() => data.count * 2),
            numbers: [1, 2, 3],
            person: {},
        });
        const { x, y } = useMousePosition();

        const { result, loading, error, loaded } = useURLLoader<CatResult[]>(
            // "https://dog.ceo/api/breeds/image/random"
            "https://api.thecatapi.com/v1/images/search?limit=1"
        );
        watch(result, () => {
            if (result.value) {
                console.log(result.value[0].url);
            }
        });

        data.numbers.push(4);
        data.person.name = "John";

        const greetings = ref("");
        const updateGreeting = () => {
            greetings.value += "Hello";
        };

        // watch([greetings, () => data.count], (newValue, oldValue) => {
        //   document.title = 'aaa' + newValue + data.count
        // })
        const refData = toRefs(data);
        const modalIsOpen = ref(false);
        const openModal = () => {
            modalIsOpen.value = true;
        };
        const onModalClose = () => {
            modalIsOpen.value = false;
        };
        return {
            ...refData,
            greetings,
            updateGreeting,
            x,
            y,
            result,
            loading,
            error,
            loaded,
            modalIsOpen,
            openModal,
            onModalClose,
            error1
            // count,
            // increase,
            // double
        };
    },
});
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
