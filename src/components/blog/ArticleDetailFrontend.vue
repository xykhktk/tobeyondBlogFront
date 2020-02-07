<template>
	<div id="fh5co-main">
	
	        <div class="fh5co-narrow-content animate-box fh5co-border-bottom" data-animate-effect="fadeInLeft">
	            <div>
					<h2 class="fh5co-heading article-detail-title" >{{ article.title }}</h2>
					
					<a href="#"><i class="el-icon-back" @click="goBack()"></i></a>
				</div>
				
	
	            <div class="article-detail-title-tags">
	                <a class="tag" href="#" v-for="tag in tagList" :key="tag.id" @click="toArticleList(tag.id)">{{ tag.title }}</a>
	            </div>
	
	            <div id="directory"></div>
				<div v-html="article.content"></div>
	            <div class="row">
	                <div class="col-md-12">
	                </div>
	            </div>
	        </div>
	
	    </div>
</template>

<script>
	export default {
		name: 'articleDetailFrontend',
		data() {
			return {
				id : 0,
				tagList: [],
				article: {}
			}
		},
		created() {
			this.id = this.$route.query.id;
			console.log(this.id);
			this.getData();
		},
		beforeMount() {
		},
		activated(){
			console.log('activated');
		},
		methods: {
			getData() {
				var formdata = new FormData();
				formdata.append('id', this.id);
				this.$axios({
					url: this.apiURL.baseApiURL + 'api/article/detail',
					method: 'post',
					data: formdata,
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}).then((res) => {
					this.article = res.data.data.article;
					this.tagList = res.data.data.tagList;
				})
			},
			goBack(){
				this.$router.go(-1);
			},
			toArticleList(tagId){
				this.$router.push({
					path: 'articleListFrontend',
					query: {
						tagId: tagId
					}
				});
			}
		}
	}
</script>
<style>
	.article-detail-title{
		display: inline-block;
	}
	
	.el-icon-back{
		display: inline-block;
		float: right;
		font-size: 2em;
	}
	
	.article-detail-title-tags{
	    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	    margin-bottom: 2em;
	    padding-bottom: 0.5em;
	}
	
	.tag{
	    font-size: 85%;
	    display: inline-block;
	    line-height: 1;
	    vertical-align: baseline;
	    background-color: #e8e8e8;
	    background-image: none;
	    padding: .5833em .833em;
	    text-transform: none;
	    border: 0 solid transparent;
	    border-radius: .28571429rem;
	    -webkit-transition: background .1s ease;
	    transition: background .1s ease;
	    margin-right: 5px;
	    color: rgba(0, 0, 0, 0.5);
	}
</style>
