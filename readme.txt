NEJ依赖迁移工具使用说明
1. 安装NodeJS环境（http://nodejs.org/）
2. 准备依赖关系文件，如demo/migrate/define.json
3. 将migrate/gen/下的内容拷贝至项目中
   - windows下执行文件为.bat文件，其他平台为.sh文件
4. 用文本编辑器打开修改.bat或者.sh文件中的release.js和release.conf文件的路径
   - bat文件中的%~dp0表示当前bat文件所在的目录路径
5. 修改配置文件migrate.conf，配置文件各配置参数说明见配置文件中的注释
6. 执行.bat或者.sh文件迁移项目依赖关系

注：如果项目有统一的build脚本可将打包的执行命令写入build中,[]路径根据实际情况替换
   node [PATH_OF_RELEASE_SRC]run.js -c=[PATH_OF_RELEASE_CONFIG]migrate.conf