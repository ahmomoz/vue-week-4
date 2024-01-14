const App = {
    data() {
    return {
        user : {
            username : '',
            password : ''
        }
    }
    },
    methods: {
        login () {
            if(this.user.username && this.user.password){
                //發送 API 至遠端並登入（並儲存 Token）
                const url = `https://vue3-course-api.hexschool.io/v2/admin/signin`;
                axios.post( `${url}` , this.user)
                .then(res=>{
                    const { token, expired } = res.data;
                    document.cookie = `hexToken = ${ token }; expires=${new Date( expired )};`;
                    alert("登入成功");
                    window.location.href = "products.html";
                })
                .catch(error=>{
                    alert("請檢查帳號密碼是否有誤");
                })
            }else{
                alert("請填入正確資料");
            }
        }
    },
    mounted(){
        //取得token，檢查是否已有token紀錄
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,"$1");
        if(token){
            window.location.href = "products.html"; //有token自動跳轉
        }
    }
};
Vue.createApp(App).mount('#app');