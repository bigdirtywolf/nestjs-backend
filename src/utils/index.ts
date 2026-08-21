export const getEntityOptions = () => ({
    database: process.env.DATABASE_NAME,
});
console.log('=== 应用启动配置 ===');
console.log('getEntityOptions配置为：', getEntityOptions());
console.log('==================');