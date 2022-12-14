<template>
  <div>
    <bread :bread="bread"></bread>
    <el-card>
      <el-button type="primary" @click="flag = true">添加角色</el-button>
      <!-- 数据展示区 -->
      <el-table :data="list" border>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!--  -->
            <div class="box" v-for="(item, i) in scope.row.children" :key="i">
              <!-- 一级权限 -->
              <div class="leftBox">
                <el-tag
                  closable
                  type=""
                  @close="delrights(scope.row.id, item.id)"
                  class="oneleve"
                >
                  {{ item.authName }}
                </el-tag>
              </div>

              <!-- 二级三级权限 -->
              <div class="rightBox">
                <!-- 二级 -->

                <div>
                  <div
                    class="left_box"
                    v-for="(it, j) in item.children"
                    :key="j"
                  >
                    <!-- 二级 -->
                    <div>
                      <el-tag
                        closable
                        type="success"
                        @close="delrights(scope.row.id, it.id)"
                        class="twoleve"
                      >
                        {{ it.authName }}
                      </el-tag>
                    </div>
                    <!-- 三级 -->
                    <div class="right_box">
                      <el-tag
                        closable
                        type="warning"
                        @close="delrights(scope.row.id, i.id)"
                        class="threeleve"
                        v-for="(i, index) in it.children"
                        :key="index"
                      >
                        {{ i.authName }}
                      </el-tag>
                    </div>
                  </div>
                </div>
                <!-- 三级权限 -->
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>

        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="del(scope.row.id)">删除</el-button>
            <el-button size="mini" @click="edit(scope.row.id)">编辑</el-button>
            <el-button size="mini" @click="ap(scope.row.id)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加 -->
      <el-dialog title="添加用户" :visible.sync="flag">
        <el-form
          :model="rolesobj"
          :rules="rules"
          ref="roles"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="rolesobj.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="rolesobj.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="flag = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑 -->
      <el-dialog title="编辑用户" :visible.sync="editflag">
        <el-form
          :model="rolesobj1"
          :rules="rules"
          ref="roles1"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="rolesobj1.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="rolesobj1.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editflag = false">取 消</el-button>
          <el-button type="primary" @click="editroles">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="添加权限" :visible.sync="apflag">
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          :default-checked-keys="arr"
          :props="defaultProps"
          default-expand-all
          ref="tree"
        >
        </el-tree>
        <div slot="footer" class="dialog-footer">
          <el-button @click="apflag = false">取 消</el-button>
          <el-button type="primary" @click="distribution">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {
  get_Roles,
  addroles,
  del_roles,
  rolesId,
  edit_roles,
  del_right,
  getap,
  jurisdiction,
} from "@/http/user";
import Bread from "@/components/Bread.vue";
export default {
  components: { Bread },
  data() {
    return {
      data: [],
      roleId: "",
      arr: [],
      defaultProps: {
        children: "children",
        label: "authName",
      },

      bread: [
        { id: 1, path: "", title: "角色列表" },
        { id: 2, path: "", title: "角色管理" },
      ],
      list: [],
      flag: false,
      editflag: false,
      editid: "",
      rolesobj: {
        roleName: "",
        roleDesc: "",
      },
      rolesobj1: {
        roleName: "",
        roleDesc: "",
      },
      apflag: false,
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    async distribution() {
      let roleId = this.roleId;
      let rids = [
        ...this.$refs.tree.getCheckedKeys(),
        ...this.$refs.tree.getHalfCheckedKeys(),
      ].join(",");
      let { data: res } = await jurisdiction(roleId, rids);
      if (res.meta.status == 200) {
        this.apflag = true;
        this.getap();
      }
      console.log(res);
    },

    async ap(id) {
      // console.log(id);
      this.roleId = id;
      this.apflag = true;
      let { data: res } = await getap("tree");
      this.data = res.data;
      let juese = this.list.find((v) => id == v.id);
      let arr1 = [];
      for (let v of juese.children) {
        for (let v2 of v.children) {
          for (let v3 of v2.children) {
            arr1.push(v3.id);
          }
        }
      }
      this.arr = arr1;
    },
    async delrights(a, b) {
      let obj = {
        roleid: a,
        rightid: b,
      };
      let { data: res } = await del_right(obj);
      this.getroles();
      console.log(res);
    },
    async getroles() {
      let { data: res } = await get_Roles();
      console.log(res);
      this.list = res.data;
    },
    // 删除
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let {} = await del_roles(id);
          this.getroles();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 编辑 获取用户信息
    async edit(id) {
      let { data: res } = await rolesId(id);
      this.rolesobj1.roleDesc = res.data.roleDesc;
      this.rolesobj1.roleName = res.data.roleName;
      this.editflag = true;
      this.editid = id;
    },
    //
    async editroles() {
      let obj = {
        id: this.editid,
        roleName: this.rolesobj1.roleName,
        roleDesc: this.rolesobj1.roleDesc,
      };
      let { data: res } = await edit_roles(obj);
      if (res.meta.status == 200) {
        this.getroles();
        this.editflag = false;
      }
    },
    // 添加
    add() {
      this.$refs.roles.validate(async (val) => {
        if (val) {
          let { data: res } = await addroles(this.rolesobj);
          if (res.meta.status == 201) {
            this.flag = false;
            this.getroles();
          }
        } else {
        }
      });
    },
  },
  mounted() {
    this.getroles();
  },
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  border: 1px solid #eee;

  .leftBox {
    width: 200px;
    position: relative;
    .oneleve {
      width: 86px;
      margin: auto;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      position: absolute;
    }
  }
  .rightBox {
    flex: 1;
    display: flex;
    .left_box {
      width: 200px;
      border: 1px solid #eee;
      display: flex;
      .twoleve {
        margin: auto;
      }
    }
    .right_box {
      // border: 1px solid #ccc;
      display: flex;
      margin-left: 20px;
      padding-left: 20px;
      .threeleve {
        margin-left: 10px;
      }
    }
  }
}
</style>