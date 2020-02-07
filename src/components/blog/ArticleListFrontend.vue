<template>
	<div id="fh5co-main">
		<div class="fh5co-narrow-content">
			<div>
				<h1 class="fh5co-heading animate-box" data-animate-effect="fadeInLeft">{{ maxim }}</h1>
				
				<div class="article-tags">
					<a class="tag" href="#" @click="toArticleList(0)">全部</a>
				    <a class="tag" href="#" v-for="tag in tagList" :key="tag.id" @click="toArticleList(tag.id)">{{ tag.title }}</a>
				</div>
			</div>
			
			<div class="row row-bottom-padded-md">
				<div class="col-md-3 col-sm-6 col-padding animate-box" data-animate-effect="fadeInLeft" v-for="article in articleList" :key="article.id">
					<div class="blog-entry">
						<a href="#" class="blog-img" @click="articleDetail(article.id)"><img v-bind:src="article.pageImage" class="img-responsive"></a>
						<div class="desc">
							<h3><a href="#" @click="articleDetail(article.id)">{{ article.title }}</a></h3>
							<span><small>by Admin </small> / <small> 14</small></span>
							<p>{{ article.subTitle }}</p>
							<a href="#" @click="articleDetail(article.id)" class="lead">Read More <i class="icon-arrow-right3"></i></a>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="pagination">
			<el-pagination background layout="total, prev, pager, next" :current-page="pageIndex" :page-size="pageSize"
			 :total="pageTotal" @current-change="handlePageChange"></el-pagination>
		</div>
		
	</div>
</template>

<script>
	export default {
		name: 'articleListFrontend',
		data() {
			return {
				tagId : 0,
				pageIndex: 1,
				pageSize: 12,
				pageTotal: 0,
				articleList: [],
				tagList : [],
				maximList : [],
				maxim : '',
			}
		},
		created() {
			if(this.$route.query.tagId !== undefined){
				this.tagId = this.$route.query.tagId;
			}
			// if(this.$route.query.from == 'sidebar'){
			// 	this.tagId = 0;
			// }
			console.log(this.$route.query.from);
			this.getData();
		},
		beforeMount() {
		},
		methods: {
			getData() {
				var formdata = new FormData();
				formdata.append('page', this.pageIndex);
				if(this.tagId !== 0 && this.tagId !== undefined) formdata.append('tagId', this.tagId);
				this.$axios({
					url: this.apiURL.baseApiURL + '/api/article/list',
					method: 'post',
					data: formdata,
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}).then((res) => {
					this.articleList = res.data.data.articleList.list;
					this.pageSize = res.data.data.articleList.pageSize;
					this.pageIndex = res.data.data.articleList.pageNum;
					this.pageTotal = res.data.data.articleList.total;
					
					this.tagList = res.data.data.tagList.list;
					this.maximList = res.data.data.maximList;
					
					var item = this.maximList[Math.floor(Math.random()*this.maximList.length)];
					this.maxim = item.content;
					console.log(this.maxim);
				})
			},
			handlePageChange(val) {
				this.$set(this, 'pageIndex', val);
				this.getData();
			},
			articleDetail(id){
				this.$router.push({
					path: 'articleDetailFrontend',
					query: {
						id: id
					}
				});
			},
			toArticleList(tagId){
				this.tagId = tagId;
				this.getData();
			}
			

		}
	}
</script>
<style>
	.article-tags{
		/* border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		margin-bottom: 2em;
		padding-bottom: 0.5em; */
		margin-bottom: 2rem;;
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
	
	.pagination{
		float: right;
	}
	.el-pagination.is-background .el-pager li:not(.disabled).active {
		background-color: #228896;
	}
</style>
