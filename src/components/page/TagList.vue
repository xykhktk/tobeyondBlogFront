<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-lx-cascades"></i> tagList
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-button type="primary" icon="el-icon-edit-outline" @click="tagAdd">新增</el-button>
			</div>
			<el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header"
			 @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" align="center"></el-table-column>
				<el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
				<el-table-column prop="tag" label="title"></el-table-column>
				<el-table-column prop="tag" label="tag"></el-table-column>
				<el-table-column prop="createdAt" label="发布时间" width=200></el-table-column>
				<el-table-column prop="updatedAt" label="更新时间" width=200></el-table-column>
				<el-table-column label="操作" width="180" align="center">
					<template slot-scope="scope">
						<el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex" :page-size="query.pageSize"
				 :total="pagination.pageTotal" @current-change="handlePageChange"></el-pagination>
			</div>
		</div>

	</div>
	</div>
</template>

<script>
	export default {
		name: 'tagList',
		data() {
			return {
				query: {
					title: '',
					pageIndex: 1,
					pageSize: 10
				},
				pagination :{
					pageTotal: 0,
				},
				tableData: [],
				multipleSelection: [],
				delList: [],
				editVisible: false,
				
				form: {},
			};
		},
		created() {
			this.getData();
		},
		methods: {
			getData() {
				var formdata = new FormData();
				formdata.append('page', this.query.pageIndex);
				this.$axios({
					url: this.apiURL.baseApiURL + 'api/admin/tag/list',
					method: 'post',
					data: formdata,
					headers: {
						'Content-Type': 'multipart/form-data',
						'token': localStorage.getItem("token")
					},
				}).then((res) => {
					this.tableData = res.data.data.data.list;
					this.query.pageSize = res.data.data.data.pageSize;
					this.query.pageIndex = res.data.data.data.pageNum;
					this.pagination.pageTotal = res.data.data.data.total;
				})
			},
			//切换显示/隐藏
			changShow(item){
				var formdata = new FormData();
				formdata.append('id', item.id);
				formdata.append('isShow', item.isShow);
				this.$axios({
					url: this.apiURL.baseApiURL + 'api/admin/article/changeShow',
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
			// 删除操作
			handleDelete(index, row) {
				// 二次确认删除
				this.$confirm('确定要删除吗？', '提示', {
						type: 'warning'
					})
					.then(() => {
						this.$message.success('删除成功');
					})
					.catch(() => {});
			},
			// 多选操作
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			// 编辑操作
			handleEdit(index, row) {
				this.$router.push({
					path: 'articleEdit',
					query: {
						id: row.id
					}
				});
			},
			tagAdd(){
				console.log('tagAdd');
				this.$router.push({
					path: '/tagAdd'
				});
			},
			// 分页导航
			handlePageChange(val) {
				this.$set(this.query, 'pageIndex', val);
				this.getData();
			}
		}
	};
</script>

<style scoped>
	.handle-box {
		margin-bottom: 20px;
	}

	.handle-select {
		width: 120px;
	}

	.handle-input {
		width: 300px;
		display: inline-block;
	}

	.table {
		width: 100%;
		font-size: 14px;
	}

	.red {
		color: #ff0000;
	}

	.mr10 {
		margin-right: 10px;
	}

	.table-td-thumb {
		display: block;
		margin: auto;
		width: 40px;
		height: 40px;
	}
</style>
