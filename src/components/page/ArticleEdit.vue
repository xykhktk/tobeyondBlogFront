<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-lx-calendar"></i> 表单
				</el-breadcrumb-item>
				<el-breadcrumb-item>基本表单</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="form-box">
				<el-form ref="form" :model="article" label-width="80px">
					<el-form-item label="主标题">
						<el-input type="input" v-model="article.title"></el-input>
					</el-form-item>
					<el-form-item label="副标题">
						<el-input type="input" v-model="article.subtitle"></el-input>
					</el-form-item>
					<el-form-item label="是否显示">
						<el-switch v-model="article.is_show" active-value="1" inactive-value="0"></el-switch>
					</el-form-item>
					<el-form-item label="page_image">
						<el-input type="input" v-model="article.page_image"></el-input>
					</el-form-item>
					<el-form-item label="tagIds">
						<el-input type="input" v-model="tagIds"></el-input>
					</el-form-item>
					<el-form-item label="">
						<mavon-editor v-model="article.content" ref="md" @imgAdd="$imgAdd" @change="change" style="min-height: 600px" />
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
	// import mavonEditor from 'mavon-editor';
	// import 'mavon-editor/dist/css/index.css';

	export default {
		name: 'articleEdit',
		data() {
			return {
				id: 0,
				article: {},
				tagIds : ''
			}
		},
		components: {
			// mavonEditor
		},
		created() {
			this.id = this.$route.query.id;

			let params = new URLSearchParams();
			params.append('id', this.id);
			this.$axios.post(this.apiURL.baseApiURL + 'api/admin/article/editPage', params, {
					headers: {
						token: localStorage.getItem("token")
					}
				})
				.then(res => {
					if(res.data.code == '200'){
						// this.$message.success(res.data.message);
						 this.article = res.data.data.article;
						 this.article.is_show = this.article.is_show.toString();
					}else{
						this.$message.error(res.data.code.message);
					}
					
				});
		},
		methods: {
			onSubmit() {
				var formdata = new FormData();
				formdata.append('id', this.id);
				formdata.append('title', this.article.title);
				formdata.append('subtitle', this.article.subtitle);
				formdata.append('is_show', this.article.is_show);
				formdata.append('text', this.article.content);
				formdata.append('page_image', this.article.page_image);
				formdata.append('tagIds', this.tagIds);
				this.$axios({
					url: 'http://www.tobeyond.site/api/admin/article/edit',
					method: 'post',
					data: formdata,
					headers: {
						'Content-Type': 'multipart/form-data',
						'token': localStorage.getItem("token")
					},
				}).then((res) => {
					console.log(res)
				})
			},
			$imgAdd(pos, $file) {},
			change(value, render) {
				// render 为 markdown 解析后的结果
				this.article.content = render;
			}
		}
	}
</script>


<style scoped>
	.form-box {
		width: 100%;
	}
</style>
