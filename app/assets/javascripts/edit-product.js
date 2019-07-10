$(document).on('turbolinks:load', function(){
//   $(document).ready(function(){
//     old_file_data = document.getElementById('item_item_images_attributes_0_id') 

// // 価格の表示
//     var input = gon.category_user_select.price,
//     fee = $(".right-price"),
//     fee_maney = Math.floor(input * 0.1),
//     maney = $(".right-price-maney"),
//     get_maney = (input - fee_maney).toLocaleString();
//     chn_get_maney = "¥" + get_maney;

//     if (input >= 300 && input <= 9999999){
//       fee.append(fee_maney.toLocaleString());
//       maney.append(chn_get_maney);
//       }
//     else {
//       fee.append("-----");
//       maney.append("-----");
//     }
    

//   })

    var dropzone = document.getElementById('file-drop-zone');
    var dropzone_next = document.getElementById('file-drop-zone--next');
    var dropzone_edit = document.getElementById('file-drop-zone--edit');
    var upload_files = [];
    var edit_file = [];
    var user_select_edit_image;
    var user_select_edit_image_select_last;

  // 次のドロップゾーンの表示
    function display_dropZone(){
      if(5 <= upload_files.length && upload_files.length <= 10 ){
        $(".sell-box_container__drop-box--next").css({  // 入力ファイルが5以上のとき、次のドロップゾーンを表示する。
          "display" : "block"
        })
      }
      else{
        $(".sell-box_container__drop-box--next").css({
        "display" : "none"
      })
      }
    }
  // 入力ゾーンの幅変更
    function adjust_file_field(){
      if(upload_files.length == 0){
        $("#file-drop-zone").css({  // 入力ファイルがないとき、最初のドロップゾーンを表示したままにし、幅は100％にする。
          "display" : "block",
          "width" : "100%"  
        });
      }  
      if(0 < upload_files.length && upload_files.length < 5){
        $("#file-drop-zone").css({  // 入力ファイルが5以下のとき、最初のドロップゾーンの幅を80%ずつ縮める。
        "display" : "block",
        "width" : "80%"  
        });
      }  
      if(upload_files.length == 5){
        $("#file-drop-zone").css({  // 入力ファイルが5のとき、最初のドロップゾーンを非表示にする。
          "display" : "none"
        });    
        $("#file-drop-zone--next").css({  // 入力ファイルが5のとき、次のドロップゾーンを非表示にする。
          "display" : "block",
          "width" : "100%"  
        });    
      }
      if(5 < upload_files.length && upload_files.length < 10 ){
        $("#file-drop-zone--next").css({  // 入力ファイルが5以上のとき、次のドロップゾーンを80%ずつ縮める。
          "display" : "block",
          "width" : "80%"  
      });
      }
      if(upload_files.length == 10){
        $("#file-drop-zone--next").css({  // 入力ファイルが10のとき、次のドロップゾーンを非表示にする。
          "display" : "none"
      });    
      } 
    };
    // 入力した画像＋削除・編集ボタンの表示
    function display_preview(src,title){ 
      html =` <ul id="add_file_image">
              <li id="image_display_container">
                <img src="${src}" class="preview" title="${title}"></img>
                <div id ="remove_edit_container">
                  <div class='image-edit-btn'>編集</div>                                
                  <div class='image-remove-btn'>削除</div>
                </div>
              </li>
            </ul>
            `
      if(upload_files.length <= 5){
      $("#preview").append(html);
      };
      if(5 < upload_files.length && upload_files.length <= 10 ){
        $("#preview--next").append(html);
      };  
    }
  // 画像の表示と削除、編集ボタンの追加
    function display_image(display_file){
      var  reader = new FileReader();

      reader.onload = (function(display_file) { // 読み込んだ画像に編集・削除ボタンをつけて表示する。
        return function(e) {
          var src = e.target.result;
          var title = display_file.name;
          display_preview(src,title);
        };
      })(display_file);
      reader.readAsDataURL(display_file);
    };
  // 画像のドラッグ後、ドロップエリアにコピーを許可
  function dragoverCopy(e){
    e = e.originalEvent;
    e.dataTransfer.dropEffect = 'copy';
    e.preventDefault();
  }
    $(dropzone).on("dragover", function(e){ // 上段のドロップゾーン
      dragoverCopy(e);
    })

    $(dropzone_next).on("dragover", function(e){ // 下段のドロップゾーン
      dragoverCopy(e);
    })

    $(document).on("dragover", dropzone_edit, function(e){ // モーダルウインドウのドロップゾーン
      dragoverCopy(e);
    })

  // ドロップした画像を$upload_filesに代入する。
    function dropGetFile(e){
      e = e.originalEvent;
      var drop_file = e.dataTransfer.files;
      upload_files.push(drop_file);  // ドロップ画像を配列に格納する。upload_filesに格納されたファイルは最終的にDBに保存される。
      $('#product-sell-btn').prop('disabled', false);

      adjust_file_field();
      display_image(drop_file[0]);
    }
    $(dropzone).on("drop", function(e){  // 上段のドロップゾーンに入れたファイルをupload_filsに格納する。
      dropGetFile(e);
      display_new_upload_zone();

      e.preventDefault();
    })
    $(dropzone_next).on("drop", function(e){  // 下段のドロップゾーンに入れたファイルをupload_filsに格納する。
      dropGetFile(e)
      e.preventDefault();
    })
    // モーダルウインドウのドロップゾーン
    $(document).on("drop", dropzone_edit, function(e){  // モーダルウインドウのドロップゾーンに入れたファイルをedit_filsに格納する。
      e = e.originalEvent;
      var drop_file = e.dataTransfer.files;
      edit_file.length = 0;
      edit_file.push(drop_file);

      display_image_edit_display(drop_file[0]);  // モーダルウインドウ内に画像が表示される。

      e.preventDefault();
    })

    // ファイルから選択したファイルを画像で表示
    $(document).on('change','.file-send-btn',function(e){  // ファイル選択で選択したファイルをupload_filesに格納する。
      console.log(e);
      var input_file = e.target.files;
      $('#product-sell-btn').prop('disabled', false);

      if(input_file.length != 0){
        upload_files.push(input_file);  // upload_filesに選択ファイルを格納する。
        display_image(input_file[0]); // ドロップゾーンに選択ファイルを表示する。
        adjust_file_field(); // ドロップゾーンのサイズ調整。
        display_dropZone(); // 上段のドロップゾーンが埋まれば、次のドロップゾーンを表示。
      }
    });
  // 選択した画像の削除
      $(document).on('click', ".image-remove-btn",function(e){
        var user_select_delete_image = $(this).parent().parent().parent(); // 削除したい画像の要素を取得
        var user_select_delete_image_result = user_select_delete_image.index() - 1; // 削除したい画像の要素の位置が、ドロップゾーンの何番目か確認
        user_select_delete_image.remove();
        var preview_children_attr = document.getElementById("preview");
        var preview_children_count = preview_children_attr.childElementCount - 1; // ファイルを削除後、削除したい画像の要素の位置が、今まで入力したファイルの何番目か確認

        if (preview_children_count < 5){ // 今まで入力したファイルが４ファイル以下だったら、
          for (i = 0; i < upload_files.length; i++){ // uploadするファイルの長さの回数だけ繰り返し、
            if (i == user_select_delete_image_result){ // もし削除したい画像の要素の位置と、upload_files内の配列番号が同じだったら
              upload_files.splice(i, 1); // その配列番号のデータを削除する。
            }
          };
        }
        if (preview_children_count == 5){ // 今まで入力したファイルが５以上だったら、こっちを実行。
          for (i = 0; i < upload_files.length; i++){
            if (i == user_select_delete_image_result + 5){ // 排除したい画像の要素の位置＋５が、５以上のファイルの位置に相当する。
              upload_files.splice(i, 1);
            }
          };
        }
        if(preview_children_count == 4){ // 削除処理を実行後、上段のファイルがもし４つだったら、下段の最初のファイルを上段の最後に持ってくる。
          move_image = $("#preview--next ul:first");
          $(move_image).appendTo("#preview");
        }
        display_dropZone();
        adjust_file_field();
      });

  // 選択した画像の編集
    function display_preview_edit(src,title,edit_btn_parent){
      modalwindow_html =`<div id='overlay'>
                          <div id='modalwindow'>
                            <div class= "item_image_change_wrap">
                              <div class="item_image_change_wrap__text">写真を切り取る</div>
                              <div class="item_image_change_wrap__change-btn">
                                <label = "item_image_change_wrap__change-btn__label">                        
                                  <i class="fas fa-camera"></i>  
                                  写真を変更する
                                  <input class="file-send-btn--edit" multiple="multiple" type="file" name="item[item_images_attributes][0][image][]" id="edit_image">
                                  </label>
                              </div>
                            </div>
                            <div class="file-drop-zone-edit-wrap">
                              <label id="file-drop-zone--edit">
                                <img src="${src}" class="preview--edit" title="${title}"></img>
                              </label>
                              <div class="file-drop-zone-edit-wrap__size-change">
                                <div class="file-drop-zone-edit-wrap__size-change__small-icon">
                                  <i class="fas fa-camera"></i>  
                                </div>
                                <div class="file-drop-zone-edit-wrap__size-change__bar"></div>
                                  ----------------------------------------------------------
                                <div class="file-drop-zone-edit-wrap__size-change__big-icon">
                                  <i class="fas fa-camera"></i>  
                                </div>
                              </div>
                            </div>
                            <div class="item_image_change_ok_btn">
                              <div id='image-cancel-btn'>キャンセル</div>
                              <div id='image-comformation-btn'>完了</divn>
                            </div>
                          </div>
                        </div>
                        `
      $(edit_btn_parent).append(modalwindow_html); //モーダルウインドウを表示する。
      $("#overlay").fadeIn();
    }
  // モーダルウインドウ内のメイン画像を表示
    function display_image_edit(display_file,edit_btn_parent){
      var  reader = new FileReader();

      reader.onload = (function(display_file) {
        return function(e) {
          var src = e.target.result;
          var title = display_file.name;
          display_preview_edit(src,title,edit_btn_parent);
        };
      })(display_file);
      reader.readAsDataURL(display_file);
    };
  // モーダルウインドウ内のメイン画像を選択画像に変更。
    function display_image_edit_display(display_file){
      var  reader = new FileReader();

      reader.onload = (function(display_file) {
        return function(e) {
          var src = e.target.result;
          var title = display_file.name;
          $('#file-drop-zone--edit').children().remove();
          $('#file-drop-zone--edit').append(`<img src="${src}" class="preview--edit" title="${title}"></img>`);
        };
      })(display_file);
      reader.readAsDataURL(display_file);
    };
  // モーダルウインドウで選択した画像を、メイン画面のドロップゾーン側に表示。
    function display_image_edit_display_last(display_file, append_file){
      var  reader = new FileReader();
      reader.onload = (function(display_file) {
        return function(e) {
          var src = e.target.result;
          var title = display_file.name;
          $(append_file).prepend(`<img src="${src}" class="preview" title="${title}"></img>`);
        };
      })(display_file);
      reader.readAsDataURL(display_file);
    };
  // モーダルウインドウで画像を選択。
    $(document).on('change','.file-send-btn--edit',function(e){
      edit_file.length = 0;
      var input_edit_file = document.getElementById('edit_image').files;
      edit_file.push(input_edit_file);
      display_image_edit_display(input_edit_file[0]);         
    });
  // モーダルウインドウを表示。
    $(document).on('click', ".image-edit-btn",function(e){
      console.log("s");
      var user_select_edit_image_select = $(this).parent().parent().parent(); 
      user_select_edit_image_select_last = user_select_edit_image_select.parent().attr("id")//編集選択した画像の親要素のidを取得。
      user_select_edit_image = $(this).parent().parent();
      user_select_edit_image_result = user_select_edit_image_select.index() - 1;//編集選択した画像が、ドロップゾーンの何番目か確認。
      console.log(upload_files);
      console.log(user_select_edit_image_result);

      if (user_select_edit_image_select_last == "preview"){// 編集選択した要素が上段のドロップゾーンの場合
        console.log("t");
        for (i = 0; i < upload_files.length; i++){
          if (i == user_select_edit_image_result){
            console.log("u");
            display_image_edit(upload_files[i][0], $(this).parent());// モーダルウインドウに編集選択した画像を表示
          }
        };
      }
      if (user_select_edit_image_select_last == "preview--next"){// 編集選択した要素が上段か下段のどちらのドロップゾーンか確認
        for (i = 0; i < upload_files.length; i++){
          if (i == user_select_edit_image_result + 5){
            display_image_edit(upload_files[i][0], $(this).parent());// モーダルウインドウに編集選択した画像を表示
          }
        };
      }
    });
  // モーダルウインドウのキャンセルを押した時の処理
    $(document).on('click', "#image-cancel-btn",function(e){
      $('#overlay').fadeOut();
      $('#overlay').remove();
    });
  // モーダルウインドウの完了を押した時の処理
  $(document).on('click', "#image-comformation-btn",function(e){
      $('#overlay').fadeOut();
      $('#overlay').remove();

      if(edit_file.length != 0){ //モーダルウインドウで画像を変更していれば
        if (user_select_edit_image_select_last == "preview"){ //編集ボタンを押した画像が上段のドロップゾーンだったら
          for (i = 0; i < upload_files.length; i++){
            if (i == user_select_edit_image_result){
              upload_files.splice(i+1, 0, edit_file[0]);//モーダルウインドウで選択した画像をupload_filesに挿入する。
              upload_files.splice(i, 1);//編集選択した画像をupload_filesから削除する。
              user_select_edit_image.children("img").remove();//編集選択した画像の表示を削除する。
              display_image_edit_display_last(edit_file[0][0], user_select_edit_image);//モーダルウインドウで選択した画像をメイン画面のドロップゾーンに表示する。
            }
          }
        }
        if (user_select_edit_image_select_last == "preview--next"){//編集ボタンを押した画像が下段のドロップゾーンだったら
          for (i = 0; i < upload_files.length; i++){
            if (i == user_select_edit_image_result + 5){
              upload_files.splice(i+1, 0, edit_file[0]);
              upload_files.splice(i, 1);
              user_select_edit_image.children("img").remove();
              display_image_edit_display_last(edit_file[0][0], user_select_edit_image);
            }
          }
        }
      }      
    });

    // upload_filesをajax通信でDBに渡す。
    $('.new_item').on('submit', function(e){
      e.preventDefault();
      var formdata = new FormData(this);
      var url = window.location.protocol + '//' + window.location.host + '/items';    
      var ajax_files = [];
      $(".sell-form_image-box p:last").remove();
      
      if(upload_files.length == 0){//upload_filesが何もなかったら
        $(".sell-form_image-box").append(`<p>画像を登録してください。</p>`)//validationメッセージを表示する。
        $(".sell-form_image-box p:last").css({"color" : "red"});
        $('html,body').animate({scrollTop: 0},'fast');
        return false;
      };
      for (i = 0; i < upload_files.length; i++){//upload_files内のデータを取り出し、それぞれにキーを分配する。
        ajax_files[i] = "item[item_images_attributes]" + "[" + i + "]" + '[image]';
        formdata.append(ajax_files[i], upload_files[i][0]);
      };

      $.ajax({
        url: url,
        type: "POST",
        data: formdata,
        cache: false,
        processData: false,
        contentType: false,
        dataType: 'json'
      })
  //validation
      .always(function(items){
        $('#product-sell-btn').prop('disabled', false);
        $(".form_item-name p:last").remove();
        $(".form_item-intro p:last").remove();
        $(".form_item-intro p:last").remove();
        $(".select-wrap-category p:last").remove();
        $(".select-wrap-condition p:last").remove();
        $(".select-wrap-days_to_ship p:last").remove();
        $(".select-wrap-delivery_cost p:last").remove();
        $(".select-wrap-delivery_method p:last").remove();
        $(".select-wrap-delivery_prefecture p:last").remove();
        $(".sell-price_form p:last").remove();
      
        if(typeof items != 'undefined'){
          if (items.name == ""){
            $(".form_item-name").append(`<p>入力してください。</p>`)
            $(".form_item-name p:last").css({"color" : "red"});
          }
          if (items.name.length > 40){
            $(".form_item-name").append(`<p>40文字以下で入力してください。</p>`)
            $(".form_item-name p:last").css({"color" : "red"});
          }
          if (items.detail == ""){
            $(".form_item-intro").append(`<p>入力してください。</p>`)
            $(".form_item-intro p:last").css({"color" : "red"});
          }
          if (items.detail.length > 1000){
            $(".form_item-intro").append(`<p>1000文字以下で入力してください。</p>`)
            $(".form_item-intro p:last").css({"color" : "red"});
          }
          if (items.category_id === null){
            $(".select-wrap-category").append(`<p>入力してください。</p>`)
            $(".select-wrap-category p:last").css({"color" : "red"});
          }
          if (items.condition === null){
            $(".select-wrap-condition").append(`<p>入力してください。</p>`)
            $(".select-wrap-condition p:last").css({"color" : "red"});
          }
          if (items.days_to_ship === null){
            $(".select-wrap-days_to_ship").append(`<p>入力してください。</p>`)
            $(".select-wrap-days_to_ship p:last").css({"color" : "red"});
          }
          if (items.delivery_cost === null){
            $(".select-wrap-delivery_cost").append(`<p>入力してください。</p>`)
            $(".select-wrap-delivery_cost p:last").css({"color" : "red"});
          }
          if (items.delivery_method === null){
            $(".select-wrap-delivery_method").append(`<p>入力してください。</p>`)
            $(".select-wrap-delivery_method p:last").css({"color" : "red"});
          }
          if (items.delivery_prefecture === null){
            $(".select-wrap-delivery_prefecture").append(`<p>入力してください。</p>`)
            $(".select-wrap-delivery_prefecture p:last").css({"color" : "red"});
          }
          if (items.price < 300 || items.price > 9999999){
            $(".sell-price_form").append(`<p>300〜9999999円の範囲で入力してください。</p>`)
            $(".sell-price_form p:last").css({"color" : "red"});
          }
          $('html,body').animate({scrollTop: 0},'fast');
        }
        else{
          window.location.href = '/';
        }
      })
    });
});