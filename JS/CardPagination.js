export default {
    props: ['pagination'],
    methods:{
        getProductsList(pageNum){
            this.$emit('emit-getproductslist', pageNum)
        },
    },
    template: `<nav aria-label="Page navigation example">
    <ul class="pagination">
        <li class="page-item" :class="{'disabled':pagination.current_page === 1}">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="getProductsList(pagination.current_page-1)">
            <span aria-hidden="true">&laquo;</span>
        </a>
        </li>
        <li class="page-item" v-for="page in pagination.total_pages" :key="page">
        <a class="page-link" href="#" @click.prevent="getProductsList(page)">{{page}}</a>
        </li>
        <li class="page-item" :class="{'disabled':pagination.current_page === pagination.total_pages
    }">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="getProductsList(pagination.current_page+1)">
            <span aria-hidden="true">&raquo;</span>
        </a>
        </li>
    </ul>
</nav>`
}
