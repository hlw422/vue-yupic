<template>
    <div class="upload-page">
      <a-card title="文件上传">
        <a-form layout="vertical">
          <a-form-item label="接收服务器">
            <a-input v-model:value="serverInfo" disabled placeholder="自动发现服务器" />
          </a-form-item>
          <a-form-item label="选择文件">
            <a-upload
              :file-list="fileList"
              :customRequest="customRequest"
              :beforeUpload="beforeUpload"
              multiple
              :showUploadList="false"
            >
              <a-button icon="upload">点击上传</a-button>
            </a-upload>
          </a-form-item>
        </a-form>
      </a-card>
  
      <a-card title="上传历史" style="margin-top: 24px;">
        <a-table :columns="columns" :data-source="uploadHistory" rowKey="id" />
      </a-card>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { message } from 'ant-design-vue';
  
  export default {
    name: 'FileUploadPage',
    setup() {
      const serverInfo = ref('');
      const fileList = ref([]);
      const uploadHistory = ref([]);
      const columns = [
        { title: '文件名', dataIndex: 'name', key: 'name' },
        { title: '大小 (KB)', dataIndex: 'size', key: 'size' },
        { title: '状态', dataIndex: 'status', key: 'status' },
        { title: '上传时间', dataIndex: 'uploadTime', key: 'uploadTime' },
      ];
  
      // 模拟自动发现接收服务器
      const discoverServer = async () => {
        try {
          // 实际开发中，可以调用后端接口获取服务器地址
          // const response = await axios.get('/api/discover-server');
          // serverInfo.value = response.data.server;
          serverInfo.value = 'https://receiver.example.com'; // 模拟数据
        } catch (error) {
          message.error('无法发现接收服务器');
        }
      };
  
      // 定义每个分块大小（例如：1MB）
      const CHUNK_SIZE = 1024 * 1024;
  
      // 自定义上传请求，实现断点续传逻辑（示例：按文件切片上传）
      const customRequest = async (options) => {
        const { file, onProgress, onSuccess, onError } = options;
        try {
          const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
          let uploadedChunks = 0;
  
          // 模拟上传过程：逐块上传，每块延时模拟网络请求
          for (let start = 0; start < file.size; start += CHUNK_SIZE) {
            // 获取当前分块（实际开发中需要调用 API 上传此分块）
            const chunk = file.slice(start, start + CHUNK_SIZE);
  
            // 模拟上传延时
            await new Promise((resolve) => setTimeout(resolve, 500));
  
            uploadedChunks++;
            // 更新上传进度
            onProgress({ percent: Math.round((uploadedChunks / totalChunks) * 100) });
          }
  
          // 上传完成后更新上传历史记录
          uploadHistory.value.push({
            id: Date.now(),
            name: file.name,
            size: Math.round(file.size / 1024),
            status: '上传成功',
            uploadTime: new Date().toLocaleString(),
          });
  
          onSuccess("上传成功", file);
        } catch (error) {
          onError(error);
        }
      };
  
      // 上传前校验，比如文件大小和格式
      const beforeUpload = (file) => {
        // 这里可以进行文件类型、大小校验
        return true;
      };
  
      onMounted(() => {
        discoverServer();
      });
  
      return {
        serverInfo,
        fileList,
        uploadHistory,
        columns,
        customRequest,
        beforeUpload,
      };
    },
  };
  </script>
  
  <style scoped>
  .upload-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 24px;
  }
  </style>
  