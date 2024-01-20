let myDeleteModal = '';
export default {
    data() {
        return {
            url: 'https://ec-course-api.hexschool.io/v2',
            path: "ahmomoz",
        }
    },
    props:['item'],
    methods:{
        deleteProduct(){   // 刪除產品函式
            const item = this.item;
            axios.delete(`${this.url}/api/${this.path}/admin/product/${item.id}`)
            .then(res=>{
                alert("商品刪除成功");
                this.$emit('hide-delete-modal');   // 刪除動作結束，關掉modal
                this.$emit('get-products-list'); // 再次取得產品列表，重新渲染頁面
            })
            .catch(err=>{
                alert(err.response.data.message);
            })
        },
    },
    mounted(){
        myDeleteModal = new bootstrap.Modal(document.getElementById('delProductModal'));
    },
    template:`<div id="delProductModal" ref="delProductModal" class="modal hide" tabindex="-1"
    aria-labelledby="delProductModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
                <h5 id="delProductModalLabel" class="modal-title">
                <span>刪除產品</span>
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                是否刪除
                <strong class="text-danger"></strong>{{ item.title }}(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                取消
                </button>
                <button type="button" class="btn btn-danger" @click="deleteProduct">
                確認刪除
                </button>
            </div>
            </div>
        </div>
    </div>`
}