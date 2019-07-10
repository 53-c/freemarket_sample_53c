$(document).on('turbolinks:load', function(){
  // $(window).on('read', function(){
  //   console.log("1");
  //   var input = gon.category_user_select.category_id;
  //   var child_html = `<select name="item[category_attributes][id]" id="item_category_attributes_child_id">                 `
  //   $(".select-wrap-category").append(child_html);
  //   var grandchild_html = `<select name="item[category_attributes][id]" id="item_category_attributes_grandchild_id"> 
  //               <i class="fas fa-chevron-down"></i>    
  //               `
  //   $(".select-wrap-category").append(grandchild_html);
  //   console.log(gon.category_user_select_category);

  // });

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

    grandchild_category = gon.category.filter(function(value){
      if (user_select_category == value.parent_id)
      return true;
    });
    category_grandchild_box(grandchild_category);
  });
});

