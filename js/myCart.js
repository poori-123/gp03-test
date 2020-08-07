$(function(){
    var mygoodsArr = [];
    var all_pri = 0;
    if(localStorage.getItem('goods')){
        mygoodsArr = JSON.parse(localStorage.getItem('goods'));
    }
    $('.allgoods h3 span').text(mygoodsArr.length);
    if(mygoodsArr.length === 0){
        $('.goodslist').css('display','none');
        $('.empty').css('display','block');
        return false;
    }
    $.ajax({
        url:'./data/goods.json',
        type:'get',
        dataType:'json',
        success:function(json){
            $.each(mygoodsArr,function(index,item){
                $.each(json,function(key,val){
                    if(val.code === item.code){
                        var domStr = `<li>
                            <input type="checkbox">
                            <img src="${val.imgurl}" alt="">
                            <h3>${val.title}</h3>
                            <h4>￥<span>${val.price}</span></h4>
                            <div class="num">
                                <span class="minus">-</span>
                                <span class="num-num">${item.num}</span>
                                <span class="add">+</span>
                            </div>
                            <h5>￥<span>${val.price*item.num}</span></h5>
                            <h6 class="del" code="${item.code}">删除</h6>
                        </li>`;
                        
                        $('.goodslist ul').append(domStr);
                        if(item.num <= 1){
                            $('.minus').eq(index).css({'color':'#eee','cursor':'default'});
                        }
                    }
                })
            })
        }
    })
    $('.goodslist').on('click','.minus',function(){
        $this = $(this);
        if($(this).siblings('.num-num').text() <= 1){
            return false;
        }
        if($(this).siblings('.num-num').text() <= 2){
            $(this).css({'color':'#eee','cursor':'default'});
        }
        $(this).siblings('.num-num').text(parseInt($(this).siblings('.num-num').text())-1);
        $(this).parent().siblings('h5').children('span').text($(this).parent().siblings('h4').children('span').text()*$(this).siblings('.num-num').text());
        $.each(mygoodsArr,function(index,item){
            if(item.code === $this.parent().siblings('h6').attr('code')){
                item.num --;
                return false;
            }
        });
        if($(this).parent().siblings('input').prop('checked')){
            all_pri = parseInt($('.pri-all span').text()) - parseInt($(this).parent().siblings('h4').find('span').text());
            $('.pri-all span').text(all_pri);
        }
        localStorage.setItem('goods' , JSON.stringify(mygoodsArr));
    });

    $('.goodslist').on('click','.add',function(){
        $this = $(this);
        all_pri = 0;
        if($(this).siblings('.num-num').text() <= 1){
            $(this).siblings('.minus').css({'color':'#000','cursor':'pointer'});
        }
        $(this).siblings('.num-num').text(parseInt($(this).siblings('.num-num').text())+1);
        $(this).parent().siblings('h5').children('span').text($(this).parent().siblings('h4').children('span').text()*$(this).siblings('.num-num').text());
        $.each(mygoodsArr,function(index,item){
            if(item.code === $this.parent().siblings('h6').attr('code')){
                item.num ++;
                return false;
            }
        });
        if($(this).parent().siblings('input').prop('checked')){
            all_pri = parseInt($('.pri-all span').text()) + parseInt($(this).parent().siblings('h4').find('span').text());
            $('.pri-all span').text(all_pri);
        }
        localStorage.setItem('goods' , JSON.stringify(mygoodsArr));
    });

    $('.goodslist').on('click','.del',function(){
        all_pri = 0;
        $.each(mygoodsArr,function(index,item){
            if(item.code === $(this).attr('code')){
                mygoodsArr.splice(index,1);
                return false;
            }
        });
        $('.allgoods h3 span').text(mygoodsArr.length);
        localStorage.setItem('goods' , JSON.stringify(mygoodsArr));

        if($(this).siblings('input').prop('checked')){
            all_pri = parseInt($('.pri-all span').text()) - parseInt($(this).siblings('h5').find('span').text());
            $('.pri-all span').text(all_pri);
        }

        $(this).closest('li').remove();
        if($('.goodslist li').length === 0){
            $('.goodslist').css('display','none');
            $('.empty').css('display','block');
        }
        
        var flag = true;
        $('.goodslist ul input').each(function(){
            if(!$(this).prop('checked')){
                flag = false;
                return false;
            }
        });
        if(flag){
            $('.selectall input').prop('checked',true);
            $('.listbot input').prop('checked',true);
        }
    });

    $('.listbot input').click(function(){
        all_pri = 0;
        if($(this).prop('checked')){
            $('.goodslist ul input').each(function(index,item){
                $(this).prop('checked',true);
            })
            $('.selectall input').prop('checked',true);
            $('.goodslist ul h5 span').each(function(index,item){
                all_pri += parseInt($(this).text());
            })
            $('.pri-all span').text(all_pri);
        }else{
            $('.goodslist ul input').each(function(index,item){
                $(this).prop('checked',false);
            })
            $('.selectall input').prop('checked',false);
            $('.pri-all span').text(0);
        }
    })
    $('.selectall input').click(function(){
        if($(this).prop('checked')){
            all_pri = 0;
            $('.goodslist ul input').each(function(index,item){
                $(this).prop('checked',true);
            })
            $('.listbot input').prop('checked',true);
            $('.goodslist ul h5 span').each(function(index,item){
                all_pri += parseInt($(this).text());
            })
            $('.pri-all span').text(all_pri);
        }else{
            $('.goodslist ul input').each(function(index,item){
                $(this).prop('checked',false);
            })
            $('.listbot input').prop('checked',false);
            $('.pri-all span').text(0);
        }
    })

    $('.goodslist').on('click','li input',function(){
        all_pri = 0;
        var flag = true;
        if($(this).prop('checked')){
            all_pri = parseInt($('.pri-all span').text()) + parseInt($(this).siblings('h5').find('span').text());
            $('.pri-all span').text(all_pri);
            $('.goodslist ul input').each(function(){
                if(!$(this).prop('checked')){
                    flag = false;
                    return false;
                }
            });
            if(flag){
                $('.selectall input').prop('checked',true);
                $('.listbot input').prop('checked',true);
            }
        }else{
            all_pri = parseInt($('.pri-all span').text()) - parseInt($(this).siblings('h5').find('span').text());
            $('.pri-all span').text(all_pri);
            if($('.selectall input').prop('checked')){
                $('.selectall input').prop('checked',false);
                $('.listbot input').prop('checked',false);
            }
        }
    })


    
}  
)