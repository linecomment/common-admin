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
            <el-option label="男" value="1"></el-option>
            <el-option label="女  " value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="选择日期时间"
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
      <el-button @click="dialogVisible = true" type="primary">+ 新增</el-button>
    </div>
    <!-- 用户表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="age" label="年龄" width="180">
      </el-table-column>
      <el-table-column prop="gender" label="性别">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.gender === 1 ? '男' : '女' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="birth" label="出生日期"> </el-table-column>
      <el-table-column prop="addr" label="地址"> </el-table-column>
      <el-table-column prop="addr" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.raw)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.raw)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import { getUser } from "@/api";
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
      modalType:0
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
          this.dialogVisible = false;
          this.handleClose();
        }
      });
    },
    cancle() {
      this.handleClose();
    },
    handleEdit(val){
      console.log(val,'val')
    },
    handleDelete(val){
      console.log(val,'val') 
    }
  },
  mounted() {
    getUser().then(({ data }) => {
      // console.log(data, "data");
      this.tableData = data.list
    })
  },
}
</script>

<style>
</style>