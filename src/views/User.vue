<template>
  <div class="user-container">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <!-- 用户表单信息 -->
      <el-form
        :inline="true"
        :rules="rules"
        ref="form"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="form.gender" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女  " :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="选择日期时间"
            value-format="yyyy-MM-DD"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button @click="handleAdd" type="primary">+ 新增</el-button>
      <el-form :inline="true" :model="userForm">
        <el-form-item>
          <el-input placeholder="请输入名称" v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 用户表格 -->
    <div class="common-table">
      <el-table stripe :data="tableData" style="width: 100%" height="90%">
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="age" label="年龄" width="180">
        </el-table-column>
        <el-table-column prop="gender" label="性别">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.gender == 1 ? '男' : '女' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="birth" label="出生日期"> </el-table-column>
        <el-table-column prop="addr" label="地址"> </el-table-column>
        <el-table-column prop="addr" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <!-- 分页 -->
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handlePage"
        >
        </el-pagination>
      </div>
    </div>
   
  </div>
</template>

<script>
import { getUser,addUser,editUser,deleteUser } from "@/api";
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        gender: "",
        birth: "",
        addr: "",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        age: [{ required: true, message: "请输入年龄" }],
        gender: [{ required: true, message: "请选择性别" }],
        birth: [{ required: true, message: "请选择出生日期" }],
        addr: [{ required: true, message: "请输入地址" }],
      },
      tableData: [],
      modalType:0, // 0 表示新增的弹窗，1 表示编辑的弹窗
      total:0,
      pageData:{
        page:1,
        limit:10
      },
      userForm:{
        name:''
      }
    }
  },
  methods: {
    handleClose() {
      this.$refs.form.resetFields()
    },
    submit() {
      this.$refs.form.validate((valid) => {
        // vaild 为 true 表示校验通过
        if (valid) {
          if(this.modalType === 0){
            addUser(this.form).then(() => {
              this.getList()
            })
          }else {
            editUser(this.form).then(() => {
              this.getList()
            })
          }
          this.dialogVisible = false
          this.handleClose()
        }
      })
    },
    cancle() {
      this.handleClose();
      this.dialogVisible = false
    },
    handleEdit(row){
      this.modalType = 1
      this.dialogVisible = true
      this.form = JSON.parse(JSON.stringify(row))
    },
    handleDelete(row){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUser({ id:row.id }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList()
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 获取用户列表数据
    getList(){
      getUser({params:{...this.userForm,...this.pageData}}).then(({ data }) => {
        // console.log(data, "data");
        this.tableData = data.list
        this.total = data.count || 0
     })
    },
    handleAdd(){
      this.modalType = 0
      this.dialogVisible = true
    },
    // 根据页码进行切换
    handlePage(val){
      this.pageData.page = val
      this.getList()
    },
    // 列表查询
    onSubmit(){
      this.getList()
    }
  },
  mounted() {
    this.getList()
  },
}
</script>

<style lang="less" scoped>
.user-container{
  height: 90%; 
  .manage-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .common-table{
    position: relative;
    height: calc(100% - 62px);
    .pager{
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
}
</style>