
## git

#### git push时error: src refspec main does not match any error报错解决
 1.  首先执行git fetch origin 获取初始提交        
     然后执行git merge --allow-unrelated-histories origin/main合并远程仓库的文件
  2. git push -u origin master:main。这时就可以把本地的master分支push到远程的main分支   

#### git pull 提示错误 fatal: refusing to merge unrelated histories
  在git pull和git push命令中添加–allow-unrelated-histories 让git允许提交不关联的历史代码。
  git pull origin master(分支名) --allow-unrelated-histories 
  git push origin master(分支名) --allow-unrelated-histories 

####  OpenSSL SSL_read: Connection was aborted, errno 10053 
####  Failed to connect to github.com port 443: Timed out
10053   原因:Git默认限制推送的大小，运行命令更改限制大小即可 增加缓冲 git config --global http.postBuffer 524288000
443  一般都是网络不行 

#### git 项目过大，无法克隆
*_ error: 446 bytes of body are still expected64 MiB | 12.00 KiB/s _*
*_ fetch-pack: unexpected disconnect while reading sideband packet _*
*_ fatal: early EOF _*
*_ fatal: fetch-pack: invalid index-pack output _*
1. 第一步：克隆深度设置为1     git clone [git code address] --depth 1   cd project目录
2. 第二部：拉去当前完整分支    git fetch --unshallow 
3. 第三步：跟踪所有其他远程分支 git remote set-branches origin '*'
4. 第四步：拉去所有远程分支  git fetch -v 
