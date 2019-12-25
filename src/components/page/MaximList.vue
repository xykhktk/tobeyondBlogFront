<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-lx-cascades"></i> maximList
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-button type="primary" icon="el-icon-edit-outline" @click="maximAdd">新增</el-button>
			</div>
			<el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header"
			 @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" align="center"></el-table-column>
				<el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
				<el-table-column prop="content" label="content"></el-table-column>
				<el-table-column prop="author" label="author"></el-table-column>
				<el-table-column label="显示" align="center" width="100">
					<template slot-scope="scope">
						<el-switch v-model="scope.row.isShow" active-value="1" inactive-value="0" @change="changShow(scope.row)"></el-switch>
					</template>
				</el-table-column>
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
					pageIndex: 1,
					pageSize: 10
				},
				pagination: {
					pageTotal: 0,
				},
				tableData: [],
				multipleSelection: [],
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
					url: this.apiURL.baseApiURL + 'api/admin/maxim/list',
					method: 'post',
					data: formdata,
					headers: {
						'Content-Type': 'multipart/form-data',
						'token': localStorage.getItem("token")
					},
				}).then((res) => {
					this.tableData = res.data.data.data.list;
					this.tableData.forEach((item,index,array) => {
						this.tableData[index]['isShow'] = item.isShow.toString(); // <el-switch>只接受string 和boolean类型.而接口传来的是int类型
					});
					
					this.query.pageSize = res.data.data.data.pageSize;
					this.query.pageIndex = res.data.data.data.pageNum;
					this.pagination.pageTotal = res.data.data.data.total;
				})
			},
			//切换显示/隐藏
			changShow(item) {
				var formdata = new FormData();
				formdata.append('id', item.id);
				formdata.append('isShow', item.isShow);
				this.$axios({
					url: this.apiURL.baseApiURL + 'api/admin/maxim/changeShow',
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
				});

			},
			// 删除操作
			handleDelete(index, row) {
				// 二次确认删除
				this.$confirm('确定要删除吗？', '提示', {
						type: 'warning'
					})
					.then(() => {
						var formdata = new FormData();
						formdata.append('id', row.id);
						this.$axios({
							url: this.apiURL.baseApiURL + 'api/admin/maxim/del',
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
						});
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
					path: 'maximEdit',
					query: {
						id: row.id
					}
				});
			},
			maximAdd() {
				this.$router.push({
					path: 'maximAdd'
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
