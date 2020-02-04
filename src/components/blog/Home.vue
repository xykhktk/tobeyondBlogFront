<template>
	<div>
		<v-header></v-header>
		<v-sidebar></v-sidebar>
		<div class="content-box">
			<div class="content">
				<keep-alive>
					<router-view></router-view>
				</keep-alive>
			</div>
		</div>
	</div>
</template>


<script>
	import vSidebar from './Sidebar.vue';
	import vHeader from './Header.vue';
	export default {
		data() {
			return {};
		},
		components: {
			vHeader,
			vSidebar
		},
		created() {

		}
	};
</script>
<style>
    @import "../../assets/blog/css/animate.css";
	@import "../../assets/blog/css/icomoon.css";
	@import "../../assets/blog/css/bootstrap.css";
	@import "../../assets/blog/css/flexslider.css";
	@import "../../assets/blog/css/style.css";
	/* @import url("../../assets/blog/css/animate.css"); */
</style>
