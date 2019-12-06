<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-lx-calendar"></i> 文章
				</el-breadcrumb-item>
				<el-breadcrumb-item>文章编辑</el-breadcrumb-item>
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
						<el-switch v-model="article.isShow" active-value="1" inactive-value="0"></el-switch>
					</el-form-item>
					<el-form-item label="page_image">
						<el-input type="input" v-model="article.page_image"></el-input>
					</el-form-item>
					<el-form-item label="标签">
						 <el-checkbox v-for="tag in tagList" :key="tag.id" v-model="tag.isSelect">
						 {{ tag.title }}
						 </el-checkbox>
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
				tagIds : '',
				tagList : []
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
						 this.article.isShow = this.article.isShow.toString();
						 
						 this.article.tagList.forEach((article_tag_item,artice_tag_index,article_tag_array) => {
							res.data.data.tagList.forEach((item,index,array) => {
								item.isSelect = false;
								if(article_tag_item.tagId == item.id){
									item.isSelect = true;
								}
							})
						 });
						 //必须先处理完数据，再赋值给this.tagList；
						 //如果赋值给this.tagList，再处理数据的话,会有出现多选框无法选择的问题。
						 this.tagList = res.data.data.tagList;
						 
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
				formdata.append('isShow', this.article.isShow);
				formdata.append('text', this.article.content);
				formdata.append('pageImage', this.article.pageImage);
				
				let tagIds = [];
				this.tagList.forEach((item,index,array) => {
					if(item.isSelect) tagIds.push(item.id);
				});
				tagIds = tagIds.join(',');
				formdata.append('tagIds', tagIds);
				
				this.$axios({
					url: this.apiURL.baseApiURL + 'api/admin/article/edit',
					method: 'post',
					data: formdata,
					headers: {
						'Content-Type': 'multipart/form-data',
						'token': localStorage.getItem("token")
					},
				}).then((res) => {
					if(res.data.code == '200'){
						
					}else{
						this.$message.error(res.data.message);
					}
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
