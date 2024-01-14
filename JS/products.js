let myProductModal = '';
let myDeleteModal = '';
const App = {
    data() {
    return {
        sortBy : "default",
        ascending : true,
        products: [],
        productsDetail: {},
        tempProduct: {
            imagesUrl: [],
        },
        url : 'https://ec-course-api.hexschool.io/v2',
        path : "ahmomoz",
    }
    },
    methods: {
        checkAdmin(){ // 檢驗身分函式
            axios.post(`${this.url}/api/user/check`)
            .then(res=>{
                this.getProductsList(); // 進行取得產品列表函式
            })
            .catch(error=>{
                alert("身分驗證錯誤，將跳轉至登入頁")
                window.location.href = "login.html"; // 跳轉至登入頁
            })
        },
        getProductsList(){  // 取得產品資料
            axios.get(`${this.url}/api/${this.path}/admin/products`)
            .then(res=>{
                this.products = [...res.data.products]
            })
            .catch(error=>{
                alert("商品列表取得發生錯誤")
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
        updateProduct(){    // 新增產品函式
            let url = `${this.url}/api/${this.path}/admin/product`;
            let way = "post";
            if(this.tempProduct.id){
                url = `${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`;
                way = "put";
            };
            axios[way](url ,{data:this.tempProduct})
            .then(res=>{
                alert("更新成功");
                myProductModal.hide();  // 更新動作結束，關掉modal
                this.getProductsList(); // 再次取得產品列表，重新渲染頁面
            })
            .catch(error=>{
                alert("更新失敗，請確認資料是否正確");
            })
        },
        deleteProduct(){   // 刪除產品函式
            axios.delete(`${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`)
            .then(res=>{
                alert("商品刪除成功");
                this.tempProduct={
                    imagesUrl: [],
                };
                myDeleteModal.hide();   // 刪除動作結束，關掉modal
                this.getProductsList(); // 再次取得產品列表，重新渲染頁面
            })
            .catch(error=>{
                console.dir(error);
                alert("商品刪除失敗");
            })
        },
        addImg(){ // 新增多張圖片
            this.tempProduct.imagesUrl.push('');
        },
        deleteImg(){  // 清除多張圖片
            this.tempProduct.imagesUrl=[''];
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
        myProductModal = new bootstrap.Modal(document.getElementById('productModal'));
        myDeleteModal = new bootstrap.Modal(document.getElementById('delProductModal'));
        // 取得token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,"$1");
        axios.defaults.headers.common['Authorization'] = token;
        this.checkAdmin(); //進行身分驗證函式   
    }
};
Vue.createApp(App).mount('#app');