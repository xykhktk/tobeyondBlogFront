<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-lx-calendar"></i> tag
				</el-breadcrumb-item>
				<el-breadcrumb-item>Edit Tag</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="form-box">
				<el-form ref="form" :model="tag" label-width="80px">
					<el-form-item label="标签标题">
						<el-input type="input" v-model="tag.title"></el-input>
					</el-form-item>
					<el-form-item label="标签名称">
						<el-input type="input" v-model="tag.tag"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit">提交</el-button>
						<el-button>取消</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	import bus from '../common/bus';

	export default {
		name: 'tagEdit',
		data() {
			return {
				id: 0,
				tag: {},
			}
		},
		components: {
		},
		created() {
			this.id = this.$route.query.id;

			let params = new URLSearchParams();
			params.append('id', this.id);
			this.$axios.post(this.apiURL.baseApiURL + 'api/admin/tag/detail', params, {
					headers: {
						token: localStorage.getItem("token")
					}
				})
				.then(res => {
					if (res.data.code == '200') {
						this.tag = res.data.data.data;
					} else {
						this.$message.error(res.data.message);
					}

				});
		},
		methods: {
			onSubmit() {
				var formdata = new FormData();
				formdata.append('id', this.id);
				formdata.append('title', this.tag.title);
				formdata.append('tag', this.tag.tag);

				this.$axios({
					url: this.apiURL.baseApiURL + 'api/admin/tag/edit',
					method: 'post',
					data: formdata,
					headers: {
						'Content-Type': 'multipart/form-data',
						'token': localStorage.getItem("token")
					},
				}).then((res) => {
					if (res.data.code == '200') {
						this.$message.success(res.data.message);
					} else {
						this.$message.error(res.data.message);
					}
				})
			},
		}
	}
</script>


<style scoped>
	.form-box {
		width: 100%;
	}
</style>
