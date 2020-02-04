<template>
	<div id="fh5co-main">
		<aside>
			<el-carousel :height="height">
				<el-carousel-item>
					<div style="background-image: url(/blog/images/img_bg_1.jpg);" class="index-carousel-item">
						<div class="row">
							<div class="col-md-8 col-md-offset-2 text-center">
								<div class="slider-text-inner">
									<h1>Intuitive <strong></strong> is How Give We the User New Superpowers</h1>
									<h2>Free html5 templates Made by </h2>
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
			<h2 class="fh5co-heading animate-box" data-animate-effect="fadeInLeft">Recent Blog</h2>
			<div class="row row-bottom-padded-md">
				<div class="col-md-3 col-sm-6 col-padding animate-box" data-animate-effect="fadeInLeft">
					<div class="blog-entry">
						<a href="#" class="blog-img"><img src="/blog/images/img_bg_1.jpg" class="img-responsive" alt="Free HTML5 Bootstrap Template by FreeHTML5.co"></a>
						<div class="desc">
							<h3><a href="#">Inspirational Website</a></h3>
							<span><small>by Admin </small> / <small> Web Design </small> / <small> <i class="icon-comment"></i> 14</small></span>
							<p>Design must be functional and functionality must be translated into visual aesthetics</p>
							<a href="#" class="lead">Read More <i class="icon-arrow-right3"></i></a>
						</div>
					</div>
				</div>
				<div class="col-md-3 col-sm-6 col-padding animate-box" data-animate-effect="fadeInLeft">
					<div class="blog-entry">
						<a href="#" class="blog-img"><img src="images/img-2.jpg" class="img-responsive" alt="Free HTML5 Bootstrap Template by FreeHTML5.co"></a>
						<div class="desc">
							<h3><a href="#">Inspirational Website</a></h3>
							<span><small>by Admin </small> / <small> Web Design </small> / <small> <i class="icon-comment"></i> 14</small></span>
							<p>Design must be functional and functionality must be translated into visual aesthetics</p>
							<a href="#" class="lead">Read More <i class="icon-arrow-right3"></i></a>
						</div>
					</div>
				</div>
				<div class="col-md-3 col-sm-6 col-padding animate-box" data-animate-effect="fadeInLeft">
					<div class="blog-entry">
						<a href="#" class="blog-img"><img src="images/img-3.jpg" class="img-responsive" alt="Free HTML5 Bootstrap Template by FreeHTML5.co"></a>
						<div class="desc">
							<h3><a href="#">Inspirational Website</a></h3>
							<span><small>by Admin </small> / <small> Web Design </small> / <small> <i class="icon-comment"></i> 14</small></span>
							<p>Design must be functional and functionality must be translated into visual aesthetics</p>
							<a href="#" class="lead">Read More <i class="icon-arrow-right3"></i></a>
						</div>
					</div>
				</div>
				<div class="col-md-3 col-sm-6 col-padding animate-box" data-animate-effect="fadeInLeft">
					<div class="blog-entry">
						<a href="#" class="blog-img"><img src="images/img-4.jpg" class="img-responsive" alt="Free HTML5 Bootstrap Template by FreeHTML5.co"></a>
						<div class="desc">
							<h3><a href="#">Inspirational Website</a></h3>
							<span><small>by Admin </small> / <small> Web Design </small> / <small> <i class="icon-comment"></i> 14</small></span>
							<p>Design must be functional and functionality must be translated into visual aesthetics</p>
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
				height: '100px'
			}
		},
		created() {},
		beforeMount() {
			let h = document.documentElement.clientHeight || document.body.clientHeight;
			this.height = (h * 0.6) + "px";
		},
		methods: {}
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
