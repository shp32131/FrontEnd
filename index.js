new Promise((resolve,reject) => {
    setTimeout(() => {
        console.log('执行异步任务1');
        resolve(1);
        // reject(1);
    },1000);
}).then(
    value => {
        console.log('异步任务1的结果',value);
        console.log('执行同步任务1');
        return 2;
    }
).then(
    value => {
        console.log('同步任务1的结果',value);
        // 启动异步任务2
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                console.log('执行异步任务2');
                resolve(3);
            },1000)
        });
    }
).then(
    value => {
        console.log('异步任务2的结果',value);
        return 10;
    }
).then(
    value => {
        throw 10;
    }
).catch(
    reason => {
        console.log('catch throw ',reason);
    }
)