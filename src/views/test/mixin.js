export const mixin = {
    methods: {
        hellworld: function () {
            console.log('mixin混入HelloWorld 方法' + '<br>');
        },
        samemethod: function () {
            console.log('mixin混入Mixin：相同方法名' + '<br>');
        }
    }
};