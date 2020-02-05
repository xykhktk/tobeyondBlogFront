<template>
	<div id="fh5co-main">
		<aside>
			<el-carousel :height="height">
				<el-carousel-item v-for="maxim in maximList" :key="maxim.id">
					<div v-bind:style="maxim.backgroupImage" class="index-carousel-item">
						<div class="row">
							<div class="col-md-8 col-md-offset-2 text-center">
								<div class="slider-text-inner">
									<h1 style="display:block;">{{ maxim.content }}</h1>
									<h2 style="display:block;">{{ maxim.author }}</h2>
								</div>
							</div>
						</div>
					</div>
				</el-carousel-item>
			</el-carousel>
		</aside>

		<div class="fh5co-narrow-content">
			<h2 class="fh5co-heading animate-box fadeInLeft animated" data-animate-effect="fadeInLeft">Services</h2>
			<div class="row">
				<div class="col-md-6">
					<div class="fh5co-feature animate-box fadeInLeft animated" data-animate-effect="fadeInLeft">
						<div class="fh5co-icon">
							<i class="icon-settings"></i>
						</div>
						<div class="fh5co-text">
							<h3>Strategy</h3>
							<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind
								texts. </p>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="fh5co-feature animate-box fadeInLeft animated" data-animate-effect="fadeInLeft">
						<div class="fh5co-icon">
							<i class="icon-search4"></i>
						</div>
						<div class="fh5co-text">
							<h3>Explore</h3>
							<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind
								texts. </p>
						</div>
					</div>
				</div>

				<div class="col-md-6">
					<div class="fh5co-feature animate-box" data-animate-effect="fadeInLeft">
						<div class="fh5co-icon">
							<i class="icon-paperplane"></i>
						</div>
						<div class="fh5co-text">
							<h3>Direction</h3>
							<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind
								texts. </p>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="fh5co-feature animate-box" data-animate-effect="fadeInLeft">
						<div class="fh5co-icon">
							<i class="icon-params"></i>
						</div>
						<div class="fh5co-text">
							<h3>Expertise</h3>
							<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind
								texts. </p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="fh5co-narrow-content">
			<h2 class="fh5co-heading animate-box" data-animate-effect="fadeInLeft">最近发布</h2>
			<div class="row row-bottom-padded-md">
				<div class="col-md-3 col-sm-6 col-padding animate-box" data-animate-effect="fadeInLeft" v-for="article in articleList" :key="article.id">
					<div class="blog-entry">
						<a href="#" class="blog-img"><img v-bind:src="article.pageImage" class="img-responsive"></a>
						<div class="desc">
							<h3><a href="#">{{ article.title }}</a></h3>
							<span><small>by Admin </small> / <small> Web Design </small> / <small> <i class="icon-comment"></i> 14</small></span>
							<p>{{ article.subtitle }}</p>
							<a href="#" class="lead">Read More <i class="icon-arrow-right3"></i></a>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'index',
		data() {
			return {
				height: '100px',
				maximList :[],
				articleList:[]
			}
		},
		created() {
			this.getData();
		},
		beforeMount() {
			let h = document.documentElement.clientHeight || document.body.clientHeight;
			this.height = (h * 0.7) + "px";
		},
		methods: {
			getData() {
				var formdata = new FormData();
				this.$axios({
					url: this.apiURL.baseApiURL + 'api/blog/home',
					method: 'post',
					data: formdata,
					headers: {
						'Content-Type': 'multipart/form-data',
						'token': localStorage.getItem("token")
					},
				}).then((res) => {
					this.articleList = res.data.data.articleList;
					this.maximList = res.data.data.maximList;
					this.maximList.forEach((item,index,array) => {
						item.backgroupImage = "background-image: url(/blog/images/img_bg_" + ((index % 3) + 1) +".jpg);"
					})
					console.log(this.maximList);
				})
			},
			
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
</style>
