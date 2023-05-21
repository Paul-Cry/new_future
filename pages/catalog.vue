<template>
    <div class="catalog">
        <div class="container">
            <h1 class="catalog__title ">
                Каталог товаров
            </h1>
            <div class="catalog-filters  ">
                <div class="catalog-filters-item">
                    <img src="/img/filters/1.png" alt="" class="img">
                    <img src="/img/filters/1_activ.png" alt="" class="img_activ">
                    <p>Гардеробы и Шкафы</p>
                </div>
                <div class="catalog-filters-item">
                    <img src="/img/filters/2.png" alt="" class="img">
                    <img src="/img/filters/2_activ.png" alt="" class="img_activ">
                    <p>Кухонная мебель</p>
                </div>
                <div class="catalog-filters-item">
                    <img src="/img/filters/3.png" alt="" class="img">
                    <img src="/img/filters/3_activ.png" alt="" class="img_activ">
                    <p>Спальная мебель</p>
                </div>
                <div class="catalog-filters-item">
                    <img src="/img/filters/4.png" alt="" class="img">
                    <img src="/img/filters/4_activ.png" alt="" class="img_activ">
                    <p>Офисная мебель</p>
                </div>
                <div class="catalog-filters-item">
                    <img src="/img/filters/5.png" alt="" class="img">
                    <img src="/img/filters/5_activ.png" alt="" class="img_activ">
                    <p>Мебель для гостинной</p>
                </div>
            </div>
            <div class="catalog-cards" v-for="el of this.cards">
                <div class="cards-items card" style="width: 18rem;">
                    <img :src="el.image" class="card-img-top" alt="">
                    <div class="card-body1">
                        <h5 class="card-title text-center">{{ el.name }}</h5>
                        <p class="card-price text-center">
                            Цена {{ el.price }}
                        </p>
                        <a href="#" class="btn card-button button" @click="getData()">Заказать</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'


export default {
    async mounted() {
        this.$nextTick(() => {
            this.$nuxt.$loading.start();
            setTimeout(() => {
                this.$nuxt.$loading.finish()    
            }, 1000);
            
            if (1 === 2) {
            this.$nextTick(() => {
               
            })

        }
        });
        
    },
    data() {
        return {
            title: 'Привет, мир!',
            description: 'Это мой компонент.'
        };
    },
    computed: {
        ...mapState({
            cards: (state) => state.catalog.cards
        }),
    },
    methods: {
        ...mapActions({
            getData: 'catalog/getData'
        })
    }
};
</script>
  
<style scoped>
/* Стили для вашего компонента */
</style>