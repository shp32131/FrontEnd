## 配置SSH  
- 更新window系统的git 客户端 `git update-git-for-windows`
- 大部分git服务器使用SSH公钥来进行授权，所以系统中每个用户都要提供一个公钥用于授权  
- 1.在自己电脑端生成一个密钥和一个公钥,使用工具 `ssh_keygen`   
  - `linux`系统  
    + SSH公钥默认储存在用户家目录下 `\~/.ssh` 目录   
    + 目录中有两个文件分别是 `id_rsa` 密钥 和 `id_rsa.pub` 公钥   
  - `window`系统
    + SSH密钥默认保存在 `c:\user\liuqinglin\.ssh `  
    + `ssh-keygen -t rsa -C 'yourEmail'`  
      - `-t` 指定密钥类型,默认生成用于SSH-2的RSA密钥  
      - `-C` 指定添加密钥中的注释  
- 2.复制 `id_rsa.pub` 文件内的公钥到托管平台,比如 `github -> setting -> SSH Keys`  

## git 配置
- git有三个配置文件,后面的配置会覆盖前面的配置  
  + `/etc/gitconfig` 操作指令  `git config --system`   
  + `~/.gitconfig`  操作指令   `git config --global`  
  + `.git/config`  操作指令   
- 查看配置信息，有重名的，默认使用的是最后一个配置  
  + `git --version` 查看版本 
  + `git config --list` 查看配置信息 
  + `git config user.name` 查看配置值  

- 配置 `git`
  + 配置用户名和邮箱,每次提交都会用这两个信息标记是谁提交了更新,随更新内容一起纳入历史记录  
    - `git config --global user.name 'your name'`
    - `git config --global user.email your email`
  + 配置默认编辑器  
    - `git config --global core.editor vim `

## git 基本管理
### git三大概念 工作区 暂存区 版本库  
![git](./imgs/git01.jpg)

- 1.工作区: 就是我们电脑中的项目的目录树  
  + `git clean`指令用来从工作目录中删除所有没有跟踪`tracked`过的文件  
    - `git clean -n` 告诉你哪些文件将会被删除(没有tracked的文件)  
    - `git clean -f` 删除当前目录下没有`tracked`过的文件,不会删除`.gitignore`指定的文件 
    - `git clean -df` 删除当前目录下没有被`tracked`过的文件和文件夹  

- 2.暂存区: 由`git init`指令生成的`.git`目录(版本库)中,标记为 `stage` 或 `index`的目录树,是暂存区  
  + 执行`git add`时,将工作区的修改更新到`stage`暂存区中,同时将修改的内容写到`objects`对象库中  
    - `git add .` 提交所有修改和新增的文件 
    - `git add -u` 只提交修改文件,不提交新增文件  
  +  `git ls-files -s` 查看暂存区文件列表 
  + `git cat-file -p 6e9a94` 查看暂存区文件内容   
  + `git rm --cached <file>` 从`stage`暂存区删除文件,工作区没影响  
  + `git commit` 将`stage`目录树更新到版本库`master`的`objects`对象中,提交时`master`的目录树是暂存区的目录树 
  + `git checkout .` 危险操作,放弃没有提交的所有修改,用`stage`暂存区内容替换工作区内容   
  + `git checkout <file>` 危险操作,用`stage`暂存区文件替换工作区文件  
  + `git checkout HEAD <file>` 危险操作,用`HEAD`指向的`master`分支中的文件替换暂存区和工作区的文件  

- 3.版本库: 由`git init`指令生成的`.git`目录,是`git`的版本库   
  + 版本库中`HEAD`指向的是一个`master`分支目录树  
  + 版本库中`objects`标识的是`git`的对象库，位于`.git/objects`目录下,包含各种创建对象和内容  
  + `git reset HEAD`时,`stage`暂存区的目录树重写为`master`分支的目录树,工作区没影响  
  + 使用`reset`恢复到历史提交点,重置暂存区与工作区的内容  
    - `git reset --hard` 清空工作区和暂存区的改动 
    - `git reset --hard HEAD^^^` 恢复前三个版本  
    - `git reset --hard b7b73147ca8d6fc20e451d7b36` 恢复到指定提交版本,(由`git log`指令获取版本号)  
    - `git reset --soft` 保留工作区的内容,把文件差异放进暂存区  

- `git`修改已提交的 `commit` 注释 
  + 两种情况基本相同,还没`push`到远程仓库和已经`push`到远远程仓库最后多一个`git push -f`步骤 
  + 1.修改最后一次`commit`的注释  
    - `git commit --amend`进入`vim`模式修改注释,然后按`:wq`退出 
  + 2. 修改某次`commit`注释 
    - `git rebase -i HEAD~2` 显示倒数的两次注释 
    - 把注释前面的`pick`修改为`edit` 保存退出 
    - `git commit --amend` 修改注释并保存退出 
    - `git rebase --continue` 
    - `git push origin master -f`


### 分支管理 
- 分支用于为项目增加新功能或修复Bug时使用 
- 分支说明: 
  + `master` 主分支,有且只有一个  
  + `release` 是线上版本分支,线上版本发布后,会将`release`合并到`master`  
  + `develop` 开发分支,通常给测试部署环境或打包的分支,每个成员在自己分支开发完成后,向`develop`分支合并   
  + `feature` 功能分支或个人分支,有多个,`merge`完成后会删除   
- 分支操作  
  + `git branch dev ` 创建分支 
  + `git branch ` 查看分支 
  + `git checkout dev` 切换分支 
  + `git checkout -b feature/xxx` 创建并切换到分支 
  + `git checkout master,git merge dev` 合并`dev`分支到`master` 
  + `git branch -d dev ` 删除分支 
  + `git branch -D dev ` 删除没有合并的分支 
  + `git push origin :dev` 删除远程仓库分支 
  + `git branch --no-merged` (在`master`分支上)查看未合并的分支 
  + `git branch --merged` (在`master`分支上)查看已经合并的分支 

### 日志查看 
- `git log` 查看日志(不包括被删除的`commit`提交记录)
- `git log -p -2` 查看最近2次提交日志并显示文件差异  
- `git log --name-only` 显示已修改的文件清单 
- `git log --name-status` 显示新增,修改,删除的文件清单 
- `git log --name-oneline` 一行显示并只显示SHA-1的前几个字符 
- `git reflog` 查看所有日志包括被`git reset --hard ...`删除的`commit`提交记录(可以恢复)  

### 效率提升 

## git 使用  
- 1.创建本地仓库并完成初始提交 
  + 新建项目并添加`README.md`文件 
  + `git init` 
  + `git add README.md`
  + `git commit -m "first commit"`

- 2.添加远程仓库 
  + `git remote add origin https://github.com/shp32131/hansan.git` 
  + 添加用户名和密码 `git remote add origin https://username:password@github.com/shp32131/hansan.git`

- 3.查看远程仓库 `git remote -v`

- 4.推送数据到远程仓库 `git push -u origin master`
  + `git pull origin master` 当`hint: not have locally...`
  + `git pull --allow-unrelated-histories` 当`refusing to merge unrelated histories...`

- 5.删除远程仓库关联 `git remote rm origin` 

### pull
- 远程拉取主机某个分支的更新,再与本地的指定分支合并 
  + `git pull origin ask:ask`
  + `git pull origin ask`
  + `git pull`

### push
- `git push` 指令用于将本地分支的更新推送到远程主机 
  + `git push origin` 将当前分支推送到`origin`主机对应的分支(当前只有一个分支可以省略主支名) 
  + `git push -u origin master` `-u` 选项指定一个默认主机,以后就可以不加参数直接使用`git push`
  + `git push origin --delete ask` 删除远程ask分支 
  + `git push origin --set-upstream origin ask` 本地ask分支关联远程分支并推送 

### .gitignore 
- `.gitignore`用于过虑提交的文件,比如`node_modules/`  
- 配置文件是从上到下进行规则匹配的,如果上面的范围大,下面的规则将不生效...
- 配置语法 
  + `/` 表示目录 
  + `*` 通配多个字符 
  + `?` 通配单个字符 
  + `[]` 间个字符的匹配列表 
  + `!` 表示不过虑
```shell
# file_name ---.gitignore
node_modules/ # 表示 过虑node_modules/ 或 /node_modules/* 文件夹里的所有文件 
/node_modules/ # 过虑根目录下/node_modules/所有文件 

```

### Tag 
- `git` 可以对某一时间点上的版本打上标签,用于发布软件版本,如 v1.0 
  + `git tag v1.0` 添加标签  
  + `git tag` 列出标签 
  + `git push --tags` 推送标签 
  + `git tag -d v1.0` 删除标签 
  + `git push origin :v1.0.1` 删除远程仓库标签 

### 打包发布 
- `git archive master --prefix='hansan'  --format=zip > hansan.zip`
  + 对于`master`分支代码生成压缩包供使用者下载使用,`--prefix` 指定目录名  

### Stashing 
当你正在进行项目中某一部分的工作，里面的东西处于一个比较杂乱的状态，而你想转到其他分支上进行一些工作
问题是，你不想提交进行了一半的工作，否则以后你无法回到这个工作点。

"暂存" 可以获取你工作目录的中间状态——也就是你修改过的被追踪的文件和暂存的变更
并将它保存到一个未完结变更的堆栈中，随时可以重新应用。

储藏工作 git stash
查看储藏列表 git stash list
应用最近的储藏 git stash apply
应用更早的储藏 git stash apply stash@{2}
删除储藏git stash drop stash@{0}
应用并删除储藏 git stash pop

### 自动部署 
- `github` 上设置 `WebHook`
- 项目中添加处理 `WebHook`的同步脚本 
- 站点配置 
- ....
### 其他
``` shell
git checkout -b main
# Switched to a new branch 'main'
git branch
# * main
#  master
git merge master # 将master分支合并到main上
# Already up to date.
git pull origin main --allow-unrelated-histories # git pull origin main会报错：refusing to merge unrelated histories
git push origin main
```