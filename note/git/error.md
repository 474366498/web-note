
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


