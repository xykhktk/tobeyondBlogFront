<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-lx-cascades"></i> rabbitMqSocket
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<el-row>
				<el-button type="primary" @click="websocketConnect">建立webSocket</el-button>
				<el-button type="primary" @click="sendHttpMqMessage">发送消息到mq</el-button>
				<el-button type="primary" @click="websocketDisconnect">关闭webSocket</el-button>
			</el-row>

			<div class="block">
				<div class="radio">
					排序：
					<el-radio-group v-model="reverse">
						<el-radio :label="true">倒序</el-radio>
						<el-radio :label="false">正序</el-radio>
					</el-radio-group>
				</div>

				<el-timeline :reverse="reverse">
					<el-timeline-item v-for="(massage, index) in messageList" :key="index" :timestamp="massage.timestamp">
						{{massage.content}}
					</el-timeline-item>
				</el-timeline>
			</div>
		</div>
	</div>
	</div>
</template>

<script>
	export default {
		name: 'rabbitMqSocket',
		data() {
			return {
				websocketClinet: null,
				webSocketUrl: this.apiURL.baseWebSocketUrl + "rabbitmqSocket",
				reverse: true,
				messageList: [],
			};
		},
		created() {
			this.initWebSocket();
		},
		destroyed() {
			if (this.websocketClinet != null) {
				this.websocketClinet.close(); //离开路由之后断开websocket连接
			}
		},
		methods: {
			initWebSocket() { //初始化weosocket
				// this.websocketClinet = new WebSocket(this.webSocketUrl);
				// this.websocketClinet.onmessage = this.websocketonmessage;
				// this.websocketClinet.onopen = this.websocketonopen;
				// this.websocketClinet.onerror = this.websocketonerror;
				// this.websocketClinet.onclose = this.websocketclose;
			},
			websocketConnect() {

				this.websocketClinet = new WebSocket(this.webSocketUrl);
				this.websocketClinet.onmessage = this.websocketOnMessage;
				this.websocketClinet.onopen = this.websocketonopen;
				this.websocketClinet.onerror = this.websocketonerror;
				this.websocketClinet.onclose = this.websocketclose;

			},
			websocketDisconnect() {
				if (this.websocketClinet != null) {
					this.websocketClinet.close();
				}
			},
			websocketonopen() { //连接建立之后执行send方法发送数据
				// let actions = {
				// 	"test": "12345"
				// };
				// this.websocketsend(JSON.stringify(actions));
			},
			websocketonerror() { //连接建立失败重连
				// this.initWebSocket();
			},
			websocketOnMessage(e) { //数据接收
				let dateObj = new Date();
				let timestamp = dateObj.toLocaleDateString();
				this.messageList.push({
					content : e.data,
					timestamp : timestamp
				});
				
			},
			websocketsend() { //数据发送
				if (this.websocketClinet == null) {
					this.$message.error('未建立有效的websocket客户端');
					return false;
				}

				let data = 'data';
				this.websocketClinet.websocketsend(data);
			},
			websocketclose(e) { //关闭
				// console.log('断开连接', e);
			},
			sendHttpMqMessage(){
				var formdata = new FormData();
				formdata.append('message', '测试发送');
				this.$axios({
					url: this.apiURL.baseApiURL + 'api/admin/rabbitmq/send',
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
