1.pm2 -n blog start npm --run dev 启动.next项目
2.nginx将对3001接口的访问代理到3000，/EXapi前缀代理到/8890访问login
3.pm2 startup、pm2 save设置pm2开机自启动
4.next项目部署到服务器需要的文件：package.json、node_modules(npm i以防止permission denied报错)、public、.next
5.swr访问接口获取数据，getStaticProps、getStaticPaths中不能访问APIRoutes,因为这两个方法本身就是服务端执行，可以从文件获取数据或直接访问数据库等，但适用于用户访问前就可以生成的页面（SSG），其它页面采用SSR。