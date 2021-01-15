

/**
 * hidden 隐藏，不显示在工具栏
 * maxNum Number 最大可配置数
 * topDisplay Bool 最顶部显示
 * bottomDisplay Bool 最底部显示
 * onlyCanConfig Bool 是否只能配置数据，不能删除 copy
 * @type {*[]}
 */
const tools = [
    {
        groupName: '图文类',
        id: '1',
        componentList: [{
            title: '轮播 (普通数组)',
            maxNum: 2,
            nowNum: 0,
            parent: '1',
            icon: "ios-image",//'el-icon-picture',
            componentPack: 'CarouselImg',
            isOpenType:false,
            styles: {
                width: '',
                height: ''
            },
            arrList: [
                {
                    imgurl: "https://gjusp.alicdn.com/img/img1550568121854-2927159970.jpg@1000y-0ic_50Q.jpg_.webp",
                    name: ''
                },
                {
                    imgurl: "https://gw.alicdn.com/tfs/TB1DKP9zCtYBeNjSspkXXbU8VXa-1920-450.jpg_Q90.jpg",
                    name: ''
                },
                {
                    imgurl: "https://gw.alicdn.com/tfs/TB1DKP9zCtYBeNjSspkXXbU8VXa-1920-450.jpg_Q90.jpg",
                    name: ''
                },
                {
                    imgurl: "https://gjusp.alicdn.com/img/img1550568121854-2927159970.jpg@1000y-0ic_50Q.jpg_.webp",
                    name: ''
                }

            ],
            objList: {}
        }, {
            title: '秒杀商品',
            maxNum: 3,
            nowNum: 0,
            parent: '1',
            icon: 'ios-alarm',// 'el-icon-picture',
            componentPack: 'FlashSaleGoodsList',
            styles: {
                width: '900px',
                height: ''
            },
            arrList: [],
            objList: {
                imgurl: "",
                backgroundImage:
                    "https://misc.360buyimg.com/mtd/pc/index_2019/1.0.0/assets/img/4a15d8883775742e3efbb850ae14def7.png",
                name: "秒杀商品",
                itme: "2021-01-12T15:51:43.918Z",
                data: [
                    [
                        {
                            imgurl:
                                "https://img30.360buyimg.com/babel/s290x370_jfs/t1/133470/23/5172/252715/5f1a3b3cE2c82f4cf/4a92d18397680eee.jpg!cc_290x370.webp",
                            text: "商品标题，可以结合具体业务活动商品数据",
                            price: "599.00",
                            toprice: "849.00",
                        },
                        {}, {}, {},
                    ],
                    [{}, {}, {}, {}],
                ],
            }
        }, {
            title: '多图(5)',
            maxNum: 5,
            nowNum: 0,
            parent: '1',
            icon: 'ios-images',// 'el-icon-picture',
            componentPack: 'MultipleImg5',
            styles: {
                width: '900px',
                height: ''
            },
            arrList: [
                {
                    imgurl: 'https://img.alicdn.com/tps/i4/TB1y4tuOxz1gK0jSZSgSuuvwpXa.jpg_500x1000q75s0.jpg_.webp',
                    name: ''
                },
                {}, {}, {}, {}
            ],
            objList: {}
        }, {
            title: '多图(2-3)',
            maxNum: 10,
            nowNum: 0,
            parent: '1',
            icon: 'ios-images',//'el-icon-s-grid',
            componentPack: 'MultipleImg2_3',
            styles: {
                width: '900px',
                height: '550px'
            },
            arrList: [
                {
                    imgurl: 'https://gw.alicdn.com/tfs/TB1xVR9oFP7gK0jSZFjXXc5aXXa-468-602.jpg', name: ''
                }, {}, {}, {}, {}
            ],
            objList: {}
        }, {
            title: '多图(1-3)',
            maxNum: 10,
            nowNum: 0,
            parent: '1',
            icon: 'ios-images',//'el-icon-s-grid',
            componentPack: 'MultipleImg1_3',
            styles: {
                width: '900px',
                height: '550px'
            },
            arrList: [
                {
                    imgurl: 'https://gw.alicdn.com/tfs/TB1xVR9oFP7gK0jSZFjXXc5aXXa-468-602.jpg', name: ''
                }, {}, {}, {}
            ],
            objList: {}
        }, {
            title: '分类管区',
            maxNum: 10,
            parent: '1',
            nowNum: 0,
            icon: 'ios-apps',//'el-icon-s-grid',
            componentPack: 'CategoryGoods',
            styles: {
                width: '900px',
                height: '550px'
            },
            arrList: [],
            objList: {
                imgurl: '',//'https://img.alicdn.com/tps/i4/TB1MesKcWmWQ1JjSZPhwu0CJFXa.png',
                slogan: '打造爱巢',
                text: 'HOME',
                advertising: '广告位',
                toAdvertising: "广告位副标题",
                data: [{
                    imgurl: '',//'https://gw.alicdn.com/bao/uploaded/i3/3243519086/O1CN016gQ0Ia2GzR82IAhdR_!!0-item_pic.jpg',
                    text: '商品标题，可以结合具体业务活动商品数据',
                    price: '69.8'
                },
                {}, {}, {}, {}, {}, {}, {}
                ]
            }
        }, {
            title: '纯文本',
            maxNum: 20,
            parent: '1',
            nowNum: 0,
            icon: 'ios-paper',//'el-icon-notebook-1',
            componentPack: 'plainTextBlock',
            styles: {
                width: '900px',
                height: '70px',
                color: '#58bc58',
                size: '37px'
            },
            arrList: [],
            objList: {
                text: '超值进口新发现'
            }
        }]
    },
    {
        groupName: '商品类',
        id: '2',
        componentList: [{
            title: '全部商品',
            maxNum: 1,
            parent: '2',
            nowNum: 0,
            icon: 'md-appstore', //'el-icon-s-goods',
            componentPack: 'AllGoodsList',
            styles: {
                width: '900px',
                height: '500px'
            },
            arrList: [
                {
                    imgurl:
                        "https://gw.alicdn.com/bao/uploaded/i1/748159429/O1CN01xeiYck2JWX37gKDJk_!!2-item_pic.png",
                    text: "商品标题，可以结合具体业务活动商品数据",
                    price: "69.8",
                },
                {}, {}, {}, {}, {}, {}, {}, {}, {},
            ],
            objList: {}
        }, {
            title: '推荐商品',
            parent: '2',
            maxNum: 1,
            nowNum: 0,
            icon: 'md-cart',//'el-icon-s-goods',
            componentPack: 'RecommendedGoodsList',
            styles: {
                width: '900px',
                height: '270px'
            },
            arrList: [
                {
                    imgurl: 'https://gw.alicdn.com/bao/uploaded/i1/2105113961/O1CN01C6b1kj1f8BJxju0i4_!!0-item_pic.jpg',
                    text: '商品标题，可以结合具体业务活动商品数据',
                    price: '69.8 '
                }, {}, {}, {}, {}
            ],
            objList: {}
        }]
    },
    {
        groupName: '营销互动类',
        id: '3',
        componentList: [{
            title: '优惠券',
            parent: '3',
            maxNum: 1,
            nowNum: 0,
            icon: 'md-barcode',//'el-icon-s-ticket',
            componentPack: 'Coupon',
            styles: {
                width: '900px',
                height: '150px'
            },
            arrList: [],
            objList: {
                imgurl: ''
            }
        }]
    }
];

export default tools;
