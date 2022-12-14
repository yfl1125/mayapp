import axios from '@/axsio/index'

// 登录 
export let loginpost = (obj) => {
    return axios.post('login', obj)
}

//左侧菜单 
export let getmenu = () => axios.get('menus')
// 用户列表
export let userlist = (obj) => axios.get('users', { params: obj })
// 删除用户
export let deluser = (id) => axios.delete(`users/${id}`)

// 添加用户
export let adduser = (obj) => axios.post('users', obj)
//获取用户信息
export let getedituser = (id) => axios.get(`users/${id}`)
// 编辑用户
export let putusers = (obj) => axios.put(`users/${obj.id}`, obj)
// 修改用户状态
export let modifyState = (obj) => axios.put(`users/${obj.uId}/state/${obj.type}`)
// 获取角色列表
export let get_Roles = () => axios.get('roles')
// 添加角色
export let addroles = (obj) => axios.post('roles', obj)
// 删除角色
export let del_roles = (id) => axios.delete(`roles/${id}`)
// 获取信息
export let rolesId = (id) => axios.get(`roles/${id}`)
// 编辑角色
export let edit_roles = (obj) => axios.put(`roles/${obj.id}`, obj)
// 删除权限
export let del_right = (obj) => axios.delete(`roles/${obj.roleid}/rights/${obj.rightid}`)
//获取所有权限
export let getap = (tree) => axios.get(`rights/${tree}`)
// 分配权限
export let jurisdiction = (roleId, rids) => axios.post(`roles/${roleId}/rights`, { rids })