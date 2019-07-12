$(document).on('turbolinks:load', function(){
  $('.parent-own-item-container__delete-btn').click(function(){
    if(!confirm('削除すると二度と復活できません。\n削除する代わりに停止することもできます。\n\n本当に削除しますか？')){
      return false;
    }else{
      location.href='/tops/edit.html.haml'
    }
  });
});