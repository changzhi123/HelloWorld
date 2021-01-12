

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
        id:'1',
        componentList: [{
            title: '轮播 (普通数组)',
            maxNum: 2,
            nowNum:0,
            parent:'1',
            icon: 'el-icon-picture',
           componentPack: 'CarouselImg',
           styles:{
            width:'',
            height:''
           },
           arrData:[
               {
                   imgurl:"",
                   name:''
               }
           ],
           objData:{}
        }, {
            title: '秒杀商品',
            maxNum: 3,
            nowNum:0,
            parent:'1',
            icon: 'el-icon-picture',
           componentPack:'FlashSaleGoodsList' ,
           styles:{
            width:'900px',
            height:'' 
           },
           arrData:[],
           objData:{
               text:'',itme:'',
               suffixUrl:'',prefixUrl:'',
               data1:[
                   {
                       imgurl:'',
                       nametext:'',
                       price:'',secondPrice:''
                   }
               ],data2:[]
           }
        }, {
            title: '多图(5)',
            maxNum: 5,
            nowNum:0,
            parent:'1',
            icon: 'el-icon-picture',
           componentPack: 'MultipleImg5',
           styles:{
            width:'900px',
            height:''
           },
           arrData:[
               {
                   imgurl:'',name:''
               }
           ],
           objData:{}
        }, {
            title: '多图(2-3)',
            maxNum: 10,
            nowNum:0,
            parent:'1',
            icon: 'el-icon-s-grid',
           componentPack: 'MultipleImg2_3',
           styles:{
            width:'900px',
            height:'550px'
           },
           arrData:[ 
               {
                   imgurl:'',name:''
               }
           ],
           objData:{}
        }, {
            title: '多图(1-3)',
            maxNum: 10,
            nowNum:0,
            parent:'1',
            icon: 'el-icon-s-grid',
           componentPack: 'MultipleImg1_3',
           styles:{
            width:'900px',
            height:'550px'
           },
           arrData:[ 
            {
                imgurl:'',name:''
            }
        ],
           objData:{}
        }, {
            title: '分类管区',
            maxNum: 10,
            parent:'1',
            nowNum:0,
            icon: 'el-icon-s-grid',
           componentPack:'CategoryGoods',
           styles:{
            width:'900px',
            height:'550px'
           },
           arrData:[ ],
           objData:{}
        }, {
            title: '纯文本',
            maxNum: 20,
            parent:'1',
            nowNum:0,
            icon: 'el-icon-notebook-1',
           componentPack:'plainTextBlock',
           styles:{
            width:'',
            height:''
           },
           arrData:[ ],
           objData:{}
        }]
    },
    {
        groupName: '商品类',
        id:'2',
        componentList: [{
            title: '全部商品',
            maxNum: 1,
            parent:'2',
            nowNum:0,
            icon: 'el-icon-s-goods',
            componentPack: 'AllGoodsList',
            styles:{
                width:'',
                height:''
               },
               arrData:[ ],
               objData:{}
        }, {
            title: '推荐商品',
            parent:'2',
            maxNum: 1,
            nowNum:0,
            icon: 'el-icon-s-goods',
           componentPack: 'RecommendedGoodsList',
           styles:{
            width:'',
            height:''
           },
           arrData:[ ],
           objData:{}
        }]
    },
    {
        groupName: '营销互动类',
        id:'3',
        componentList: [{
            title: '优惠券',
            parent:'3',
            maxNum: 1,
            nowNum:0,
            icon: 'el-icon-s-ticket',
           componentPack: 'Coupon',
           styles:{
            width:'',
            height:''
           },
           arrData:[ ],
           objData:{}
        }]
    }
];

export default tools;
