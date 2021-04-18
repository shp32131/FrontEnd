# tmux
- 安装
- `ubuntu and debian install` : `sudo apt-get install tmux`

## 快捷键
- 创建一个会话终端`tmux new -s [name]`
- 查看终端会话`tmux a / tmux ls`
- 退出终端会话`tmux detach`
- 关闭终端会话`tmux kill-session -t [name] / exit / ctrl + b , &`
- 打开具体终端`tmux a -t [name] / tmux attach -t [name]`
- 水平分屏`ctrl + b`,再`%`
- 垂直分屏`ctrl + b`,再`"`
- 分屏后光标切换`ctrl + b`,`o`
- 切换会话终端`ctrl + b`,`s`
- 当前窗口上创建新的窗口`ctrl + b, c`
- 暂时退出当前会话`ctrl + b, d`
- 合并所有分屏窗口`ctrl + b, !`

## error
- `sessions should be nested with care, unset $TMUX to force` 不能在`tmux`会话里再创建会话