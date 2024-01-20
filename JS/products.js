import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

let myProductModal = '';
let myDeleteModal = '';

import CardPagination from './CardPagination.js' // 分頁元件
import CardProductModel from './CardProductModel.js' // 新增編輯產品Model元件
import CardDeleteModel from './CardDeleteModel.js' // 刪除Model元件


// 主元件
const app = createApp({
    data() {
        return {
            sortBy: "default",
            ascending: true,
            products: [],
            productsDetail: {},  
            tempProduct: {
                imagesUrl: [],
            },
            url: 'https://ec-course-api.hexschool.io/v2',
            path: "ahmomoz",
            pagination: {} ,
        }
    },
    methods: {
        checkAdmin(){ // 檢驗身分函式
            axios.post(`${this.url}/api/user/check`)
            .then(res=>{
                this.getProductsList(); // 進行取得產品列表函式
            })
            .catch(err=>{
                alert("身分驗證錯誤，將跳轉至登入頁")
                window.location.href = "login.html"; // 跳轉至登入頁
            })
        },
        getProductsList(page=1){  // 取得產品資料
            axios.get(`${this.url}/api/${this.path}/admin/products?page=${page}`)
            .then(res=>{
                const {products,pagination} = res.data ;
                this.products = products;
                this.pagination = pagination;
            })
            .catch(err=>{
                alert(err.response.data.message);
            })
        },
        openProductModal(product,method){           // 開啟Modal
            if(product && method==="del"){          // 刪除
                this.tempProduct = { ...product };
                myDeleteModal.show();
            }else if(product && method==="edit"){   // 編輯
                this.tempProduct = { ...product };
                myProductModal.show();
            }else{                                  // 新增
                this.tempProduct= {
                    imagesUrl: [''],
                },
                myProductModal.show();
            }
        },
        deleteImg(item){  // 清除圖片
            this.tempProduct.imagesUrl=[''];
        },
        imgUrlUpdate(url){
            if(this.tempProduct.imagesUrl[0]===''){
                this.tempProduct.imagesUrl[0] = url;
            }else{
                this.tempProduct.imagesUrl.push(url);
            }
        },
        hideModal() {
            myProductModal.hide();
        },
        hideDeleteModal() {
            myDeleteModal.hide();
        },
    },
    computed:{
        sortProducts() {
            const newProducts = [...this.products].sort((a,b)=> {
                return this.ascending ? a[this.sortBy]-b[this.sortBy] : b[this.sortBy]-a[this.sortBy]; 
            })
            return newProducts;
        }
    },
    mounted() {
        // 取得token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,"$1");
        axios.defaults.headers.common['Authorization'] = token;
        this.checkAdmin(); //進行身分驗證函式 
        myProductModal = new bootstrap.Modal(document.getElementById('productModal'));
        myDeleteModal = new bootstrap.Modal(document.getElementById('delProductModal'));
    },
    components:{
        CardPagination,
        CardProductModel,
        CardDeleteModel
    }
});

app.mount('#app');