# readme
- 项目说明文档
---
***
```js
```
---
```html
```
---
## update
- 修改内容
- 在线修改
- 再次在线修改
- 第三次在线修改

## 主要操作
1. git init -> 创建版本库
2. git add 文件名 ->工作区提交到暂存区
3. git commit -m '注释' -> 暂存区提交到本地仓库

## 连接服务器
1. git remote add origin 仓库地址 -> 把本地仓库与远程仓库关联
2. git push (-u origin master) -> 本地的库推送到服务器(首次操作时需设置默认地址)(若服务器和本地都被修改过，需先将服务器的拉取到本地更新，再推送到服务器)(推送前记得提交保存本地！！！)
3. git pull -> 从服务器拉取更新
4. git remote rm origin -> 删除地址
5. git remote add orgin 新地址 -> 设置新地址

## 设置分支
1. git branch -> 查看所有分支，当前分支前有*号
2. git branch 分支名 -> 创建分支
3. git checkout 分支名 -> 切换到目标分支(切换分支前记得保存数据)
4. git merge 分支名 -> 将目标分支内容合并到当前分支(确保两边分支都保存修改！！！)
5. git branch -d 分支名 -> 将目标分支删除

## 辅助操作
1. git status -> 查看工作区状态
2. git log -> 查看更改详细日志
3. git reflog -> 查看更改简易日志
4. git diff 文件名 -> 查看改变信息
5. git reset --hard 版本号 -> 回退版本信息
6. git reset --hard HEAD^ -> 回退上个版本信息
7. git remote -v -> 查看本地仓库关联的远程仓库
8. git clone 仓库地址 -> 克隆仓库

