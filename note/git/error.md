
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


#### git merge时合并代码如何忽略某些文件
问题：在我们的项目中，经常遇到不同分支需要不同的配置文件，而这些分分支在merge时，默认会被覆盖或者出现冲突，比如vite.config.js build.gradle  .gitlab-ci.yml等文件。

产生原因： 
  git在merge时，会有一个默认的驱动去检查每个文件的每一行，若发现两个分支的同一个文件有不同，会认为两个分支都对这个文件做了修改，并merge两个文件，此时有可能产生冲突；

解决办法：

  自定义一个merge驱动，在里面定义一些不会被检查的文件，那git就会在merge时忽略掉这些文件。

    例:  实现dev分支根目录下的分支文件build.gradle和.gitlab-ci.yml不被合并到master分支：

    1.在dev根目录运行命令：
    git config --global merge.mydrive.driver true
    定义了一个属于我们自定义的驱动，名为：mydrive
    2.在项目根目录下新建文件.gitattributes，在该文件中添加”需要忽略的文件名 + merge=mydrive“
    build.gradle merge=mydrive
    .gitlab-ci.yml merge=mydrive
    3.git提交
    4.切换到master分支，git merge dev