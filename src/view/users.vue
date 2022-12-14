<template>
  <div>
    <div class="form">
      <Bread :bread="bread"></Bread>
      <el-form>
        <el-input placeholder="请输入内容" class="searchinp">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="primary" @click="flag = true">添加用户</el-button>
        <!-- 数据展示区 -->
        <!-- ---------------------------------------------------------------- -->
        <el-table :data="list" border>
          <el-table-column type="index" label="#"> </el-table-column>
          <el-table-column prop="username" label="姓名"> </el-table-column>
          <el-table-column prop="email" label="邮箱"> </el-table-column>
          <el-table-column prop="mobile" label="电话"> </el-table-column>
          <el-table-column prop="role_name" label="角色"> </el-table-column>
          <el-table-column label="状态">
            <template v-slot="scope">
              <el-switch
                v-model="scope.row.mg_state"
                @change="switchid(scope.row)"
              >
              </el-switch>
              <!-- {{ scope.row }} -->
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="del(scope.row.id)">删除</el-button>
              <el-button size="mini" @click="edit(scope.row.id)"
                >编辑</el-button
              >
              <el-button size="mini">分配权限</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <!-- ---------------------------------------------------------------- -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="userquery.pagenum"
          :page-sizes="[4, 6, 8, 10]"
          :page-size="userquery.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
        <!-- 添加用户 -->
        <!-- ---------------------------------------------------------------- -->
        <el-dialog title="添加用户" :visible.sync="flag">
          <el-form
            :model="userobj"
            :rules="rules"
            ref="users"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userobj.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="userobj.password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="userobj.email"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
              <el-input v-model="userobj.mobile"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="flag = false">取 消</el-button>
            <el-button type="primary" @click="add">确 定</el-button>
          </div>
        </el-dialog>
        <!-- ---------------------------------------------------------------- -->
        <!-- 编辑用户 -->
        <el-dialog title="编辑用户" :visible.sync="editflag">
          <el-form
            :model="editobj"
            :rules="editrules"
            ref="editusers"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="username">
              <el-input disabled v-model="editobj.username"></el-input>
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
              <el-input v-model="editobj.email"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
              <el-input v-model="editobj.mobile"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editflag = false">取 消</el-button>
            <el-button type="primary" @click="edituser">确 定</el-button>
          </div>
        </el-dialog>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  userlist,
  deluser,
  adduser,
  getedituser,
  putusers,
  modifyState,
} from "@/http/user";
import Bread from "@/components/Bread.vue";
export default {
  components: { Bread },

  data() {
    return {
      bread: [
        { id: 1, path: "", title: "用户管理" },
        { id: 2, path: "", title: "用户列表" },
      ],
      flag: false,
      editflag: false,
      total: 0,
      list: [],
      userquery: {
        pagenum: 1,
        pagesize: 5,
        query: "",
      },

      // 添加表单
      userobj: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      // 修改表单
      editobj: {
        username: "",
        // password: "",
        email: "",
        mobile: "",
      },
      // 用户添加验证
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 5, message: "长度在1 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 6, message: "长度在3 到 6 个字符", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱",
            trigger: "blur",
          },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: "请输入合法手机号/电话号",
            trigger: "blur",
          },
        ],
      },
      editrules: {},
      editId: "",
    };
  },
  methods: {
    // 获取用户列表数据
    async getuser() {
      let { data: res } = await userlist(this.userquery);
      this.list = res.data.users;
      this.total = res.data.total;
    },
    // 分页
    handleSizeChange(v) {
      this.userquery.pagesize = v;
      this.getuser();
    },
    handleCurrentChange(v) {
      this.userquery.pagenum = v;
      this.getuser();
    },
    // 删除
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let {} = await deluser(id);
          this.getuser();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 添加
    add() {
      this.$refs.users.validate(async (val) => {
        if (val) {
          let { data: res } = await adduser(this.userobj);
          if (res.meta.status == 201) {
            this.flag = false;
            this.getuser();
          }
        } else {
        }
      });

      //

      // console.log(res);
    },
    // 获取当前用户信息
    async edit(id) {
      let { data: res } = await getedituser(id);
      this.editflag = true;
      this.editobj.username = res.data.username;
      this.editobj.mobile = res.data.mobile;
      this.editobj.email = res.data.email;
      this.editId = id;
    },
    // 编辑用户
    async edituser() {
      let obj = {
        id: this.editId,
        email: this.editobj.email,
        mobile: this.editobj.mobile,
      };

      let { data: res } = await putusers(obj);
      if (res.meta.status == 200) {
        this.getuser();
        this.editflag = false;
      }
    },
    // 改变用户状态
    async switchid(info) {
      // console.log(info.id, info.mg_state);
      await modifyState({ uId: info.id, type: info.mg_state });
    },
  },
  mounted() {
    this.getuser();
  },
};
</script>

<style lang="scss" scoped>
.searchinp {
  width: 530px;
}
</style>