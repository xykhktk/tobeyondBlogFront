<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-lx-cascades"></i> taskList
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<!-- <el-button type="primary" icon="el-icon-edit-outline" @click="stopAll">停止所有</el-button> -->
			</div>
			<el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header"
			 @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" align="center"></el-table-column>
				<el-table-column prop="jobName" label="任务名" align="center"></el-table-column>
				<el-table-column prop="groupName" label="任务组名"></el-table-column>
				<el-table-column prop="nextFireTime" label="下一次执行时间"  width="180"></el-table-column>
				<el-table-column prop="triggerStateCN" label="运行状态"></el-table-column>
				<el-table-column prop="cronExpression" label="cron表达式"></el-table-column>
				<el-table-column label="运行状态" align="center">
					<template slot-scope="scope">
						<el-switch v-model="scope.row.triggerState" active-value="NORMAL" inactive-value="PAUSED" @change="changState(scope.row)"></el-switch>
					</template>
				</el-table-column>
				<el-table-column label="编辑" width="180" align="center">
					<template slot-scope="scope">
						<el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑cron</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

	</div>
	</div>
</template>

<script>
	export default {
		name: 'tagList',
		data() {
			return {
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
				this.$axios({
					url: this.apiURL.baseApiURL + 'api/admin/task/list',
					method: 'post',
					data: formdata,
					headers: {
						'Content-Type': 'multipart/form-data',
						'token': localStorage.getItem("token")
					},
				}).then((res) => {
					this.tableData = res.data.data.taskList;
				})
			},
			//切换显示/隐藏
			changState(item) {
				var formdata = new FormData();
				formdata.append('jobName', item.jobName);
				formdata.append('groupName', item.groupName);
				formdata.append('triggerState', item.triggerState);
				this.$axios({
					url: this.apiURL.baseApiURL + 'api/admin/task/changeState',
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
					this.getData();
				});

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
