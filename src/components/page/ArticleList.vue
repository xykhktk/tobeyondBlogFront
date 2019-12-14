<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-lx-cascades"></i> 文章列表
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
<!-- 				<el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
					<el-option key="1" label="广东省" value="广东省"></el-option>
					<el-option key="2" label="湖南省" value="湖南省"></el-option>
				</el-select> -->
				<el-input v-model="query.name" placeholder="标题" class="handle-input mr10"></el-input>
				<el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
				<el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量隐藏</el-button>
			</div>
			<el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header"
			 @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" align="center"></el-table-column>
				<el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
				<el-table-column prop="title" label="标题"></el-table-column>
				<el-table-column prop="subtitle" label="副标题"></el-table-column>
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

		<!-- 编辑弹出框 -->
		<el-dialog title="编辑" :visible.sync="editVisible" width="30%">
			<el-form ref="form" :model="form" label-width="70px">
				<el-form-item label="用户名">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="地址">
					<el-input v-model="form.address"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveEdit">确 定</el-button>
			</span>
		</el-dialog>
	</div>
	</div>
</template>

<script>
	export default {
		name: 'articleList',
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
				// idx: -1,
				// id: -1
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
					url: this.apiURL.baseApiURL + 'api/admin/article/list',
					method: 'post',
					data: formdata,
					headers: {
						'Content-Type': 'multipart/form-data',
						'token': localStorage.getItem("token")
					},
				}).then((res) => {
					this.tableData = res.data.data.data.list;
					this.tableData.forEach((item,index,array) => {
						this.tableData[index]['isShow'] = item.isShow.toString(); // <el-switch>只接受string 和boolean类型？
					});
					
					this.query.pageSize = res.data.data.data.pageSize;
					this.query.pageIndex = res.data.data.data.pageNum;
					this.pagination.pageTotal = res.data.data.data.total;
					// let i = 0;
					// for(i = 0;i < this.tableData.length;i++){
					// 	this.tableData[i]['is_show'] = this.tableData[i]['is_show'].toString();
					// }
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
			// 触发搜索按钮
			handleSearch() {
				this.$set(this.query, 'pageIndex', 1);
				this.getData();
			},
			// 删除操作
			handleDelete(index, row) {
				// 二次确认删除
				this.$confirm('确定要删除吗？', '提示', {
						type: 'warning'
					})
					.then(() => {
						this.$message.success('删除成功');
						// this.tableData.splice(index, 1);
					})
					.catch(() => {});
			},
			// 多选操作
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			delAllSelection() {
				// const length = this.multipleSelection.length;
				// let str = '';
				// this.delList = this.delList.concat(this.multipleSelection);
				// for (let i = 0; i < length; i++) {
				// 	str += this.multipleSelection[i].name + ' ';
				// }
				// this.$message.error(`删除了${str}`);
				// this.multipleSelection = [];
				this.$message.error('不想做这个功能了');
			},
			// 编辑操作
			handleEdit(index, row) {
				this.$router.push({
					path: 'articleEdit',
					query: {
						id: row.id
					}
				});
				// this.idx = index;
				// this.form = row;
				// this.editVisible = true;
			},
			// 保存编辑
			saveEdit() {
				this.editVisible = false;
				this.$message.success(`修改第 ${this.idx + 1} 行成功`);
				this.$set(this.tableData, this.idx, this.form);
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
