<template>
	<div>
		<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle" :class="{ 'active': navToggleStatus}" @click="toggleNav"><i></i></a>
		<aside id="fh5co-aside" role="complementary" class="border js-fullheight" style="height: 600px;">

			<h1 id="fh5co-logo"><a href="index.html">Tobeyond</a></h1>
			<nav id="fh5co-main-menu" role="navigation">
				<ul>
					<li :class="{'fh5co-active' : li1active}"><a href="#" @click="menuClick('index')">Home</a></li>
					<li :class="{'fh5co-active' : li2active}"><a href="#" @click="menuClick('articleListFrontend')">Blog</a></li>
					<li :class="{'fh5co-active' : li3active}"><a href="#" @click="menuClick('about')">About</a></li>
				</ul>
			</nav>

			<div class="fh5co-footer">
				<p><small>桂ICP备17008392号</small></p>
				<p><small>
				<a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=45010202000471" target="_blank">
				桂公网安备45010202000471号
				</a></small></p>
			</div>

		</aside>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				li1active : false,
				li2active : false,
				li3active : false,
				navToggleStatus : false
			};
		},
		created(){
			this.li1active = true;
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
				this.li1active = this.li2active = this.li3active = false;
				if(goto == 'index') this.li1active = true;
				if(goto == 'articleListFrontend') this.li2active = true;
				if(goto == 'about') this.li3active = true;
				
				this.$router.push({
					path: goto
				});
			}
		}
	};
</script>

<style scoped>

</style>
