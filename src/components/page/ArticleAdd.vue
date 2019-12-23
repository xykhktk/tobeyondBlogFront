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
					<el-form-item label="图片">
						<el-upload 
						:action="uploadImagePath" 
						:on-preview="handlePreview"
						:on-remove="handleRemove" 
						:on-success="uploadSuccess"
						:file-list="fileList" 
						:limit="1"
						list-type="picture">
							<el-button size="small" type="primary">点击上传</el-button>
							<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
						</el-upload>
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
		name: 'articleAdd',
		data() {
			return {
				article: {},
				tagIds: '',
				tagList: [],
				fileList: [],
				uploadImagePath : this.apiURL.baseApiURL + 'api/admin/upload/uploadFile' 
			}
		},
		components: {
			// mavonEditor
		},
		created() {
			let params = new URLSearchParams();
			this.$axios.post(this.apiURL.baseApiURL + 'api/admin/article/addPage', params, {
					headers: {
						token: localStorage.getItem("token")
					}
				})
				.then(res => {
					if (res.data.code == '200') {
						this.tagList = res.data.data.tagList;
						console.log(this.tagList);
					} else {
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
				this.tagList.forEach((item, index, array) => {
					if (item.isSelect) tagIds.push(item.id);
				});
				tagIds = tagIds.join(',');
				formdata.append('tagIds', tagIds);

				this.$axios({
					url: this.apiURL.baseApiURL + 'api/admin/article/add',
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
			$imgAdd(pos, $file) {},
			change(value, render) {
				// render 为 markdown 解析后的结果
				this.article.content = render;
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			uploadSuccess(response, file, fileList){
				this.article.pageImage = response.data.key;
			},
			// uploadFileExceed(file, fileList){
			// 	this.fileList = [];
			// }
		}
	}
</script>


<style scoped>
	.form-box {
		width: 100%;
	}
</style>
