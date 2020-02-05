<template>
	<div id="fh5co-main">
		<div class="fh5co-narrow-content">
			<h2 class="fh5co-heading animate-box" data-animate-effect="fadeInLeft">Read Our Blog</h2>
			<div class="row row-bottom-padded-md">
				<div class="col-md-3 col-sm-6 col-padding animate-box" data-animate-effect="fadeInLeft" v-for="article in articleList">
					<div class="blog-entry">
						<a href="#" class="blog-img"><img v-bind:src="article.pageImage" class="img-responsive"></a>
						<div class="desc">
							<h3><a href="#">{{ article.title }}</a></h3>
							<span><small>by Admin </small> / <small> 14</small></span>
							<p>{{ article.subTitle }}</p>
							<a href="#" class="lead">Read More <i class="icon-arrow-right3"></i></a>
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
				pageIndex: 1,
				pageSize: 12,
				pageTotal: 0,
				articleList: []
			}
		},
		created() {
			this.getData();
		},
		beforeMount() {
		},
		methods: {
			getData() {
				var formdata = new FormData();
				formdata.append('page', this.pageIndex);
				this.$axios({
					url: this.apiURL.baseApiURL + '/api/article/list',
					method: 'post',
					data: formdata,
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}).then((res) => {
					this.articleList = res.data.data.data.list;
					this.pageSize = res.data.data.data.pageSize;
					this.pageIndex = res.data.data.data.pageNum;
					this.pageTotal = res.data.data.data.total;
				})
			},
			handlePageChange(val) {
				this.$set(this, 'pageIndex', val);
				this.getData();
			}

		}
	}
</script>
<style>
	.index-carousel-item {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.index-carousel-item h1 {
		font-size: 45px;
		line-height: 1.3;
		font-weight: 100;
		font-family: "Roboto", Arial, sans-serif;
		color: white;
	}

	.index-carousel-item h2 {
		font-size: 18px;
		line-height: 1.5;
		margin-bottom: 30px;
		font-weight: 300;
		color: white;
	}
	
	.pagination{
		float: right;
	}
	.el-pagination.is-background .el-pager li:not(.disabled).active {
		background-color: #228896;
	}
</style>
