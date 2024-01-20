let myProductModal = '';
export default{
    data() {
        return {
            url: 'https://ec-course-api.hexschool.io/v2',
            path: "ahmomoz",
        }
    },
    props:['item'],
    methods:{
        updateProduct(){    // 新增產品函式
            const item = this.item;
            let url = `${this.url}/api/${this.path}/admin/product`;
            let way = "post";
            if(item.id){
                url = `${this.url}/api/${this.path}/admin/product/${item.id}`;
                way = "put";
            };
            axios[way](url ,{data:item})
            .then(res=>{
                alert("更新成功");
                this.$emit('hide-modal'); // 更新動作結束，關掉modal
                this.$emit('get-products-list'); // 再次取得產品列表，重新渲染頁面
            })
            .catch(err=>{
                alert(err.response.data.message);
            })
        },
        deleteImg(item){  // 清除圖片
            this.$emit('delete-img' , item)
        },
        imgUpload(e){  //上傳圖片功能
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('file-to-upload',file);
            axios.post(`${this.url}/api/${this.path}/admin/upload`, formData)
            .then(res=>{
                const url = res.data.imageUrl;
                this.$emit('img-url-update', url)
            })
            .catch(err=>{
                alert(err.response.data.message);
            })
        }
    },
    mounted(){
        myProductModal = new bootstrap.Modal(document.getElementById('productModal'));
    },
    template:`<div id="productModal" ref="productModal" class="modal hide" tabindex="-1" aria-labelledby="productModalLabel"
    aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
                <h5 id="productModalLabel" class="modal-title">
                <span v-if="!item.id">新增產品</span>
                <span v-else>編輯產品</span>
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                <div class="col-sm-4">
                    <div class="mb-2">
                    <div class="mb-3">
                        <label for="imageUrl" class="form-label">主要圖片</label>
                        <input type="text" class="form-control mb-3" placeholder="請輸入圖片連結" v-model="item.imageUrl">
                        <img class="img-fluid" :src="item.imageUrl">
                    </div>
                    <h4 class="mb-3">新增多張圖片</h4>
                        <div class="mb-1">
                        <div class="mb-3">
                            <label for="imageUrl" class="form-label">圖片網址</label>
                            <input type="text" class="form-control"
                            placeholder="請輸入圖片連結" v-model="item.imagesUrl[key]" 
                            v-for="(img, key) in item.imagesUrl" :key="'image_' + key">
                        </div>
                        <template v-for="(img, key) in item.imagesUrl" :key="'image_' + key">
                            <img class="img-fluid w-50" :src="img">
                        </template>
                        </div>
                    </div>
                    <div>
                    <button class="btn btn-outline-danger btn-sm d-block w-100" @click="deleteImg">
                        刪除圖片
                    </button>
                    </div>
                    <div class="mt-5">
                    <h5>上傳圖片</h5>
                    <input type="file" id="file" placeholder="請輸入圖片連結" @change="imgUpload($event)">
                    </div>
                </div>
                <div class="col-sm-8">
                    <div class="mb-3">
                    <label for="title" class="form-label">標題</label>
                    <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="item.title">
                    </div>

                    <div class="row">
                    <div class="mb-3 col-md-6">
                        <label for="category" class="form-label">分類</label>
                        <input id="category" type="text" class="form-control"
                        placeholder="請輸入分類" v-model="item.category">
                    </div>
                    <div class="mb-3 col-md-6">
                        <label for="price" class="form-label">單位</label>
                        <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="item.unit">
                    </div>
                    </div>

                    <div class="row">
                    <div class="mb-3 col-md-6">
                        <label for="origin_price" class="form-label">原價</label>
                        <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價" v-model.number="item.origin_price">
                    </div>
                    <div class="mb-3 col-md-6">
                        <label for="price" class="form-label">售價</label>
                        <input id="price" type="number" min="0" class="form-control"
                        placeholder="請輸入售價" v-model.number="item.price">
                    </div>
                    </div>
                    <hr>

                    <div class="mb-3">
                    <label for="description" class="form-label">產品描述</label>
                    <textarea id="description" type="text" class="form-control"
                                placeholder="請輸入產品描述" rows="8" v-model="item.description">
                    </textarea>
                    </div>
                    <div class="mb-3">
                    <label for="content" class="form-label">說明內容</label>
                    <textarea id="description" type="text" class="form-control"
                                placeholder="請輸入說明內容" v-model="item.content">
                    </textarea>
                    </div>
                    <div class="mb-3">
                    <div class="form-check">
                        <input id="is_enabled" class="form-check-input" type="checkbox"
                        :true-value="1" :false-value="0" v-model="item.is_enabled">
                        <label class="form-check-label" for="is_enabled">是否啟用</label>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                取消
                </button>
                <button type="button" class="btn btn-primary" @click="updateProduct">
                確認
                </button>
            </div>
            </div>
        </div>
    </div>`
}