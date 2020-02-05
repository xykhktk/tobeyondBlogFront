<template>
	<div>
		<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle" :class="{ 'active': navToggleStatus}" @click="toggleNav"><i></i></a>
		<aside id="fh5co-aside" role="complementary" class="border js-fullheight" style="height: 722px;">

			<h1 id="fh5co-logo"><a href="index.html">Tobeyond</a></h1>
			<nav id="fh5co-main-menu" role="navigation">
				<ul>
					<li class="fh5co-active"><a href="#" @click="menuClick('index')">Home</a></li>
					<li><a href="#" @click="menuClick('articleListFrontend')">Blog</a></li>
					<li><a href="#" @click="menuClick('about')">About</a></li>
				</ul>
			</nav>

			<div class="fh5co-footer">
				<p><small>桂ICP备17008392号</small></p>
				<p><small>桂公网安备45010202000471号</small></p>
			</div>

		</aside>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				navToggleStatus : false
			};
		},
		methods:{
			toggleNav(){
				if(this.navToggleStatus == true){
					this.navToggleStatus = false;
					document.querySelector('body').classList.remove("offcanvas");
				}else{
					this.navToggleStatus = true;
					document.querySelector('body').classList.add("offcanvas");
				}
			},
			menuClick(goto){
				this.$router.push({
					path: goto
				});
			}
		}
	};
</script>

<style scoped>

</style>
