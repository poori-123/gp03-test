$(function(){
    $.ajax({
        url:'./data/goods.json',
        type:'get',
        dataType:'json',
        success:function(json){
            $.each(json,function(index,item){
                var domStr = `<div class="goods">
                    <img src="${item.imgurl}" alt="">
                    <h3>${item.price}</h3>
                    <h4>${item.title}</h4>
                    <h5>京东自营旗舰店</h5>
                    <p class="add" code="${item.code}">加入购物车</p>
                </div>`;
                $('.content').append(domStr);
            });
        }
    });
    $('.content').on('click','.add',function(){
        var goodsArr = [];
        var boo = false;
        if(localStorage.getItem('goods')){
            goodsArr = JSON.parse(localStorage.getItem('goods'));
        };
        $.each(goodsArr,(index,item)=>{
            if(item.code === $(this).attr('code')){
                item.num++;
                boo = true;
                return false;
            }
        });
        if(!boo){
            var obj = {
                code:$(this).attr('code'),
                num:1
            };
            goodsArr.push(obj);
        };
        localStorage.setItem('goods',JSON.stringify(goodsArr));
        alert('添加成功！');
    })
    $('.buyCart').click(function(){
        window.open('./myCart.html');
    })
})