<template>
</template>
<script>
	import Api from "../../common/api/api.js";
	export default {
		data() {
			return {
				goods_key_word:"",
				caseId:"1",
				id:"",
				user_id:""
			};
		},
		created() {
			let userInfo = JSON.parse(localStorage.getItem("personInfo"));
			if (userInfo) {
				this.user_id = userInfo.user_id;
			}
			
			if(this.$route.query.caseId){
				this.caseId=this.$route.query.caseId
			}
			
			if(this.$route.query.goods_key_word){
				this.goods_key_word=this.$route.query.goods_key_word
			}
			
			let params = {
				caseId:this.caseId,
				goods_key_word: this.goods_key_word,
				pageNum:1,
				pageSize:10
			};
			
			Api.sameParagraph(params).then(res => {
				if(res.status==0){
					let baseUrl = window.location.href.slice(0,window.location.href.indexOf("hosdetails.html"));
					if(res.message==2){ //无关联商品
						// self.$router.replace({name:'caseDetail',query:{goods_key_word:this.goods_key_word}})
						window.location.replace(baseUrl + "hosdetails.html#/caseDetail?goods_key_word="+this.goods_key_word)
					}else{
						this.id=res.data.id
						// this.$router.push({path:"detail/"+this.id+"/"+this.user_id})
						window.location.replace(baseUrl + "shop.html#/detail/" + this.id + "/" + this.user_id)
					}
				}else{
					Toast({
						message: "系统错误，请稍后再试",	
						position: "middle",
						duration: 2000
					});
				}
			});
		},
	};
</script>