$(document).on('turbolinks:load', function(e){
  var current_url = location.href;
// 商品編集画面の初期値入力
  if(typeof gon != 'undefined') {
    if(typeof gon.category_user_select != 'undefined') {
    var edit_url = window.location.protocol + '//' + window.location.host + '/items/' + gon.category_user_select.id + '/edit';    
    if (current_url == edit_url){
      // $(window).one("load", function(){

        var parent_name = gon.category.find(item => item.id === gon.category_user_select_category.parent_id)
        var grandparent_name = gon.category.find(item => item.id === gon.category_user_select_category.grandparent_id)
        $('#item_category_attributes_id').val(grandparent_name.id);

        child_category = gon.category.filter(function(value){// 子カテゴリーの配列を作成
          if (parent_name.parent_id == value.parent_id)
          return true;
        });
        var html = `<select name="item[category_attributes][id]" id="item_category_attributes_child_id">                 `
        $(".select-wrap-category").append(html);

        var select_parent = document.getElementById('item_category_attributes_child_id');
        var option_parent = document.createElement('option');// 子カテゴリー用のoption要素を作成
        option_parent.setAttribute('value', "");
        option_parent.innerHTML = "-----";// 子カテゴリーの何も選択していない時の表示。（最初の表示）
        select_parent.appendChild(option_parent);

        for(var i = 0; i<child_category.length; i++){// 子カテゴリーの配列に、option要素をそれぞれ適用し、プルダウンで表示がでるようにする。
          option_parent = document.createElement('option');
          option_parent.setAttribute('value', child_category[i].id);
          option_parent.innerHTML = child_category[i].name;
          select_parent.appendChild(option_parent);
        }
        $('#item_category_attributes_child_id').val(parent_name.id);

        grandchild_category = gon.category.filter(function(value){
          if (gon.category_user_select_category.parent_id == value.parent_id)
          return true;
        });

        var html = `<select name="item[category_attributes][id]" id="item_category_attributes_grandchild_id"> 
                    <i class="fas fa-chevron-down"></i>    
                    `
        $(".select-wrap-category").append(html);

        var select = document.getElementById('item_category_attributes_grandchild_id');
        var option = document.createElement('option');
        option.setAttribute('value', "");
        option.innerHTML = "-----";
        select.appendChild(option);
        
        for(var i = 0; i<grandchild_category.length; i++){
          var option = document.createElement('option');
          option.setAttribute('value', grandchild_category[i].id);
          option.innerHTML = grandchild_category[i].name;
          select.appendChild(option);
        };
        $('#item_category_attributes_grandchild_id').val(gon.category_user_select_category.id);
      // });
      }
    }
  }

// 子カテゴリーを表示
  function category_child_box(child_category){
    var html = `<select name="item[category_attributes][id]" id="item_category_attributes_child_id">                 `
    $(".select-wrap-category").append(html);

    var select = document.getElementById('item_category_attributes_child_id');
    var option = document.createElement('option');// 子カテゴリー用のoption要素を作成
    option.setAttribute('value', "");
    option.innerHTML = "-----";// 子カテゴリーの何も選択していない時の表示。（最初の表示）
    select.appendChild(option);

    for(var i = 0; i<child_category.length; i++){// 子カテゴリーの配列に、option要素をそれぞれ適用し、プルダウンで表示がでるようにする。
      option = document.createElement('option');
      option.setAttribute('value', child_category[i].id);
      option.innerHTML = child_category[i].name;
      select.appendChild(option);
    };
  }
//孫カテゴリーを表示
  function category_grandchild_box(grandchild_category){
    var html = `<select name="item[category_attributes][id]" id="item_category_attributes_grandchild_id"> 
                <i class="fas fa-chevron-down"></i>    
                `
    $(".select-wrap-category").append(html);

    var select = document.getElementById('item_category_attributes_grandchild_id');
    var option = document.createElement('option');
    option.setAttribute('value', "");
    option.innerHTML = "-----";
    select.appendChild(option);
    
    for(var i = 0; i<grandchild_category.length; i++){
      var option = document.createElement('option');
      option.setAttribute('value', grandchild_category[i].id);
      option.innerHTML = grandchild_category[i].name;
      select.appendChild(option);
    };
  }
// 親カテゴリーの選択をuserが変更したら子カテゴリーを表示
  $("#item_category_attributes_id").on("change", function(){
    $("#item_category_attributes_child_id").remove();
    $("#item_category_attributes_grandchild_id").remove();
    var child_category = [];
    var user_select_category = $("#item_category_attributes_id option:selected").val();

    child_category = gon.category.filter(function(value){// 子カテゴリーの配列を作成
      if (user_select_category == value.parent_id)
      return true;
    });
    category_child_box(child_category);
  });

// 子カテゴリーの選択をuserが変更したら孫カテゴリーを表示
  $(document).on("change","#item_category_attributes_child_id", function(){
    $("#item_category_attributes_grandchild_id").remove();
    var grandchild_category = [];
    var user_select_category = $("#item_category_attributes_child_id option:selected").val();
    console.log(user_select_category);

    grandchild_category = gon.category.filter(function(value){
      if (user_select_category == value.parent_id)
      return true;
    });
    console.log(grandchild_category);
    category_grandchild_box(grandchild_category);
  });
});

